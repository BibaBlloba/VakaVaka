from pydantic import BaseModel, ConfigDict


class RoleAdd(BaseModel):
    title: str


class Role(RoleAdd):
    id: int

    model_config = ConfigDict(from_attributes=True)
