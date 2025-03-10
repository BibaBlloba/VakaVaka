from typing import Annotated, List

import jwt
from fastapi import Depends, HTTPException, Query, Request
from pydantic import BaseModel

from schemas.auth_tokens import TokenRoles
from src.config import settings
from src.database import async_session_maker
from src.models.users import UsersOrm
from src.services.auth import AuthService
from utils.db_manager import DbManager


class PaginationParams(BaseModel):
    page: Annotated[int | None, Query(default=1, ge=1)]
    per_page: Annotated[int | None, Query(default=None, ge=1, le=10)]


PaginationDap = Annotated[PaginationParams, Depends()]


class VacanciesFiltersParams(BaseModel):
    title: Annotated[str | None, Query(None)]
    tags: Annotated[list | None, Query(None)]


VacanciesFiltersDap = Annotated[VacanciesFiltersParams, Depends()]


async def get_db():
    async with DbManager(session_factory=async_session_maker) as db:
        yield db


DbDep = Annotated[DbManager, Depends(get_db)]


def get_token(
    request: Request,
) -> str:
    token = request.cookies.get("access_token", None)
    if not token:
        raise HTTPException(status_code=401, detail="Вы не предоставили токен доступа.")
    return token


def get_current_user_id(token: str = Depends(get_token)):
    try:
        data = AuthService().decode_token(token)
        if data["type"] != "access":
            raise HTTPException(status_code=401, detail="Токен не действителен.")
    except jwt.exceptions.DecodeError:
        raise HTTPException(status_code=401, detail="Токен не действителен.")
    return data.get("user_id")


async def get_current_user_roles(token: str = Depends(get_token)):
    credentials_exception = HTTPException(
        401,
        detail="Could not validate credentials",
    )
    payload = AuthService().decode_token(token)
    roles: List[str] = payload.get("roles", [])
    token_data = TokenRoles(roles=roles)
    return token_data


def has_role(required_role: str):
    def role_checker(token_data: TokenRoles = Depends(get_current_user_roles)):
        if required_role not in token_data.roles:
            raise HTTPException(status_code=403, detail="Not enough permissions")
        return token_data

    return role_checker


async def admin_required(
    db: DbDep, user_id: int = Depends(get_current_user_id)
) -> bool:
    user = await db.users.get_one_or_none(id=user_id)
    if user.is_admin == False:
        raise HTTPException(403)
    return user.is_admin


AdminRequired = Annotated[bool, Depends(admin_required)]
UserIdDap = Annotated[int, Depends(get_current_user_id)]
