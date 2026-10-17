# AgentStack — One Platform. Multiple AI Possibilities. 🚀

**AgentStack** is a full-stack, multi-agent AI platform that brings multiple AI capabilities together in a single application. From conversational AI and live web search to code generation, document creation, and PDF question answering, AgentStack provides a unified workspace for exploring and using AI-powered tools.

Instead of switching between separate applications for different tasks, users can access multiple AI workflows through one interface, with authentication, conversation history, file handling, credit-based usage, and subscription payments integrated into the platform.

---

## ✨ What is AgentStack?

AI tools are becoming increasingly useful for everyday tasks, but different workflows often require different tools, interfaces, and interactions.

AgentStack explores a unified approach: one application where users can ask questions, search the web, generate code, work with documents, create images, and analyze uploaded files.

The platform combines a React frontend with a Node.js microservices backend and uses LangGraph to route requests to the appropriate AI workflow. Supporting services handle authentication, conversations, file storage, and billing.

### What makes it interesting?

- **Multiple AI workflows:** Access several AI capabilities through a single interface.
- **Intelligent request routing:** Direct requests to the appropriate workflow based on the selected agent, request type, or uploaded file.
- **Document-based question answering:** Retrieve relevant information from PDFs using Retrieval-Augmented Generation (RAG).
- **Full-stack architecture:** Separate frontend, gateway, authentication, chat, agent, and billing components.
- **Persistent conversations:** Store chat history and retrieve recent conversation context.
- **Credit-based usage:** Track AI usage and integrate subscription payments.
- **File generation and storage:** Generate documents and images and store the resulting files in AWS S3.

---

## 🚀 Features

### 1. 💬 AI Chat

Interact with an AI assistant through a conversational interface.

- Send prompts and receive AI-generated responses.
- Maintain conversation history.
- Store user and assistant messages in MongoDB.
- Use Redis to maintain recent conversation context.
- Render responses with Markdown formatting.

**How it works:** User prompts are processed by the backend agent workflow, passed to the chat agent, and sent to an LLM. The response is returned to the frontend and saved as part of the conversation.

### 2. 🌐 Web Search

Retrieve information from the web and use it to generate a contextual answer.

- Search the web using Tavily.
- Retrieve relevant search results.
- Include search results and image information in the workflow state.
- Use the chat agent to formulate a response based on the retrieved information.

**How it works:** The search workflow retrieves results and passes them to the chat workflow, which generates the final response using the available search context.

### 3. 💻 AI Code Generation

Generate code and display it in an interactive development-oriented interface.

- Classify coding-related requests by intent.
- Generate code using an LLM.
- Represent generated code as structured files.
- Display code using Monaco Editor.
- Provide a preview experience for supported generated projects.

**How it works:** A coding workflow identifies the type of request and invokes the appropriate generation logic. Code-generation responses use a structured file format that the frontend can render and preview.

### 4. 📄 PDF Generation

Generate downloadable PDF documents from user prompts.

- Convert a prompt into structured document content.
- Generate the PDF using PDFKit.
- Upload the generated file to AWS S3.
- Return a presigned URL for accessing the file.

**How it works:** The AI produces structured content, the backend generates a PDF, and the resulting file is uploaded to object storage.

### 5. 📊 PowerPoint Generation

Create PowerPoint presentations from user instructions.

- Generate structured slide content using an LLM.
- Build presentation files with PptxGenJS.
- Upload the generated presentation to AWS S3.
- Return a presigned URL for accessing the file.

**How it works:** The presentation workflow converts a prompt into slide content, builds a PPTX file, and stores it in S3.

### 6. 🎨 AI Image Generation

Generate images from user-provided descriptions.

- Enhance image prompts before generation.
- Use Pollinations for image generation.
- Store generated images in AWS S3.
- Return image references that can be displayed in the chat interface.

**How it works:** The backend prepares the prompt, requests image generation, stores the result, and returns the generated image information to the frontend.

### 7. 📚 PDF Question Answering — RAG

Ask questions about an uploaded PDF and receive answers grounded in retrieved document content.

- Extract text from PDF files using `pdf-parse`.
- Split the extracted text into overlapping chunks.
- Generate embeddings using Gemini.
- Store document vectors in Qdrant.
- Retrieve the top five relevant chunks for a question.
- Use the retrieved content as context for an LLM-generated answer.

