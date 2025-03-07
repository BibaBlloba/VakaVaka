from pydantic import BaseModel, ConfigDict


class TagAdd(BaseModel):
    title: str


class Tag(TagAdd):
    id: int

    model_config = ConfigDict(from_attributes=True)
