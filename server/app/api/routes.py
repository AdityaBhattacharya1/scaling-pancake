from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.upload_service import upload_file
from app.services.langchain_service import get_answer
from pydantic import BaseModel
import logging
import os
from langchain_openai import ChatOpenAI
from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv, find_dotenv

router = APIRouter()
load_dotenv(find_dotenv())


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
llm = ChatOpenAI(model="gpt-3.5-turbo")
vector_store = PGVector(
    embeddings=embeddings,
    collection_name=os.getenv("COLLECTION_NAME"),
    connection=os.getenv("CONNECTION_STRING"),
    use_jsonb=True,
)


class QuestionRequest(BaseModel):
    question: str
    chat_history: list


@router.post("/upload/{user_id}")
async def upload_pdf(user_id: str, file: UploadFile = File(...)):
    try:
        file_path = await upload_file(user_id, file, vector_store)
        return {"file_path": file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query/{user_id}")
async def query_rag(user_id: str, question_request: QuestionRequest):
    try:
        answer = await get_answer(
            question=question_request.question,
            llm=llm,
            retriever=vector_store.as_retriever(
                search_kwargs={"filter": {"user_id": user_id}},
            ),
            chat_history=question_request.chat_history
        )
        return {"answer": answer["answer"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
