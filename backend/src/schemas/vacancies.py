from datetime import date, datetime
from typing import List

from pydantic import BaseModel, ConfigDict, Field

from schemas.tags import Tag


class VacancyAddRequest(BaseModel):
    title: str
    short_description: str
    full_description: str
    price: int
    location: str = Field("Без местоположения")
    tags: list[int] = []


class VacancyAdd(BaseModel):
    title: str
    short_description: str
    full_description: str
    price: int
    location: str = Field("Без местоположения")


class Vacancy(VacancyAdd):
    id: int
    created_at: datetime
    tags: list[Tag]

    model_config = ConfigDict(from_attributes=True)


class VacancyPatchRequest(BaseModel):
    title: str | None = Field(None)
    short_description: str | None = Field(None)
    full_description: str | None = Field(None)
    price: int | None = Field(None)
    location: str | None = Field(None)
