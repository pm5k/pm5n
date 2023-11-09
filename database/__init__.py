import os
from collections.abc import Generator
from contextlib import contextmanager
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker

from pm5n.database.base import Base
from pm5n.database.models import expansions  # noqa: F401

DB_FILE = Path(os.path.abspath(__file__)).parent.parent / "data/pm5n.db"
DB_URL = f"sqlite:///{DB_FILE.resolve()}"

engine = create_engine(
    DB_URL,
    connect_args={"check_same_thread": False},
    # echo=True,
)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def session() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except SQLAlchemyError as err:
        session.rollback()
        # TODO: log error properly!
        print(err)
        # raise
    finally:
        session.close()
