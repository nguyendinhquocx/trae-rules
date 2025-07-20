# CLAUDE.md - Framework Phát Triển Dựa Trên Câu Chuyện

File này cung cấp hướng dẫn cho AI assistants khi làm việc với code trong repository này sử dụng phương pháp Story-Driven Development.

## Bắt Đầu Nhanh Cho Phiên Mới

**Trước khi bắt đầu bất kỳ công việc nào, hãy đọc các file này theo thứ tự:**

1. **`pair_programming.md`** - Quy trình workflow của chúng ta cho story-driven development
2. **`project_plan.md`** - Tiến độ hiện tại và câu chuyện tiếp theo cần làm việc
3. **`technical_considerations.md`** - Bài học kinh nghiệm và quyết định triển khai
4. **`architecture.md`** - Kiến trúc tổng thể và quyết định thiết kế
5. **`PROJECT_CONTEXT.md`** - Ngữ cảnh và yêu cầu cụ thể của dự án

**Lời nhắc workflow chính:**
- Luôn tuân theo quy trình câu chuyện 7 bước từ pair_programming.md
- Theo dõi tiến độ câu chuyện một cách có hệ thống
- Tuân theo định dạng xác minh của con người chính xác
- Cập nhật technical_considerations.md với bài học kinh nghiệm sau mỗi câu chuyện
- Không bao giờ bỏ qua các bước xác thực

## Tổng Quan Dự Án

Dự án này tuân theo phương pháp **Story-Driven Development** trong đó:
- Mỗi tính năng được phát triển như một user story hoàn chỉnh
- Các câu chuyện được chia nhỏ thành các bước triển khai có thể quản lý được
- Chất lượng và kiểm thử được tích hợp vào mọi bước
- Tiến độ được theo dõi một cách có hệ thống
- Xác minh của con người đảm bảo chất lượng tại mỗi mốc quan trọng

[PROJECT_NAME] là [PROJECT_DESCRIPTION]. 

**Người Dùng Mục Tiêu:** [TARGET_AUDIENCE]
**Mục Đích Cốt Lõi:** [MAIN_FUNCTIONALITY]
**Lợi Ích Chính:** [VALUE_PROPOSITION]

## Hướng Dẫn Giao Tiếp

### Khi Bắt Đầu Một Câu Chuyện Mới
1. **Xác nhận câu chuyện**: Xác nhận bạn hiểu user story và tiêu chí chấp nhận của nó
2. **Chia nhỏ công việc**: Phác thảo các bước kỹ thuật cần thiết
3. **Xác định phụ thuộc**: Ghi chú bất kỳ code hoặc component hiện có nào sẽ bị ảnh hưởng
4. **Đề xuất phương pháp**: Mô tả chiến lược kỹ thuật của bạn trước khi triển khai

### Trong Quá Trình Triển Khai
1. **Giải thích lý do**: Mô tả tại sao bạn đưa ra những lựa chọn kỹ thuật cụ thể
2. **Nêu bật sự đánh đổi**: Đề cập đến bất kỳ sự thỏa hiệp hoặc hạn chế nào trong phương pháp của bạn
3. **Yêu cầu làm rõ**: Khi yêu cầu không rõ ràng, hãy đặt câu hỏi cụ thể
4. **Hiển thị tiến độ**: Cung cấp cập nhật thường xuyên về những gì bạn đã hoàn thành

### Tiêu Chuẩn Chất Lượng Code
1. **Clean Code**: Viết code tự tài liệu hóa với tên biến và hàm rõ ràng
2. **Xử Lý Lỗi**: Triển khai xử lý lỗi toàn diện và phản hồi người dùng
3. **Hiệu Suất**: Xem xét tác động hiệu suất của các triển khai của bạn
4. **Bảo Mật**: Tuân theo best practices bảo mật cho xử lý dữ liệu và input người dùng
5. **Kiểm Thử**: Bao gồm unit tests và integration tests khi phù hợp
6. **Tài Liệu**: Thêm comment cho logic phức tạp và cập nhật tài liệu liên quan

