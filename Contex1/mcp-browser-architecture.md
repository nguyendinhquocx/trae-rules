# Protocollie - Tài Liệu Kiến Trúc & Thiết Kế

## Tổng Quan

Protocollie là một ứng dụng desktop được xây dựng với Tauri 2.0, phục vụ như một công cụ kiểm thử và khám phá toàn diện cho các Model Context Protocol servers. Tương tự như Postman cho APIs, nó cho phép các nhà phát triển kết nối với nhiều MCP servers, khám phá khả năng của chúng và kiểm thử chức năng trong thời gian thực.

## Người Dùng Mục Tiêu

Protocollie được thiết kế cho **các nhà phát triển MCP server**, **kỹ sư tích hợp AI/LLM**, và **quản lý sản phẩm kỹ thuật** cần tạo nguyên mẫu nhanh, kiểm thử và debug các triển khai MCP. Giống như những người dùng Postman đầu tiên là các nhà phát triển API mệt mỏi với việc sử dụng lệnh curl, Protocollie phục vụ các nhà phát triển xây dựng công cụ AI cần một giao diện chuyên nghiệp để hiểu những gì MCP servers cung cấp, kiểm thử các lời gọi tool với tham số phức tạp, và xác thực phản hồi trước khi tích hợp vào ứng dụng production.

## Kiến Trúc Cốt Lõi

### Ngăn Xếp Công Nghệ

- **Frontend**: React/TypeScript với Tailwind CSS
- **Backend**: Rust với Tauri 2.0
- **Tích Hợp MCP**: Các tiến trình Node.js hệ thống trực tiếp với giao thức JSON-RPC
- **Node.js Runtime**: Node.js hệ thống (người dùng đã cài đặt Node.js như các nhà phát triển MCP)
- **Lưu Trữ Dữ Liệu**: Phương pháp kết hợp (SQLite + in-memory + JSON)
- **IPC**: Hệ thống lệnh của Tauri + giao tiếp stdin/stdout tiến trình trực tiếp

### Lý Do Quyết Định Kiến Trúc

Chúng tôi chọn sử dụng các tiến trình Node.js hệ thống trực tiếp thay vì bundled sidecars hoặc triển khai MCP bằng Rust vì một số lý do chính:

1. **Phù Hợp Với Đối Tượng Mục Tiêu**: Các nhà phát triển MCP đã cài đặt Node.js cho hầu hết MCP servers (`npx`, `npm` packages)
2. **Kiến Trúc Đơn Giản**: Tạo tiến trình trực tiếp đơn giản hơn việc điều phối và bundling sidecar phức tạp
3. **Hỗ Trợ Lệnh Toàn Diện**: Hoạt động với bất kỳ loại MCP server nào - `npx`, `python`, `ruby`, custom binaries
4. **Sử Dụng Thực Tế**: Phù hợp với cách các nhà phát triển thực sự chạy MCP servers trong development và production
5. **Thông Báo Lỗi Nâng Cao**: Có thể cung cấp hướng dẫn cụ thể cho các dependency bị thiếu với hướng dẫn cài đặt

### Kiến Trúc Tổng Thể

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/TS)                       │
│                  - Giao diện quản lý server động            │
│                  - Thực thi tool và hiển thị kết quả        │
├─────────────────────────────────────────────────────────────┤
│                    Tauri IPC Bridge                          │
│                  - Giao diện lệnh type-safe                 │
│                  - Quản lý vòng đời server                  │
├─────────────────────────────────────────────────────────────┤
│                    Rust Backend (Tauri)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Core App Manager                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │   │
│  │  │   MCP       │  │   Session   │  │   Data     │ │   │
│  │  │  Process    │  │   Manager   │  │  Storage   │ │   │
│  │  │  Manager    │  │             │  │ (SQLite)   │ │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│              Nhiều Tiến Trình MCP Server                     │
│               (Một tiến trình cho mỗi kết nối server)        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │    node     │  │     npx     │  │   python    │       │
│  │ script.cjs  │  │  @mcp/git   │  │  server.py  │       │
│  │   stdin/    │  │   stdin/    │  │   stdin/    │       │
│  │   stdout    │  │   stdout    │  │   stdout    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Thiết Kế Backend

