from fastapi import APIRouter, Body, Depends, HTTPException, Response

from api.api_v1.dependencies import AdminRequired, DbDep, UserIdDap
from schemas.auth_tokens import TokenInfo
from schemas.users import UserAdd, UserAddRequest, UserLogin
from services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register_user(
    db: DbDep,
    data: UserAddRequest = Body(),
):
    _data_without_passwd = data.model_dump()
    _data_without_passwd.pop("password")
    hashed_password = AuthService().hash_password(data.password)
    hashed_user_data = UserAdd(
        hashed_password=hashed_password,
        **_data_without_passwd,
    )
    result = await db.users.add(hashed_user_data)
    await db.commit()
    return result


@router.post("/login")
async def login_user(
    db: DbDep,
    data: UserLogin,
    response: Response,
):
    user = await db.users.get_uesr_with_hashedPwd(**data.model_dump())
    if not user:
        raise HTTPException(
            401, detail="Пользователь с таким email или login не зарегестрирован."
        )

    if not AuthService().verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Пароль неверный")

    access_token = AuthService().create_access_token(
        {"user_id": user.id, "is_admin": user.is_admin}
    )
    refresh_token = AuthService().create_refresh_token({"user_id": user.id})
    response.set_cookie("access_token", access_token)
    response.set_cookie("refresh_token", refresh_token)
    return TokenInfo(access_token=access_token, refresh_token=refresh_token)


@router.post("/logout")
async def logout(
    user_id: UserIdDap,
    response: Response,
):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"status": "ok"}


@router.get("/me")
async def get_me(
    user_id: UserIdDap,
    db: DbDep,
):
    return await db.users.get_one_or_none(id=user_id)


@router.post("/refresh")
async def refresh_token(
    db: DbDep,
    user_id: UserIdDap,
    response: Response,
):
    user = await db.users.get_one_or_none(id=user_id)
    access_token = AuthService().create_access_token(
        {"user_id": user.id, "is_admin": user.is_admin}
    )
    response.set_cookie("access_token", access_token)
    return {"status": "ok"}
