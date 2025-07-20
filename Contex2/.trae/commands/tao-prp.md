# Tạo PRP

## File tính năng: $ARGUMENTS

Tạo một PRP hoàn chỉnh cho việc triển khai tính năng tổng quát với nghiên cứu kỹ lưỡng. Đảm bảo ngữ cảnh được truyền đến AI agent để cho phép tự validation và cải tiến lặp đi lặp lại. Đọc file tính năng trước để hiểu những gì cần được tạo, các ví dụ được cung cấp giúp như thế nào, và bất kỳ cân nhắc nào khác.

AI agent chỉ nhận được ngữ cảnh mà bạn đang thêm vào PRP và training data. Giả định rằng AI agent có quyền truy cập vào codebase và cùng knowledge cutoff như bạn, vì vậy điều quan trọng là các phát hiện nghiên cứu của bạn được bao gồm hoặc tham chiếu trong PRP. Agent có khả năng Websearch, vì vậy hãy truyền urls đến documentation và examples.

## Quy trình Nghiên cứu

1. **Phân tích Codebase**
   - Tìm kiếm các tính năng/patterns tương tự trong codebase
   - Xác định các files để tham chiếu trong PRP
   - Ghi chú các conventions hiện có cần tuân theo
   - Kiểm tra test patterns cho phương pháp validation

2. **Nghiên cứu Bên ngoài**
   - Tìm kiếm các tính năng/patterns tương tự online
   - Tài liệu thư viện (bao gồm URLs cụ thể)
   - Ví dụ triển khai (GitHub/StackOverflow/blogs)
   - Best practices và common pitfalls

3. **Làm rõ với User** (nếu cần)
   - Patterns cụ thể để mirror và nơi tìm thấy chúng?
   - Yêu cầu integration và nơi tìm thấy chúng?

## Tạo PRP

Sử dụng PRPs/templates/prp_base.md làm template:

### Ngữ cảnh Quan trọng để Bao gồm và truyền đến AI agent như một phần của PRP
- **Documentation**: URLs với các phần cụ thể
- **Code Examples**: Snippets thực từ codebase
- **Gotchas**: Quirks thư viện, vấn đề version
- **Patterns**: Các phương pháp hiện có cần tuân theo

### Blueprint Triển khai
- Bắt đầu với pseudocode hiển thị phương pháp
- Tham chiếu các files thực cho patterns
- Bao gồm chiến lược xử lý lỗi
- Liệt kê các tasks cần hoàn thành để thực hiện PRP theo thứ tự chúng nên được hoàn thành

### Validation Gates (Phải có thể Thực thi) ví dụ cho python
```bash
# Syntax/Style
ruff check --fix && mypy .

# Unit Tests
uv run pytest tests/ -v

```

*** QUAN TRỌNG SAU KHI BẠN HOÀN THÀNH NGHIÊN CỨU VÀ KHÁM PHÁ CODEBASE TRƯỚC KHI BẮT ĐẦU VIẾT PRP ***

*** ULTRATHINK VỀ PRP VÀ LẬP KẾ HOẠCH PHƯƠNG PHÁP CỦA BẠN SAU ĐÓ BẮT ĐẦU VIẾT PRP ***

## Output
Lưu dưới dạng: `PRPs/{ten-tinh-nang}.md`

## Checklist Chất lượng
- [ ] Tất cả ngữ cảnh cần thiết được bao gồm
- [ ] Validation gates có thể thực thi bởi AI
- [ ] Tham chiếu các patterns hiện có
- [ ] Đường dẫn triển khai rõ ràng
- [ ] Xử lý lỗi được tài liệu hóa
- [ ] Bao gồm examples cụ thể từ codebase
- [ ] URLs tài liệu được cung cấp
- [ ] Gotchas và pitfalls được đề cập

Đánh giá PRP trên thang điểm 1-10 (mức độ tin tưởng để thành công trong triển khai một lần sử dụng Trae)

Hãy nhớ: Mục tiêu là thành công triển khai một lần thông qua ngữ cảnh toàn diện.

## Hướng dẫn Ngôn ngữ
- Sử dụng tiếng Việt cho tất cả documentation và comments
- Code và variable names sử dụng tiếng Anh
- Đảm bảo PRP dễ hiểu và chi tiết
- Bao gồm giải thích cho các technical terms phức tạp