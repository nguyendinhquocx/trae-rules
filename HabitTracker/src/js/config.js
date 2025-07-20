/**
 * Configuration file for Habit Tracker
 * Update these values with your Google API credentials
 */

const CONFIG = {
  // Google API Configuration
  google: {
    // Replace with your Google API Key
    // Get it from: https://console.cloud.google.com/apis/credentials
    apiKey: 'AIzaSyBlh1AVdnbB9CE65eJ3vsVedpdZ8hXU6Hk',
    
    // Replace with your OAuth 2.0 Client ID
    // Get it from: https://console.cloud.google.com/apis/credentials
    clientId: '178313535297-5lhd1si0jvl5nv9b8jl4r40k547aadq5.apps.googleusercontent.com',
    
    // Google API Discovery Documents
    discoveryDocs: [
      'https://sheets.googleapis.com/$discovery/rest?version=v4'
    ],
    
    // Required scopes for Google Sheets access and user profile
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  },
  
  // Application Configuration
  app: {
    name: 'Habit Tracker',
    version: '1.0.0',
    description: 'Track your daily habits with Google Sheets integration',
    
    // Default settings
    defaultHabitColor: '#2563eb',
    maxHabitsPerUser: 50,
    streakResetHour: 6, // 6 AM - when the day "resets" for habits
    
    // Offline sync settings
    maxOfflineActions: 100,
    syncRetryAttempts: 3,
    syncRetryDelay: 5000, // 5 seconds
    
    // Cache settings
    cacheVersion: 'v1.0.0',
    maxCacheSize: 50 * 1024 * 1024, // 50MB
    
    // UI settings
    animationDuration: 300,
    toastDuration: 3000,
    loadingTimeout: 10000
  },
  
  // Google Sheets Configuration
  sheets: {
    // Sheet names (don't change these unless you know what you're doing)
    habitSheet: 'Habits',
    checkinSheet: 'Check-ins',
    settingsSheet: 'Settings',
    
    // Spreadsheet settings
    defaultTitle: 'Habit Tracker Data',
    maxRows: {
      habits: 1000,
      checkins: 10000,
      settings: 100
    },
    
    // Column configurations
    columns: {
      habits: ['ID', 'Name', 'Description', 'Color', 'Created Date', 'Is Active'],
      checkins: ['ID', 'Habit ID', 'Date', 'Completed', 'Notes'],
      settings: ['Key', 'Value', 'Updated Date']
    }
  },
  
  // Feature flags
  features: {
    enableOfflineMode: true,
    enablePushNotifications: true,
    enableAnalytics: true,
    enableExport: true,
    enableSharing: false, // Future feature
    enableTeams: false,   // Future feature
    enableAI: false       // Future feature
  },
  
  // Development settings
  development: {
    enableDebugMode: false,
    enableConsoleLogging: true,
    enablePerformanceMonitoring: false,
    mockGoogleAPI: false // For testing without Google API
  },
  
  // Analytics configuration (if enabled)
  analytics: {
    trackPageViews: true,
    trackUserActions: true,
    trackErrors: true,
    trackPerformance: false
  },
  
  // Notification settings
  notifications: {
    defaultReminderTime: '20:00', // 8 PM
    enableDailyReminders: true,
    enableStreakCelebrations: true,
    enableWeeklyReports: false
  },
  
  // Theme configuration
  theme: {
    defaultTheme: 'auto', // 'light', 'dark', 'auto'
    accentColors: [
      '#2563eb', // Blue
      '#dc2626', // Red
      '#16a34a', // Green
      '#ca8a04', // Yellow
      '#9333ea', // Purple
      '#c2410c', // Orange
      '#0891b2', // Cyan
      '#be123c'  // Pink
    ]
  }
};

// Validation function to check if configuration is valid
CONFIG.validate = function() {
  const errors = [];
  
  // Check Google API credentials
  if (!this.google.apiKey || this.google.apiKey === 'YOUR_GOOGLE_API_KEY_HERE') {
    errors.push('Google API Key is not configured');
  }
  
  if (!this.google.clientId || this.google.clientId === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
    errors.push('Google Client ID is not configured');
  }
  
  // Check required features
  if (this.features.enableOfflineMode && !('serviceWorker' in navigator)) {
    console.warn('Offline mode enabled but Service Worker not supported');
  }
  
  if (this.features.enablePushNotifications && !('Notification' in window)) {
    console.warn('Push notifications enabled but not supported in this browser');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Helper function to get configuration value with fallback
CONFIG.get = function(path, defaultValue = null) {
  const keys = path.split('.');
  let value = this;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value;
};

// Helper function to check if a feature is enabled
CONFIG.isFeatureEnabled = function(featureName) {
  return this.get(`features.${featureName}`, false);
};

// Helper function to get theme color
CONFIG.getThemeColor = function(index = 0) {
  const colors = this.get('theme.accentColors', ['#2563eb']);
  return colors[index % colors.length];
};

// Development helpers
if (CONFIG.development.enableDebugMode) {
  window.CONFIG = CONFIG;
  console.log('🔧 Debug mode enabled - CONFIG available in window.CONFIG');
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}

// Validate configuration on load
const validation = CONFIG.validate();
if (!validation.isValid) {
  console.error('❌ Configuration errors found:');
  validation.errors.forEach(error => console.error(`  - ${error}`));
  console.error('Please update src/js/config.js with your Google API credentials');
} else {
  console.log('✅ Configuration validated successfully');
}

console.log('📋 Configuration loaded:', {
  app: CONFIG.app.name,
  version: CONFIG.app.version,
  features: Object.keys(CONFIG.features).filter(key => CONFIG.features[key]),
  theme: CONFIG.theme.defaultTheme
});