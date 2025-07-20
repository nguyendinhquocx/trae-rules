# Trae Rules - Hệ Thống Xây Dựng Ứng Dụng Tự Động

Một framework toàn diện để xây dựng bất kỳ ứng dụng nào chỉ với một prompt duy nhất thông qua việc chỉnh sửa file .md và để AI đọc và xây dựng một cách hệ thống.

**Trae Rules giúp bạn xây dựng ứng dụng hoàn chỉnh chỉ bằng cách mô tả ý tưởng trong file .md**

## Bắt Đầu Nhanh

```bash
# 1. Thiết lập quy tắc dự án (tùy chọn - đã có template)
# Chỉnh sửa CLAUDE.md để thêm hướng dẫn cụ thể cho dự án

# 2. Thêm ví dụ (khuyến nghị cao)
# Đặt các ví dụ code liên quan vào thư mục examples/

# 3. Tạo yêu cầu tính năng ban đầu
# Chỉnh sửa INITIAL.md với yêu cầu tính năng của bạn

# 4. Tạo PRP (Product Requirements Prompt) toàn diện
# Trong Trae, chạy:
/tao-prp INITIAL.md

# 5. Thực thi PRP để triển khai tính năng
# Trong Trae, chạy:
/thuc-thi-prp PRPs/ten-tinh-nang-cua-ban.md
```

## Mục Lục

