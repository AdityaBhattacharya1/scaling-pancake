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


router = APIRouter()


os.environ["OPENAI_API_KEY"] = ""

CONNECTION_STRING = "postgresql+psycopg2://postgres:password@localhost:5432/test"
COLLECTION_NAME = "vectordb"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
llm = ChatOpenAI(model="gpt-4o")
vector_store = PGVector(
    embeddings=embeddings,
    collection_name=COLLECTION_NAME,
    connection=CONNECTION_STRING,
    use_jsonb=True,
)


class QuestionRequest(BaseModel):
    question: str


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
            question_request.question,
            user_id=user_id,
            llm=llm,
            retriever=vector_store.as_retriever(),
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
