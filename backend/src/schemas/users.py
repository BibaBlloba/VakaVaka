from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber


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

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    login: str | None
    email: EmailStr | None
    password: str
