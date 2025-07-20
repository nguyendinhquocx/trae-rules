---
description: Quy tắc thiết kế và phát triển tối ưu cho tất cả dự án
globs: **/*
alwaysApply: true
---

# User Rules - Quy tắc toàn cục tối ưu
 
## Triết lý thiết kế cốt lõi

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

## Code Quality

### Standards
- **Naming**: camelCase (variables), PascalCase (classes)
- **Structure**: Single responsibility, modular design
- **Security**: Environment variables, input validation, try-catch
- **Performance**: Minimize API calls, implement caching

## Development Workflow

### Process
1. **Planning**: Phân tích requirements → chia tasks < 30 phút
2. **Implementation**: Core functionality → UI/UX → Testing → Polish
3. **Communication**: Báo cáo milestones, giải thích decisions

### Project Initialization
- **Auto README**: Tự động kiểm tra và tạo README.md nếu chưa có
- **Template**: Sử dụng template chuẩn với project description, setup, usage
- **Standards**: Markdown format, không icon, tối giản, thông tin cần thiết

### Feature Enhancement
- **User-centric**: Solve real problems, practical solutions
- **Innovation**: Automation, integration, analytics, performance
- **Scalable**: Consider future growth và maintenance

### Icon Policy
- **Quy tắc tuyệt đối**: KHÔNG thêm icon vào bất kỳ đâu trừ khi user yêu cầu
- **Áp dụng**: Apps, code files, README.md, documentation, UI
- **Lý do**: Tối giản, tập trung nội dung, giảm visual noise

## UX Design Principles

### Mục tiêu: Đẹp - Đơn giản - Dễ dùng - Có lý do
- **User-centered**: Phân tích người dùng → mục tiêu → user flow
- **Behavioral psychology**: F-pattern, progressive disclosure, feedback loops
- **Optimization**: Gom nhóm chức năng, ưu tiên thông tin quan trọng
- **Tools**: Figma, A/B testing, wireframes

### Tránh
- Nhiều màu, icon động, gradient rối mắt
- Copy layout không hiểu context
- Ưu tiên thẩm mỹ hơn chức năng

## MCP Server Usage - Tự động kích hoạt

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

### MarkItDown Tool
**Khi nào**: Chuyển đổi file đa định dạng sang Markdown cho LLM analysis
**Command**: `markitdown [file_path] [options]`
**Supported formats**: PDF, Excel, PowerPoint, Word, Images, Audio, HTML, Text
**Use cases**: Document analysis, data extraction, OCR, content preparation

## Quy tắc Tự động Kích hoạt

### Excel MCP:
- File .xlsx/.xls xuất hiện
- Keywords: "spreadsheet", "excel", "data analysis"

### Pandoc MCP:
- Keywords: "convert", "pdf", "docx", "markdown"
- Task: documentation, reports

### Graphlit MCP:
- Keywords: "search documents", "analyze content", "extract data"
- Large text corpus projects

### GitHub MCP:
- Keywords: "deploy", "backup", "share code", "version control"
- Project ready for collaboration

### Puppeteer MCP:
- Keywords: "test website", "screenshot", "web automation"
- Web scraping, UI testing tasks

### Notion MCP:
- Keywords: "notion", "documentation", "database", "report", "share"
- Tạo báo cáo, chia sẻ kết quả phân tích

### MarkItDown Tool:
- File formats: .pdf, .xlsx, .pptx, .docx, .jpg, .png, .mp3, .wav, .html
- Keywords: "convert to markdown", "extract text", "document analysis", "OCR"
- Data preparation for LLM analysis

## Best Practices
- **Chain MCPs**: MarkItDown → Excel → Pandoc → GitHub → Notion
- **Document workflow**: MarkItDown (convert) → Analysis → Report generation
- **Batch operations** thay vì single calls
- **Clear progress indicators** cho async operations
- **Error handling** với fallback options

## Common Issues
- **Excel**: File locked → Đóng Excel trước
- **Pandoc**: PDF fails → Cài TeX Live
- **Graphlit**: Slow → Giảm query complexity
- **GitHub**: Auth → Verify token
- **Puppeteer**: Timeout → Tăng wait times
- **Notion**: Auth → Kiểm tra NOTION_TOKEN và NOTION_PAGE_ID
- **MarkItDown**: Missing ffmpeg → Install for audio/video; No --sheet support → Convert entire file



---

### **MCP AVAILABILITY STATUS** - Cập nhật 2024

#### **KHẢ DỤNG**:
- **Excel MCP** (`mcp.config.usrlocalmcp.Excel`) - Full functionality
- **Pandoc MCP** (`mcp.config.usrlocalmcp.Pandoc`) - Full functionality  
- **Graphlit MCP** (`mcp.config.usrlocalmcp.Graphlit`) - Full functionality
- **Puppeteer MCP** (`mcp.config.usrlocalmcp.Puppeteer`) - Full functionality
- **GitHub MCP** (`mcp.config.usrlocalmcp.GitHub`) - Full functionality
- **Notion MCP** (`mcp.config.usrlocalmcp.Notion`) - Full functionality
- **Context7 MCP** - Đã cài package nhưng chưa config trong Trae

#### **KHẢ DỤNG NHƯNG CÓ VẤN ĐỀ**:
- **TaskManager MCP** (`mcp.config.usrlocalmcp.TaskManager`) - Available with schema issues
- **Context7 MCP** - Package đã cài nhưng cần cấu hình trong Trae MCP settings

#### **KHÔNG KHẢ DỤNG**:
- Hiện tại tất cả MCP servers chính đều khả dụng

### **Context7 MCP** - Up-to-date library documentation CẦN CẤU HÌNH

#### Khi nào SỬ DỤNG:
- Cần **documentation** mới nhất cho libraries/packages
- **Resolve dependencies** và compatibility issues
- **Best practices** cho specific libraries/frameworks
- **Code examples** up-to-date từ official sources
- **API references** cho latest versions
- Tránh **hallucinated APIs** và outdated examples

#### Cách cài đặt trong Trae:
1. **Add manually** trong Trae MCP settings
2. **Remote Server Connection**:
```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```
3. **Local Server Connection**:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

#### Package đã cài: `npx -y @upstash/context7-mcp`
#### Cần: Cấu hình trong Trae MCP settings

#### **ALTERNATIVES**:
- **TaskManager**: Có thể thử nghiệm nhưng cần cẩn thận với schema, hoặc sử dụng manual task tracking
- **Project management**: Sử dụng built-in tools và file organization khi TaskManager có vấn đề

---

## Context Engineering Rules

### Auto-trigger khi:
- Tính năng phức tạp (>3 files)
- Tích hợp API bên ngoài
- Yêu cầu không rõ ràng
- Refactoring lớn

### Quy trình:
1. **Phân tích** → Hiểu yêu cầu
2. **Tạo PRP** → Product Requirements Prompt
3. **Validation** → Kiểm tra từng bước
4. **Triển khai** → Từng phần nhỏ

### Commands:
- `/generate-prp` - Tạo PRP
- `/execute-prp` - Thực thi PRP
- `/validate-code` - Kiểm tra chất lượng

### Lợi ích:
Giảm lỗi AI, Code chất lượng cao, Tăng năng suất

---

*Những quy tắc này áp dụng cho mọi dự án, đảm bảo consistency, quality và user experience tối ưu theo triết lý "Less, but better" của Jony Ive và Steve Jobs, kết hợp với nghiên cứu behavioral psychology hiện đại và tối ưu hóa việc sử dụng MCP servers khả dụng.*