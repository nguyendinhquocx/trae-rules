# Framework Phát Triển Dựa Trên Câu Chuyện

Một framework toàn diện để xây dựng bất kỳ ứng dụng nào chỉ với một prompt sử dụng phương pháp phát triển dựa trên câu chuyện. Framework này kết hợp quy trình phát triển có cấu trúc với việc triển khai hỗ trợ bởi AI để cung cấp phần mềm chất lượng cao một cách hiệu quả.

## Tổng Quan

Framework này cho phép bạn:
- Xây dựng ứng dụng hoàn chỉnh từ một prompt toàn diện duy nhất
- Tuân theo quy trình phát triển dựa trên câu chuyện 7 bước đã được chứng minh
- Duy trì chất lượng code cao thông qua xác thực có cấu trúc
- Tài liệu hóa và theo dõi tiến độ một cách có hệ thống
- Mở rộng từ MVP đến ứng dụng đầy đủ tính năng

## Cấu Trúc Framework

```
Contex1/
├── README.md                 # Tệp này - tổng quan framework và cách sử dụng
├── FRAMEWORK_GUIDE.md        # Hướng dẫn hoàn chỉnh sử dụng framework
├── development_standards.md  # Tiêu chuẩn phát triển và quy tắc cốt lõi
├── CLAUDE.md                 # Hướng dẫn và ngữ cảnh cho AI assistant
├── pair_programming.md       # Quy trình phát triển và tiêu chuẩn chất lượng
├── project_plan.md          # Template lập kế hoạch dự án và quản lý câu chuyện
├── architecture.md          # Template kiến trúc kỹ thuật
├── technical_considerations.md # Quyết định kỹ thuật và bài học kinh nghiệm
└── PROJECT_CONTEXT.md       # Template ngữ cảnh kinh doanh và yêu cầu
```

## Bắt Đầu Nhanh

### 1. Khởi Tạo Dự Án

1. **Đọc tiêu chuẩn phát triển**: Bắt đầu bằng việc đọc kỹ [development_standards.md](./development_standards.md) để hiểu các quy tắc cốt lõi

2. **Sao chép framework này** vào thư mục dự án của bạn

3. **Điền vào PROJECT_CONTEXT.md** với thông tin cụ thể của bạn:
   - Yêu cầu kinh doanh
   - Kiến thức lĩnh vực
   - Personas người dùng
   - Ràng buộc kỹ thuật
   - Tiêu chí thành công

4. **Cập nhật project_plan.md** với:
   - Tổng quan dự án
   - Phân tích câu chuyện ban đầu
   - Metrics thành công

5. **Định nghĩa architecture.md** với:
   - Ngăn xếp công nghệ
   - Kiến trúc hệ thống
   - Điểm tích hợp

### 2. Thiết Lập AI Assistant

1. **Cung cấp cho AI assistant** tất cả các tệp framework làm ngữ cảnh
2. **Chia sẻ prompt chính** mô tả những gì bạn muốn xây dựng
3. **Để AI** phân tích prompt thành các câu chuyện có thể quản lý
4. **Tuân theo quy trình 7 bước** cho mỗi câu chuyện

### 3. Quy Trình Phát Triển

Đối với mỗi câu chuyện, tuân theo quy trình 7 bước này:

1. **Phân Tích Câu Chuyện** - Phân tích yêu cầu và tiêu chí chấp nhận
2. **Thiết Kế Kỹ Thuật** - Lập kế hoạch cách tiếp cận triển khai và kiến trúc
3. **Triển Khai** - Viết code tuân theo best practices
4. **Kiểm Thử** - Xác minh chức năng và các trường hợp biên
5. **Tích Hợp** - Đảm bảo tương thích với code hiện có
6. **Tài Liệu** - Cập nhật tài liệu liên quan
7. **Xác Thực** - Xác nhận hoàn thành câu chuyện và chất lượng

## Nguyên Tắc Cốt Lõi

> **Quan Trọng**: Framework này tuân theo triết lý **"Less, but better"** và các tiêu chuẩn nghiêm ngặt được định nghĩa trong [development_standards.md](./development_standards.md).

### Phát Triển Dựa Trên Câu Chuyện
- **Câu Chuyện Là Đơn Vị**: Mỗi tính năng là một câu chuyện hoàn chỉnh, có thể kiểm thử
- **Tiến Độ Tăng Dần**: Xây dựng chức năng từng phần một
- **Tập Trung Người Dùng**: Tập trung vào giá trị và trải nghiệm người dùng
- **Cổng Xác Thực**: Xác minh mỗi câu chuyện trước khi tiếp tục

