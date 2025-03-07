from typing import List

from pydantic import BaseModel, ConfigDict, Field

from src.schemas.tags import Tag, TagAdd
from src.schemas.users import User


class VacancyAdd(BaseModel):
    title: str
    short_description: str
    full_description: str
    price: int
    location: str = Field("Без местоположения")
    tags: list[int] = []


class Vacancy(VacancyAdd):
    id: int

    model_config = ConfigDict(from_attributes=True)


class VacancyPatchRequest(BaseModel):
    title: str | None = Field(None)
    short_description: str | None = Field(None)
    full_description: str | None = Field(None)
    price: int | None = Field(None)
    location: str | None = Field(None)
    tags: list[Tag] | None
    users: list[User] | None
