name: "Template PRP Cơ sở v2 - Giàu Ngữ cảnh với Validation Loops"
description: |

## Mục đích
Template được tối ưu hóa cho AI agents để triển khai tính năng với đủ ngữ cảnh và khả năng tự validation để đạt được working code thông qua cải tiến lặp đi lặp lại.

## Nguyên tắc Cốt lõi
1. **Ngữ cảnh là Vua**: Bao gồm TẤT CẢ documentation, examples, và caveats cần thiết
2. **Validation Loops**: Cung cấp tests/lints có thể thực thi mà AI có thể chạy và sửa
3. **Thông tin Dày đặc**: Sử dụng keywords và patterns từ codebase
4. **Thành công Tiến bộ**: Bắt đầu đơn giản, validate, sau đó enhance
5. **Quy tắc Toàn cục**: Đảm bảo tuân theo tất cả quy tắc trong CLAUDE.md

---

## Mục tiêu
[Những gì cần được xây dựng - cụ thể về trạng thái cuối và mong muốn]

## Tại sao
- [Giá trị business và tác động user]
- [Integration với các tính năng hiện có]
- [Vấn đề này giải quyết và cho ai]

## Cái gì
[Hành vi user-visible và yêu cầu kỹ thuật]

### Tiêu chí Thành công
- [ ] [Kết quả cụ thể có thể đo lường được]

## Tất cả Ngữ cảnh Cần thiết

### Documentation & References (liệt kê tất cả ngữ cảnh cần để triển khai tính năng)
```yaml
# PHẢI ĐỌC - Bao gồm những cái này trong context window của bạn
- url: [URL tài liệu API chính thức]
  why: [Các phần/methods cụ thể bạn sẽ cần]
  
- file: [path/to/example.py]
  why: [Pattern cần tuân theo, gotchas cần tránh]
  
- doc: [URL tài liệu thư viện] 
  section: [Phần cụ thể về common pitfalls]
  critical: [Insight chính ngăn ngừa lỗi thường gặp]

- docfile: [PRPs/ai_docs/file.md]
  why: [docs mà user đã paste vào project]

```

### Cây Codebase hiện tại (chạy `tree` trong root của project) để có overview về codebase
```bash

```

### Cây Codebase mong muốn với files cần thêm và trách nhiệm của file
```bash

```

### Gotchas đã biết của codebase & Library Quirks
```python
# QUAN TRỌNG: [Tên thư viện] yêu cầu [setup cụ thể]
# Ví dụ: FastAPI yêu cầu async functions cho endpoints
# Ví dụ: ORM này không hỗ trợ batch inserts trên 1000 records
# Ví dụ: Chúng ta sử dụng pydantic v2 và  
```

## Blueprint Triển khai

### Data models và structure

Tạo các core data models, chúng ta đảm bảo type safety và consistency.
```python
Ví dụ: 
 - orm models
 - pydantic models
 - pydantic schemas
 - pydantic validators

```

### Danh sách tasks cần hoàn thành để thực hiện PRP theo thứ tự chúng nên được hoàn thành

```yaml
Task 1:
MODIFY src/existing_module.py:
  - FIND pattern: "class OldImplementation"
  - INJECT after line containing "def __init__"
  - PRESERVE existing method signatures

CREATE src/new_feature.py:
  - MIRROR pattern from: src/similar_feature.py
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

...(...)

Task N:
...

```


### Pseudocode cho mỗi task khi cần thiết được thêm vào từng task
```python

# Task 1
# Pseudocode với chi tiết QUAN TRỌNG đừng viết toàn bộ code
async def new_feature(param: str) -> Result:
    # PATTERN: Luôn validate input trước (xem src/validators.py)
    validated = validate_input(param)  # raises ValidationError
    
    # GOTCHA: Thư viện này yêu cầu connection pooling
    async with get_connection() as conn:  # xem src/db/pool.py
        # PATTERN: Sử dụng existing retry decorator
        @retry(attempts=3, backoff=exponential)
        async def _inner():
            # QUAN TRỌNG: API trả về 429 nếu >10 req/sec
            await rate_limiter.acquire()
            return await external_api.call(validated)
        
        result = await _inner()
    
    # PATTERN: Standardized response format
    return format_response(result)  # xem src/utils/responses.py
```

### Integration Points
```yaml
DATABASE:
  - migration: "Add column 'feature_enabled' to users table"
  - index: "CREATE INDEX idx_feature_lookup ON users(feature_id)"
  
CONFIG:
  - add to: config/settings.py
  - pattern: "FEATURE_TIMEOUT = int(os.getenv('FEATURE_TIMEOUT', '30'))"
  
ROUTES:
  - add to: src/api/routes.py  
  - pattern: "router.include_router(feature_router, prefix='/feature')"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Chạy những cái này TRƯỚC - sửa bất kỳ lỗi nào trước khi tiếp tục
ruff check src/new_feature.py --fix  # Auto-fix những gì có thể
mypy src/new_feature.py              # Type checking

# Mong đợi: Không có lỗi. Nếu có lỗi, ĐỌC lỗi và sửa.
```

### Level 2: Unit Tests mỗi tính năng/file/function mới sử dụng existing test patterns
```python
# TẠO test_new_feature.py với các test cases này:
def test_happy_path():
    """Chức năng cơ bản hoạt động"""
    result = new_feature("valid_input")
    assert result.status == "success"

def test_validation_error():
    """Input không hợp lệ raises ValidationError"""
    with pytest.raises(ValidationError):
        new_feature("")

def test_external_api_timeout():
    """Xử lý timeouts một cách graceful"""
    with mock.patch('external_api.call', side_effect=TimeoutError):
        result = new_feature("valid")
        assert result.status == "error"
        assert "timeout" in result.message
```

```bash
# Chạy và lặp lại cho đến khi pass:
uv run pytest test_new_feature.py -v
# Nếu failing: Đọc lỗi, hiểu root cause, sửa code, chạy lại (không bao giờ mock để pass)
```

### Level 3: Integration Test
```bash
# Khởi động service
uv run python -m src.main --dev

# Test endpoint
curl -X POST http://localhost:8000/feature \
  -H "Content-Type: application/json" \
  -d '{"param": "test_value"}'

# Mong đợi: {"status": "success", "data": {...}}
# Nếu lỗi: Kiểm tra logs tại logs/app.log cho stack trace
```

## Checklist validation Cuối cùng
- [ ] Tất cả tests pass: `uv run pytest tests/ -v`
- [ ] Không có linting errors: `uv run ruff check src/`
- [ ] Không có type errors: `uv run mypy src/`
- [ ] Manual test thành công: [curl/command cụ thể]
- [ ] Error cases được xử lý gracefully
- [ ] Documentation được cập nhật
- [ ] Performance requirements được đáp ứng
- [ ] Security best practices được tuân theo