from src.repos.roles import RolesRepository
from src.repos.tags import TagsRepository
from src.repos.tags_vacancies import TagsVacanciesRepository
from src.repos.users import UsersRepository
from src.repos.users_roles import UserRolesRepository
from src.repos.vacancies import VacanciesRepository


class DbManager:
    def __init__(self, session_factory) -> None:
        self.session_factory = session_factory

    async def __aenter__(self):
        self.session = self.session_factory()

        """Репозитории"""
        self.tags = TagsRepository(self.session)
        self.vacancies = VacanciesRepository(self.session)
        self.users = UsersRepository(self.session)
        self.tags_vacancies = TagsVacanciesRepository(self.session)
        self.users_roles = UserRolesRepository(self.session)
        self.roles = RolesRepository(self.session)

        return self

    async def __aexit__(self, *args):  # *args для обработки ошибок
        await self.session.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()
