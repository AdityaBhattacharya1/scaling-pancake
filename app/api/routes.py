from fastapi import APIRouter, UploadFile, File, HTTPException


router = APIRouter()


@router.post("/upload/{user_id}")
async def upload_pdf(user_id: str, file: UploadFile = File(...)):
    pass


@router.post("/query/{user_id}")
async def query_rag(user_id: str, question: str):
    pass
