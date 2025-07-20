# Hướng Dẫn Sử Dụng Hệ Thống Trae Rules

## Tổng Quan
Trae Rules là một framework cho phép bạn xây dựng bất kỳ ứng dụng nào chỉ với một prompt duy nhất. Bạn chỉ cần chỉnh sửa file `.md` và AI sẽ đọc qua để xây dựng hệ thống một cách có tổ chức.

## Quy Trình 3 Bước

### Bước 1: Thiết Lập Quy Tắc Toàn Cục
1. Mở file `CLAUDE.md`
2. Tùy chỉnh các quy tắc theo dự án của bạn:
   - Công nghệ stack ưa thích
   - Coding standards
   - Kiến trúc patterns
   - Quy tắc bảo mật

### Bước 2: Tạo Yêu Cầu Tính Năng
1. Sao chép template từ `INITIAL.md`
2. Điền thông tin chi tiết về tính năng bạn muốn:
   - Mô tả tính năng
   - Ví dụ tham khảo
   - Tài liệu liên quan
   - Công nghệ ưu tiên
   - Tiêu chí thành công

### Bước 3: Tạo và Thực Thi PRP
1. Sử dụng lệnh `/tao-prp` để tạo Product Requirements Prompt
2. Sử dụng lệnh `/thuc-thi-prp` để triển khai

## Ví Dụ Thực Tế

### Scenario: Xây Dựng E-commerce Website

#### 1. Chỉnh sửa INITIAL.md:
```markdown
## Tính năng
Website thương mại điện tử hoàn chỉnh với:
- Catalog sản phẩm
- Giỏ hàng và thanh toán
- Quản lý đơn hàng
- Admin dashboard

## Công nghệ ưu tiên
- Backend: FastAPI + PostgreSQL
- Frontend: React + TypeScript
- Payment: Stripe
- Deployment: Docker

## Tiêu chí thành công
- [ ] User có thể browse và search sản phẩm
- [ ] Checkout process hoạt động smooth
- [ ] Admin có thể quản lý inventory
- [ ] Payment integration secure
```

#### 2. Prompt cho AI:
```
Hãy đọc file CLAUDE.md để hiểu quy tắc toàn cục, sau đó đọc INITIAL.md để hiểu yêu cầu. 
Tiếp theo sử dụng lệnh /tao-prp để tạo Product Requirements Prompt hoàn chỉnh.
```

#### 3. Thực thi:
```
Sử dụng lệnh /thuc-thi-prp để triển khai e-commerce website theo PRP đã tạo.
```

## Templates Có Sẵn

### 1. Template Cơ Bản (INITIAL.md)
- Cấu trúc chuẩn cho mọi loại dự án
- Các trường bắt buộc và tùy chọn
- Hướng dẫn điền thông tin

### 2. Template PRP (prp_base.md)
- Framework hoàn chỉnh cho Product Requirements
- Validation loops tích hợp
- Checklist đảm bảo chất lượng

### 3. Ví Dụ Hoàn Chỉnh
- `INITIAL_EXAMPLE.md`: Ví dụ về task management app
- `VD_chatbot_ai.md`: Ví dụ PRP hoàn chỉnh cho chatbot AI

## Lệnh Claude Commands

### `/tao-prp`
**Mục đích**: Tạo Product Requirements Prompt hoàn chỉnh

**Cách sử dụng**:
```
/tao-prp
```

**AI sẽ**:
1. Phân tích codebase hiện tại
2. Nghiên cứu requirements từ INITIAL.md
3. Tạo PRP chi tiết với validation loops
4. Bao gồm tất cả context cần thiết

### `/thuc-thi-prp`
**Mục đích**: Thực thi PRP đã tạo

**Cách sử dụng**:
```
/thuc-thi-prp
```

**AI sẽ**:
1. Đọc và hiểu PRP
2. Lập kế hoạch triển khai
3. Thực hiện từng bước
4. Validate liên tục
5. Báo cáo kết quả

## Best Practices

### 1. Viết INITIAL.md Hiệu Quả
- **Cụ thể**: Mô tả chi tiết tính năng, không mơ hồ
- **Ví dụ**: Cung cấp examples hoặc references
- **Constraints**: Nêu rõ limitations và requirements
- **Success Criteria**: Định nghĩa rõ ràng khi nào coi là thành công

### 2. Tối Ưu Hóa Context
- Bao gồm relevant documentation links
- Cung cấp code examples nếu có
- Nêu rõ gotchas và common pitfalls
- Reference existing patterns trong codebase

### 3. Validation Strategy
- Luôn bao gồm automated tests
- Thiết lập linting và type checking
- Định nghĩa integration test scenarios
- Chuẩn bị manual verification steps

## Troubleshooting

### Vấn đề: AI không hiểu requirements
**Giải pháp**:
- Thêm ví dụ cụ thể vào INITIAL.md
- Cung cấp reference implementations
- Nêu rõ edge cases và constraints

### Vấn đề: Code không follow standards
**Giải pháp**:
- Cập nhật CLAUDE.md với coding standards rõ ràng
- Thêm linting rules vào validation
- Cung cấp code style examples

### Vấn đề: Integration failures
**Giải pháp**:
- Bao gồm integration points trong PRP
- Cung cấp API documentation
- Thêm environment setup instructions

## Mở Rộng Hệ Thống

### Thêm Commands Mới
1. Tạo file `.md` trong `.claude/commands/`
2. Định nghĩa command syntax và behavior
3. Cập nhật `settings.local.json`

### Tùy Chỉnh Templates
1. Sao chép template hiện có
2. Chỉnh sửa theo nhu cầu dự án
3. Lưu trong thư mục `PRPs/templates/`

### Tích Hợp CI/CD
1. Thêm validation scripts vào PRP
2. Cấu hình automated testing
3. Setup deployment pipelines

## Kết Luận

Trae Rules giúp bạn:
- **Tăng tốc độ phát triển**: Từ ý tưởng đến implementation chỉ trong vài bước
- **Đảm bảo chất lượng**: Validation loops tích hợp sẵn
- **Tái sử dụng**: Templates và patterns có thể dùng lại
- **Consistency**: Coding standards được enforce tự động

Hãy bắt đầu với một dự án nhỏ để làm quen với quy trình, sau đó áp dụng cho các dự án phức tạp hơn!