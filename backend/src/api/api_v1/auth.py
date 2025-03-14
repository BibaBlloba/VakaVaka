from fastapi import APIRouter, Body, Depends, Form, HTTPException, Response

from api.api_v1.dependencies import (
    AdminRequired,
    DbDep,
    GetCurrentUserDap,
    LoginAccessToken,
    UserIdDap,
    ValidateUserDap,
)
from schemas.auth_tokens import TokenInfo
from schemas.roles import RoleAdd
from schemas.users import User, UserAdd, UserAddRequest, UserLogin, UsersRolesAdd
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


@router.post("/login", response_model=TokenInfo)
async def login_for_access_token(
    user: User = ValidateUserDap,
):
    jwt_payload = {
        "id": user.id,
        "login": user.login,
        "email": user.email,
        "roles": [role.title for role in user.roles],
    }
    access_token = AuthService().create_access_token(jwt_payload)
    refresh_token = AuthService().create_refresh_token({"id": user.id})
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="Bearer",
    )


@router.get("/me")
async def get_me(
    user: User = GetCurrentUserDap,
):
    return {
        "login": user.login,
        "email": user.email,
        "roles": user.roles,
    }


@router.post("/refresh")
async def refresh_toker(
    db: DbDep,
    token=Body(embed=True),
):
    try:
        user_id = AuthService().decode_token(token).get("id")
        print(user_id)
    except:
        raise HTTPException(401, detail="Token invalid")

    user = await db.users.get_uesr_with_hashedPwd(id=user_id)

    jwt_payload = {
        "id": user.id,
        "login": user.login,
        "email": user.email,
        "roles": [role.title for role in user.roles],
    }

    access_token = AuthService().create_access_token(jwt_payload)
    refresh_token = AuthService().create_refresh_token({"id": user.id})
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="Bearer",
    )
