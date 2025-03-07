from fastapi import APIRouter, Body, Depends, HTTPException, Response

from api.api_v1.dependencies import DbDep, UserIdDap, admin_required
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

    access_token = AuthService().create_access_token({"user_id": user.id})
    response.set_cookie("access_token", access_token)
    return {"access_token": access_token}


@router.get("/test")
async def user_test(
    user_id: UserIdDap,
    db: DbDep,
    admin=Depends(admin_required),
):
    return await db.users.get_one_or_none(id=user_id)
