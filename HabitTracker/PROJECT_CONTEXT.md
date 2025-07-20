# Ngữ Cảnh Dự Án - Habit Tracker

Tài liệu này cung cấp ngữ cảnh cụ thể theo lĩnh vực, yêu cầu kinh doanh và thông tin cụ thể của dự án Habit Tracker mà các trợ lý AI cần hiểu khi làm việc trên dự án này.

## Ngữ Cảnh Kinh Doanh

### Phát Biểu Vấn Đề
**Vấn Đề Chính**: Nhiều người gặp khó khăn trong việc xây dựng và duy trì thói quen tích cực hàng ngày
**Người Dùng Mục Tiêu**: Cá nhân muốn cải thiện lối sống thông qua việc theo dõi và xây dựng thói quen
**Điểm Đau Hiện Tại**: 
- Khó khăn trong việc theo dõi tiến độ thói quen hàng ngày
- Thiếu động lực và nhắc nhở để duy trì thói quen
- Không có cách thức trực quan để xem xu hướng và tiến bộ
- Dữ liệu thói quen bị phân tán, không có nơi tập trung

### Tổng Quan Giải Pháp
**Giải Pháp Của Chúng Ta**: Ứng dụng web đơn giản để theo dõi thói quen hàng ngày với lưu trữ dữ liệu trên Google Sheets
**Đề Xuất Giá Trị Chính**:
- Giao diện đơn giản, dễ sử dụng cho việc check-in thói quen hàng ngày
- Tự động lưu trữ dữ liệu vào Google Sheets để dễ dàng truy cập và phân tích
- Hiển thị streak (chuỗi ngày liên tiếp) để tạo động lực
- Báo cáo trực quan về tiến độ thói quen theo thời gian

**Chỉ Số Thành Công**:
- Tỷ lệ sử dụng hàng ngày: >70%
- Thời gian trung bình để check-in: <30 giây
- Tỷ lệ duy trì thói quen sau 30 ngày: >50%

## Kiến Thức Lĩnh Vực

### Ngữ Cảnh Ngành
**Ngành**: Ứng dụng sức khỏe và phúc lợi cá nhân (Health & Wellness)
**Quy Mô Thị Trường**: Thị trường ứng dụng theo dõi thói quen đang phát triển mạnh
**Đối Thủ Chính**: Habitica, Streaks, Way of Life, Productive
**Tiêu Chuẩn Ngành**: Đơn giản, trực quan, tạo động lực, dữ liệu an toàn

### Thuật Ngữ Cụ Thể Theo Lĩnh Vực
- **Habit**: Thói quen - hành động được lặp lại thường xuyên, thường là tự động
- **Streak**: Chuỗi ngày liên tiếp thực hiện thói quen thành công
- **Check-in**: Hành động đánh dấu đã hoàn thành thói quen trong ngày
- **Habit Stack**: Nhóm các thói quen liên quan được thực hiện cùng lúc
- **Habit Loop**: Chu trình tín hiệu → thói quen → phần thưởng

### Quy Tắc Kinh Doanh
1. **Quản Lý Thói Quen**:
   - Mỗi thói quen phải có tên rõ ràng và mô tả ngắn gọn
   - Thói quen có thể được đánh dấu hoàn thành một lần mỗi ngày
   - Streak được tính từ ngày đầu tiên hoàn thành liên tiếp

2. **Lưu Trữ Dữ Liệu**:
   - Tất cả dữ liệu được lưu vào Google Sheets theo thời gian thực
   - Mỗi ngày tạo một hàng mới với timestamp và trạng thái các thói quen
   - Dữ liệu phải được backup tự động

3. **Giao Diện Người Dùng**:
   - Giao diện phải đơn giản, tối giản theo nguyên tắc "Less, but better"
   - Chỉ sử dụng màu trắng và đen
   - Ưu tiên mobile-first design

## Personas Người Dùng

### Persona Chính: Người Trẻ Muốn Cải Thiện Bản Thân
**Vai Trò**: Sinh viên, nhân viên văn phòng trẻ (22-35 tuổi)
**Mức Độ Kinh Nghiệm**: Người dùng công nghệ cơ bản đến trung bình
**Mục Tiêu**:
- Xây dựng thói quen tích cực như tập thể dục, đọc sách, uống nước
- Theo dõi tiến độ và duy trì động lực
- Có dữ liệu để phân tích và cải thiện

**Điểm Đau**:
- Quên không thực hiện thói quen
- Mất động lực khi không thấy tiến bộ rõ ràng
- Khó khăn trong việc theo dõi nhiều thói quen cùng lúc

**Mẫu Sử Dụng**:
- Check-in thói quen vào buổi tối trước khi ngủ
- Xem báo cáo tiến độ hàng tuần
- Thêm thói quen mới khi đã ổn định thói quen cũ

