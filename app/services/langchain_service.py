import os
import logging
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector
from langchain_openai import OpenAIEmbeddings


# os.environ["OPENAI_API_KEY"] = (
#     "sk-T9YjnZ0hVA1SjQ1kLy5Zb5hzum2ka5tD7qezX4yf--T3BlbkFJO1zrE_8colTgRyvfWMUXIjBZgI-joBYifGsxoJHg8A"
# )

# CONNECTION_STRING = "postgresql+psycopg2://postgres:password@localhost:5432/test"
# COLLECTION_NAME = "vectordb"

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
# llm = ChatOpenAI(model="gpt-4o")
# vector_store = PGVector(
#     embeddings=embeddings,
#     collection_name=COLLECTION_NAME,
#     connection=CONNECTION_STRING,
#     use_jsonb=True,
# )

system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)


async def get_answer(question: str, user_id: str, llm, retriever):
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    return rag_chain.invoke({"input": question})