### Thành Phần Cốt Lõi

#### 1. MCP Process Manager (Rust)
Xem `mcp_process.rs` để biết triển khai. Các phương thức chính:
- `MCPProcess::start(command, args)` - Tạo MCP server với stdio pipes
- `send_initialize()` - Bắt tay giao thức MCP
- `execute_mcp_tool(tool_name, arguments)` - Thực thi tools qua JSON-RPC
- `list_mcp_tools()` - Khám phá các tools có sẵn
- Phát hiện Node.js nâng cao với thông báo lỗi hữu ích

#### 2. Global Process Registry  
Xem `mcp_process.rs:279` - Quản lý tập trung sử dụng `HashMap<String, MCPProcess>`

#### 3. Tauri Commands
Xem `server_commands.rs` cho tất cả triển khai Tauri command:
- `connect_server()`, `disconnect_server()` - Vòng đời server
- `list_tools()`, `execute_tool()` - Các thao tác tool  
- `add_server()`, `update_server()`, `delete_server()` - Quản lý cấu hình

#### 4. Data Storage Layer
Xem `db.rs` cho triển khai SQLite với các bảng servers, history, collections và preferences.

### Chiến Lược Phân Phối

**Không cần bundling:**
- Ứng dụng sử dụng Node.js hệ thống trực tiếp
- Không có binaries cụ thể cho platform để tạo hoặc duy trì
- Kích thước phân phối ứng dụng nhỏ hơn
- Quy trình build đơn giản hơn

**Yêu cầu hệ thống:**
- Node.js được cài đặt cho các MCP servers dựa trên Node.js (lệnh `node`, `npx`)
- Python được cài đặt cho các MCP servers dựa trên Python
- Các runtime khác theo yêu cầu của MCP servers cụ thể

**Hướng dẫn người dùng:**
- Thông báo lỗi rõ ràng khi thiếu dependencies
- Hướng dẫn cài đặt cho Node.js/Python/các runtime khác
- Liên kết đến hướng dẫn cài đặt chính thức
- Lệnh package manager cụ thể cho platform

## Thiết Kế Frontend

### Cấu Trúc Component
Xem `src/components/` để biết triển khai:
- `ui/` - Các UI primitives có thể tái sử dụng (Modal, Button, Input, Card, ErrorBoundary)
- `forms/` - Các components cụ thể cho form với logic validation (AddServerForm, EditServerForm)
- `layout/` - Các components layout và navigation:
  - `Layout` - Cấu trúc layout ba panel với các panel có thể thay đổi kích thước
  - `Header` - Header nâng cao với branding, theme toggle và navigation
  - `Sidebar` - Navigation có phân mục với quản lý server
  - `MainContent` - Khu vực nội dung động với breadcrumb navigation và rendering theo ngữ cảnh
  - `ToolSelector` - Dropdown chọn tool với tìm kiếm và lọc
  - `ToolDisplay` - Giao diện thực thi tool với parameter forms
  - `RightPanel` - Panel thông tin theo ngữ cảnh (có thể mở rộng cho các tính năng tương lai)
- `hooks/` - Custom hooks cho quản lý state và side effects
- `types/` - Các interfaces TypeScript và định nghĩa type

### Các Tính Năng Chính Đã Triển Khai

