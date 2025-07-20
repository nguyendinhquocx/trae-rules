name: "Ví dụ PRP - Chatbot AI với FastAPI và React"
description: |

## Mục đích
Ví dụ hoàn chỉnh về cách sử dụng template PRP để xây dựng một chatbot AI với backend FastAPI và frontend React.

## Nguyên tắc Cốt lõi
1. **Ngữ cảnh là Vua**: Bao gồm TẤT CẢ documentation, examples, và caveats cần thiết
2. **Validation Loops**: Cung cấp tests/lints có thể thực thi mà AI có thể chạy và sửa
3. **Thông tin Dày đặc**: Sử dụng keywords và patterns từ codebase
4. **Thành công Tiến bộ**: Bắt đầu đơn giản, validate, sau đó enhance
5. **Quy tắc Toàn cục**: Đảm bảo tuân theo tất cả quy tắc trong CLAUDE.md

---

## Mục tiêu
Xây dựng một chatbot AI hoàn chỉnh với giao diện web hiện đại, tích hợp OpenAI API, lưu trữ conversation history, và real-time messaging.

## Tại sao
- Cung cấp trải nghiệm tương tác AI cho users
- Demonstration của integration giữa frontend và backend
- Foundation cho các AI applications phức tạp hơn
- Learning experience cho full-stack development với AI

## Cái gì
Ứng dụng web chatbot với:
- Real-time messaging interface
- OpenAI GPT integration
- Conversation history persistence
- User authentication
- Responsive design
- Message typing indicators
- Error handling và retry mechanisms

### Tiêu chí Thành công
- [ ] User có thể gửi messages và nhận responses từ AI
- [ ] Conversation history được lưu trữ và hiển thị
- [ ] Real-time updates hoạt động smooth
- [ ] Authentication system bảo mật
- [ ] Responsive design trên mobile và desktop
- [ ] Error handling graceful cho API failures
- [ ] Performance tốt với multiple concurrent users

## Tất cả Ngữ cảnh Cần thiết

### Documentation & References
```yaml
# PHẢI ĐỌC - Bao gồm những cái này trong context window của bạn
- url: https://fastapi.tiangolo.com/
  why: FastAPI documentation cho API endpoints và WebSocket
  
- url: https://platform.openai.com/docs/api-reference
  why: OpenAI API integration patterns và best practices
  
- url: https://react.dev/
  why: React hooks và component patterns cho real-time UI
  
- url: https://socket.io/docs/v4/
  why: WebSocket implementation cho real-time messaging

- file: examples/fastapi_websocket.py
  why: Pattern cho WebSocket connections và message handling
  
- file: examples/react_chat_ui.jsx
  why: UI components và state management patterns
  
- doc: https://docs.sqlalchemy.org/en/20/
  section: Async operations và relationship patterns
  critical: Proper session management để tránh connection leaks

```

### Cây Codebase hiện tại
```bash
chatbot-ai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── core/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

### Cây Codebase mong muốn với files cần thêm và trách nhiệm của file
```bash
chatbot-ai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app setup và middleware
│   │   ├── core/
│   │   │   ├── config.py        # Configuration và environment variables
│   │   │   ├── database.py      # Database connection và session management
│   │   │   └── security.py      # JWT authentication utilities
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py          # User SQLAlchemy model
│   │   │   └── conversation.py  # Conversation và Message models
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py          # User Pydantic schemas
│   │   │   └── chat.py          # Chat message schemas
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── chat.py          # Chat API endpoints
│   │   │   └── websocket.py     # WebSocket handlers
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── openai_service.py # OpenAI API integration
│   │       └── chat_service.py   # Business logic cho chat
│   ├── tests/
│   │   ├── test_auth.py
│   │   ├── test_chat.py
│   │   └── test_websocket.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── ChatInterface.jsx    # Main chat component
│   │   │   │   ├── MessageList.jsx     # Message display
│   │   │   │   ├── MessageInput.jsx    # Input component
│   │   │   │   └── TypingIndicator.jsx # Typing animation
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── Layout/
│   │   │       ├── Header.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── hooks/
│   │   │   ├── useWebSocket.js         # WebSocket connection hook
│   │   │   ├── useAuth.js              # Authentication hook
│   │   │   └── useChat.js              # Chat state management
│   │   ├── services/
│   │   │   ├── api.js                  # API client
│   │   │   └── websocket.js            # WebSocket client
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
├── docker-compose.yml
└── README.md
```

### Gotchas đã biết của codebase & Library Quirks
```python
# QUAN TRỌNG: OpenAI API có rate limits - cần implement exponential backoff
# Ví dụ: 3 requests per minute cho free tier
# QUAN TRỌNG: WebSocket connections cần proper cleanup để tránh memory leaks
# Ví dụ: Sử dụng connection manager pattern
# QUAN TRỌNG: SQLAlchemy async sessions phải được properly closed
# Ví dụ: Sử dụng async context managers
# QUAN TRỌNG: JWT tokens cần proper expiration và refresh mechanism
```

## Blueprint Triển khai

### Data models và structure

Tạo các core data models, chúng ta đảm bảo type safety và consistency.
```python
# SQLAlchemy Models
- User model với authentication fields
- Conversation model với user relationship
- Message model với conversation relationship và AI/human type

