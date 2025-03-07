from fastapi import APIRouter

from api.api_v1.dependencies import DbDep, UserIdDap
from schemas.vacancies import VacancyAdd

router = APIRouter(prefix="/vacancies", tags=["Vacancies"])


@router.get("")
async def get_vacancies(db: DbDep):
    return await db.vacancies.get_all()


@router.post("")
async def create_vacancy(
    db: DbDep,
    user_id: UserIdDap,
    data: VacancyAdd,
):
    result = await db.vacancies.add(data)
    await db.commit()
    return result
