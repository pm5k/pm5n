from typing import Optional

from pydantic import BaseModel, constr


class PDTag(BaseModel):
    name: constr(min_length=1, strip_whitespace=True)


class PDExpansion(BaseModel):
    id: Optional[int] = None
    trigger: constr(min_length=1, strip_whitespace=True)
    expansion: constr(strip_whitespace=True)
    tags: Optional[list[PDTag]]
    img: constr(strip_whitespace=True)
    image_data: Optional[str] = None


class PDExpansionFilter(BaseModel):
    search_term: Optional[str] = None
    limit: Optional[int] = 100
    offset: Optional[int] = 1
    sort: Optional[str] = "ASC"
