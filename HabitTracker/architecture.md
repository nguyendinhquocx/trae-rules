# Kiến Trúc Hệ Thống - Habit Tracker

Tài liệu này mô tả kiến trúc tổng thể của ứng dụng Habit Tracker, bao gồm các thành phần chính, luồng dữ liệu và quyết định thiết kế.

## Tổng Quan Kiến Trúc

### Nguyên Tắc Thiết Kế
- **Client-Side First**: Ứng dụng hoạt động hoàn toàn ở phía client, không cần backend server
- **Progressive Web App (PWA)**: Hỗ trợ offline và cài đặt như native app
- **Mobile-First**: Thiết kế ưu tiên trải nghiệm mobile
- **Minimalist Design**: Giao diện đơn giản theo nguyên tắc "Less, but better"
- **Data Ownership**: Người dùng sở hữu hoàn toàn dữ liệu trong Google Sheets của họ

### Kiến Trúc Cấp Cao

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Environment                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Presentation  │  │   Application   │  │    Data     │ │
│  │     Layer       │  │     Layer       │  │   Layer     │ │
│  │                 │  │                 │  │             │ │
│  │ • HTML/CSS      │  │ • Business      │  │ • Local     │ │
│  │ • Components    │  │   Logic         │  │   Storage   │ │
│  │ • UI State      │  │ • State Mgmt    │  │ • Cache     │ │
│  │ • Interactions  │  │ • API Calls     │  │ • Sync      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Google Services                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Google OAuth  │  │  Google Sheets  │  │ Google Drive│ │
│  │                 │  │      API        │  │             │ │
│  │ • Authentication│  │ • Data Storage  │  │ • File Mgmt │ │
│  │ • Authorization │  │ • CRUD Ops      │  │ • Backup    │ │
│  │ • User Profile  │  │ • Real-time     │  │ • Sharing   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Thành Phần Hệ Thống

### 1. Presentation Layer (Lớp Giao Diện)

#### HTML Structure
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habit Tracker</title>
    <link rel="manifest" href="/manifest.json">
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <div id="app">
        <!-- Dynamic content rendered here -->
    </div>
    <script src="js/app.js" type="module"></script>
</body>
</html>
```

#### CSS Architecture
```
styles/
├── main.css           # Main stylesheet
├── components/        # Component-specific styles
│   ├── habit-list.css
│   ├── habit-card.css
│   ├── streak-display.css
│   └── progress-chart.css
├── layouts/           # Layout styles
│   ├── grid.css
│   └── responsive.css
└── utilities/         # Utility classes
    ├── colors.css
    ├── typography.css
    └── spacing.css
```

#### Component Structure
```
components/
├── HabitList.js       # Main habit list component
├── HabitCard.js       # Individual habit card
├── StreakDisplay.js   # Streak counter
├── ProgressChart.js   # Progress visualization
├── AddHabitForm.js    # Form to add new habits
├── SettingsPanel.js   # User settings
└── ReportView.js      # Analytics and reports
```

### 2. Application Layer (Lớp Ứng Dụng)

#### Core Modules
```
js/
├── app.js             # Main application entry point
├── router.js          # Client-side routing
├── state/             # State management
│   ├── store.js       # Central state store
│   ├── habits.js      # Habit-related state
│   └── user.js        # User-related state
├── services/          # Business logic services
│   ├── habitService.js
│   ├── streakService.js
│   ├── analyticsService.js
│   └── syncService.js
├── api/               # External API integrations
│   ├── googleAuth.js  # Google OAuth integration
│   ├── sheetsAPI.js   # Google Sheets API
│   └── driveAPI.js    # Google Drive API
└── utils/             # Utility functions
    ├── dateUtils.js
    ├── validators.js
    └── helpers.js
