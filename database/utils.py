from sqlalchemy.dialects.sqlite import insert
from sqlalchemy.orm import Session

from pm5n.database.models.expansions import Expansion, Tag
from pm5n.database.schemas.expansions import PDExpansion


def upsert_expansion(session: Session, expansion: PDExpansion):
    # special consideration - if tag carries an id, then it should not be excluded
    # from the model dump, and included in the conflict index elements as "id" instead of "trigger"

    exclusions = ["tags", "image_data"]
    if not expansion.id:
        exclusions.append("id")

    index_elements = ["id" if expansion.id else "trigger"]
    if hasattr(expansion, "model_dump"):
        clean_expansion = expansion.model_dump(exclude=exclusions)
    else:
        clean_expansion = expansion.dict(exclude=exclusions)
    clean_tags = {tag.name for tag in expansion.tags}

    exp_stmt = (
        insert(Expansion)
        .values(**clean_expansion)
        .on_conflict_do_update(
            index_elements,
            set_=clean_expansion,
        )
        .returning(Expansion)
    )
    exp_return = session.execute(exp_stmt).scalar()

    # Get current tag names
    current_tags = {tag.name for tag in exp_return.tags}

    # Dissociate any tags that are no longer present
    for tag in current_tags - clean_tags:
        exp_return.tags.remove(session.query(Tag).filter_by(name=tag).one())

    # Associate any new tags, create them if they don't exist
    for tag in clean_tags - current_tags:
        tag_stmt = (
            insert(Tag)
            .values(name=tag)
            .on_conflict_do_nothing(index_elements=["name"])
            .returning(Tag)
        )
        upserted_tag = session.execute(tag_stmt).scalar()
        exp_return.tags.append(
            upserted_tag or session.query(Tag).filter_by(name=tag).one()
        )

    return exp_return