**How it works:** Rather than sending the entire document to the language model for every question, AgentStack retrieves relevant document sections and uses them as context for answering.

This workflow demonstrates the practical use of document processing, embeddings, vector search, retrieval, and LLM-based generation.

### 8. 🖼️ Image Analysis

Upload an image and ask the AI to interpret its contents.

- Accept image uploads through the backend.
- Convert the image into a format suitable for model input.
- Use Gemini 2.5 Flash for image analysis.
- Return the generated analysis to the user.

**How it works:** The backend processes the uploaded image and sends the image content and user prompt to the vision-capable model.

### 9. 🔐 Authentication and Sessions

AgentStack uses Firebase Authentication for identity verification and Redis-backed sessions for application access.

- Support Google sign-in through Firebase.
- Verify Firebase ID tokens on the backend during login.
- Find or create the corresponding application user in MongoDB.
- Create an application session in Redis.
- Use an HTTP-only cookie to carry the session identifier.
- Verify sessions through the API Gateway on protected requests.

### 10. 💳 Billing and Credit-Based Usage

Integrate subscription payments and usage credits into the application.

- Support free and paid plans.
- Create Razorpay payment orders.
- Verify payment signatures on the backend.
- Store payment records in MongoDB.
- Update user plans and credits after successful payment processing.
- Apply credit costs to AI workflows.

### 11. 📁 Conversation and File Management

- Store conversations and messages in MongoDB.
- Maintain recent conversation context in Redis.
- Store generated files in AWS S3.
- Return file references or presigned URLs to the frontend.
- Display generated content through the application's chat and artifact interfaces.

---

## 🧰 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Architecture | Microservices, REST APIs, API Gateway |
| AI orchestration | LangGraph |
| AI models and providers | Groq, OpenRouter, DeepSeek, Gemini |
| Web search | Tavily |
| Image generation | Pollinations |
| Database | MongoDB |
| Session and cache layer | Redis |
| Vector database | Qdrant |
| Authentication | Firebase Authentication |
| File storage | AWS S3 |
| PDF generation | PDFKit |
| PowerPoint generation | PptxGenJS |
| Code editing and preview | Monaco Editor |
| Payments | Razorpay |
| Containers | Docker |
| Frontend deployment | Vercel |
| Backend deployment | Render |
| Managed database | MongoDB Atlas |
| Managed Redis | Upstash Redis |
| Managed vector database | Qdrant Cloud |

---

## 🏗️ System Architecture

AgentStack uses a service-oriented backend structure to separate responsibilities such as authentication, chat processing, AI workflows, and billing.

The frontend communicates with the backend through an API Gateway, which acts as the main entry point for application requests.

```text
                         ┌─────────────────────┐
                         │      User           │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   React Frontend    │
                         │ Vite + Redux Toolkit│
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   Vercel Hosting    │
                         │   /api/* rewrites   │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │     API Gateway     │
                         │     Port 8000       │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
     ┌────────▼────────┐  ┌─────────▼────────┐  ┌─────────▼────────┐
     │ Auth Service    │  │ Chat Service     │  │ Agent Service    │
     │ Port 8001       │  │ Port 8002        │  │ Port ~8003       │
     └────────┬────────┘  └─────────┬────────┘  └─────────┬────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  Billing Service    │
                         │     Port 8004       │
                         └──────────┬──────────┘
                                    │
               ┌────────────────────┼───────────────────┐
               │                    │                   │
       ┌───────▼──────┐     ┌───────▼──────┐    ┌───────▼──────┐
       │   MongoDB    │     │    Redis     │    │   AWS S3     │
       │ Persistent   │     │ Sessions and │    │ Generated    │
       │ Application  │     │ Recent Cache │    │ Files        │
       │ Data         │     │              │    │              │
       └──────────────┘     └──────────────┘    └──────────────┘

                Additional AI infrastructure
                ├── LangGraph — Workflow orchestration
                ├── Qdrant — Vector search for PDF Q&A
                ├── LLM providers — Text and code generation
                ├── Gemini — Embeddings and image analysis
                └── Tavily / Pollinations — Search and images
```

