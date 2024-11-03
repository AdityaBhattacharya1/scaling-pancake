import os
from fastapi import UploadFile
from langchain_postgres.vectorstores import PGVector
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.schema import Document


def create_user_directory(user_id: str):
    user_dir = os.path.join("data", user_id)
    os.makedirs(user_dir, exist_ok=True)
    return user_dir


async def upload_file(user_id: str, file: UploadFile, vectorstore: PGVector):
    user_dir = create_user_directory(user_id)
    file_location = os.path.join(user_dir, file.filename)
    with open(file_location, "wb") as f:
        content = await file.read()
        f.write(content)

    loader = PyPDFLoader(file_location)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    documents_with_metadata = [
        Document(page_content=split.page_content, metadata={"user_id": user_id})
        for split in splits
    ]
    vectorstore.add_documents(documents_with_metadata)

    return file_location