### Persona Phụ: Người Làm Việc Bận Rộn
**Vai Trò**: Chuyên gia, quản lý (30-45 tuổi)
**Mức Độ Kinh Nghiệm**: Người dùng công nghệ thành thạo
**Mục Tiêu**:
- Duy trì cân bằng công việc - cuộc sống
- Theo dõi thói quen sức khỏe và năng suất
- Tối ưu hóa thời gian và hiệu quả

**Điểm Đau**:
- Thiếu thời gian để theo dõi chi tiết
- Cần giải pháp nhanh chóng, hiệu quả
- Muốn tích hợp với các công cụ làm việc khác

**Mẫu Sử Dụng**:
- Check-in nhanh trong giờ nghỉ trưa
- Xem tổng quan tiến độ hàng tháng
- Sử dụng dữ liệu để đưa ra quyết định về lối sống

## Yêu Cầu Chức Năng

### Tính Năng Cốt Lõi
1. **Quản Lý Thói Quen**
   - **Mô Tả**: Thêm, sửa, xóa các thói quen cần theo dõi
   - **User Story**: Với tư cách là người dùng, tôi muốn tạo danh sách thói quen cá nhân để có thể theo dõi tiến độ hàng ngày
   - **Tiêu Chí Chấp Nhận**: Có thể thêm thói quen với tên và mô tả, chỉnh sửa thông tin, xóa thói quen không cần thiết
   - **Ưu Tiên**: CAO

2. **Check-in Hàng Ngày**
   - **Mô Tả**: Đánh dấu hoàn thành thói quen cho ngày hiện tại
   - **User Story**: Với tư cách là người dùng, tôi muốn đánh dấu các thói quen đã hoàn thành để theo dõi tiến độ
   - **Tiêu Chí Chấp Nhận**: Giao diện đơn giản với checkbox cho mỗi thói quen, lưu trạng thái ngay lập tức
   - **Ưu Tiên**: CAO

3. **Hiển Thị Streak**
   - **Mô Tả**: Hiển thị số ngày liên tiếp hoàn thành mỗi thói quen
   - **User Story**: Với tư cách là người dùng, tôi muốn thấy chuỗi ngày liên tiếp để có động lực duy trì thói quen
   - **Tiêu Chí Chấp Nhận**: Hiển thị số ngày streak cho mỗi thói quen, reset khi bỏ lỡ một ngày
   - **Ưu Tiên**: CAO

4. **Tích Hợp Google Sheets**
   - **Mô Tả**: Tự động lưu dữ liệu check-in vào Google Sheets
   - **User Story**: Với tư cách là người dùng, tôi muốn dữ liệu được lưu trữ an toàn và có thể truy cập từ nhiều thiết bị
   - **Tiêu Chí Chấp Nhận**: Mỗi lần check-in tạo/cập nhật hàng trong Google Sheets với timestamp
   - **Ưu Tiên**: CAO

5. **Báo Cáo Tiến Độ**
   - **Mô Tả**: Hiển thị biểu đồ và thống kê về tiến độ thói quen
   - **User Story**: Với tư cách là người dùng, tôi muốn xem báo cáo trực quan để hiểu xu hướng và tiến bộ
   - **Tiêu Chí Chấp Nhận**: Biểu đồ heatmap theo tuần/tháng, thống kê tỷ lệ hoàn thành
   - **Ưu Tiên**: TRUNG BÌNH

### Tính Năng Hỗ Trợ
- **Nhắc nhở hàng ngày**: Thông báo nhẹ nhàng để check-in
- **Export dữ liệu**: Xuất báo cáo PDF hoặc CSV
- **Chia sẻ tiến độ**: Chia sẻ thành tích với bạn bè

## Yêu Cầu Phi Chức Năng

### Yêu Cầu Hiệu Suất
- **Thời Gian Phản Hồi**: <2 giây cho mọi thao tác
- **Throughput**: Hỗ trợ 100 người dùng đồng thời
- **Người Dùng Đồng Thời**: 50 người dùng active
- **Khối Lượng Dữ Liệu**: 1000 thói quen x 365 ngày = 365,000 records

### Yêu Cầu Bảo Mật
- **Xác Thực**: Google OAuth 2.0
- **Phân Quyền**: Mỗi người dùng chỉ truy cập dữ liệu của mình
- **Bảo Vệ Dữ Liệu**: HTTPS, mã hóa dữ liệu nhạy cảm
- **Tuân Thủ**: GDPR compliance cho dữ liệu cá nhân

### Yêu Cầu Khả Năng Sử Dụng
- **Khả Năng Tiếp Cận**: WCAG 2.1 AA compliance
- **Hỗ Trợ Trình Duyệt**: Chrome, Firefox, Safari, Edge (2 phiên bản gần nhất)
- **Hỗ Trợ Di Động**: Responsive design, PWA capabilities
- **Quốc Tế Hóa**: Tiếng Việt và Tiếng Anh

