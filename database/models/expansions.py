from sqlalchemy import Column, ForeignKey, Integer, String, Table, event
from sqlalchemy.orm import Session, relationship

from pm5n.database.base import Base

association_table = Table(
    "expn_tag_assoc",
    Base.metadata,
    Column(
        "expansion_id",
        Integer,
        ForeignKey("expansions.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "tag_id",
        Integer,
        ForeignKey("tags.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


class Expansion(Base):
    __tablename__ = "expansions"
    id: int = Column(Integer, primary_key=True, index=True)
    trigger: str = Column(String, unique=True, nullable=False, index=True)
    expansion: str = Column(String)
    img: str = Column(String)

    tags = relationship(
        "Tag",
        secondary=association_table,
        back_populates="expansions",
    )

    def as_dict(self):
        return {
            **{c.name: getattr(self, c.name) for c in self.__table__.columns},
            "tags": [tag.name for tag in self.tags],
        }

    def __repr__(self):
        return f"<Expansion(trigger={self.trigger})>"


class Tag(Base):
    __tablename__ = "tags"
    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, unique=True, nullable=False, index=True)

    expansions = relationship(
        "Expansion",
        secondary=association_table,
        back_populates="tags",
    )

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"<Tag(name={self.name})>"


@event.listens_for(Session, "after_flush")
def delete_tag_orphans(session, ctx):
    session.query(Tag).filter(~Tag.expansions.any()).delete(synchronize_session=False)
