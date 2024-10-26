import logging
from logging.handlers import RotatingFileHandler
import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

# Настройка логирования
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=3)
handler.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

logger.addHandler(handler)

app = FastAPI()

# Создаем директорию для загрузки файлов, если её нет
os.makedirs("uploads", exist_ok=True)

# Модель для хранения сообщений
class Message(BaseModel):
    user: str
    text: str

# Хранилище сообщений
messages: List[Message] = []

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), file_type: str = 'pdf'):
    logger.info(f"Попытка загрузить файл: {file.filename}")

    if file_type.lower() not in ["pdf", "word"]:
        logger.error(f"Неподдерживаемый тип файла: {file_type}")
        raise HTTPException(status_code=400, detail="Неподдерживаемый тип файла")

    # Сохраняем файл
    save_path = os.path.join("uploads", file.filename)
    try:
        with open(save_path, "wb") as buffer:
            buffer.write(await file.read())
        logger.info(f"Файл загружен успешно: {file.filename}")
        return {"message": "Файл загружен успешно", "filename": file.filename}
    except Exception as e:
        logger.error(f"Ошибка при сохранении файла: {e}")
        raise HTTPException(status_code=500, detail="Не удалось сохранить файл")

@app.get("/files")
async def list_files():
    files = os.listdir("uploads")
    return {"files": files}

@app.post("/messages", response_model=Message)
async def send_message(message: Message):
    messages.append(message)
    logger.info(f"Получено сообщение от {message.user}: {message.text}")
    return message

@app.get("/messages", response_model=List[Message])
async def get_messages():
    return sorted(messages, key=lambda x: x.user)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="192.168.169.1", port=8000)