# Pydantic Schemas
- UserCreate, UserResponse cho authentication
- MessageCreate, MessageResponse cho chat
- ConversationResponse cho history

# Pydantic Validators
- Message content length validation
- User input sanitization
```

### Danh sách tasks cần hoàn thành để thực hiện PRP theo thứ tự chúng nên được hoàn thành

```yaml
Task 1 - Database Setup:
CREATE backend/app/core/database.py:
  - IMPLEMENT async SQLAlchemy engine
  - CREATE session factory với proper async context
  - ADD database URL configuration

CREATE backend/app/models/user.py:
  - DEFINE User model với authentication fields
  - ADD password hashing utilities
  - INCLUDE created_at, updated_at timestamps

CREATE backend/app/models/conversation.py:
  - DEFINE Conversation model với user foreign key
  - DEFINE Message model với conversation foreign key
  - ADD message type enum (human/ai)

Task 2 - Authentication System:
CREATE backend/app/core/security.py:
  - IMPLEMENT JWT token creation và verification
  - ADD password hashing với bcrypt
  - CREATE authentication dependencies

CREATE backend/app/schemas/user.py:
  - DEFINE UserCreate, UserLogin schemas
  - ADD UserResponse với proper field exclusions
  - IMPLEMENT validation rules

CREATE backend/app/api/auth.py:
  - IMPLEMENT register endpoint
  - IMPLEMENT login endpoint với JWT return
  - ADD token refresh endpoint

Task 3 - OpenAI Integration:
CREATE backend/app/services/openai_service.py:
  - IMPLEMENT OpenAI client với async support
  - ADD retry logic với exponential backoff
  - CREATE message formatting utilities
  - HANDLE API errors gracefully

Task 4 - Chat Backend:
CREATE backend/app/schemas/chat.py:
  - DEFINE MessageCreate, MessageResponse schemas
  - ADD ConversationResponse với messages
  - IMPLEMENT proper validation

CREATE backend/app/services/chat_service.py:
  - IMPLEMENT conversation creation logic
  - ADD message saving với database
  - CREATE AI response generation
  - HANDLE conversation history retrieval

CREATE backend/app/api/chat.py:
  - IMPLEMENT REST endpoints cho conversation CRUD
  - ADD message history retrieval
  - CREATE conversation management

Task 5 - WebSocket Implementation:
CREATE backend/app/api/websocket.py:
  - IMPLEMENT WebSocket connection manager
  - ADD real-time message broadcasting
  - CREATE typing indicator support
  - HANDLE connection lifecycle

Task 6 - Frontend Foundation:
CREATE frontend/src/services/api.js:
  - IMPLEMENT axios client với interceptors
  - ADD authentication token handling
  - CREATE error handling utilities

CREATE frontend/src/hooks/useAuth.js:
  - IMPLEMENT authentication state management
  - ADD login/logout functionality
  - CREATE token persistence

Task 7 - Chat Frontend:
CREATE frontend/src/hooks/useWebSocket.js:
  - IMPLEMENT WebSocket connection management
  - ADD message sending/receiving
  - CREATE connection status tracking

CREATE frontend/src/hooks/useChat.js:
  - IMPLEMENT chat state management
  - ADD message history loading
  - CREATE typing indicator logic

CREATE frontend/src/components/Chat/ChatInterface.jsx:
  - IMPLEMENT main chat layout
  - ADD message list và input integration
  - CREATE responsive design

CREATE frontend/src/components/Chat/MessageList.jsx:
  - IMPLEMENT message display với proper styling
  - ADD auto-scroll functionality
  - CREATE message type differentiation

CREATE frontend/src/components/Chat/MessageInput.jsx:
  - IMPLEMENT message input với send functionality
  - ADD typing indicator trigger
  - CREATE proper form handling

Task 8 - Authentication Frontend:
CREATE frontend/src/components/Auth/Login.jsx:
  - IMPLEMENT login form với validation
  - ADD error handling display
  - CREATE redirect logic

CREATE frontend/src/components/Auth/Register.jsx:
  - IMPLEMENT registration form
  - ADD password confirmation
  - CREATE success handling

Task 9 - Integration & Testing:
CREATE backend/tests/test_auth.py:
  - TEST registration và login flows
  - VERIFY JWT token functionality
  - CHECK error handling

CREATE backend/tests/test_chat.py:
  - TEST message creation và retrieval
  - VERIFY OpenAI integration
  - CHECK conversation management

