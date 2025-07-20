# Tiêu Chuẩn Phát Triển - Framework Contex1

Tài liệu này định nghĩa các tiêu chuẩn phát triển cốt lõi được tích hợp vào framework Contex1 để đảm bảo chất lượng và tính nhất quán.

## Triết Lý Thiết Kế Cốt Lõi

### Nguyên Tắc "Less, but better"
- **Tối giản**: Chỉ giữ lại điều cần thiết
- **Màu sắc**: Chỉ dùng trắng (#FFFFFF) và đen (#000000)
- **Typography**: Inter, SF Pro Display, system-ui
- **Components**: Clean, minimal shadows, 8px border radius
- **Icons**: KHÔNG thêm icon trừ khi người dùng yêu cầu cụ thể
  - Khi được phép: Outline style, đơn giản, màu trắng đen
  - Style: stroke-width 1.5px, 20px-24px size
  - Recommended: Feather, Lucide, Material Icons Outlined
  - Lý do: Tập trung vào nội dung, tránh phân tâm thị giác

## Tiêu Chuẩn UI/UX

### Layout & Spacing
- **Grid**: 8-point system (8px, 16px, 24px, 32px)
- **Container**: Max-width 1200px, centered
- **Mobile-first**: Responsive design, touch-friendly (44px minimum)

### Components
- **Buttons**: Primary (đen bg), Secondary (trắng bg + đen border)
- **Border radius**: 8px buttons, 12px cards, 16px modals
- **Shadows**: Minimal `0 4px 12px rgba(0,0,0,0.1)`
- **Accessibility**: WCAG AA compliance, keyboard navigation

### Nguyên Tắc UX Design
**Mục tiêu**: Đẹp - Đơn giản - Dễ dùng - Có lý do
- **User-centered**: Phân tích người dùng → mục tiêu → user flow
- **Behavioral psychology**: F-pattern, progressive disclosure, feedback loops
- **Optimization**: Gom nhóm chức năng, ưu tiên thông tin quan trọng

**Tránh**:
- Nhiều màu, icon động, gradient rối mắt
- Copy layout không hiểu context
- Ưu tiên thẩm mỹ hơn chức năng

## Giao Tiếp & Báo Cáo Tiến Độ

### Format Báo Cáo
- **Format**: `[X/Y] - Đang làm: [Task]` + `████████░░ 80%`
- **Task breakdown**: < 30 phút/task, giải thích từng bước
- **Feature suggestions**: Phân tích context → đề xuất 2-3 tính năng hữu ích

## Tiêu Chuẩn Code Quality

### Standards
- **Naming**: camelCase (variables), PascalCase (classes)
- **Structure**: Single responsibility, modular design
- **Security**: Environment variables, input validation, try-catch
- **Performance**: Minimize API calls, implement caching

### Development Workflow
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

## Chính Sách Icon
- **Quy tắc tuyệt đối**: KHÔNG thêm icon vào bất kỳ đâu trừ khi user yêu cầu
- **Áp dụng**: Apps, code files, README.md, documentation, UI
- **Lý do**: Tối giản, tập trung nội dung, giảm visual noise

## Tích Hợp MCP Server

### Nguyên Tắc Tự Động Kích Hoạt
Framework Contex1 hỗ trợ tự động kích hoạt các MCP server dựa trên context:

#### Excel MCP
- **Khi nào**: File .xlsx/.xls, phân tích dữ liệu, báo cáo
- **Keywords**: "spreadsheet", "excel", "data analysis"

#### Pandoc MCP
- **Khi nào**: Chuyển đổi MD↔HTML↔PDF↔DOCX, tạo reports
- **Keywords**: "convert", "pdf", "docx", "markdown"

#### Graphlit MCP
- **Khi nào**: Knowledge base, chat với documents, extract data
- **Keywords**: "search documents", "analyze content", "extract data"

#### GitHub MCP
- **Khi nào**: Deploy, backup, collaboration, version control
- **Keywords**: "deploy", "backup", "share code", "version control"

#### Notion MCP
- **Khi nào**: Tạo/quản lý trang Notion, database, báo cáo, documentation
- **Keywords**: "notion", "documentation", "database", "report", "share"

### Best Practices
- **Chain MCPs**: MarkItDown → Excel → Pandoc → GitHub → Notion
- **Document workflow**: MarkItDown (convert) → Analysis → Report generation
- **Batch operations** thay vì single calls
- **Clear progress indicators** cho async operations
- **Error handling** với fallback options

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

### Lợi ích:
- Giảm lỗi AI
- Code chất lượng cao
- Tăng năng suất

## Áp Dụng Trong Framework

### Tích Hợp Với Story-Driven Development
1. **Story Definition**: Áp dụng nguyên tắc "Less, but better" khi định nghĩa câu chuyện
2. **Implementation**: Tuân theo tiêu chuẩn code quality và UI/UX
3. **Progress Tracking**: Sử dụng format báo cáo chuẩn
4. **Quality Assurance**: Kiểm tra theo checklist tiêu chuẩn

### Template Integration
Các template trong framework sẽ tự động áp dụng:
- Thiết kế tối giản
- Cấu trúc code chuẩn
- Format báo cáo nhất quán
- Tích hợp MCP server phù hợp

### Validation Checklist
Mỗi câu chuyện hoàn thành phải đáp ứng:
- [ ] Tuân theo nguyên tắc "Less, but better"
- [ ] Code quality standards được áp dụng
- [ ] UI/UX guidelines được tuân thủ
- [ ] MCP servers được sử dụng hiệu quả
- [ ] Documentation đầy đủ và tối giản
- [ ] Performance được tối ưu
- [ ] Security best practices được áp dụng

---

*Các tiêu chuẩn này được tích hợp sâu vào framework Contex1 để đảm bảo mọi dự án được phát triển đều đạt chất lượng cao và tính nhất quán theo triết lý "Less, but better".*