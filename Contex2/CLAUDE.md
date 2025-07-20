# Quy Tắc Toàn Cục Cho Trae AI

## Triết Lý Thiết Kế Cốt Lõi

### Nguyên tắc "Less, but better"
- **Tối giản**: Chỉ giữ lại điều cần thiết
- **Màu sắc**: Chỉ dùng trắng (#FFFFFF) và đen (#000000)
- **Typography**: Inter, SF Pro Display, system-ui
- **Components**: Clean, minimal shadows, 8px border radius
- **Icons**: KHÔNG thêm icon trừ khi người dùng yêu cầu cụ thể
  - Khi được phép: Outline style, đơn giản, màu trắng đen
  - Style: stroke-width 1.5px, 20px-24px size
  - Recommended: Feather, Lucide, Material Icons Outlined
  - Lý do: Tập trung vào nội dung, tránh phân tâm thị giác

### Nhận thức Dự án & Ngữ cảnh
- **Luôn đọc `PLANNING.md`** khi bắt đầu cuộc trò chuyện mới để hiểu kiến trúc, mục tiêu, style và constraints của dự án.
- **Kiểm tra `TASK.md`** trước khi bắt đầu task mới. Nếu task không được liệt kê, hãy thêm nó với mô tả ngắn gọn và ngày hôm nay.
- **Sử dụng naming conventions, file structure và architecture patterns nhất quán** như được mô tả trong `PLANNING.md`.
- **Sử dụng môi trường ảo phù hợp** khi thực thi các lệnh, bao gồm cả unit tests.

### Cấu trúc Code & Modularity
- **Không bao giờ tạo file dài hơn 500 dòng code.** Nếu file tiến gần đến giới hạn này, hãy refactor bằng cách chia thành modules hoặc helper files.
- **Tổ chức code thành các modules được phân tách rõ ràng**, nhóm theo tính năng hoặc trách nhiệm.
  Đối với agents điều này trông như:
    - `agent.py` - Định nghĩa agent chính và logic thực thi
    - `tools.py` - Các hàm tool được sử dụng bởi agent
    - `prompts.py` - System prompts
- **Sử dụng imports rõ ràng, nhất quán** (ưu tiên relative imports trong packages).
- **Sử dụng python_dotenv và load_env()** cho environment variables.

### Testing & Reliability
- **Luôn tạo Pytest unit tests cho các tính năng mới** (functions, classes, routes, etc).
- **Sau khi cập nhật bất kỳ logic nào**, kiểm tra xem các unit tests hiện có có cần được cập nhật không. Nếu có, hãy làm điều đó.
- **Tests nên nằm trong thư mục `/tests`** phản ánh cấu trúc app chính.
  - Bao gồm ít nhất:
    - 1 test cho expected use
    - 1 edge case
    - 1 failure case

### Hoàn thành Task
- **Đánh dấu các tasks đã hoàn thành trong `TASK.md`** ngay sau khi hoàn thành chúng.
- Thêm các sub-tasks hoặc TODOs mới được phát hiện trong quá trình phát triển vào `TASK.md` dưới phần "Discovered During Work".

### Style & Conventions
- **Python**: PEP8, type hints, black formatting
- **Data validation**: Pydantic
- **APIs**: FastAPI + SQLAlchemy/SQLModel
- **Docstrings**: Google style cho mọi function
  ```python
  def example():
      """Tóm tắt ngắn gọn.
      Args: param1 (type): Mô tả.
      Returns: type: Mô tả.
      """
  ```

### Documentation & Explainability
- **Cập nhật `README.md`** khi các tính năng mới được thêm, dependencies thay đổi, hoặc các bước setup được sửa đổi.
- **Comment code không rõ ràng** và đảm bảo mọi thứ có thể hiểu được bởi developer trình độ trung bình.
- Khi viết logic phức tạp, **thêm inline `# Lý do:` comment** giải thích tại sao, không chỉ là gì.

### Quy tắc Hành vi AI
- **Không bao giờ giả định ngữ cảnh bị thiếu. Hỏi câu hỏi nếu không chắc chắn.**
- **Không bao giờ hallucinate libraries hoặc functions** – chỉ sử dụng các Python packages đã biết, đã được xác minh.
- **Luôn xác nhận file paths và module names** tồn tại trước khi tham chiếu chúng trong code hoặc tests.
- **Không bao giờ xóa hoặc ghi đè existing code** trừ khi được hướng dẫn rõ ràng hoặc nếu là một phần của task từ `TASK.md`.

### Quy tắc Ngôn ngữ & Giao tiếp
- **Sử dụng tiếng Việt** trong tất cả comments, documentation và giao tiếp với user.
- **Code và variable names sử dụng tiếng Anh** để đảm bảo tính tương thích và best practices.
- **Docstrings và error messages có thể sử dụng tiếng Việt** để dễ hiểu hơn.

## UI/UX Standards

### Layout & Spacing
- **Grid**: 8-point system (8px, 16px, 24px, 32px)
- **Container**: Max-width 1200px, centered
- **Mobile-first**: Responsive design, touch-friendly (44px minimum)

### Components
- **Buttons**: Primary (đen bg), Secondary (trắng bg + đen border)
- **Border radius**: 8px buttons, 12px cards, 16px modals
- **Shadows**: Minimal `0 4px 12px rgba(0,0,0,0.1)`
- **Accessibility**: WCAG AA compliance, keyboard navigation

## Communication & Progress

### Báo cáo tiến độ
- **Format**: `[X/Y] - Đang làm: [Task]` + `████████░░ 80%`
- **Task breakdown**: < 30 phút/task, giải thích từng bước
- **Feature suggestions**: Phân tích context → đề xuất 2-3 tính năng hữu ích

### Development Standards
- **Libraries**: FastAPI, Pydantic, SQLAlchemy (ổn định, phổ biến)
- **Async/await**: I/O operations, proper error handling
- **Naming**: camelCase (variables), PascalCase (classes)
- **Security**: Environment variables, input validation
- **Process**: Planning → Incremental → Validate → Document

## MCP Server Usage - Tự Động Kích Hoạt

### Excel MCP
**Khi nào**: File .xlsx/.xls, phân tích dữ liệu, báo cáo
**Tools**: `excel_read_sheet`, `excel_write_to_sheet`, `excel_describe_sheets`

### Pandoc MCP
**Khi nào**: Chuyển đổi MD↔HTML↔PDF↔DOCX, tạo reports
**Tool**: `convert-contents` (PDF cần TeX Live)

### Graphlit MCP
**Khi nào**: Knowledge base, chat với documents, extract data
**Tools**: `promptConversation`, `retrieveSources`, `extractText`

### GitHub MCP
**Khi nào**: Deploy, backup, collaboration, version control
**Tools**: `create_repository`, `push_files`, `create_issue`

### Puppeteer MCP
**Khi nào**: Web testing, screenshots, automation
**Tools**: `puppeteer_navigate`, `puppeteer_screenshot`, `puppeteer_click`

### Notion MCP
**Khi nào**: Tạo/quản lý trang Notion, database, báo cáo, documentation
**Tools**: `notion_pages`, `notion_blocks`, `notion_database`, `notion_comments`, `notion_users`

## Auto-trigger Keywords
- **Excel**: .xlsx/.xls files, "spreadsheet", "data analysis"
- **Pandoc**: "convert", "pdf", "docx", "markdown"
- **Graphlit**: "search documents", "analyze content", "extract data"
- **GitHub**: "deploy", "backup", "share code", "version control"
- **Puppeteer**: "test website", "screenshot", "web automation"
- **Notion**: "notion", "documentation", "database", "report"

## MCP Best Practices
- **Chain workflow**: MarkItDown → Excel → Pandoc → GitHub → Notion
- **Batch operations**, progress indicators, error handling

## UX Design Principles

### Minimalism ("Less, but better")
- **Clean interfaces**: Ít elements, nhiều whitespace, clear hierarchy
- **Essential features**: Loại bỏ tính năng thừa, consistent patterns

### Progressive Enhancement
- **Core first**: Hoạt động tốt mọi device → Enhanced experience → Graceful degradation

### Accessibility
- **Standards**: Semantic HTML, keyboard navigation, WCAG AA contrast
- **Screen readers**: ARIA labels, proper heading structure

### Lưu ý An toàn
- **Không bao giờ commit secrets** hoặc sensitive information
- **Validate inputs** để tránh injection attacks
- **Sử dụng environment variables** cho configuration
- **Implement proper authentication** khi cần thiết

---

*Quy tắc này đảm bảo consistency, quality và user experience tối ưu theo triết lý "Less, but better".*