1. **Layout Ba Panel Chuyên Nghiệp** - Các panel có thể thay đổi kích thước với sidebar, nội dung chính và panel phải
2. **Header Nâng Cao** - Branding, theme toggle và workspace selector
3. **Sidebar Navigation Có Tổ Chức** - Thiết kế có phân mục với quản lý server và tìm kiếm
4. **Nội Dung Chính Động** - Nội dung nhận biết ngữ cảnh với breadcrumb navigation
5. **Giao Diện Chọn Tool** - Dropdown với tìm kiếm, lọc và hiển thị metadata
6. **Quản Lý Server** - Thêm/sửa/xóa cấu hình server với trạng thái kết nối thời gian thực
7. **Khám Phá Tool** - Danh sách tool động với thông tin parameter và tìm kiếm
8. **Thực Thi Tool** - Forms parameter phức tạp với validation và theo dõi thực thi
9. **Lịch Sử Request** - Theo dõi thực thi toàn diện với lọc theo ngữ cảnh và kiểm tra chi tiết
10. **Panel Phải Nhận Biết Ngữ Cảnh** - Tài liệu tool, lịch sử thực thi được lọc và thông tin server

## Lợi Ích Chính Của Kiến Trúc System Node.js

### 1. **Phù Hợp Với Đối Tượng Mục Tiêu**
- Các nhà phát triển MCP đã cài đặt Node.js cho hầu hết servers
- Không có dependencies bổ sung - người dùng cần Node.js cho lệnh `npx` anyway
- Kích thước phân phối ứng dụng nhỏ hơn (không có bundled Node.js binaries)
- Phù hợp với quy trình phát triển thực tế

### 2. **Hỗ Trợ Lệnh Toàn Diện**
- Hoạt động với bất kỳ loại MCP server nào: `node`, `npx`, `python`, `ruby`, custom binaries
- Thông báo lỗi nâng cao với hướng dẫn cài đặt cụ thể
- Hỗ trợ toàn bộ hệ sinh thái MCP ngay từ đầu
- Không có hạn chế dựa trên runtime hoặc ngôn ngữ

### 3. **Kiến Trúc Đơn Giản**
- Tạo tiến trình trực tiếp - không có điều phối sidecar phức tạp
- Một tiến trình cho mỗi MCP server với giao tiếp stdio độc lập
- Debug và bảo trì dễ dàng hơn
- Triển khai giao thức JSON-RPC sạch sẽ

### 4. **Cô Lập Tiến Trình Thực Sự**
- Mỗi MCP server chạy trong tiến trình OS riêng
- Crashes không ảnh hưởng đến servers khác hoặc ứng dụng chính
- Quản lý vòng đời tiến trình riêng lẻ
- Dọn dẹp và quản lý tài nguyên sạch sẽ

## Các Giai Đoạn Phát Triển

### Phase 1: Core MVP ✅ (41/41 câu chuyện hoàn thành)
- Hỗ trợ stdio transport cơ bản ✅
- Quản lý kết nối server ✅  
- Khám phá và thực thi tool ✅
- Theo dõi lịch sử request ✅

### Phase 2: Enhanced Tool Execution UX & Professional Design ✅ (22/22 câu chuyện hoàn thành)
**Mục tiêu**: Chuyển đổi từ MVP chức năng thành công cụ dev chuyên nghiệp được đánh bóng

**Phase 2.0: Professional Layout Foundation ✅ (6/6 câu chuyện hoàn thành)**
- Cấu trúc layout ba panel ✅
- Header nâng cao với navigation ✅
- Thiết kế lại left sidebar navigation ✅
- Dropdown chọn tool trong main panel ✅
- Khu vực nội dung chính động ✅
- Hệ thống ngữ cảnh right panel ✅

**Phase 2a: Enhanced Tool Execution Interface ✅ (4/4 câu chuyện hoàn thành)**
- Forms nhập parameter nâng cao với Monaco Editor ✅
- Syntax highlighting cho kết quả ✅
- Templates thực thi tool ✅
- Nâng cao lịch sử request ✅

**Phase 2b: Professional UI/UX Design System ✅ (5/5 câu chuyện hoàn thành)**
- Hệ thống thiết kế toàn diện ✅
- Hệ thống theme dark/light nâng cao ✅
- Header và navigation chuyên nghiệp ✅
- UI quản lý server nâng cao ✅
- Khám phá và tổ chức tool ✅

**Phase 2c: Developer Experience Enhancements ✅ (2/2 câu chuyện hoàn thành)**
- Tích hợp code editor với Monaco ✅
- Nâng cao response viewer ✅