### Ra Quyết Định Kỹ Thuật
1. **Nghiên Cứu Trước**: Kiểm tra các pattern và triển khai hiện có trong codebase
2. **Xem Xét Các Lựa Chọn Khác**: Đánh giá nhiều phương pháp trước khi chọn một
3. **Tài Liệu Hóa Quyết Định**: Ghi lại các quyết định kỹ thuật quan trọng và lý do của chúng
4. **Tìm Kiếm Phản Hồi**: Trình bày các lựa chọn khi có nhiều phương pháp hợp lệ

## Cấu Trúc File và Quy Ước

### Các File Chính Cần Duy Trì
- `PROJECT_CONTEXT.md`: Ngữ cảnh và yêu cầu cụ thể của dự án
- `project_plan.md`: Tiến độ hiện tại và backlog câu chuyện
- `architecture.md`: Kiến trúc hệ thống và quyết định thiết kế
- `technical_considerations.md`: Bài học kinh nghiệm và ghi chú triển khai
- `pair_programming.md`: Workflow phát triển và hướng dẫn quy trình

### Tổ Chức Code
- Tuân theo cấu trúc thư mục đã thiết lập
- Sử dụng quy ước đặt tên nhất quán
- Nhóm chức năng liên quan lại với nhau
- Tách biệt các mối quan tâm một cách phù hợp
- Giữ các component tập trung và có mục đích duy nhất

## Đảm Bảo Chất Lượng

### Trước Khi Submit Code
1. **Test Kỹ Lưỡng**: Xác minh tất cả chức năng hoạt động như mong đợi
2. **Kiểm Tra Edge Cases**: Test các điều kiện biên và kịch bản lỗi
3. **Xác Thực So Với Câu Chuyện**: Đảm bảo triển khai đáp ứng tất cả tiêu chí chấp nhận
4. **Review Chất Lượng Code**: Kiểm tra code smells, trùng lặp và khả năng bảo trì
5. **Cập Nhật Tài Liệu**: Đảm bảo tất cả tài liệu liên quan đều hiện tại

### Tiêu Chí Hoàn Thành Câu Chuyện
Một câu chuyện được hoàn thành khi:
- Tất cả tiêu chí chấp nhận được đáp ứng
- Code được test và hoạt động
- Tài liệu được cập nhật
- Tích hợp với các tính năng hiện có được xác minh
- Trải nghiệm người dùng được xác thực
- Nợ kỹ thuật được giảm thiểu

## Khắc Phục Các Vấn Đề Thường Gặp

### Khi Bị Kẹt Trong Triển Khai
1. **Review Code Tương Tự**: Tìm kiếm các pattern hiện có trong codebase
2. **Chia Nhỏ Hơn Nữa**: Chia vấn đề thành các phần nhỏ hơn
3. **Kiểm Tra Phụ Thuộc**: Xác minh tất cả các component cần thiết đều có sẵn
4. **Tham Khảo Tài Liệu**: Xem xét các cân nhắc kỹ thuật và tài liệu kiến trúc

### Khi Yêu Cầu Không Rõ Ràng
1. **Đặt Câu Hỏi Cụ Thể**: Yêu cầu làm rõ các điểm mơ hồ
2. **Đề Xuất Giải Pháp**: Gợi ý các phương pháp và yêu cầu xác thực
3. **Tạo Ví Dụ**: Sử dụng ví dụ cụ thể để làm rõ sự hiểu biết
4. **Tài Liệu Hóa Giả Định**: Ghi lại bất kỳ giả định nào bạn đang đưa ra

## Chỉ Số Thành Công

