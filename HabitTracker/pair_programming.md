# Framework Phát Triển Dựa Trên Câu Chuyện

Tài liệu này phác thảo phương pháp có cấu trúc của chúng ta để xây dựng phần mềm thông qua phát triển dựa trên câu chuyện với sự hỗ trợ của AI.

## Triết Lý Cốt Lõi

**Phát Triển Dựa Trên Câu Chuyện** chia nhỏ các dự án phần mềm phức tạp thành những câu chuyện có thể quản lý, có thể kiểm thử được hoàn thành trong 1-3 giờ. Mỗi câu chuyện đại diện cho một tính năng hoặc cải tiến cụ thể với tiêu chí chấp nhận rõ ràng và yêu cầu xác thực.

## Quy Trình 7 Bước Cho Câu Chuyện

Mọi câu chuyện đều tuân theo quy trình chính xác này:

### 1. Lựa Chọn & Lập Kế Hoạch Câu Chuyện
- **Đầu vào**: Xem xét `project_plan.md` cho câu chuyện ưu tiên tiếp theo
- **Hành động**: Hiểu yêu cầu, tiêu chí chấp nhận và phương pháp kỹ thuật
- **Đầu ra**: Hiểu rõ những gì cần được xây dựng
- **Xác thực**: Câu chuyện có tiêu chí chấp nhận rõ ràng, có thể kiểm thử

### 2. Chuẩn Bị Triển Khai
- **Đầu vào**: Yêu cầu câu chuyện và trạng thái codebase hiện tại
- **Hành động**: 
  - Đọc các file liên quan từ danh sách bắt đầu nhanh `CLAUDE.md`
  - Xem xét `technical_considerations.md` cho bài học kinh nghiệm
  - Hiểu các patterns và kiến trúc hiện có
- **Đầu ra**: Kế hoạch triển khai với phương pháp kỹ thuật cụ thể
- **Xác thực**: Kế hoạch giải quyết tất cả tiêu chí chấp nhận

### 3. Triển Khai
- **Đầu vào**: Kế hoạch triển khai và codebase
- **Hành động**: Viết code theo các patterns và tiêu chuẩn đã thiết lập
- **Đầu ra**: Triển khai hoạt động của câu chuyện
- **Xác thực**: Code biên dịch và tuân theo tiêu chuẩn dự án

### 4. Kiểm Thử & Xác Minh
- **Đầu vào**: Code đã triển khai
- **Hành động**: 
  - Chạy automated tests (nếu có)
  - Xác minh chức năng đáp ứng tiêu chí chấp nhận
  - Kiểm tra regressions
- **Đầu ra**: Triển khai hoạt động đã được xác minh
- **Xác thực**: Tất cả tiêu chí chấp nhận được đáp ứng

### 5. Yêu Cầu Xác Minh Từ Con Người
- **Đầu vào**: Triển khai đã hoàn thành
- **Hành động**: Yêu cầu xác minh từ con người sử dụng định dạng chính xác bên dưới
- **Đầu ra**: Yêu cầu xác minh rõ ràng
- **Xác thực**: Yêu cầu bao gồm tất cả thông tin cần thiết

### 6. Tích Hợp Phản Hồi Từ Con Người
- **Đầu vào**: Phản hồi từ con người và kết quả xác minh
- **Hành động**: Giải quyết bất kỳ vấn đề hoặc thay đổi được yêu cầu
- **Đầu ra**: Triển khai được tinh chỉnh
- **Xác thực**: Tất cả phản hồi từ con người được giải quyết

### 7. Hoàn Thành Câu Chuyện
- **Đầu vào**: Triển khai đã được xác minh và phê duyệt
- **Hành động**: 
  - Cập nhật `project_plan.md` với trạng thái hoàn thành
  - Cập nhật `technical_considerations.md` với bài học kinh nghiệm
  - Chuẩn bị cho câu chuyện tiếp theo
- **Đầu ra**: Câu chuyện hoàn thành và tài liệu được cập nhật
- **Xác thực**: Tài liệu được cập nhật, sẵn sàng cho câu chuyện tiếp theo

## Định Dạng Xác Minh Từ Con Người

**Sử dụng định dạng chính xác này cho mọi yêu cầu xác minh:**

```
## Yêu Cầu Xác Minh Câu Chuyện

**Câu Chuyện**: [TÊN_CÂU_CHUYỆN]

**Tóm Tắt Triển Khai**:
- [Thay đổi chính 1]
- [Thay đổi chính 2]
- [Thay đổi chính 3]

**Files Đã Sửa Đổi**:
- `[file1]` - [mô tả thay đổi]
- `[file2]` - [mô tả thay đổi]

**Kiểm Thử Đã Thực Hiện**:
- [Test 1]: [Kết quả]
- [Test 2]: [Kết quả]
- [Test 3]: [Kết quả]

**Xác Minh Tiêu Chí Chấp Nhận**:
- ✅ [Tiêu chí 1]: [Cách xác minh]
- ✅ [Tiêu chí 2]: [Cách xác minh]
- ✅ [Tiêu chí 3]: [Cách xác minh]

**Sẵn sàng cho xác minh từ con người**
```

