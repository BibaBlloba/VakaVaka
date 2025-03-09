import sys
from contextlib import asynccontextmanager
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

from src.api.api_v1.auth import router as auth_router
from src.api.api_v1.tags import router as tags_router
from src.api.api_v1.vacancies import router as vacancies_router
from src.init import redis_manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старте проекта
    await redis_manager.connect()
    FastAPICache.init(RedisBackend(redis_manager.client), prefix="fastapi-cache")
    yield
    await redis_manager.close()
    # При выключении/перезагрузки проекта


app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)
app.include_router(tags_router)
app.include_router(vacancies_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
