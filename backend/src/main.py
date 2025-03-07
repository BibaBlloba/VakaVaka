import sys
from contextlib import asynccontextmanager
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

import uvicorn
from fastapi import FastAPI
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

from src.api.api_v1.auth import router as auth_router
from src.init import redis_manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старте проекта
    await redis_manager.connect()
    FastAPICache.init(RedisBackend(redis_manager.client), prefix="fastapi-cache")
    yield
    await redis_manager.close()
    # При выключении/перезагрузки проекта


app = FastAPI()
app.include_router(auth_router)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