### Yêu Cầu Độ Tin Cậy
- **Thời Gian Hoạt Động**: 99% uptime
- **Tỷ Lệ Lỗi**: <1% failed requests
- **Thời Gian Phục Hồi**: <5 phút cho sự cố nhỏ
- **Yêu Cầu Sao Lưu**: Tự động backup Google Sheets hàng ngày

## Ràng Buộc Kỹ Thuật

### Ràng Buộc Công Nghệ
- **Công Nghệ Bắt Buộc**: HTML5, CSS3, JavaScript (ES6+), Google Sheets API
- **Công Nghệ Cấm**: Không sử dụng framework phức tạp, tránh dependencies không cần thiết
- **Yêu Cầu Phiên Bản**: Modern browsers với ES6 support
- **Giới Hạn Nền Tảng**: Web-based, có thể chạy offline với service worker

### Yêu Cầu Tích Hợp
- **Hệ Thống Bên Ngoài**: Google Sheets, Google OAuth
- **APIs Cần Sử Dụng**: Google Sheets API v4, Google OAuth 2.0
- **APIs Cần Cung Cấp**: REST API cho mobile app trong tương lai
- **Định Dạng Trao Đổi Dữ Liệu**: JSON, CSV export

### Ràng Buộc Triển Khai
- **Yêu Cầu Môi Trường**: Static hosting (Netlify, Vercel, GitHub Pages)
- **Giới Hạn Hạ Tầng**: Client-side only, không cần server backend
- **Yêu Cầu Tuân Thủ**: HTTPS required, CORS policy
- **Cửa Sổ Bảo Trì**: Không có downtime, rolling updates

## Yêu Cầu Dữ Liệu

### Nguồn Dữ Liệu
- **Dữ Liệu Chính**: Google Sheets (user habits, check-ins, streaks)
- **Dữ Liệu Bên Ngoài**: Google user profile (name, email)
- **Dữ Liệu Do Người Dùng Tạo**: Habit definitions, daily check-ins, notes
- **Dữ Liệu Do Hệ Thống Tạo**: Timestamps, streak calculations, statistics

### Mô Hình Dữ Liệu
```
Google Sheets Structure:

Sheet 1: Habits
├── habit_id (unique)
├── habit_name
├── description
├── created_date
├── is_active
└── color_code

Sheet 2: Daily_Checkins
├── date (YYYY-MM-DD)
├── habit_id
├── completed (boolean)
├── timestamp
└── notes

Sheet 3: User_Settings
├── setting_key
├── setting_value
└── updated_date
```

### Quản Trị Dữ Liệu
- **Quyền Sở Hữu Dữ Liệu**: Người dùng sở hữu hoàn toàn dữ liệu trong Google Sheets của họ
- **Lưu Trữ Dữ Liệu**: Dữ liệu lưu trữ trên Google Drive của người dùng
- **Quyền Riêng Tư Dữ Liệu**: Chỉ người dùng có quyền truy cập, app chỉ có quyền read/write
- **Chất Lượng Dữ Liệu**: Validation ở client-side, backup tự động

## Quy Trình Làm Việc & Nghiệp Vụ

### Quy Trình Người Dùng Mới
1. Truy cập ứng dụng
2. Đăng nhập bằng Google OAuth
3. Cấp quyền truy cập Google Sheets
4. Tạo Google Sheet mới hoặc chọn sheet có sẵn
5. Thêm thói quen đầu tiên
6. Bắt đầu check-in hàng ngày

### Quy Trình Check-in Hàng Ngày
1. Mở ứng dụng
2. Xem danh sách thói quen cho ngày hôm nay
3. Đánh dấu các thói quen đã hoàn thành
4. Xem cập nhật streak
5. (Tùy chọn) Thêm ghi chú
6. Dữ liệu tự động sync với Google Sheets

### Quy Trình Xem Báo Cáo
1. Truy cập tab "Báo cáo"
2. Chọn khoảng thời gian (tuần/tháng/năm)
3. Xem biểu đồ heatmap và thống kê
4. (Tùy chọn) Export báo cáo
5. (Tùy chọn) Chia sẻ thành tích

## Tiêu Chí Thành Công

### Metrics Kỹ Thuật
- Thời gian tải trang < 2 giây
- 99% uptime
- Zero data loss
- Mobile responsive score > 95

### Metrics Người Dùng
- Daily active users retention > 70%
- Average session time > 2 minutes
- Habit completion rate > 60%
- User satisfaction score > 4.5/5

### Metrics Kinh Doanh
- User acquisition cost < $5
- Monthly active users growth > 20%
- Feature adoption rate > 80%
- Support ticket volume < 5% of users

---

**Lưu ý**: Tài liệu này sẽ được cập nhật thường xuyên dựa trên phản hồi người dùng và yêu cầu mới phát sinh trong quá trình phát triển.