# Hướng dẫn Cài đặt Habit Tracker

## Tổng quan

Habit Tracker là một Progressive Web App (PWA) giúp bạn theo dõi thói quen hàng ngày với tích hợp Google Sheets để lưu trữ dữ liệu.

## Yêu cầu hệ thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet (cho lần đầu thiết lập và đồng bộ)
- Tài khoản Google

## Bước 1: Thiết lập Google API

### 1.1 Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Ghi nhớ Project ID

### 1.2 Kích hoạt APIs

1. Trong Google Cloud Console, đi tới **APIs & Services > Library**
2. Tìm và kích hoạt các API sau:
   - **Google Sheets API**
   - **Google Drive API** (tùy chọn, cho backup)

### 1.3 Tạo Credentials

#### Tạo API Key:
1. Đi tới **APIs & Services > Credentials**
2. Click **Create Credentials > API Key**
3. Sao chép API Key
4. (Khuyến nghị) Hạn chế API Key:
   - Click vào API Key vừa tạo
   - Trong **Application restrictions**, chọn **HTTP referrers**
   - Thêm domain của bạn (ví dụ: `https://yourdomain.com/*`)
   - Trong **API restrictions**, chọn **Restrict key** và chọn **Google Sheets API**

#### Tạo OAuth 2.0 Client ID:
1. Trong **Credentials**, click **Create Credentials > OAuth client ID**
2. Chọn **Web application**
3. Đặt tên cho client
4. Trong **Authorized JavaScript origins**, thêm:
   - `http://localhost:3000` (cho development)
   - `https://yourdomain.com` (cho production)
5. Trong **Authorized redirect URIs**, thêm:
   - `http://localhost:3000` (cho development)
   - `https://yourdomain.com` (cho production)
6. Click **Create** và sao chép Client ID

## Bước 2: Cấu hình ứng dụng

### 2.1 Cập nhật file config.js

1. Mở file `src/js/config.js`
2. Thay thế các giá trị sau:

```javascript
// Thay thế với API Key của bạn
apiKey: 'YOUR_GOOGLE_API_KEY_HERE',

// Thay thế với OAuth Client ID của bạn
clientId: 'YOUR_GOOGLE_CLIENT_ID_HERE',
```

### 2.2 Ví dụ cấu hình:

```javascript
const CONFIG = {
  google: {
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientId: '123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    // ... các cấu hình khác giữ nguyên
  },
  // ... phần còn lại của config
};
```

## Bước 3: Chạy ứng dụng

### 3.1 Development (Local)

1. Mở terminal trong thư mục dự án
2. Chạy một trong các lệnh sau:

```bash
# Sử dụng Python
python -m http.server 3000

# Hoặc sử dụng Node.js
npx serve -s . -l 3000

# Hoặc sử dụng Live Server (VS Code extension)
# Right-click index.html > Open with Live Server
```

3. Mở trình duyệt và truy cập `http://localhost:3000`

### 3.2 Production

1. Upload tất cả files lên web server
2. Đảm bảo server hỗ trợ HTTPS
3. Cập nhật OAuth settings trong Google Cloud Console với domain thực

## Bước 4: Kiểm tra cài đặt

1. Mở ứng dụng trong trình duyệt
2. Mở Developer Tools (F12) và kiểm tra Console
3. Bạn sẽ thấy:
   - `✅ Configuration validated successfully` - nếu cấu hình đúng
   - `❌ Configuration errors found:` - nếu có lỗi cấu hình

4. Click **"Đăng nhập bằng Google"**
5. Hoàn thành quá trình OAuth
6. Ứng dụng sẽ tự động tạo Google Sheet để lưu dữ liệu

## Bước 5: Cài đặt PWA (Tùy chọn)

### Trên Desktop:
1. Mở ứng dụng trong Chrome/Edge
2. Click vào icon "Install" trong address bar
3. Hoặc đi tới Menu > Install Habit Tracker

### Trên Mobile:
1. Mở ứng dụng trong trình duyệt
2. Tap "Add to Home Screen" (iOS) hoặc "Install" (Android)

## Khắc phục sự cố

### Lỗi "API Key not configured"
- Kiểm tra lại API Key trong `config.js`
- Đảm bảo API Key không có khoảng trắng thừa
- Kiểm tra API restrictions trong Google Cloud Console

### Lỗi "OAuth error"
- Kiểm tra Client ID trong `config.js`
- Đảm bảo domain được thêm vào Authorized origins
- Kiểm tra redirect URIs

### Lỗi "Sheets API not enabled"
- Đảm bảo Google Sheets API đã được kích hoạt
- Kiểm tra quota và billing trong Google Cloud Console

### Ứng dụng không hoạt động offline
- Kiểm tra Service Worker đã được đăng ký
- Xóa cache và reload trang
- Kiểm tra Network tab trong Developer Tools

## Tính năng nâng cao

### Tùy chỉnh cấu hình

Bạn có thể tùy chỉnh các cài đặt trong `config.js`:

```javascript
// Thay đổi màu mặc định cho thói quen
defaultHabitColor: '#16a34a', // Màu xanh lá

// Thay đổi số lượng thói quen tối đa
maxHabitsPerUser: 100,

// Thay đổi giờ reset streak (mặc định 6 AM)
streakResetHour: 8, // 8 AM

// Bật/tắt các tính năng
features: {
  enableOfflineMode: true,
  enablePushNotifications: false,
  enableAnalytics: false
}
```

### Backup và Restore

1. Dữ liệu được tự động lưu trong Google Sheets
2. Để backup thủ công: Menu > Export Data
3. Để restore: Import file JSON vào ứng dụng mới

### Chia sẻ dữ liệu

1. Mở Google Sheets được tạo bởi ứng dụng
2. Share sheet với người khác (chỉ đọc)
3. Họ có thể xem tiến độ của bạn

## Bảo mật

- **Không bao giờ** chia sẻ API Key hoặc Client Secret
- Sử dụng HTTPS cho production
- Hạn chế API Key theo domain
- Thường xuyên kiểm tra Google Cloud Console để theo dõi usage

## Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra Console trong Developer Tools
2. Xem file `README.md` để biết thêm chi tiết
3. Kiểm tra [Google Sheets API Documentation](https://developers.google.com/sheets/api)
4. Tạo issue trên GitHub repository

## Cập nhật

Để cập nhật ứng dụng:

1. Backup dữ liệu hiện tại
2. Download phiên bản mới
3. Sao chép file `config.js` từ phiên bản cũ
4. Upload lên server
5. Clear cache trình duyệt

---

**Chúc bạn thành công trong việc xây dựng thói quen tích cực! 🎯**