```

#### State Management
```javascript
// Central State Structure
const appState = {
  user: {
    profile: null,
    isAuthenticated: false,
    preferences: {}
  },
  habits: {
    list: [],
    loading: false,
    error: null
  },
  checkins: {
    today: {},
    history: {},
    syncing: false
  },
  ui: {
    currentView: 'habits',
    selectedDate: new Date(),
    showSettings: false
  }
};
```

### 3. Data Layer (Lớp Dữ Liệu)

#### Local Storage Strategy
```javascript
// Local Storage Keys
const STORAGE_KEYS = {
  USER_PROFILE: 'habit_tracker_user',
  HABITS: 'habit_tracker_habits',
  CHECKINS: 'habit_tracker_checkins',
  SETTINGS: 'habit_tracker_settings',
  SYNC_STATUS: 'habit_tracker_sync'
};

// Cache Strategy
const cacheStrategy = {
  habits: 'persistent',      // Always cache
  checkins: 'session',       // Cache for session
  analytics: 'computed'      // Compute on demand
};
```

#### Google Sheets Schema
```
Sheet 1: "Habits"
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ habit_id    │ habit_name  │ description │ created_date│ is_active   │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ h001        │ Tập thể dục │ 30 phút/ngày│ 2024-01-01  │ TRUE        │
│ h002        │ Đọc sách    │ 20 trang/ngày│ 2024-01-02  │ TRUE        │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

Sheet 2: "Daily_Checkins"
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ date        │ habit_id    │ completed   │ timestamp   │ notes       │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ 2024-01-15  │ h001        │ TRUE        │ 1705123456  │ Gym session │
│ 2024-01-15  │ h002        │ FALSE       │ 1705123456  │ Too busy    │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

Sheet 3: "User_Settings"
┌─────────────┬─────────────┬─────────────┐
│ setting_key │ setting_value│ updated_date│
├─────────────┼─────────────┼─────────────┤
│ theme       │ light       │ 2024-01-01  │
│ language    │ vi          │ 2024-01-01  │
│ timezone    │ Asia/Ho_Chi_Minh │ 2024-01-01 │
└─────────────┴─────────────┴─────────────┘
```

## Luồng Dữ Liệu

### 1. User Authentication Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │   App       │    │ Google OAuth│    │ Google APIs │
│   Action    │    │   Logic     │    │   Service   │    │   Service   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ Click Login       │                   │                   │
       ├──────────────────►│                   │                   │
       │                   │ Request Auth      │                   │
       │                   ├──────────────────►│                   │
       │                   │                   │ Redirect to OAuth │
       │                   │                   ├──────────────────►│
       │ Grant Permission  │                   │                   │
       ├──────────────────────────────────────►│                   │
       │                   │                   │ Return Auth Code  │
       │                   │◄──────────────────┤                   │
       │                   │ Exchange for Token│                   │
       │                   ├──────────────────►│                   │
       │                   │ Access Token      │                   │
       │                   │◄──────────────────┤                   │
       │ Login Success     │                   │                   │
       │◄──────────────────┤                   │                   │
```

### 2. Habit Check-in Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │ Local State │    │ Local Cache │    │Google Sheets│
│   Action    │    │ Management  │    │   Storage   │    │     API     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ Check Habit       │                   │                   │
       ├──────────────────►│                   │                   │
       │                   │ Update State      │                   │
       │                   ├──────────────────►│                   │
       │                   │                   │ Store Locally     │
       │                   │                   ├──────────────────►│
       │ Immediate UI      │                   │                   │
       │ Feedback          │                   │                   │
       │◄──────────────────┤                   │                   │
       │                   │ Background Sync   │                   │
       │                   ├──────────────────────────────────────►│
       │                   │                   │ Sync Success      │
       │                   │◄──────────────────────────────────────┤
```

### 3. Data Synchronization Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Local Cache │    │ Sync Service│    │Google Sheets│
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │ Pending Changes   │                   │
       ├──────────────────►│                   │
       │                   │ Batch Upload      │
       │                   ├──────────────────►│
       │                   │                   │
       │                   │ Success Response  │
       │                   │◄──────────────────┤
       │ Clear Pending     │                   │
       │◄──────────────────┤                   │
       │                   │                   │
       │ Conflict?         │                   │
       ├──────────────────►│                   │
       │                   │ Resolve & Retry   │
       │                   ├──────────────────►│
```

## API Integration

