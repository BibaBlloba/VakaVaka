from fastapi import HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import insert, select
from sqlalchemy.exc import IntegrityError

from repos.mappers.mappers import UsersDataMapper
from src.models.users import UsersOrm
from src.repos.base import BaseRepository


class UsersRepository(BaseRepository):
    model = UsersOrm
    mapper = UsersDataMapper

    async def get_uesr_with_hashedPwd(
        self,
        password: str,
        email: EmailStr | None = None,
        login: str | None = None,
    ):
        if email:
            query = select(self.model).filter_by(email=email)
        else:
            query = select(self.model).filter_by(login=login)
        result = await self.session.execute(query)
        return result.scalars().one_or_none()

    async def add(self, data: BaseModel):
        add_data_stmt = (
            insert(self.model).values(**data.model_dump()).returning(self.model)
        )
        try:
            result = await self.session.execute(add_data_stmt)
        except IntegrityError:
            raise HTTPException(401, "Пользователь уже зарегестрирован.")

        model = result.scalars().one()
        return self.mapper.map_to_domain_entity(model)
