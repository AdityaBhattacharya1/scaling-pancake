# Multi-Tenant RAG Agent


## In Depth READMEs
For more details on each the frontend and the backend, refer to the READMEs given in the below folders: 

**1. Client**: https://github.com/AdityaBhattacharya1/scaling-pancake/tree/main/client

**2. Server**: https://github.com/AdityaBhattacharya1/scaling-pancake/tree/main/server

### Application Architecture Overview

#### 1. **Frontend (Next.js + Tailwind CSS + Firebase Auth)**

-   **Framework**: Next.js (using the latest App Router feature).
-   **Styling**: Tailwind CSS and DaisyUI for styling and UI components, ensuring a modern and responsive design.
-   **Authentication**: Client-side authentication with Firebase Authentication using Google OAuth for login and signup.
-   **State Management**: Context API is used to manage the application state, such as the currently uploaded file's name for the user.
-   **File Upload**: A dedicated page for file upload with drag-and-drop functionality, allowing users to upload one PDF file at a time.
-   **Query UI**: A chat-style interface where users can ask questions and receive responses from their uploaded documents.
-   **UI Components**:
    -   **Navbar**: Includes login/logout button or an avatar if the user is logged in.
    -   **Upload Button**: Routes to the file upload page.
    -   **Chat Interface**: Displays user questions and AI-generated responses in a chat format, including a "Send" button to submit queries.

**Routing**:

-   **File Upload Page**: Accessible from the navbar; includes file upload functionality.
-   **Query Page**: Chat interface where users can interact with the RAG-based question-answering system.
-   **Auth Route**: Handles login and signup via Firebase Authentication (Google OAuth).

#### 2. **Backend (FastAPI + LangChain + PGVector)**

-   **Framework**: FastAPI, a fast and flexible web framework for building RESTful APIs in Python.
-   **Vector Database**: PGVector (PostgreSQL extension) is used to store and retrieve document embeddings, enabling semantic search capabilities.
-   **Document Embeddings**: OpenAI’s `text-embedding-3-large` model is used to generate embeddings from document content for efficient retrieval.
-   **Question-Answering Service**: LangChain’s Retrieval-Augmented Generation (RAG) pipeline combines the retrieval of relevant document sections with OpenAI's `gpt-3.5-turbo` model to answer user questions.
-   **Folder Structure for User Files**: Files are stored in a user-specific directory based on their Firebase `user_id`, enabling easy segregation and retrieval by user.
-   **Endpoints**:
    -   **File Upload**: Accepts PDF file uploads, processes them, and stores them in the database along with `user_id` metadata for filtering.
    -   **Query**: Accepts a question, retrieves relevant sections from the user's documents based on `user_id`, and generates an answer using the RAG pipeline.

#### Workflow and Interaction Flow

1. **User Authentication**:

    - The user logs in via Google OAuth using Firebase Authentication. Once authenticated, Firebase provides a unique `user_id` that will be used as a unique identifier in the backend.

2. **File Upload**:

    - After authentication, the user navigates to the upload page and uploads a PDF.
    - The frontend sends the file to the backend’s `/upload/{user_id}` route, where:
        - The file is stored in a folder specific to the `user_id`.
        - The content is processed and split into chunks, each chunk embedded as a vector and stored in the PGVector database with metadata that includes the `user_id`.

3. **Question-Answering (RAG-based Querying)**:
    - The user asks a question on the query page.
    - The frontend sends a POST request to the backend’s `/query/{user_id}` route, passing the question and user’s `user_id` to filter for their documents.
    - The backend:
        - Uses the `user_id` to retrieve relevant document sections from all documents uploaded by the user from the PGVector database.
        - Passes these sections to OpenAI’s `gpt-3.5-turbo` model to generate a concise answer.
        - Streams the response back to the frontend to display in real-time.

#### Key Benefits and Design Considerations

-   **Separation of Concerns**: The frontend and backend are well-separated, with clear responsibilities for each component.
-   **User-Specific Data Management**: Both file storage and vector storage are organized by `user_id`, ensuring that each user’s data is securely partitioned and accessible only by them.
-   **Scalability**:
    -   FastAPI and Next.js are both performance-oriented frameworks that can handle scaling needs as the application grows.
    -   PGVector enables fast and efficient semantic search, which is crucial for RAG applications.