### Google OAuth 2.0 Integration
```javascript
// OAuth Configuration
const GOOGLE_CONFIG = {
  clientId: 'your-client-id.googleusercontent.com',
  scope: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
    'profile',
    'email'
  ],
  discoveryDocs: [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
  ]
};

// Authentication Service
class GoogleAuthService {
  async initialize() {
    await gapi.load('auth2', this.initAuth2);
  }
  
  async signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    return this.extractUserProfile(user);
  }
  
  async signOut() {
    const authInstance = gapi.auth2.getAuthInstance();
    await authInstance.signOut();
  }
}
```

### Google Sheets API Integration
```javascript
// Sheets API Service
class SheetsAPIService {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }
  
  async createHabit(habit) {
    const values = [[
      habit.id,
      habit.name,
      habit.description,
      habit.createdDate,
      habit.isActive
    ]];
    
    return gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Habits!A:E',
      valueInputOption: 'RAW',
      resource: { values }
    });
  }
  
  async recordCheckin(checkin) {
    const values = [[
      checkin.date,
      checkin.habitId,
      checkin.completed,
      checkin.timestamp,
      checkin.notes || ''
    ]];
    
    return gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Daily_Checkins!A:E',
      valueInputOption: 'RAW',
      resource: { values }
    });
  }
  
  async getHabits() {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Habits!A:E'
    });
    
    return this.parseHabitsData(response.result.values);
  }
}
```

## Offline Support & PWA

### Service Worker Strategy
```javascript
// sw.js - Service Worker
const CACHE_NAME = 'habit-tracker-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/app.js',
  '/manifest.json',
  '/icons/icon-192x192.png'
];

// Cache Strategy
self.addEventListener('fetch', event => {
  if (event.request.url.includes('googleapis.com')) {
    // Network first for API calls
    event.respondWith(networkFirst(event.request));
  } else {
    // Cache first for static assets
    event.respondWith(cacheFirst(event.request));
  }
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'habit-checkin') {
    event.waitUntil(syncPendingCheckins());
  }
});
```

### Offline Data Management
```javascript
// Offline Queue Manager
class OfflineQueueManager {
  constructor() {
    this.pendingActions = [];
  }
  
  addAction(action) {
    this.pendingActions.push({
      ...action,
      timestamp: Date.now(),
      id: this.generateId()
    });
    this.saveToStorage();
  }
  
  async syncWhenOnline() {
    if (!navigator.onLine) return;
    
    for (const action of this.pendingActions) {
      try {
        await this.executeAction(action);
        this.removeAction(action.id);
      } catch (error) {
        console.error('Sync failed for action:', action, error);
      }
    }
  }
}
```

## Performance Optimization

### Code Splitting Strategy
```javascript
// Dynamic imports for code splitting
const loadReportView = () => import('./components/ReportView.js');
const loadSettingsPanel = () => import('./components/SettingsPanel.js');

// Route-based code splitting
const routes = {
  '/': () => import('./views/HabitsView.js'),
  '/reports': () => import('./views/ReportsView.js'),
  '/settings': () => import('./views/SettingsView.js')
};
```

### Caching Strategy
```javascript
// Multi-level caching
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.storageCache = new LocalStorageCache();
  }
  
  async get(key) {
    // 1. Check memory cache
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // 2. Check local storage
    const cached = await this.storageCache.get(key);
    if (cached && !this.isExpired(cached)) {
      this.memoryCache.set(key, cached.data);
      return cached.data;
    }
    
    // 3. Fetch from API
    return null;
  }
}
```

## Security Considerations

### Data Protection
```javascript
// Input validation
class InputValidator {
  static validateHabitName(name) {
    if (!name || name.trim().length === 0) {
      throw new Error('Tên thói quen không được để trống');
    }
    if (name.length > 100) {
      throw new Error('Tên thói quen không được quá 100 ký tự');
    }
    return name.trim();
  }
  
  static sanitizeInput(input) {
    return input
      .replace(/[<>"'&]/g, '')
      .trim();
  }
}

// XSS Protection
class SecurityUtils {
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  static validateOrigin(origin) {
    const allowedOrigins = [
      'https://accounts.google.com',
      'https://apis.google.com'
    ];
    return allowedOrigins.includes(origin);
  }
}
```