CREATE backend/tests/test_websocket.py:
  - TEST WebSocket connections
  - VERIFY real-time messaging
  - CHECK connection management

Task 10 - Deployment Setup:
CREATE docker-compose.yml:
  - SETUP PostgreSQL service
  - CONFIGURE backend service
  - ADD frontend build service
  - INCLUDE environment variables

UPDATE README.md:
  - ADD setup instructions
  - DOCUMENT API endpoints
  - INCLUDE environment configuration
  - ADD troubleshooting guide
```

### Pseudocode cho các tasks quan trọng
```python

# Task 3 - OpenAI Service
class OpenAIService:
    async def generate_response(self, messages: List[Message]) -> str:
        # PATTERN: Format messages cho OpenAI API
        formatted_messages = self._format_messages(messages)
        
        # GOTCHA: Implement retry với exponential backoff
        @retry(attempts=3, backoff=exponential)
        async def _call_api():
            # QUAN TRỌNG: Handle rate limits
            await self.rate_limiter.acquire()
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=formatted_messages,
                max_tokens=150
            )
            return response.choices[0].message.content
        
        return await _call_api()

# Task 5 - WebSocket Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, user_id: str):
        # PATTERN: Store connection với user mapping
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    async def broadcast_message(self, message: dict, user_id: str):
        # GOTCHA: Handle disconnected clients gracefully
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_json(message)
            except ConnectionClosedOK:
                del self.active_connections[user_id]

# Task 7 - React WebSocket Hook
function useWebSocket(userId) {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        // PATTERN: Establish WebSocket connection
        const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);
        
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        };
        
        // GOTCHA: Cleanup connection on unmount
        return () => ws.close();
    }, [userId]);
    
    const sendMessage = useCallback((content) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ content, type: 'user' }));
        }
    }, [socket]);
    
    return { messages, sendMessage };
}
```

### Integration Points
```yaml
DATABASE:
  - migration: "CREATE tables users, conversations, messages"
  - index: "CREATE INDEX idx_conversation_user ON conversations(user_id)"
  - index: "CREATE INDEX idx_message_conversation ON messages(conversation_id)"
  
CONFIG:
  - add to: backend/app/core/config.py
  - pattern: "OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')"
  - pattern: "JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')"
  
ROUTES:
  - add to: backend/app/main.py
  - pattern: "app.include_router(auth_router, prefix='/auth')"
  - pattern: "app.include_router(chat_router, prefix='/chat')"
  
FRONTEND:
  - add to: frontend/src/App.jsx
  - pattern: "<Route path='/chat' component={ChatInterface} />"
  - pattern: "<Route path='/login' component={Login} />"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Backend validation
cd backend
ruff check app/ --fix
mypy app/
black app/

# Frontend validation
cd frontend
npm run lint
npm run type-check
```

### Level 2: Unit Tests
```python
# Backend tests
def test_openai_service_response():
    """Test OpenAI service generates valid responses"""
    service = OpenAIService()
    messages = [Message(content="Hello", type="user")]
    response = await service.generate_response(messages)
    assert isinstance(response, str)
    assert len(response) > 0

def test_websocket_connection():
    """Test WebSocket connection management"""
    manager = ConnectionManager()
    # Mock WebSocket connection test
    assert len(manager.active_connections) == 0

def test_chat_message_creation():
    """Test message creation và persistence"""
    message_data = {"content": "Test message", "type": "user"}
    message = await create_message(message_data)
    assert message.content == "Test message"
```

```bash
# Chạy backend tests
cd backend
pytest tests/ -v --cov=app

# Chạy frontend tests
cd frontend
npm test
```

### Level 3: Integration Test
```bash
# Start services
docker-compose up -d

# Test authentication
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "testpass123"}'

# Test chat endpoint
curl -X POST http://localhost:8000/chat/conversations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Conversation"}'

# Test WebSocket connection
# Sử dụng WebSocket client để test real-time messaging

# Test frontend
# Navigate to http://localhost:3000
# Verify login, chat interface, và real-time updates
```

## Checklist validation Cuối cùng
- [ ] Tất cả backend tests pass: `pytest tests/ -v`
- [ ] Tất cả frontend tests pass: `npm test`
- [ ] Không có linting errors: `ruff check app/` và `npm run lint`
- [ ] Không có type errors: `mypy app/` và `npm run type-check`
- [ ] Authentication flow hoạt động end-to-end
- [ ] Chat messaging hoạt động real-time
- [ ] OpenAI integration trả về valid responses
- [ ] WebSocket connections stable và cleanup properly
- [ ] Frontend responsive trên mobile và desktop
- [ ] Error handling graceful cho tất cả failure scenarios
- [ ] Database migrations chạy successfully
- [ ] Docker setup hoạt động out-of-the-box
- [ ] Documentation đầy đủ trong README
- [ ] Environment variables properly configured
- [ ] Security best practices implemented (JWT, input validation, etc.)