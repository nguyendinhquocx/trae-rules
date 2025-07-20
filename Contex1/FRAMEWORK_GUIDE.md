# Framework Phát Triển Dựa Trên Câu Chuyện - Hướng Dẫn Hoàn Chỉnh

Hướng dẫn toàn diện này giải thích cách sử dụng Framework Phát Triển Dựa Trên Câu Chuyện để xây dựng bất kỳ ứng dụng nào chỉ với một prompt.

## Mục Lục

1. [Triết Lý Framework](#triết-lý-framework)
2. [Thiết Lập và Khởi Tạo](#thiết-lập-và-khởi-tạo)
3. [Quy Trình 7 Bước](#quy-trình-7-bước)
4. [Hướng Dẫn Sử Dụng Template](#hướng-dẫn-sử-dụng-template)
5. [Thực Hành Tốt Nhất Khi Hợp Tác Với AI](#thực-hành-tốt-nhất-khi-hợp-tác-với-ai)
6. [Đảm Bảo Chất Lượng](#đảm-bảo-chất-lượng)
7. [Mẫu Thông Dụng và Ví Dụ](#mẫu-thông-dụng-và-ví-dụ)
8. [Hướng Dẫn Khắc Phục Sự Cố](#hướng-dẫn-khắc-phục-sự-cố)
9. [Kỹ Thuật Nâng Cao](#kỹ-thuật-nâng-cao)

## Triết Lý Framework

### Khái Niệm Cốt Lõi

**Phát Triển Dựa Trên Câu Chuyện** chia nhỏ các ứng dụng phức tạp thành những câu chuyện có thể quản lý được, tập trung vào người dùng. Mỗi câu chuyện đại diện cho một phần chức năng hoàn chỉnh mang lại giá trị cho người dùng.

**Nguyên Tắc Chính:**
- **Lấy Người Dùng Làm Trung Tâm**: Mọi câu chuyện đều tập trung vào giá trị người dùng
- **Tăng Dần**: Xây dựng chức năng từng phần một
- **Được Xác Thực**: Mỗi câu chuyện được kiểm thử và xác minh kỹ lưỡng
- **Có Tài Liệu**: Duy trì tài liệu toàn diện trong suốt quá trình
- **Hợp Tác**: AI và con người làm việc cùng nhau hiệu quả

### Tại Sao Phương Pháp Này Hiệu Quả

1. **Giảm Độ Phức Tạp**: Các dự án lớn trở thành những phần có thể quản lý
2. **Cải Thiện Chất Lượng**: Xác thực ở mỗi bước ngăn ngừa vấn đề
3. **Cho Phép Lặp Lại**: Dễ dàng điều chỉnh dựa trên phản hồi
4. **Duy Trì Tập Trung**: Mục tiêu rõ ràng cho mỗi chu kỳ phát triển
5. **Mở Rộng Hiệu Quả**: Quy trình hoạt động cho cả dự án nhỏ và lớn

## Thiết Lập và Khởi Tạo

### Bước 1: Thiết Lập Dự Án

1. **Sao Chép Các Tệp Framework**
   ```
   cp -r Contex1/ ten-du-an-cua-ban/
   cd ten-du-an-cua-ban/
   ```

2. **Khởi Tạo Repository Git** (được khuyến nghị)
   ```
   git init
   git add .
   git commit -m "Thiết lập framework ban đầu"
   ```

### Bước 2: Định Nghĩa Ngữ Cảnh Dự Án

**Điền thông tin cụ thể của bạn vào PROJECT_CONTEXT.md:**

```markdown
# Ví dụ: Nền Tảng Thương Mại Điện Tử

## Ngữ Cảnh Kinh Doanh
### Phát Biểu Vấn Đề
**Vấn Đề Chính**: Các doanh nghiệp nhỏ cần một cửa hàng trực tuyến giá cả phải chăng, dễ sử dụng
**Người Dùng Mục Tiêu**: Chủ doanh nghiệp nhỏ với kiến thức kỹ thuật hạn chế
**Điểm Đau Hiện Tại**: 
- Các giải pháp hiện có quá đắt
- Thiết lập và bảo trì phức tạp
- Tùy chọn tùy chỉnh hạn chế
```

**Các Phần Chính Cần Hoàn Thành:**
- Ngữ Cảnh Kinh Doanh và Phát Biểu Vấn Đề
- Personas Người Dùng và Quy Trình Làm Việc
- Yêu Cầu Chức Năng
- Ràng Buộc Kỹ Thuật
- Tiêu Chí Thành Công

### Bước 3: Tạo Kế Hoạch Dự Án Ban Đầu

**Cập nhật project_plan.md với:**

```markdown
# Kế Hoạch Dự Án Nền Tảng Thương Mại Điện Tử

## Tổng Quan Dự Án
**Tên Dự Án**: SimpleStore
**Tầm Nhìn**: Nền tảng thương mại điện tử giá cả phải chăng, dễ sử dụng cho doanh nghiệp nhỏ
**Mục Tiêu Ra Mắt**: Q2 2024

## Giai Đoạn 1: MVP (Tháng 1-2)
### Các Câu Chuyện:
1. Đăng Ký và Xác Thực Người Dùng
2. Quản Lý Danh Mục Sản Phẩm
3. Chức Năng Giỏ Hàng
4. Quy Trình Thanh Toán Cơ Bản
5. Bảng Điều Khiển Quản Lý Đơn Hàng
```

### Bước 4: Định Nghĩa Kiến Trúc

**Hoàn thành architecture.md với:**

```markdown
# Kiến Trúc SimpleStore

## Ngăn Xếp Công Nghệ
**Frontend**: React với TypeScript
**Backend**: Node.js với Express
**Cơ Sở Dữ Liệu**: PostgreSQL
**Xác Thực**: JWT với bcrypt
**Thanh Toán**: Tích hợp Stripe
**Hosting**: AWS (EC2, RDS, S3)
```

## Quy Trình 7 Bước

### Bước 1: Phân Tích Câu Chuyện

**Mục Tiêu**: Hiểu yêu cầu và định nghĩa tiêu chí chấp nhận

**Hoạt Động:**
- Chia nhỏ câu chuyện thành các yêu cầu cụ thể
- Xác định quy trình làm việc của người dùng và các trường hợp biên
- Định nghĩa tiêu chí chấp nhận rõ ràng
- Ước tính độ phức tạp và nỗ lực

**Ví Dụ:**
```markdown
## Câu Chuyện: Đăng Ký và Xác Thực Người Dùng

### Yêu Cầu:
- Người dùng có thể tạo tài khoản với email/mật khẩu
- Yêu cầu xác minh email
- Chức năng đặt lại mật khẩu
- Quản lý phiên bảo mật

### Tiêu Chí Chấp Nhận:
- [ ] Người dùng có thể đăng ký với email hợp lệ và mật khẩu mạnh
- [ ] Liên kết xác minh email được gửi và hoạt động
- [ ] Người dùng có thể đăng nhập với thông tin đã xác minh
- [ ] Người dùng có thể đặt lại mật khẩu qua email
- [ ] Phiên hết hạn sau 24 giờ không hoạt động
```

### Bước 2: Thiết Kế Kỹ Thuật

**Mục Tiêu**: Lập kế hoạch phương pháp triển khai và kiến trúc

**Hoạt Động:**
- Thiết kế mô hình dữ liệu và API endpoints
- Lập kế hoạch cấu trúc và tương tác thành phần
- Xác định phụ thuộc và điểm tích hợp
- Xem xét tác động bảo mật và hiệu suất

**Ví Dụ:**
```markdown
## Thiết Kế Kỹ Thuật: Xác Thực Người Dùng

### Mô Hình Dữ Liệu:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
```

### Bước 3: Triển Khai

**Mục Tiêu**: Viết code sạch, dễ bảo trì

**Hoạt Động:**
- Triển khai backend APIs và mô hình cơ sở dữ liệu
- Tạo các thành phần và trang frontend
- Thêm xử lý lỗi và xác thực phù hợp
- Tuân theo tiêu chuẩn coding và thực hành tốt nhất

**Thực Hành Tốt Nhất:**
- Viết code tự mô tả với tên biến rõ ràng
- Thêm comment cho logic phức tạp
- Sử dụng phong cách coding nhất quán
- Triển khai xử lý lỗi phù hợp
- Tuân theo thực hành bảo mật tốt nhất

### Bước 4: Kiểm Thử

**Mục Tiêu**: Xác minh chức năng và các trường hợp biên

**Hoạt Động:**
- Viết unit tests cho các hàm riêng lẻ
- Tạo integration tests cho API endpoints
- Kiểm thử quy trình làm việc của người dùng end-to-end
- Xác minh xử lý lỗi và các trường hợp biên

**Danh Sách Kiểm Tra Testing:**
- [ ] Unit tests cho tất cả business logic
- [ ] API endpoint tests với các đầu vào khác nhau
- [ ] Frontend component tests
- [ ] End-to-end user workflow tests
- [ ] Error handling và validation tests
- [ ] Security vulnerability tests

### Bước 5: Tích Hợp

**Mục Tiêu**: Đảm bảo tương thích với code hiện có

**Hoạt Động:**
- Tích hợp code mới với hệ thống hiện có
- Kiểm thử tương tác giữa các thành phần
- Xác minh tính nhất quán và toàn vẹn dữ liệu
- Cập nhật cấu hình và scripts triển khai

**Danh Sách Kiểm Tra Tích Hợp:**
- [ ] Code mới tích hợp mà không phá vỡ chức năng hiện có
- [ ] Database migrations chạy thành công
- [ ] Thay đổi API tương thích ngược
- [ ] Frontend routing và navigation hoạt động chính xác
- [ ] Tích hợp bên thứ ba hoạt động đúng

### Bước 6: Tài Liệu

**Mục Tiêu**: Cập nhật tài liệu liên quan

**Hoạt Động:**
- Cập nhật tài liệu API
- Thêm hướng dẫn người dùng và văn bản trợ giúp
- Tài liệu hóa thay đổi cấu hình
- Cập nhật hướng dẫn triển khai và bảo trì

**Cập Nhật Tài Liệu:**
- [ ] Tài liệu API phản ánh endpoints mới
- [ ] Hướng dẫn người dùng bao gồm tính năng mới
- [ ] Tài liệu kỹ thuật được cập nhật
- [ ] Hướng dẫn triển khai phản ánh thay đổi
- [ ] Hướng dẫn khắc phục sự cố được cập nhật

### Bước 7: Xác Thực

**Mục Tiêu**: Xác nhận hoàn thành câu chuyện và chất lượng

**Hoạt Động:**
- Xem xét tất cả tiêu chí chấp nhận
- Tiến hành code review
- Thực hiện user acceptance testing
- Cập nhật theo dõi dự án và metrics

**Danh Sách Kiểm Tra Xác Thực:**
- [ ] Tất cả tiêu chí chấp nhận được đáp ứng
- [ ] Code review hoàn thành và được phê duyệt
- [ ] User acceptance testing đã vượt qua
- [ ] Yêu cầu hiệu suất được đáp ứng
- [ ] Security review hoàn thành
- [ ] Tài liệu được cập nhật và xem xét

## Template Usage Guide

### PROJECT_CONTEXT.md Usage

**When to Update:**
- At project start (complete initial version)
- When requirements change significantly
- After user feedback sessions
- During project retrospectives

**Key Tips:**
- Be specific and concrete in descriptions
- Include real user quotes and feedback
- Update assumptions as you learn more
- Keep business rules current and accurate

### project_plan.md Usage

**Story Creation Guidelines:**
```markdown
## Story Template
**Title**: [Descriptive name]
**Priority**: [High/Medium/Low]
**Estimate**: [Story points or time]
**Dependencies**: [Other stories this depends on]

### User Story
As a [user type], I want [functionality] so that [benefit].

### Acceptance Criteria
- [ ] [Specific, testable criterion 1]
- [ ] [Specific, testable criterion 2]
- [ ] [Specific, testable criterion 3]

### Technical Notes
[Any technical considerations or constraints]
```

**Story Sizing Guidelines:**
- **Small (1-2 days)**: Simple CRUD operations, UI updates
- **Medium (3-5 days)**: Complex business logic, integrations
- **Large (1-2 weeks)**: Major features, architectural changes

### architecture.md Usage

**When to Update:**
- Before starting development
- When adding new technologies
- After major architectural decisions
- During technical debt reduction

**Architecture Decision Template:**
```markdown
## Decision: [Title]
**Date**: [YYYY-MM-DD]
**Status**: [Proposed/Accepted/Deprecated]

### Context
[What is the issue that we're seeing that is motivating this decision?]

### Decision
[What is the change that we're proposing or have agreed to implement?]

### Consequences
[What becomes easier or more difficult to do and any risks introduced?]
```

## AI Collaboration Best Practices

### Effective Prompting

**Initial Project Prompt Structure:**
```
I want to build [application type] that [main purpose].

Key features needed:
1. [Feature 1 with user benefit]
2. [Feature 2 with user benefit]
3. [Feature 3 with user benefit]

Target users: [User description]
Technical constraints: [Any limitations]
Success criteria: [How to measure success]

Please help me break this down into stories and start development.
```

**Story-Level Prompts:**
```
I'm ready to work on the story: "[Story Title]"

Acceptance criteria:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

Please help me follow the 7-step process for this story.
```

### Context Management

**Always Provide:**
- Current project context (PROJECT_CONTEXT.md)
- Relevant architecture decisions (architecture.md)
- Current project state (project_plan.md)
- Any recent technical considerations

**Update Regularly:**
- Share progress after each story
- Communicate any blockers or changes
- Provide feedback on AI suggestions
- Update context documents as needed

### Communication Guidelines

**Be Specific:**
- Provide exact error messages
- Include relevant code snippets
- Describe expected vs. actual behavior
- Share specific user feedback

**Ask for Clarification:**
- When requirements are unclear
- When multiple approaches are possible
- When trade-offs need to be considered
- When you need more context

## Quality Assurance

### Code Quality Standards

**Code Style:**
- Consistent naming conventions
- Proper indentation and formatting
- Meaningful variable and function names
- Appropriate comments and documentation

**Architecture:**
- Clear separation of concerns
- Proper abstraction levels
- Minimal coupling between components
- Consistent patterns and conventions

**Security:**
- Input validation and sanitization
- Proper authentication and authorization
- Secure data storage and transmission
- Regular security reviews

### Testing Standards

**Unit Testing:**
- Test all business logic functions
- Cover edge cases and error conditions
- Maintain high code coverage (>80%)
- Use descriptive test names

**Integration Testing:**
- Test API endpoints with various inputs
- Verify database operations
- Test third-party integrations
- Validate error handling

**End-to-End Testing:**
- Test complete user workflows
- Verify UI functionality
- Test across different browsers/devices
- Validate performance requirements

### Documentation Standards

**Code Documentation:**
- Document complex algorithms
- Explain business logic decisions
- Include usage examples
- Keep comments current

**User Documentation:**
- Clear step-by-step instructions
- Include screenshots and examples
- Address common questions
- Provide troubleshooting guides

**Technical Documentation:**
- Architecture diagrams and explanations
- API documentation with examples
- Deployment and configuration guides
- Maintenance and monitoring procedures

## Common Patterns and Examples

### Pattern 1: CRUD Operations

**Story**: "User can manage products in their catalog"

**Implementation Approach:**
1. **Analysis**: Define product data model and operations
2. **Design**: Plan REST API and database schema
3. **Implementation**: Create API endpoints and UI components
4. **Testing**: Test all CRUD operations and validations
5. **Integration**: Ensure proper authentication and authorization
6. **Documentation**: Update API docs and user guides
7. **Validation**: Verify all acceptance criteria

### Pattern 2: Third-Party Integration

**Story**: "Users can process payments through Stripe"

**Implementation Approach:**
1. **Analysis**: Understand payment flow and requirements
2. **Design**: Plan integration architecture and error handling
3. **Implementation**: Integrate Stripe SDK and webhooks
4. **Testing**: Test payment scenarios and edge cases
5. **Integration**: Connect with order management system
6. **Documentation**: Document payment configuration
7. **Validation**: Verify security and compliance

### Pattern 3: User Interface Enhancement

**Story**: "Users have an intuitive dashboard to view key metrics"

**Implementation Approach:**
1. **Analysis**: Define metrics and user workflows
2. **Design**: Create wireframes and component structure
3. **Implementation**: Build responsive UI components
4. **Testing**: Test across devices and browsers
5. **Integration**: Connect with backend data sources
6. **Documentation**: Update user guides with screenshots
7. **Validation**: Conduct user acceptance testing

## Troubleshooting Guide

### Common Issues and Solutions

**Issue**: Stories are too large and complex
**Solution**: 
- Break down into smaller, more focused stories
- Each story should be completable in 1-5 days
- Focus on single user workflow or feature
- Use story dependencies to manage complexity

**Issue**: Technical debt is accumulating
**Solution**:
- Schedule regular refactoring stories
- Address technical debt in each sprint
- Update architecture.md with debt tracking
- Balance feature development with maintenance

**Issue**: Quality issues and bugs
**Solution**:
- Strengthen testing in step 4
- Improve code review process
- Add more comprehensive acceptance criteria
- Implement automated testing where possible

**Issue**: Communication breakdown with AI
**Solution**:
- Provide more context and background
- Be specific about requirements and constraints
- Ask for clarification when needed
- Update framework documents regularly

**Issue**: Project scope creep
**Solution**:
- Regularly review and update PROJECT_CONTEXT.md
- Use story prioritization to manage scope
- Document scope changes and their impact
- Communicate changes to all stakeholders

### Debugging Process

**When Things Go Wrong:**

1. **Identify the Issue**
   - What specifically is not working?
   - When did the issue first appear?
   - What changed recently?

2. **Gather Information**
   - Review error messages and logs
   - Check recent code changes
   - Verify configuration and environment

3. **Isolate the Problem**
   - Test individual components
   - Use debugging tools and techniques
   - Create minimal reproduction cases

4. **Implement Solution**
   - Fix the root cause, not just symptoms
   - Test the fix thoroughly
   - Update documentation if needed

5. **Prevent Recurrence**
   - Add tests to catch similar issues
   - Update processes if needed
   - Document lessons learned

## Advanced Techniques

### Scaling the Framework

**For Large Projects:**
- Break into multiple phases with clear milestones
- Use story epics to group related functionality
- Implement continuous integration and deployment
- Add automated testing and quality gates

**For Multiple Teams:**
- Define clear interfaces between team responsibilities
- Use shared architecture and coding standards
- Implement regular integration and testing
- Coordinate story dependencies across teams

### Customization Strategies

**Domain-Specific Adaptations:**
- Add domain-specific sections to PROJECT_CONTEXT.md
- Create custom story templates for common patterns
- Develop domain-specific quality checklists
- Build libraries of reusable components

**Technology-Specific Adaptations:**
- Customize architecture.md for your tech stack
- Add technology-specific best practices
- Create deployment and configuration templates
- Develop automated testing strategies

### Continuous Improvement

**Regular Reviews:**
- Conduct retrospectives after each phase
- Update framework based on lessons learned
- Share improvements with team and community
- Measure and track framework effectiveness

**Metrics and Measurement:**
- Track story completion velocity
- Measure code quality metrics
- Monitor user satisfaction and adoption
- Analyze defect rates and resolution times

---

**Remember**: This framework is a living tool that should evolve with your needs and experience. Start with the basics, learn from each project, and continuously improve your development process.

**Happy building!** 🚀