## TÍNH NĂNG:

- Ứng dụng quản lý task cá nhân với giao diện web hiện đại
- Hệ thống authentication với JWT
- CRUD operations cho tasks với categories và priorities
- Dashboard với thống kê và charts
- API RESTful cho mobile app tương lai
- Real-time notifications khi có task deadline
- Export/Import tasks từ/ra CSV, JSON

## VÍ DỤ:

Trong thư mục `examples/` có các file tham khảo:

- `examples/fastapi_crud.py` - sử dụng làm template cho API endpoints
- `examples/auth/` - đọc qua tất cả files để hiểu best practices cho JWT authentication
- `examples/frontend/` - React components và patterns để tạo UI hiện đại
- `examples/database/` - SQLAlchemy models và migration patterns

Đừng copy trực tiếp các examples này, chúng dành cho dự án khác hoàn toàn. Nhưng sử dụng chúng làm inspiration và cho best practices.

## TÀI LIỆU:

- FastAPI documentation: https://fastapi.tiangolo.com/
- SQLAlchemy documentation: https://docs.sqlalchemy.org/
- React documentation: https://react.dev/
- JWT best practices: https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/
- Tailwind CSS: https://tailwindcss.com/docs

## CÁC CÂN NHẮC KHÁC:

- Bao gồm .env.example, README với hướng dẫn setup bao gồm cách cấu hình database và JWT secrets
- Bao gồm project structure trong README
- Virtual environment đã được setup với các dependencies cần thiết
- Sử dụng python_dotenv và load_env() cho environment variables
- Implement proper error handling và logging
- Đảm bảo API có rate limiting và input validation
- Frontend phải responsive và có dark mode

## CÔNG NGHỆ ƯU TIÊN:

**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy với PostgreSQL
- Pydantic cho validation
- JWT cho authentication
- Redis cho caching và sessions

**Frontend:**
- React 18+ với TypeScript
- Tailwind CSS cho styling
- React Query cho state management
- React Hook Form cho forms
- Chart.js cho data visualization

**DevOps:**
- Docker cho containerization
- Pytest cho testing
- Black và Ruff cho code formatting
- GitHub Actions cho CI/CD

## KIẾN TRÚC MONG MUỐN:

```
project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## YÊU CẦU HIỆU SUẤT:

- API response time < 200ms cho CRUD operations
- Frontend load time < 3 seconds
- Hỗ trợ đồng thời ít nhất 100 users
- Database queries được optimize với proper indexing
- Implement caching cho frequently accessed data

## TIÊU CHÍ THÀNH CÔNG:

- [ ] User có thể đăng ký, đăng nhập và quản lý profile
- [ ] CRUD operations cho tasks hoạt động hoàn hảo
- [ ] Dashboard hiển thị thống kê tasks một cách trực quan
- [ ] Real-time notifications hoạt động
- [ ] Export/Import CSV và JSON thành công
- [ ] API documentation đầy đủ với Swagger
- [ ] Unit tests coverage >= 80%
- [ ] Frontend responsive trên mobile và desktop
- [ ] Dark mode toggle hoạt động
- [ ] Performance requirements được đáp ứng