## Cập Nhật Tài Liệu

Sau khi hoàn thành mỗi câu chuyện, cập nhật các file này:

### `CLAUDE.md`
- Thêm patterns mới hoặc quyết định kiến trúc
- Cập nhật các vấn đề đã biết và giải pháp
- Tinh chỉnh hướng dẫn phát triển

### `technical_considerations.md`
- Ghi lại bài học kinh nghiệm
- Ghi lại quyết định triển khai và lý do
- Ghi chú bất kỳ technical debt hoặc cải tiến trong tương lai

### `project_plan.md`
- Đánh dấu câu chuyện đã hoàn thành
- Cập nhật theo dõi tiến độ
- Điều chỉnh ưu tiên nếu cần

## Tiêu Chuẩn Chất Lượng

### Chất Lượng Code
- Tuân theo tiêu chuẩn coding đã thiết lập
- Sử dụng quy ước đặt tên nhất quán
- Triển khai xử lý lỗi đúng cách
- Viết code rõ ràng, dễ bảo trì

### Yêu Cầu Kiểm Thử
- Xác minh tất cả tiêu chí chấp nhận
- Kiểm thử edge cases và điều kiện lỗi
- Đảm bảo không có regressions trong chức năng hiện có
- Ghi lại bất kỳ bước kiểm thử thủ công nào

### Tiêu Chuẩn Tài Liệu
- Cập nhật tài liệu liên quan
- Bao gồm commit messages rõ ràng
- Ghi lại bất kỳ breaking changes nào
- Duy trì architectural decision records

## Mẫu Giao Tiếp

### Cập Nhật Tiến Độ
- Cung cấp cập nhật trạng thái rõ ràng ở mỗi bước
- Nổi bật bất kỳ blockers hoặc thách thức nào
- Yêu cầu làm rõ khi yêu cầu không rõ ràng

### Leo Thang Vấn Đề
- Leo thang technical blockers ngay lập tức
- Cung cấp ngữ cảnh và các giải pháp đã thử
- Đề xuất phương pháp thay thế khi có thể

### Chia Sẻ Kiến Thức
- Ghi lại patterns và giải pháp có thể tái sử dụng
- Chia sẻ insights về lựa chọn công nghệ
- Giải thích quyết định triển khai phức tạp

## Quy Trình Khẩn Cấp

### Lỗi Build
1. Xác định lỗi cụ thể
2. Kiểm tra các thay đổi gần đây để tìm vấn đề rõ ràng
3. Tham khảo `technical_considerations.md` cho các giải pháp đã biết
4. Nếu chưa giải quyết được, leo thang với đầy đủ ngữ cảnh lỗi

### Mơ Hồ Yêu Cầu
1. Ghi lại sự mơ hồ cụ thể
2. Đề xuất các cách hiểu hợp lý
3. Yêu cầu làm rõ trước khi tiếp tục
4. Cập nhật tiêu chí chấp nhận câu chuyện sau khi được làm rõ

### Nợ Kỹ Thuật
1. Ghi lại debt trong `technical_considerations.md`
2. Đánh giá tác động đến câu chuyện hiện tại
3. Đề xuất timeline giải quyết
4. Tiếp tục với câu chuyện nếu debt không cản trở tiến độ

## Chỉ Số Thành Công

### Hoàn Thành Câu Chuyện
- ✅ Tất cả tiêu chí chấp nhận được đáp ứng
- ✅ Tiêu chuẩn chất lượng code được duy trì
- ✅ Tài liệu được cập nhật
- ✅ Xác minh từ con người được thông qua

### Hiệu Quả Quy Trình
- Câu chuyện hoàn thành trong khung thời gian 1-3 giờ
- Tối thiểu trao đổi qua lại về yêu cầu
- Chất lượng nhất quán qua các câu chuyện
- Thu thập và tái sử dụng kiến thức hiệu quả

### Xây Dựng Kiến Thức
- `technical_considerations.md` phát triển với mỗi câu chuyện
- Patterns trở nên có thể tái sử dụng qua các câu chuyện
- Tốc độ phát triển tăng theo thời gian
- Ít lặp lại sai lầm hoặc vấn đề hơn

---

**Framework Customization:**
- Adapt testing requirements to your technology stack
- Modify verification format for your project needs
- Adjust story size guidelines based on complexity
- Customize quality standards for your domain

**Benefits of This Approach:**
- ✅ Predictable development process
- ✅ Clear quality gates
- ✅ Systematic knowledge capture
- ✅ Reduced risk through small iterations
- ✅ Consistent delivery standards
