### 🔄 Nhận thức Dự án & Ngữ cảnh
- **Luôn đọc `PLANNING.md`** khi bắt đầu cuộc trò chuyện mới để hiểu kiến trúc, mục tiêu, style và constraints của dự án.
- **Kiểm tra `TASK.md`** trước khi bắt đầu task mới. Nếu task không được liệt kê, hãy thêm nó với mô tả ngắn gọn và ngày hôm nay.
- **Sử dụng naming conventions, file structure và architecture patterns nhất quán** như được mô tả trong `PLANNING.md`.
- **Sử dụng môi trường ảo phù hợp** khi thực thi các lệnh, bao gồm cả unit tests.

### 🧱 Cấu trúc Code & Modularity
- **Không bao giờ tạo file dài hơn 500 dòng code.** Nếu file tiến gần đến giới hạn này, hãy refactor bằng cách chia thành modules hoặc helper files.
- **Tổ chức code thành các modules được phân tách rõ ràng**, nhóm theo tính năng hoặc trách nhiệm.
  Đối với agents điều này trông như:
    - `agent.py` - Định nghĩa agent chính và logic thực thi
    - `tools.py` - Các hàm tool được sử dụng bởi agent
    - `prompts.py` - System prompts
- **Sử dụng imports rõ ràng, nhất quán** (ưu tiên relative imports trong packages).
- **Sử dụng python_dotenv và load_env()** cho environment variables.

### 🧪 Testing & Reliability
- **Luôn tạo Pytest unit tests cho các tính năng mới** (functions, classes, routes, etc).
- **Sau khi cập nhật bất kỳ logic nào**, kiểm tra xem các unit tests hiện có có cần được cập nhật không. Nếu có, hãy làm điều đó.
- **Tests nên nằm trong thư mục `/tests`** phản ánh cấu trúc app chính.
  - Bao gồm ít nhất:
    - 1 test cho expected use
    - 1 edge case
    - 1 failure case

### ✅ Hoàn thành Task
- **Đánh dấu các tasks đã hoàn thành trong `TASK.md`** ngay sau khi hoàn thành chúng.
- Thêm các sub-tasks hoặc TODOs mới được phát hiện trong quá trình phát triển vào `TASK.md` dưới phần "Discovered During Work".

### 📎 Style & Conventions
- **Sử dụng Python** làm ngôn ngữ chính.
- **Tuân theo PEP8**, sử dụng type hints, và format với `black`.
- **Sử dụng `pydantic` cho data validation**.
- Sử dụng `FastAPI` cho APIs và `SQLAlchemy` hoặc `SQLModel` cho ORM nếu áp dụng.
- Viết **docstrings cho mọi function** sử dụng Google style:
  ```python
  def example():
      """
      Tóm tắt ngắn gọn.

      Args:
          param1 (type): Mô tả.

      Returns:
          type: Mô tả.
      """
  ```

### 📚 Documentation & Explainability
- **Cập nhật `README.md`** khi các tính năng mới được thêm, dependencies thay đổi, hoặc các bước setup được sửa đổi.
- **Comment code không rõ ràng** và đảm bảo mọi thứ có thể hiểu được bởi developer trình độ trung bình.
- Khi viết logic phức tạp, **thêm inline `# Lý do:` comment** giải thích tại sao, không chỉ là gì.

### 🧠 Quy tắc Hành vi AI
- **Không bao giờ giả định ngữ cảnh bị thiếu. Hỏi câu hỏi nếu không chắc chắn.**
- **Không bao giờ hallucinate libraries hoặc functions** – chỉ sử dụng các Python packages đã biết, đã được xác minh.
- **Luôn xác nhận file paths và module names** tồn tại trước khi tham chiếu chúng trong code hoặc tests.
- **Không bao giờ xóa hoặc ghi đè existing code** trừ khi được hướng dẫn rõ ràng hoặc nếu là một phần của task từ `TASK.md`.

### 🌐 Quy tắc Ngôn ngữ & Giao tiếp
- **Sử dụng tiếng Việt** trong tất cả comments, documentation và giao tiếp với user.
- **Code và variable names sử dụng tiếng Anh** để đảm bảo tính tương thích và best practices.
- **Docstrings và error messages có thể sử dụng tiếng Việt** để dễ hiểu hơn.

### 🔧 Quy tắc Công nghệ cụ thể
- **Ưu tiên sử dụng các thư viện phổ biến và ổn định** như FastAPI, Pydantic, SQLAlchemy.
- **Luôn kiểm tra compatibility** giữa các versions của thư viện.
- **Sử dụng async/await** khi làm việc với I/O operations.
- **Implement proper error handling** với try-catch blocks và logging phù hợp.

### 📋 Quy trình Phát triển
- **Bắt đầu với planning** - hiểu requirements trước khi code.
- **Implement incrementally** - xây dựng từng phần nhỏ và test.
- **Validate continuously** - chạy tests sau mỗi thay đổi quan trọng.
- **Document as you go** - không để documentation cho cuối cùng.

### 🚨 Lưu ý An toàn
- **Không bao giờ commit secrets** hoặc sensitive information.
- **Sử dụng environment variables** cho tất cả configuration.
- **Validate tất cả user inputs** để tránh security vulnerabilities.
- **Implement proper authentication và authorization** khi cần thiết.