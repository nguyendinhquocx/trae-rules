# Thực thi PRP

## File PRP: $ARGUMENTS

Thực thi Product Requirements Prompt (PRP) để triển khai tính năng một cách hệ thống và đáng tin cậy. PRP chứa tất cả ngữ cảnh, requirements, và validation steps cần thiết để triển khai thành công.

## Quy trình Thực thi

### 1. Đọc và Hiểu PRP
- Đọc toàn bộ file PRP được chỉ định
- Hiểu mục tiêu và success criteria
- Nắm bắt tất cả ngữ cảnh và constraints
- Xác định các dependencies và prerequisites

### 2. Phân tích Ngữ cảnh
- Kiểm tra tất cả documentation URLs được tham chiếu
- Xem xét code examples và patterns
- Hiểu gotchas và common pitfalls
- Xác nhận current codebase structure

### 3. Lập Kế hoạch Triển khai
- Tạo detailed implementation plan dựa trên PRP
- Chia nhỏ thành các tasks có thể quản lý
- Xác định thứ tự thực hiện optimal
- Chuẩn bị validation strategy

### 4. Triển khai từng Bước
- Thực hiện từng task theo thứ tự đã định
- Tuân theo patterns và conventions được chỉ định
- Implement proper error handling
- Thêm logging và monitoring phù hợp

### 5. Validation Liên tục
- Chạy validation gates sau mỗi major step
- Sửa lỗi ngay khi phát hiện
- Đảm bảo code quality standards
- Verify functionality hoạt động như mong đợi

### 6. Testing Toàn diện
- Chạy tất cả unit tests
- Thực hiện integration testing
- Test edge cases và error scenarios
- Verify performance requirements

### 7. Documentation và Cleanup
- Cập nhật README nếu cần
- Thêm inline documentation
- Clean up temporary files
- Ensure code is production-ready

## Validation Gates

### Level 1: Syntax & Style
```bash
# Kiểm tra syntax và style
ruff check . --fix
mypy .
black .
```

### Level 2: Unit Tests
```bash
# Chạy unit tests
pytest tests/ -v --cov=src --cov-report=html
```

### Level 3: Integration Tests
```bash
# Chạy integration tests nếu có
pytest tests/integration/ -v
```

### Level 4: Manual Verification
- Test các chức năng chính manually
- Verify UI/UX nếu có frontend
- Check performance benchmarks
- Validate security requirements

## Error Handling Strategy

### Khi gặp Lỗi:
1. **Đọc error message cẩn thận**
2. **Tham chiếu PRP để hiểu context**
3. **Kiểm tra documentation cho solutions**
4. **Implement fix và test lại**
5. **Update PRP nếu cần thiết**

### Common Issues:
- **Dependency conflicts**: Kiểm tra requirements và versions
- **Import errors**: Verify file structure và paths
- **Test failures**: Debug từng test case riêng biệt
- **Performance issues**: Profile code và optimize

## Success Criteria Verification

Trước khi hoàn thành, verify tất cả success criteria từ PRP:
- [ ] Tất cả functional requirements được đáp ứng
- [ ] Performance benchmarks đạt yêu cầu
- [ ] Security requirements được implement
- [ ] Code quality standards được tuân theo
- [ ] Documentation đầy đủ và accurate
- [ ] Tests pass và coverage đạt target

## Final Checklist

- [ ] Code compiles và runs without errors
- [ ] Tất cả tests pass
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Performance requirements met
- [ ] Security best practices followed
- [ ] Error handling implemented
- [ ] Logging added where appropriate
- [ ] Code reviewed for quality
- [ ] Ready for production deployment

## Reporting

Sau khi hoàn thành, cung cấp summary report bao gồm:
- Tính năng đã được triển khai
- Files được tạo/modified
- Tests được thêm
- Performance metrics
- Bất kỳ deviations từ original PRP
- Recommendations cho future improvements

## Lưu ý Quan trọng

- **Luôn tuân theo PRP** - đây là source of truth
- **Validate continuously** - đừng để lỗi tích tụ
- **Document as you go** - đừng để documentation cho cuối
- **Test thoroughly** - quality là ưu tiên hàng đầu
- **Communicate issues** - báo cáo problems sớm

Hãy nhớ: Mục tiêu là triển khai thành công, đáng tin cậy và maintainable code theo đúng specifications trong PRP.