**Phase 2e: Visual Polish and Branding ✅ (5/5 câu chuyện hoàn thành)**
- Branding chuyên nghiệp ✅
- Hệ thống onboarding và help ✅
- Nâng cao accessibility ✅
- Thiết kế responsive ✅
- Cải thiện help modal ✅

**Thành tựu chính:**
- Layout ba panel chuyên nghiệp với thiết kế responsive
- Tích hợp Monaco Editor cho nhập parameter phức tạp
- Syntax highlighting toàn diện cho tất cả loại response
- Tổ chức tool nâng cao với favorites và recent usage
- Hệ thống branding và onboarding chuyên nghiệp
- Hỗ trợ accessibility đầy đủ với keyboard navigation
- Quản lý server nâng cao với health monitoring

### Phase 3: Enhanced Features & Content Types ⏳ (0/25 câu chuyện hoàn thành)
**Mục tiêu**: Mở rộng hỗ trợ giao thức MCP và thêm các tính năng tổ chức nâng cao

**Phase 3a: Enhanced Error Handling & User Feedback (0/7 câu chuyện)**
- Cải thiện thông báo lỗi cơ bản
- Hệ thống phân loại lỗi
- Đề xuất khôi phục lỗi
- Cơ chế retry cơ bản
- Hệ thống thông báo toast
- Cải thiện trạng thái loading
- Cải thiện keyboard shortcuts

**Phase 3b: MCP Prompts Support (0/5 câu chuyện)**
- Khám phá prompts cơ bản
- Hiển thị và điều hướng prompts
- Thực thi prompt cơ bản
- Nhập parameter prompt
- Tích hợp lịch sử prompts

**Phase 3c: MCP Resources Support (0/5 câu chuyện)**
- Khám phá resources cơ bản
- Hiển thị và điều hướng resources
- Xem nội dung resource cơ bản
- Định dạng nội dung resource
- Tích hợp lịch sử resources

**Phase 3d: Basic Collections and Organization (0/8 câu chuyện)**
- Giao diện nhóm server
- Thao tác dựa trên nhóm
- Hệ thống yêu thích request
- Tìm kiếm nâng cao trên nội dung
- Chuyển đổi workspace cơ bản
- Quản lý dữ liệu workspace
- Chức năng export cơ bản
- Chức năng import cơ bản

**Mục tiêu chính:**
- Hỗ trợ hoàn chỉnh giao thức MCP (tools, prompts, resources)
- Xử lý lỗi chuyên nghiệp và phản hồi người dùng
- Quản lý collections và workspace cơ bản
- Cải thiện khả năng tổ chức và tìm kiếm

### Phase 4: Remote Transports
**Mục tiêu**: Thêm hỗ trợ cho MCP servers từ xa và networking nâng cao

- Triển khai SSE transport
- Xác thực OAuth
- Hỗ trợ WebSocket
- Khả năng đồng bộ cloud

### Phase 5: Advanced Testing & Automation
**Mục tiêu**: Thêm khả năng testing và automation toàn diện

- Thực thi tool hàng loạt (chuyển từ Phase 2a)
- Quản lý biến môi trường (chuyển từ Phase 2c)
- Giám sát hiệu suất (chuyển từ Phase 2c)
- Chuỗi request (chuyển từ Phase 2d)
- Quản lý mock và test data (chuyển từ Phase 2d)
- Tạo tài liệu API (chuyển từ Phase 2d)
- Framework testing tích hợp (chuyển từ Phase 2d)
- Nền tảng hệ thống plugin (chuyển từ Phase 2d)
- Quản lý và tổ chức workspace
- Testing tự động

## Khả Năng Mở Rộng Trong Tương Lai

### Transport Plugins
```rust
#[async_trait]
pub trait TransportAdapter {
    async fn connect(&self, config: &TransportConfig) -> Result<Box<dyn Transport>>;
    fn supported_type(&self) -> TransportType;
}
```

### Định Dạng Export
- Postman collections
- Đặc tả kiểu OpenAPI
- Test suites tùy chỉnh

