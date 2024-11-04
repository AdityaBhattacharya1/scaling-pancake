from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three to five sentences maximum and keep the "
    "answer concise. Additionally there's added chat history "
    "for you to keep in memory for the duration of the session." 
    "\n\n"
    "{context}"
    "{chat_history}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}, {chat_history}"),
    ]
)


async def get_answer(question: str, llm, retriever, chat_history: list):
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    return rag_chain.invoke({"input": question, "chat_history": chat_history})