### API Security
```javascript
// Token management
class TokenManager {
  constructor() {
    this.refreshThreshold = 5 * 60 * 1000; // 5 minutes
  }
  
  async getValidToken() {
    const token = this.getCurrentToken();
    
    if (this.isTokenExpiringSoon(token)) {
      return await this.refreshToken();
    }
    
    return token;
  }
  
  isTokenExpiringSoon(token) {
    const expiresAt = token.expires_at * 1000;
    return (expiresAt - Date.now()) < this.refreshThreshold;
  }
}
```

## Deployment Architecture

### Static Hosting Setup
```yaml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://sheets.googleapis.com https://www.googleapis.com;"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Process
```javascript
// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/js/app.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  outfile: 'dist/js/app.js',
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).catch(() => process.exit(1));
```

## Monitoring & Analytics

### Error Tracking
```javascript
// Error handling
class ErrorTracker {
  static track(error, context = {}) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      context
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData);
    }
    
    // Send to monitoring service in production
    this.sendToMonitoring(errorData);
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  ErrorTracker.track(event.error, {
    type: 'javascript',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});
```

### Performance Monitoring
```javascript
// Performance tracking
class PerformanceTracker {
  static measurePageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      
      const metrics = {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint()
      };
      
      this.sendMetrics(metrics);
    });
  }
  
  static measureAPICall(apiName, duration) {
    this.sendMetrics({
      type: 'api_call',
      name: apiName,
      duration,
      timestamp: Date.now()
    });
  }
}
```

## Scalability Considerations

### Data Volume Management
```javascript
// Data pagination for large datasets
class DataPaginator {
  constructor(pageSize = 100) {
    this.pageSize = pageSize;
  }
  
  async loadHabitsPage(page = 0) {
    const startRow = page * this.pageSize + 1;
    const endRow = startRow + this.pageSize - 1;
    
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Habits!A${startRow}:E${endRow}`
    });
  }
  
  async loadCheckinsForDateRange(startDate, endDate) {
    // Implement efficient date range queries
    const query = `SELECT * WHERE A >= date '${startDate}' AND A <= date '${endDate}'`;
    
    return gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: this.spreadsheetId,
      ranges: [`Daily_Checkins!A:E`],
      majorDimension: 'ROWS'
    });
  }
}
```

### Memory Management
```javascript
// Memory optimization
class MemoryManager {
  constructor() {
    this.observers = new Set();
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute
  }
  
  cleanup() {
    // Remove old cached data
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
    
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.timestamp < cutoff) {
        this.memoryCache.delete(key);
      }
    }
    
    // Notify observers to cleanup
    this.observers.forEach(observer => observer.cleanup());
  }
  
  destroy() {
    clearInterval(this.cleanupInterval);
    this.memoryCache.clear();
    this.observers.clear();
  }
}
```

---

## Tóm Tắt Quyết Định Kiến Trúc

### Lựa Chọn Công Nghệ
- **Frontend**: Vanilla JavaScript (ES6+) với Web Components
- **Styling**: CSS3 với CSS Custom Properties
- **Storage**: Google Sheets API + Local Storage
- **Authentication**: Google OAuth 2.0
- **Hosting**: Static hosting (Netlify/Vercel)
- **PWA**: Service Worker + Web App Manifest

### Lý Do Lựa Chọn
1. **Đơn giản**: Không cần framework phức tạp
2. **Hiệu suất**: Tải nhanh, ít dependencies
3. **Bảo mật**: Dữ liệu thuộc về người dùng
4. **Chi phí**: Không cần backend server
5. **Khả năng mở rộng**: Dễ dàng thêm tính năng mới

### Trade-offs
- **Ưu điểm**: Đơn giản, nhanh, chi phí thấp, bảo mật
- **Nhược điểm**: Phụ thuộc Google Services, giới hạn offline
- **Giảm thiểu rủi ro**: Backup strategy, error handling, graceful degradation

---

**Cập nhật lần cuối**: 2024-01-15  
**Phiên bản**: 1.0  
**Tác giả**: Development Team