### Chỉ Số Chất Lượng Code
- Code có thể đọc được và được tài liệu hóa tốt
- Xử lý lỗi toàn diện
- Hiệu suất chấp nhận được
- Tuân theo best practices bảo mật
- Tests cung cấp coverage tốt

### Chỉ Số Thành Công Câu Chuyện
- Tiêu chí chấp nhận user story được đáp ứng đầy đủ
- Triển khai mạnh mẽ và xử lý edge cases
- Tích hợp với các tính năng hiện có liền mạch
- Trải nghiệm người dùng trực quan và phản hồi nhanh
- Nợ kỹ thuật không tăng

## Lệnh Phát Triển

### Phát Triển [TECHNOLOGY_STACK]
```bash
# Thêm các lệnh cụ thể cho dự án của bạn tại đây
# Ví dụ:
# npm start - Khởi động development server
# npm build - Build cho production
# npm test - Chạy tests
```

**Ghi Chú Quan Trọng:**
- [Thêm các ghi chú phát triển quan trọng]
- [Chỉ định lệnh nào KHÔNG nên chạy tự động]
- [Ghi chú các yêu cầu thiết lập đặc biệt]

## Tổng Quan Kiến Trúc

### Ngăn Xếp Công Nghệ
- **Frontend**: [FRONTEND_TECH]
- **Backend**: [BACKEND_TECH]
- **Database**: [DATABASE_TECH]
- **Triển Khai**: [DEPLOYMENT_PLATFORM]
- **Thư Viện Chính**: [IMPORTANT_LIBRARIES]

### Quyết Định Kiến Trúc
[ARCHITECTURE_SUMMARY]

**Trạng Thái Triển Khai:** [CURRENT_STATUS]

## Project Structure Overview

See `architecture.md` for detailed component organization. Key locations:
- `[SOURCE_DIR]/` - [SOURCE_DESCRIPTION]
- `[CONFIG_DIR]/` - [CONFIG_DESCRIPTION]
- `[DOCS_DIR]/` - [DOCS_DESCRIPTION]

## Domain-Specific Context

[PROJECT_DOMAIN_CONTEXT]

**Key Concepts:**
- [CONCEPT_1]: [DESCRIPTION]
- [CONCEPT_2]: [DESCRIPTION]
- [CONCEPT_3]: [DESCRIPTION]

## Development Guidelines

### Code Quality Standards
- Follow [CODING_STANDARDS]
- Use [NAMING_CONVENTIONS]
- Implement [ERROR_HANDLING_STRATEGY]
- Write [TESTING_REQUIREMENTS]

### Common Patterns
- [PATTERN_1]: [USAGE]
- [PATTERN_2]: [USAGE]
- [PATTERN_3]: [USAGE]

### Known Issues & Solutions
- [ISSUE_1] → [SOLUTION_1]
- [ISSUE_2] → [SOLUTION_2]
- [ISSUE_3] → [SOLUTION_3]

## Story-Driven Development Notes

### Story Characteristics
- Each story should be completable in 1-3 hours
- Stories must have clear acceptance criteria
- Include specific testing requirements
- Define "Definition of Done" clearly

### Validation Requirements
- [VALIDATION_TYPE_1]: [REQUIREMENTS]
- [VALIDATION_TYPE_2]: [REQUIREMENTS]
- [VALIDATION_TYPE_3]: [REQUIREMENTS]

### Human Verification Points
- [VERIFICATION_POINT_1]
- [VERIFICATION_POINT_2]
- [VERIFICATION_POINT_3]

---

**Template Usage Instructions:**
1. Replace all [PLACEHOLDER] values with project-specific information
2. Update development commands section with actual commands
3. Fill in architecture details in architecture.md
4. Create PROJECT_CONTEXT.md with domain-specific information
5. Customize validation requirements based on project needs

**Framework Benefits:**
- ✅ Structured development approach
- ✅ Clear validation gates
- ✅ Knowledge capture and reuse
- ✅ Consistent quality standards
- ✅ Reproducible development process