### Tiêu Chuẩn Chất Lượng
- **Chất Lượng Code**: Code sạch, dễ bảo trì, được tài liệu hóa tốt
- **Thiết Kế UI/UX**: Tuân thủ nguyên tắc "Less, but better" với focus vào accessibility
- **Kiểm Thử**: Test-driven development với coverage >80%
- **Tài Liệu**: Giữ tài liệu cập nhật và hữu ích
- **Hiệu Suất**: Tối ưu hóa từ sớm với mobile-first approach

### Hợp Tác AI
- **Nhận Thức Ngữ Cảnh**: AI hiểu ngữ cảnh kinh doanh và kỹ thuật
- **Quy Trình Có Cấu Trúc**: Tuân theo phương pháp phát triển đã được chứng minh
- **Đảm Bảo Chất Lượng**: Quy trình xác thực và đánh giá tích hợp sẵn
- **Học Tập Liên Tục**: Ghi lại bài học kinh nghiệm cho các câu chuyện tương lai

## Các Thành Phần Framework

### CLAUDE.md
**Mục đích**: Cung cấp cho AI assistant ngữ cảnh và hướng dẫn toàn diện
**Chứa**:
- Ngữ cảnh dự án và hiểu biết kinh doanh
- Kiến trúc kỹ thuật và ràng buộc
- Quy trình phát triển và tiêu chuẩn chất lượng
- Hướng dẫn giao tiếp và kỳ vọng

### pair_programming.md
**Mục đích**: Định nghĩa quy trình phát triển hợp tác
**Chứa**:
- Quy trình phát triển câu chuyện 7 bước
- Tiêu chuẩn chất lượng và tiêu chí xác thực
- Giao thức giao tiếp
- Quy trình khẩn cấp và leo thang

### PROJECT_CONTEXT.md
**Mục đích**: Ghi lại yêu cầu kinh doanh và kiến thức lĩnh vực
**Chứa**:
- Ngữ cảnh kinh doanh và phát biểu vấn đề
- Personas người dùng và quy trình làm việc
- Yêu cầu chức năng và phi chức năng
- Ràng buộc kỹ thuật và phụ thuộc

### project_plan.md
**Mục đích**: Quản lý lập kế hoạch dự án và theo dõi câu chuyện
**Chứa**:
- Tổng quan dự án và các giai đoạn
- Template câu chuyện và theo dõi
- Metrics tiến độ và vận tốc
- Tiêu chí thành công và cột mốc

### architecture.md
**Mục đích**: Tài liệu hóa kiến trúc kỹ thuật và quyết định
**Chứa**:
- Tổng quan kiến trúc hệ thống
- Ngăn xếp công nghệ và lý do
- Điểm tích hợp và luồng dữ liệu
- Cân nhắc bảo mật và hiệu suất

### technical_considerations.md
**Mục đích**: Ghi lại quyết định kỹ thuật và bài học kinh nghiệm
**Chứa**:
- Quyết định triển khai và lý do
- Thách thức kỹ thuật và giải pháp
- Tối ưu hóa hiệu suất
- Cải tiến tương lai và nợ kỹ thuật

## Mẫu Sử Dụng

### Cho Dự Án Mới
1. Bắt đầu với PROJECT_CONTEXT.md để định nghĩa yêu cầu
2. Sử dụng project_plan.md để phân tích thành câu chuyện
3. Định nghĩa architecture.md cho nền tảng kỹ thuật
4. Bắt đầu phát triển từng câu chuyện một

### Cho Dự Án Hiện Có
1. Phân tích trạng thái hiện tại và tài liệu hóa trong architecture.md
2. Định nghĩa các tính năng còn lại như câu chuyện trong project_plan.md
3. Cập nhật PROJECT_CONTEXT.md với hiểu biết hiện tại
4. Tiếp tục với phát triển dựa trên câu chuyện

### Cho Việc Thêm Tính Năng
1. Định nghĩa tính năng mới như câu chuyện trong project_plan.md
2. Cập nhật architecture.md nếu cần
3. Tuân theo quy trình 7 bước cho mỗi câu chuyện
4. Cập nhật tài liệu khi bạn tiến hành

## Phương Pháp Hay Nhất