- [Trae Rules là gì?](#trae-rules-là-gì)
- [Cấu trúc Template](#cấu-trúc-template)
- [Hướng dẫn từng bước](#hướng-dẫn-từng-bước)
- [Viết file INITIAL.md hiệu quả](#viết-file-initialmd-hiệu-quả)
- [Quy trình PRP](#quy-trình-prp)
- [Sử dụng Examples hiệu quả](#sử-dụng-examples-hiệu-quả)
- [Best Practices](#best-practices)

## Trae Rules là gì?

Trae Rules đại diện cho một sự thay đổi paradigm từ prompt engineering truyền thống:

### Prompt Engineering vs Trae Rules

**Prompt Engineering:**
- Tập trung vào cách diễn đạt thông minh và cụm từ cụ thể
- Giới hạn ở cách bạn diễn đạt một nhiệm vụ
- Như đưa cho ai đó một tờ giấy nhớ

**Trae Rules:**
- Một hệ thống hoàn chỉnh để cung cấp ngữ cảnh toàn diện
- Bao gồm tài liệu, ví dụ, quy tắc, patterns và validation
- Như viết một kịch bản đầy đủ với tất cả chi tiết

### Tại sao Trae Rules quan trọng

1. **Giảm lỗi AI**: Hầu hết lỗi agent không phải lỗi model - mà là lỗi ngữ cảnh
2. **Đảm bảo nhất quán**: AI tuân theo patterns và conventions của dự án
3. **Cho phép tính năng phức tạp**: AI có thể xử lý triển khai nhiều bước với ngữ cảnh phù hợp
4. **Tự sửa lỗi**: Validation loops cho phép AI sửa lỗi của chính nó

## Cấu trúc Template

```
trae-rules/
├── .trae/
│   ├── commands/
│   │   ├── tao-prp.md         # Tạo PRP toàn diện
│   │   └── thuc-thi-prp.md    # Thực thi PRP để triển khai tính năng
│   └── settings.local.json    # Quyền Trae
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md        # Template cơ sở cho PRP
│   └── VD_prp_da_agent.md     # Ví dụ về PRP hoàn chỉnh
├── examples/                   # Ví dụ code của bạn (quan trọng!)
├── CLAUDE.md                  # Quy tắc toàn cục cho AI assistant
├── INITIAL.md                 # Template cho yêu cầu tính năng
├── INITIAL_EXAMPLE.md         # Ví dụ yêu cầu tính năng
└── README.md                  # File này
```

## Hướng dẫn từng bước

### 1. Thiết lập Quy tắc Toàn cục (CLAUDE.md)

File `CLAUDE.md` chứa các quy tắc toàn dự án mà AI assistant sẽ tuân theo trong mọi cuộc trò chuyện. Template bao gồm:

- **Nhận thức dự án**: Đọc tài liệu planning, kiểm tra tasks
- **Cấu trúc code**: Giới hạn kích thước file, tổ chức module
- **Yêu cầu testing**: Patterns unit test, kỳ vọng coverage
- **Conventions style**: Preferences ngôn ngữ, quy tắc formatting
- **Tiêu chuẩn documentation**: Formats docstring, practices commenting

**Bạn có thể sử dụng template được cung cấp hoặc tùy chỉnh cho dự án của mình.**

### 2. Tạo Yêu cầu Tính năng Ban đầu

Chỉnh sửa `INITIAL.md` để mô tả những gì bạn muốn xây dựng:

```markdown
## TÍNH NĂNG:
[Mô tả những gì bạn muốn xây dựng - cụ thể về chức năng và yêu cầu]

## VÍ DỤ:
[Liệt kê các file ví dụ trong thư mục examples/ và giải thích cách sử dụng]

## TÀI LIỆU:
[Bao gồm links đến tài liệu liên quan, APIs, hoặc tài nguyên MCP server]

## CÁC CÂN NHẮC KHÁC:
[Đề cập đến bất kỳ gotchas, yêu cầu cụ thể, hoặc những điều AI assistants thường bỏ sót]
```

**Xem `INITIAL_EXAMPLE.md` để có ví dụ hoàn chỉnh.**

### 3. Tạo PRP

PRPs (Product Requirements Prompts) là blueprints triển khai toàn diện bao gồm:

- Ngữ cảnh và tài liệu hoàn chỉnh
- Các bước triển khai với validation
- Patterns xử lý lỗi
- Yêu cầu test

Chúng tương tự như PRDs (Product Requirements Documents) nhưng được tạo cụ thể hơn để hướng dẫn AI coding assistant.

Chạy trong Trae:
```bash
/tao-prp INITIAL.md
```

### 4. Thực thi PRP

Sau khi được tạo, thực thi PRP để triển khai tính năng:

```bash
/thuc-thi-prp PRPs/ten-tinh-nang-cua-ban.md
```

AI coding assistant sẽ:
1. Đọc tất cả ngữ cảnh từ PRP
2. Tạo kế hoạch triển khai chi tiết
3. Thực thi từng bước với validation
4. Chạy tests và sửa bất kỳ vấn đề nào
5. Đảm bảo tất cả tiêu chí thành công được đáp ứng

## Viết file INITIAL.md hiệu quả

### Các phần chính được giải thích

**TÍNH NĂNG**: Hãy cụ thể và toàn diện
- **Tránh**: "Xây dựng web scraper"
- **Nên**: "Xây dựng async web scraper sử dụng BeautifulSoup để trích xuất dữ liệu sản phẩm từ các trang e-commerce, xử lý rate limiting, và lưu trữ kết quả trong PostgreSQL"

**VÍ DỤ**: Tận dụng thư mục examples/
- Đặt các patterns code liên quan trong `examples/`
- Tham chiếu các file và patterns cụ thể để tuân theo
- Giải thích những khía cạnh nào nên được bắt chước

**TÀI LIỆU**: Bao gồm tất cả tài nguyên liên quan
- URLs tài liệu API
- Hướng dẫn thư viện
- Tài liệu MCP server
- Database schemas

**CÁC CÂN NHẮC KHÁC**: Nắm bắt các chi tiết quan trọng
- Yêu cầu authentication
- Rate limits hoặc quotas
- Pitfalls thường gặp
- Yêu cầu hiệu suất

## Best Practices

### 1. Luôn bao gồm Examples
- Đặt code examples thực tế trong thư mục `examples/`
- Tham chiếu chúng trong INITIAL.md
- Giải thích patterns nào cần tuân theo

### 2. Cụ thể về Requirements
- Đừng nói "làm một website", hãy nói "làm một React app với authentication, dashboard, và API integration"
- Bao gồm tech stack preferences
- Đề cập đến constraints và limitations

### 3. Validation là chìa khóa
- Bao gồm các lệnh có thể chạy được để test
- Cung cấp expected outputs
- Cho phép AI tự sửa lỗi thông qua validation loops

### 4. Tài liệu ngữ cảnh
- Link đến tài liệu chính thức
- Bao gồm gotchas và common pitfalls
- Tham chiếu existing patterns trong codebase

## Kết luận

Trae Rules không chỉ là về việc viết prompts tốt hơn - nó là về việc tạo ra một hệ thống hoàn chỉnh cho phép AI hiểu và triển khai các tính năng phức tạp một cách đáng tin cậy. Bằng cách cung cấp ngữ cảnh phong phú, validation loops, và patterns rõ ràng, bạn có thể đạt được tỷ lệ thành công cao trong việc triển khai tính năng chỉ với một lần thực hiện.

**Hãy nhớ: Mục tiêu là thành công triển khai một lần thông qua ngữ cảnh toàn diện.**