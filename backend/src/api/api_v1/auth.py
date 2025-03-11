from fastapi import APIRouter, Body, Depends, HTTPException, Response

from api.api_v1.dependencies import AdminRequired, DbDep, LoginAccessToken, UserIdDap
from schemas.auth_tokens import TokenInfo
from schemas.roles import RoleAdd
from schemas.users import UserAdd, UserAddRequest, UserLogin, UsersRolesAdd
from services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register_user(
    db: DbDep,
    data: UserAddRequest = Body(
        openapi_examples={
            "1": {
                "summary": "user",
                "description": "Test user",
                "value": {
                    "login": "string",
                    "password": "string",
                    "first_name": "string",
                    "last_name": "string",
                    "age": 0,
                    "phone_number": "+79119119191",
                    "email": "user@example.com",
                },
            },
            "2": {
                "summary": "organization",
                "description": "organization user",
                "value": {
                    "login": "Org",
                    "password": "string",
                    "first_name": "string",
                    "last_name": "string",
                    "age": 0,
                    "phone_number": "+79119119391",
                    "email": "org@example.com",
                },
            },
        }
    ),
    organization: bool = False,
):
    _data_without_passwd = data.model_dump()
    _data_without_passwd.pop("password")
    hashed_password = AuthService().hash_password(data.password)
    hashed_user_data = UserAdd(
        hashed_password=hashed_password,
        **_data_without_passwd,
    )

    result = await db.users.add(hashed_user_data)

    if organization:
        organization_role = await db.roles.get_one_or_none(title="organization")
        roles_data = UsersRolesAdd(user_id=result.id, role_id=organization_role.id)
        await db.users_roles.add(roles_data)

    await db.commit()
    return result


@router.post("/token")
async def login_for_access_token(
    db: DbDep,
    form_data=LoginAccessToken,
) -> TokenInfo:
    user = await db.users.get_uesr_with_hashedPwd(form_data.login, form_data.password)
    if not user:
        raise HTTPException(
            401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = AuthService().create_access_token(
        {
            "user_id": user.id,
            "is_admin": user.is_admin,
            "roles": [role for role in user.roles],
        }
    )
    return TokenInfo(
        access_token=access_token, refresh_token="asd", token_type="bearer"
    )


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