### Định Nghĩa Câu Chuyện
- **Tiêu Chí Chấp Nhận Rõ Ràng**: Định nghĩa ý nghĩa của "hoàn thành"
- **Giá Trị Người Dùng**: Mỗi câu chuyện nên mang lại giá trị cho người dùng
- **Có Thể Kiểm Thử**: Câu chuyện nên có thể xác minh được
- **Độc Lập**: Giảm thiểu phụ thuộc giữa các câu chuyện

### Quy Trình Phát Triển
- **Tuân Theo 7 Bước**: Không bỏ qua các bước xác thực
- **Tài Liệu Hóa Quyết Định**: Ghi lại lý do để tham khảo trong tương lai
- **Kiểm Thử Sớm**: Xác thực chức năng khi bạn xây dựng
- **Lặp Lại**: Tinh chỉnh dựa trên phản hồi và học hỏi

### Đảm Bảo Chất Lượng
- **Đánh Giá Code**: Xem xét code về chất lượng và tiêu chuẩn
- **Kiểm Thử**: Kiểm thử đơn vị, tích hợp và chấp nhận người dùng
- **Tài Liệu**: Giữ tài liệu cập nhật và hữu ích
- **Hiệu Suất**: Giám sát và tối ưu hóa hiệu suất

## Chỉ Số Thành Công

### Vận Tốc Phát Triển
- Số câu chuyện hoàn thành mỗi lần lặp
- Thời gian từ khi bắt đầu đến hoàn thành câu chuyện
- Chỉ số chất lượng (lỗi, làm lại)

### Chất Lượng Code
- Độ bao phủ code và chất lượng kiểm thử
- Tính đầy đủ của tài liệu
- Tích lũy nợ kỹ thuật

### Giá Trị Người Dùng
- Việc áp dụng và sử dụng tính năng
- Sự hài lòng và phản hồi của người dùng
- Cải thiện chỉ số kinh doanh

## Khắc Phục Sự Cố

### Vấn Đề Thường Gặp

**Câu Chuyện Quá Lớn**
- Chia nhỏ thành các phần nhỏ hơn, dễ quản lý hơn
- Tập trung vào quy trình làm việc hoặc tính năng đơn lẻ của người dùng
- Đảm bảo mỗi câu chuyện có thể hoàn thành trong thời gian hợp lý

**Tích Lũy Nợ Kỹ Thuật**
- Câu chuyện tái cấu trúc thường xuyên
- Giải quyết nợ kỹ thuật một cách chủ động
- Cân bằng phát triển tính năng với bảo trì

**Vấn Đề Chất Lượng**
- Tăng cường các bước xác thực
- Cải thiện thực hành kiểm thử
- Xem xét và cập nhật tiêu chuẩn chất lượng

**Gián Đoạn Giao Tiếp**
- Kiểm tra và cập nhật trạng thái thường xuyên
- Tài liệu và theo dõi quyết định rõ ràng
- Quy trình leo thang cho các rào cản

## Phát Triển Framework

Framework này được thiết kế để phát triển theo nhu cầu của bạn:

### Tùy Chỉnh
- Điều chỉnh template cho lĩnh vực và công nghệ của bạn
- Thêm các phần và yêu cầu cụ thể của dự án
- Sửa đổi các bước quy trình dựa trên nhu cầu nhóm

### Cải Tiến
- Ghi lại bài học kinh nghiệm trong technical_considerations.md
- Cập nhật template dựa trên kinh nghiệm
- Chia sẻ cải tiến với cộng đồng

### Mở Rộng
- Sử dụng cho nhiều dự án và nhóm
- Phát triển tiêu chuẩn cụ thể của tổ chức
- Xây dựng thư viện các thành phần có thể tái sử dụng

## Hỗ Trợ và Cộng Đồng

### Nhận Trợ Giúp
- Xem xét tài liệu một cách kỹ lưỡng
- Kiểm tra technical_considerations.md cho các giải pháp phổ biến
- Tương tác với AI assistant để được hướng dẫn cụ thể

### Đóng Góp
- Chia sẻ cải tiến và tùy chỉnh
- Tài liệu hóa bài học kinh nghiệm
- Giúp đỡ người khác áp dụng framework

---

**Hãy nhớ**: Framework này là một công cụ để giúp bạn xây dựng phần mềm tốt hơn và nhanh hơn. Hãy điều chỉnh nó theo nhu cầu của bạn, học hỏi từ mỗi dự án, và liên tục cải thiện quy trình phát triển của bạn.

**Bắt đầu xây dựng ứng dụng tiếp theo của bạn ngay hôm nay chỉ với một prompt!**