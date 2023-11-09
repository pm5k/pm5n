import pytest
from sqlalchemy.orm import Session

from pm5n.database.models.expansions import Expansion, Tag  # noqa F401
from pm5n.database.schemas.expansions import PDExpansion, PDTag  # noqa F401
from pm5n.database.utils import upsert_expansion  # noqa F401


@pytest.mark.usefixtures("dbsession")
def make_preliminary_data(dbsession: Session):
    tags = [Tag(name=t) for t in ["fruit", "boot", "shoot"]]

    foo = Expansion(
        trigger="foo", expansion="foo", img="placeholder.png", tags=[tags[0], tags[1]]
    )
    bar = Expansion(
        trigger="bar", expansion="bar", img="placeholder.png", tags=[tags[0], tags[2]]
    )

    dbsession.add(foo)
    dbsession.add(bar)
    dbsession.commit()


@pytest.mark.usefixtures("dbsession")
def test_expansion_create(dbsession: Session):
    expansion = Expansion(trigger="test", expansion="test", img="test")
    dbsession.add(expansion)
    dbsession.commit()
    assert expansion.id is not None


@pytest.mark.usefixtures("dbsession")
def test_expansion_with_tags_create(dbsession: Session):
    tag = Tag(name="test")
    expansion = Expansion(trigger="test", expansion="test", img="test", tags=[tag])

    dbsession.add(expansion)
    dbsession.commit()
    assert expansion.id is not None
    assert tag.id is not None


@pytest.mark.usefixtures("dbsession")
def test_upsert_unique_constr(dbsession: Session):
    """Test that we can upsert when trigger clashes with existing expansion."""
    make_preliminary_data(dbsession)

    initial_expansion = dbsession.query(Expansion).filter_by(trigger="foo").first()

    new_expansion = PDExpansion(**initial_expansion.as_dict() | {"tags": []})
    new_expansion.trigger = "foop"

    upsert_expansion(dbsession, new_expansion)
    dbsession.commit()
    qry = dbsession.query(Expansion)
    assert qry.count() == 2
    assert qry.first().trigger == "foop"
    assert qry.first().tags == []


@pytest.mark.usefixtures("dbsession")
def test_cascade_all_exp_deleted(dbsession: Session):
    """Deleting all expansions should delete all associations and tags."""
    make_preliminary_data(dbsession)

    expansions = dbsession.query(Expansion).all()
    for exp in expansions:
        dbsession.delete(exp)
    assert dbsession.query(Tag).all() == []
    assert dbsession.query(Expansion).all() == []


@pytest.mark.usefixtures("dbsession")
def test_cascade_one_exp_deleted(dbsession: Session):
    """Deleting one expansion should delete all it's associations and tags, nothing else."""
    make_preliminary_data(dbsession)

    another = PDExpansion(
        trigger="another",
        expansion="another",
        img="another",
        tags=[PDTag(name="fruit"), PDTag(name="boot"), PDTag(name="shoot")],
    )
    another_db = upsert_expansion(dbsession, another)
    dbsession.commit()
    dbsession.delete(another_db)
    assert dbsession.query(Tag).count() == 3
    assert dbsession.query(Expansion).count() == 2


@pytest.mark.usefixtures("dbsession")
def test_cascade_all_tags_deleted(dbsession: Session):
    """Deleting all tags should delete all associations and leave expansions."""
    make_preliminary_data(dbsession)

    tags = dbsession.query(Tag).all()
    for tag in tags:
        dbsession.delete(tag)
    dbsession.commit()
    assert dbsession.query(Tag).all() == []
    assert dbsession.query(Expansion).count() == 2