### Tính Năng Nâng Cao
- Chuỗi request
- Quản lý biến môi trường và workspace
- Thực thi tool hàng loạt
- Scripts pre/post request
- Testing hiệu suất

## Hệ Thống Theme & Kiến Trúc UI

### Triển Khai Theme Tùy Chỉnh
- **Hệ thống**: Theme dựa trên class `.light` tùy chỉnh (không phải hệ thống `dark:` mặc định của Tailwind)
- **Provider**: React context với hook `useTheme()` cung cấp `resolvedTheme` ('light'|'dark')
- **CSS Variables**: Light theme overrides trong `App.css` thay đổi màu sắc class Tailwind qua CSS variables
- **Theme Toggle**: Tự động phát hiện preference hệ thống với khả năng override thủ công

### Patterns Component Nhận Biết Theme
Các components cần hỗ trợ theme nên:
1. Import hook `useTheme()`: `import { useTheme } from '../../hooks/useTheme'`
2. Lấy resolved theme: `const { resolvedTheme } = useTheme()`
3. Tạo các hàm styling có điều kiện trả về classes phù hợp cho mỗi theme
4. **Tránh prefixes `dark:`** - chúng không hoạt động với hệ thống theme tùy chỉnh

### Sửa Lỗi Theme Gần Đây (Story 3.1)
- **ServerCard**: Sửa khả năng đọc selection highlighting ở light mode
- **HelpModal**: Sửa khả năng đọc code/kbd element ở dark mode
- **Badge Component**: Loại bỏ prefixes `dark:` không tương thích
- **Error Display**: Thống nhất màu lỗi theme-neutral cho cả light/dark modes
- **CSS Coverage**: Nâng cao gray class overrides cho khả năng tương thích theme rộng hơn

## Phụ Lục: MCP Là Gì?

Model Context Protocol (MCP) là một giao thức mở chuẩn hóa cách các ứng dụng cung cấp ngữ cảnh cho các Large Language Models (LLMs). Hãy nghĩ về MCP như một cổng USB-C cho các ứng dụng AI - giống như USB-C cung cấp cách chuẩn hóa để kết nối thiết bị với các thiết bị ngoại vi khác nhau, MCP cung cấp cách chuẩn hóa để kết nối các AI models với các nguồn dữ liệu và công cụ khác nhau.

### Các Khái Niệm MCP Chính:

**MCP Servers** là các chương trình nhẹ expose các khả năng cụ thể (tools, prompts và resources) thông qua giao thức. Ví dụ, một Git MCP server có thể expose các tools như `git_status`, `git_commit` và `git_diff` mà một LLM có thể gọi.

**MCP Clients** là các ứng dụng (như Claude Desktop hoặc IDEs) kết nối với MCP servers để truy cập khả năng của chúng. Chúng duy trì kết nối 1:1 với servers.

**Primitives Cốt Lõi:**
- **Resources**: Dữ liệu và nội dung mà servers expose (files, documents, live data)
- **Tools**: Các hàm mà LLMs có thể thực thi thông qua server (API calls, system commands, calculations)
- **Prompts**: Templates prompt có thể tái sử dụng và workflows
- **Sampling**: Cho phép servers yêu cầu LLM completions

**Các Lớp Transport**: MCP hỗ trợ nhiều cơ chế transport:
- **stdio**: Giao tiếp thông qua standard input/output (cho local processes)
- **SSE (Server-Sent Events)**: Cho các kết nối dựa trên HTTP
- **WebSocket**: Cho streaming hai chiều (đã lên kế hoạch)

Giao thức cho phép LLMs tương tác với các hệ thống bên ngoài theo cách được kiểm soát, an toàn trong khi duy trì ranh giới rõ ràng giữa AI model và các tools/data mà nó truy cập. Việc chuẩn hóa này có nghĩa là các nhà phát triển có thể viết MCP servers một lần và có chúng hoạt động với bất kỳ MCP-compatible client nào, tương tự như cách REST APIs hoạt động với bất kỳ HTTP client nào.