from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber

from schemas.roles import Role


class UserAddRequest(BaseModel):
    login: str
    password: str
    first_name: str
    last_name: str
    age: int
    phone_number: PhoneNumber
    email: EmailStr


class UserAdd(BaseModel):
    login: str
    hashed_password: str
    first_name: str
    last_name: str
    age: int
    phone_number: PhoneNumber
    email: EmailStr


class User(BaseModel):
    id: int
    login: str
    first_name: str
    last_name: str
    age: int
    phone_number: PhoneNumber
    email: EmailStr
    is_admin: bool
    created_at: datetime
    roles: list[Role]

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    login: str | None = None
    email: EmailStr | None = None
    password: str


class UsersRolesAdd(BaseModel):
    user_id: int
    role_id: int


class UsersRoles(UsersRolesAdd):
    id: int

    model_config = ConfigDict(from_attributes=True)