*Note: The diagram is a logical architecture overview. Services communicate over HTTP; the current implementation does not use a message broker or event queue for inter-service communication.*

### Backend services

| Service | Responsibility |
|---|---|
| API Gateway | Receives API requests, checks application sessions, and forwards requests to backend services. |
| Auth Service | Verifies Firebase identity tokens, manages application users and sessions, and handles user plan updates. |
| Chat Service | Manages conversations and messages stored in MongoDB. |
| Agent Service | Routes prompts to AI workflows and coordinates generation, search, RAG, and image analysis. |
| Billing Service | Creates payment orders, verifies payment signatures, and coordinates subscription updates. |

The separation makes it easier to understand and maintain individual responsibilities without placing all application logic in one large backend service.

---

## 🔄 How AgentStack Works

### 1. User Authentication Flow

```text
User
  │
  ▼
React Application
  │
  ├── Google Sign-In
  ▼
Firebase Authentication
  │
  ├── Firebase ID Token
  ▼
POST /api/auth/login
  │
  ▼
API Gateway
  │
  ▼
Auth Service
  │
  ├── Verify Firebase ID Token
  ├── Find or create MongoDB user
  ├── Generate session identifier
  ├── Store session in Redis
  └── Set HTTP-only session cookie
  │
  ▼
Authenticated Application
```

Firebase establishes the user's identity. AgentStack then creates its own application session, which is used for subsequent protected requests.

### 2. Normal AI Chat Flow

```text
User submits a prompt
        │
        ▼
React Frontend
        │
        ▼
API Gateway
        │
        ├── Validate session
        └── Attach user identity
        │
        ▼
Agent Service
        │
        ├── Save user message
        ├── Route request using LangGraph
        ▼
Chat Agent
        │
        ├── Retrieve recent conversation context
        ├── Build model input
        └── Call LLM
        │
        ▼
Generate assistant response
        │
        ├── Save assistant message
        └── Update recent chat memory
        │
        ▼
Return response to frontend
```

This flow combines request routing, conversation persistence, temporary context storage, and LLM generation.

### 3. PDF Question Answering Flow

```text
User uploads a PDF
        │
        ▼
File Upload Middleware
        │
        ▼
Extract PDF Text
        │
        ▼
Split Text into Chunks
        │
        ▼
Generate Embeddings
        │
        ▼
Store Vectors in Qdrant
        │
        ▼
User asks a question
        │
        ▼
Embed the Question
        │
        ▼
Retrieve Top 5 Relevant Chunks
        │
        ▼
Send Context + Question to LLM
        │
        ▼
Return Answer
```

**Key concepts:**

- **Chunking:** Breaks a large document into smaller text sections.
- **Overlap:** Preserves some text between adjacent chunks to reduce loss of context at boundaries.
- **Embeddings:** Represent text as numerical vectors that capture semantic information.
- **Vector search:** Finds document chunks that are semantically similar to the question.
- **RAG:** Combines retrieval with language-model generation to ground answers in relevant source material.

The current implementation uses approximately 1,000-character chunks with a 200-character overlap and retrieves five chunks for a question.

### 4. File Generation Flow

```text
User Prompt
    │
    ▼
Agent Workflow
    │
    ▼
LLM Generates Structured Content
    │
    ├── PDF  → PDFKit
    ├── PPT  → PptxGenJS
    └── Image → Pollinations
                    │
                    ▼
                 AWS S3
                    │
                    ▼
             Presigned File URL
                    │
                    ▼
             Frontend Artifact
```

The backend handles generation and storage, while the frontend displays the resulting artifact or provides access to the generated file.

---

## 🧠 AI Workflow Orchestration with LangGraph

AgentStack uses LangGraph to organize multiple AI workflows behind a common entry point.

Instead of handling every request through one large collection of conditional statements, the application uses a router and separate workflow nodes.

### Supported workflows

| Workflow | Purpose |
|---|---|
| `chat` | General conversational responses |
| `search` | Web search followed by contextual answer generation |
| `coding` | Code generation and coding-related responses |
| `pdf` | PDF document generation |
| `ppt` | PowerPoint presentation generation |
| `vision` | Image generation |
| `pdfRag` | Question answering over PDF content |
| `imageAnalyzer` | Analysis of uploaded images |

### Routing logic

The router considers the following:

1. **Explicit agent selection:** Use the selected agent when the request specifies one.
2. **Uploaded file type:** Route PDFs to PDF question answering and image uploads to image analysis.
3. **Automatic classification:** Use an LLM-based classifier to select an appropriate workflow for other requests.
4. **Default handling:** Fall back to the chat workflow when automatic routing does not select a recognized agent.

### Why LangGraph?

LangGraph provides a structured way to represent workflows, route requests between nodes, and pass shared state between processing steps.

It is useful here because AgentStack supports multiple workflows with different inputs and outputs. A simple chatbot would not necessarily need this additional orchestration layer.

---

## 🗄️ Data Storage Strategy

AgentStack uses different storage systems for different types of data.

| Technology | What it stores | Why it is used |
|---|---|---|
| MongoDB | Users, conversations, messages, payment records, and related application data | Persistent application storage |
| Redis | Application sessions, recent chat context, and rate-limit counters | Fast access to temporary, frequently accessed data |
| Qdrant | Document embeddings used for PDF retrieval | Semantic vector search |
| AWS S3 | Generated PDFs, presentations, images, and other files | Object storage for generated artifacts |

### MongoDB

MongoDB is the persistent source of truth for application data.

The conversation model associates conversations with users, while messages reference their conversations. Message records can also include image references and artifact metadata.

### Redis

Redis is used for data that needs fast access and does not serve as the primary persistent record.

Examples include:

- Login sessions with expiration.
- Recent conversation messages.
- Rate-limit counters for AI workflows.

### Qdrant

Qdrant stores document vectors used by the PDF question-answering workflow. The application embeds a question, searches for similar vectors, and retrieves the corresponding text chunks.

### AWS S3

S3 stores generated files. The backend returns presigned URLs so users can access files without making the S3 bucket itself public.

---

## 🔐 Authentication and Session Management

AgentStack separates identity verification from application session management.

### Firebase Authentication

Firebase handles Google sign-in and provides an ID token that the backend verifies.

### Redis-backed application sessions

After successful verification, the Auth Service finds or creates the user's MongoDB record and creates a random session identifier.

The session is stored in Redis with a seven-day TTL, and the identifier is sent to the browser in an HTTP-only cookie.

For subsequent requests:

1. The browser sends the session cookie.
2. The API Gateway reads the session identifier.
3. The Gateway retrieves the session from Redis.
4. If valid, it attaches the user's identity to the request.
5. The request is forwarded to the relevant backend service.

### Why use both Firebase and Redis?

They solve different problems:

- **Firebase:** Verifies who the user is.
- **Redis:** Tracks the user's active AgentStack session.
- **MongoDB:** Stores the user's persistent application profile.

This approach avoids requiring Firebase ID-token verification on every normal application request, while allowing AgentStack to manage its own session lifecycle.

---

## 💳 Billing and Credit System

AgentStack combines subscription plans with credit-based AI usage.

### Subscription plans

| Plan | Price | Credits |
|---|---:|---:|
| Free | ₹0 | 100 |
| Starter | ₹199 | 500 |
| Pro | ₹499 | 1,000 |

Paid plans are configured for a 30-day period.

### Payment flow

```text
User selects a plan
        │
        ▼
Billing Service creates Razorpay order
        │
        ▼
Frontend opens Razorpay checkout
        │
        ▼
Payment completed
        │
        ▼
Backend verifies payment signature
        │
        ▼
Payment record updated
        │
        ▼
Auth Service updates plan and credits
```

The backend determines plan pricing rather than relying on a client-provided amount. Payment verification uses an HMAC-SHA256 signature check.

### AI credit costs

The configured credit costs are:

| Workflow | Credits |
|---|---:|
| Chat | 1 |
| Web search | 5 |
| Code generation | 10 |
| PDF generation | 10 |
| PPT generation | 10 |
| Image generation | 10 |
| PDF question answering | 10 |
| Image analysis | 10 |

These are application-level usage costs, not direct estimates of the provider's API charges.

---

## 🛡️ Request Handling and Rate Limiting

AgentStack uses Redis-backed rate-limit counters to restrict the frequency of AI requests.

The configured per-minute limits are:

| Workflow | Requests per minute |
|---|---:|
| Chat | 20 |
| Code generation | 5 |
| PDF generation | 5 |
| PPT generation | 5 |
| Image generation | 5 |
| Web search | 5 |

The implementation uses counters keyed by user and workflow, with a time-based expiration.

The backend also uses file-upload middleware to process incoming files and applies file-type and size restrictions in relevant upload flows.

**Implementation note:** Rate limiting and credit deductions are application controls. They should not be treated as a complete security boundary without appropriate authorization, error handling, and payment idempotency checks.

---

## 🖥️ Frontend Architecture

The frontend is built using React and Vite, with Redux Toolkit for shared application state.

### Main technologies

- **React:** Builds the interactive application interface.
- **Vite:** Provides the frontend development and build tooling.
- **Redux Toolkit:** Manages shared application state.
- **Axios:** Communicates with backend APIs and supports credentialed requests.
- **Tailwind CSS:** Provides utility-based styling.
- **Monaco Editor:** Displays generated code.
- **React Markdown:** Renders Markdown-formatted AI responses.
- **Web Speech API:** Supports browser speech-related interactions.

### Frontend responsibilities

- Authentication and application session interactions.
- Conversation and message display.
- Sending prompts to AI workflows.
- Uploading PDFs and images.
- Displaying generated code and other artifacts.
- Showing generated file links.
- Managing shared user and conversation state.

The frontend communicates with backend routes through the configured API base URL. In deployment, Vercel rewrites `/api/*` requests to the API Gateway.

---

## 🌐 API and Backend Design

The backend uses Node.js and Express.js, with a separate service for each major responsibility.

The API Gateway acts as the common entry point for frontend requests. It checks application sessions on protected routes and forwards requests to the appropriate service.

### Main API areas

| API area | Responsibility |
|---|---|
| `/api/auth` | Login, logout, and authentication-related operations |
| `/api/chat` | Conversation and message operations |
| `/api/agent` | AI workflows, file uploads, and generation requests |
| `/api/billing` | Payment orders, verification, and billing operations |
| `/api/me` | Retrieves the current authenticated application user |

The exact endpoints and request payloads are defined in the corresponding service implementations.

### Why separate services?

Separating authentication, chat, agents, and billing keeps their responsibilities easier to follow and maintain.

For example, AI workflow logic can evolve without putting all of its implementation inside the authentication or billing code.

The current services communicate using HTTP rather than a message broker.

---

## 📂 Repository Structure

The backend is organized into a gateway, individual services, and shared infrastructure code.

```text
project/
├── backend/
│   ├── gateway/
│   │   └── ...
│   ├── services/
│   │   ├── auth/
│   │   │   └── ...
│   │   ├── chat/
│   │   │   └── ...
│   │   ├── agent/
│   │   │   └── ...
│   │   └── billing/
│   │       └── ...
│   ├── shared/
│   │   └── redis/
│   │       └── redis.js
│   ├── .dockerignore
│   └── package.json
│
└── frontend/
    └── ...
```

*This is a simplified overview; individual directories may contain additional source files, configuration, controllers, routes, models, and utilities.*

---

## ☁️ Deployment and Infrastructure

AgentStack uses a combination of managed platforms and containerized backend services.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend services | Render |
| Backend packaging | Docker |
| Application database | MongoDB Atlas |
| Redis | Upstash |
| Vector database | Qdrant Cloud |
| Generated files | AWS S3 |

### Deployment overview

**Frontend — Vercel**

The React application is built and hosted on Vercel. API requests under `/api/*` are rewritten to the backend Gateway.

**Backend — Render**

Backend services are packaged using Docker and deployed on Render. Each service uses its configured port and environment variables.

**MongoDB Atlas**

Managed MongoDB provides persistent application data storage.

**Upstash Redis**

Managed Redis provides session, recent-message, and rate-limit storage.

**Qdrant Cloud**

Qdrant Cloud provides vector storage and semantic retrieval for the PDF Q&A workflow.

**AWS S3**

S3 stores generated files and supports access through presigned URLs.

### Environment configuration

The application depends on configuration for its database, session store, authentication, AI providers, file storage, and payment gateway.

Configure the required environment variables in the appropriate local or deployment environment.

Typical configuration categories include:

- MongoDB connection strings.
- Redis connection settings.
- Firebase Admin credentials.
- AI provider API keys.
- Tavily search API credentials.
- AWS S3 bucket and access configuration.
- Razorpay credentials.
- Frontend URL and service URLs.

The exact variable names and required values should be taken from the project's environment configuration and source code.

**Never commit real API keys, service-account credentials, payment secrets, or production environment files to GitHub.**

---

## 🧪 Testing and Validation

The project can be evaluated by testing its main user journeys independently and end-to-end.

Suggested test scenarios include:

- Sign in and restore an existing application session.
- Reject requests with missing or expired sessions.
- Create conversations and save messages.
- Send a prompt to the chat workflow.
- Route requests to the intended AI workflow.
- Upload a PDF and ask a question about its content.
- Generate and retrieve a PDF or presentation.
- Generate an image and display the result.
- Check rate-limit behavior when request limits are exceeded.
- Create a payment order and verify a payment response.
- Check error handling when an external provider or storage service fails.

The list above describes useful validation scenarios; it does not claim that a comprehensive automated test suite currently exists.

---

## ⚖️ Engineering Decisions and Trade-offs

### Why use an API Gateway?

It provides a common entry point for frontend requests and centralizes session checks and request forwarding.

### Why use microservices?

Authentication, chat, AI workflows, and billing have different responsibilities. Keeping them separate makes their code easier to navigate and allows each service to evolve independently.

### Why use Redis alongside MongoDB?

MongoDB stores persistent application records. Redis provides fast access to temporary data such as sessions, rate-limit counters, and recent conversation context.

### Why use RAG for PDF question answering?

Retrieval lets the application supply relevant document sections to the model instead of sending the entire PDF for every question.

### Why use Qdrant?

Qdrant provides vector storage and similarity search, which support semantic retrieval over embedded document chunks.

### Why use S3 for generated files?

Generated files are binary artifacts that are better suited to object storage than to embedding directly inside application database documents.

### Why use LangGraph?

It provides explicit routing and workflow structure for multiple AI capabilities with different processing requirements.

---

## 🔭 Future Improvements

The following are potential improvements, not claims about features already implemented.

- **Improve PDF indexing:** Index documents once and reuse their embeddings across follow-up questions instead of creating a new collection for each question.
- **Strengthen authorization:** Enforce conversation ownership in every relevant database operation and protect internal service communication.
- **Improve payment reliability:** Make payment verification and credit fulfillment idempotent to avoid duplicate subscription grants.
- **Make credit handling safer:** Reserve or atomically deduct credits before expensive operations and handle failed requests appropriately.
- **Improve session cleanup:** Remove stale session mappings and support multiple active sessions more reliably.
- **Add automated tests:** Cover authentication, billing, AI routing, file processing, and error scenarios.
- **Improve observability:** Add structured logs, health checks, error tracking, and service-level monitoring.
- **Introduce background jobs where appropriate:** Move long-running generation tasks to a queue if the workload requires asynchronous processing.
- **Improve RAG quality:** Experiment with retrieval settings, metadata filtering, reranking, and evaluation datasets.
- **Improve resilience:** Add appropriate timeouts, retries for transient failures, and graceful handling of external provider outages.

---

## 🎯 What I Learned

Building AgentStack gave me practical experience with:

- Designing and connecting frontend and backend components.
- Organizing a Node.js backend into separate services.
- Implementing authentication and session management.
- Working with persistent databases and temporary cache storage.
- Orchestrating multiple AI workflows.
- Building a RAG pipeline using embeddings and vector search.
- Integrating external APIs for search, image generation, and language models.
- Generating files programmatically and storing them in cloud object storage.
- Integrating payment processing and credit-based application usage.
- Containerizing backend services and deploying the application to cloud platforms.
- Identifying implementation trade-offs and areas for improvement.

---

## 💡 Final Thoughts

AgentStack is an ongoing exploration of how different AI capabilities can work together inside one full-stack application.

The project brings together frontend development, backend service design, data storage, AI orchestration, retrieval-based question answering, payments, and deployment in a single codebase.

More than simply connecting AI APIs, the goal has been to understand how the surrounding application needs to work: how requests are routed, how data is stored, how files are delivered, and how separate components fit into a complete product.

**Built with curiosity, experimentation, and a focus on learning how real software systems fit together.** 🚀
