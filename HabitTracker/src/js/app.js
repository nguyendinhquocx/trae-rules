/**
 * Habit Tracker Application
 * Main application logic with Google Sheets integration
 * Built with Contex1 Framework
 */

// ==========================================================================
// Application State Management
// ==========================================================================

class HabitTrackerApp {
  constructor() {
    this.state = {
      user: null,
      habits: [],
      isAuthenticated: false,
      isLoading: true,
      isOffline: !navigator.onLine,
      currentView: 'dashboard',
      lastSync: null,
      pendingChanges: []
    };
    
    this.config = {
      googleClientId: CONFIG.google.clientId,
      googleApiKey: CONFIG.google.apiKey,
      spreadsheetId: '',  // Will be created dynamically
      discoveryDocs: CONFIG.google.discoveryDocs,
      scope: CONFIG.google.scope
    };
    
    this.elements = {};
    this.modals = {};
    
    this.init();
  }
  
  // ==========================================================================
  // Initialization
  // ==========================================================================
  
  async init() {
    try {
      this.cacheElements();
      this.bindEvents();
      this.setupServiceWorker();
      this.loadFromLocalStorage();
      
      // Initialize Google API
      await this.initGoogleAPI();
      
      // Check authentication status
      await this.checkAuthStatus();
      
      this.setState({ isLoading: false });
      this.render();
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showToast('Lỗi khởi tạo ứng dụng', 'error');
      this.setState({ isLoading: false });
    }
  }
  
  cacheElements() {
    // Screens
    this.elements.loadingScreen = document.getElementById('loading-screen');
    this.elements.authScreen = document.getElementById('auth-screen');
    this.elements.dashboardScreen = document.getElementById('dashboard-screen');
    
    // Navigation
    this.elements.bottomNav = document.querySelector('.bottom-nav');
    this.elements.navItems = document.querySelectorAll('.nav-item');
    
    // Dashboard elements
    this.elements.todayHabits = document.getElementById('today-habits');
    this.elements.statsGrid = document.querySelector('.stats-grid');
    this.elements.addHabitBtn = document.getElementById('add-habit-btn');
    this.elements.userMenuBtn = document.getElementById('user-menu-btn');
    this.elements.userAvatar = document.getElementById('user-avatar');
    
    // Modals
    this.elements.addHabitModal = document.getElementById('add-habit-modal');
    this.elements.userMenuModal = document.getElementById('user-menu-modal');
    
    // Forms
    this.elements.addHabitForm = document.getElementById('add-habit-form');
    
    // Toast container
    this.elements.toastContainer = document.getElementById('toast-container');
    
    // Offline indicator
    this.elements.offlineIndicator = document.getElementById('offline-indicator');
    
    // Auth elements
    this.elements.signInBtn = document.getElementById('google-signin-btn');
  }
  
  bindEvents() {
    // Authentication
    if (this.elements.signInBtn) {
      this.elements.signInBtn.addEventListener('click', () => this.signIn());
    }
    
    // Navigation
    this.elements.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.setCurrentView(view);
      });
    });
    
    // Add habit
    if (this.elements.addHabitBtn) {
      this.elements.addHabitBtn.addEventListener('click', () => this.openAddHabitModal());
    }
    
    // User menu
    if (this.elements.userMenuBtn) {
      this.elements.userMenuBtn.addEventListener('click', () => this.openUserMenuModal());
    }
    
    // Form submissions
    if (this.elements.addHabitForm) {
      this.elements.addHabitForm.addEventListener('submit', (e) => this.handleAddHabit(e));
    }
    
    // Modal close events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeAllModals();
      }
      if (e.target.classList.contains('modal-close')) {
        this.closeAllModals();
      }
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
    
    // Online/offline events
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));
    
    // Before unload - save state
    window.addEventListener('beforeunload', () => this.saveToLocalStorage());
  }
  
  // ==========================================================================
  // Google API Integration
  // ==========================================================================
  
  async initGoogleAPI() {
    return new Promise((resolve, reject) => {
      // Load Google API script if not already loaded
      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => this.loadGoogleAPI().then(resolve).catch(reject);
        script.onerror = () => reject(new Error('Failed to load Google API'));
        document.head.appendChild(script);
      } else {
        this.loadGoogleAPI().then(resolve).catch(reject);
      }
    });
  }

  async loadGoogleAPI() {
    // Validate configuration first
    const validation = CONFIG.validate();
    if (!validation.isValid) {
      throw new Error('Configuration invalid: ' + validation.errors.join(', '));
    }

    // Load Google API client
    await new Promise((resolve) => gapi.load('client', resolve));

    await gapi.client.init({
      apiKey: this.config.googleApiKey,
      discoveryDocs: this.config.discoveryDocs
    });

    // Load Google Identity Services
    await this.loadGoogleIdentityServices();
  }

  async loadGoogleIdentityServices() {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          this.initializeGoogleIdentity();
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
        document.head.appendChild(script);
      } else {
        this.initializeGoogleIdentity();
        resolve();
      }
    });
  }

  initializeGoogleIdentity() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.config.googleClientId,
      scope: this.config.scope,
      callback: (response) => {
        if (response.error) {
          console.error('Token error:', response.error);
          this.showToast('Đăng nhập thất bại', 'error');
          this.setState({ isLoading: false });
          return;
        }
        this.handleTokenResponse(response);
      },
      error_callback: (error) => {
        console.error('OAuth error:', error);
        this.showToast('Lỗi xác thực. Vui lòng thử lại.', 'error');
        this.setState({ isLoading: false });
      }
    });
  }
  
  async checkAuthStatus() {
    // Check if we have a stored access token
    const storedToken = localStorage.getItem('google_access_token');
    if (storedToken) {
      gapi.client.setToken({ access_token: storedToken });
      await this.loadUserProfile();
    }
  }

  async signIn() {
    try {
      this.setState({ isLoading: true });
      
      if (this.tokenClient) {
        // Set a timeout to handle popup blocking
        const timeoutId = setTimeout(() => {
          if (this.state.isLoading) {
            console.warn('Sign in timeout - popup may be blocked');
            this.showToast('Popup bị chặn. Vui lòng cho phép popup và thử lại.', 'warning');
            this.setState({ isLoading: false });
          }
        }, 10000); // 10 second timeout
        
        // Store timeout ID to clear it if sign in succeeds
        this.signInTimeoutId = timeoutId;
        
        this.tokenClient.requestAccessToken();
      } else {
        throw new Error('Token client not initialized');
      }
      
    } catch (error) {
      console.error('Sign in failed:', error);
      this.showToast('Đăng nhập thất bại', 'error');
      this.setState({ isLoading: false });
    }
  }

  async signOut() {
    try {
      const token = gapi.client.getToken();
      if (token) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
      }
      
      localStorage.removeItem('google_access_token');
      
      this.setState({
        user: null,
        isAuthenticated: false,
        habits: [],
        currentView: 'dashboard'
      });
      this.saveToLocalStorage();
      this.render();
      this.showToast('Đã đăng xuất thành công', 'success');
    } catch (error) {
      console.error('Sign out failed:', error);
      this.showToast('Đăng xuất thất bại', 'error');
    }
  }

  async handleTokenResponse(response) {
    try {
      // Clear the timeout if sign in succeeds
      if (this.signInTimeoutId) {
        clearTimeout(this.signInTimeoutId);
        this.signInTimeoutId = null;
      }
      
      gapi.client.setToken({ access_token: response.access_token });
      localStorage.setItem('google_access_token', response.access_token);
      
      await this.loadUserProfile();
      
      this.setState({ isLoading: false });
    } catch (error) {
      console.error('Failed to handle token response:', error);
      this.showToast('Lỗi xử lý đăng nhập', 'error');
      this.setState({ isLoading: false });
    }
  }

  async loadUserProfile() {
    try {
      // Use UserInfo API to get user info
      const response = await gapi.client.request({
        path: 'https://www.googleapis.com/oauth2/v2/userinfo'
      });
      
      const userInfo = response.result;
      const userData = {
        id: userInfo.id,
        name: userInfo.name || 'Unknown',
        email: userInfo.email || '',
        avatar: userInfo.picture || ''
      };
      
      this.setState({
        user: userData,
        isAuthenticated: true
      });
      
      // Initialize or load user's spreadsheet
      await this.initUserSpreadsheet();
      
      // Load habits from spreadsheet
      await this.loadHabitsFromSpreadsheet();
      
      this.render();
      this.showToast(`Chào mừng, ${userData.name}!`, 'success');
      
    } catch (error) {
      console.error('Failed to load user profile:', error);
      this.showToast('Lỗi tải thông tin người dùng', 'error');
    }
  }
  
  // ==========================================================================
  // Google Sheets Integration
  // ==========================================================================
  
  async initUserSpreadsheet() {
    try {
      // Check if user already has a spreadsheet ID stored
      const storedSpreadsheetId = localStorage.getItem(`habitTracker_spreadsheet_${this.state.user.id}`);
      
      if (storedSpreadsheetId) {
        this.config.spreadsheetId = storedSpreadsheetId;
        return;
      }
      
      // Create new spreadsheet
      const spreadsheet = await this.createHabitSpreadsheet();
      this.config.spreadsheetId = spreadsheet.spreadsheetId;
      
      // Store spreadsheet ID
      localStorage.setItem(`habitTracker_spreadsheet_${this.state.user.id}`, this.config.spreadsheetId);
      
    } catch (error) {
      console.error('Failed to initialize spreadsheet:', error);
      this.showToast('Lỗi khởi tạo bảng tính', 'error');
    }
  }
  
  async createHabitSpreadsheet() {
    const response = await gapi.client.sheets.spreadsheets.create({
      properties: {
        title: `Habit Tracker - ${this.state.user.name}`,
        locale: 'vi_VN',
        timeZone: 'Asia/Ho_Chi_Minh'
      },
      sheets: [
        {
          properties: {
            title: 'Habits',
            gridProperties: {
              rowCount: 1000,
              columnCount: 10
            }
          }
        },
        {
          properties: {
            title: 'Daily_Logs',
            gridProperties: {
              rowCount: 1000,
              columnCount: 50
            }
          }
        }
      ]
    });
    
    const spreadsheet = response.result;
    
    // Setup headers for Habits sheet
    await this.setupHabitsSheet(spreadsheet.spreadsheetId);
    
    // Setup headers for Daily_Logs sheet
    await this.setupDailyLogsSheet(spreadsheet.spreadsheetId);
    
    return spreadsheet;
  }
  
  async setupHabitsSheet(spreadsheetId) {
    const headers = [
      'ID', 'Name', 'Category', 'Description', 'Color', 
      'Created_Date', 'Target_Frequency', 'Is_Active', 'Sort_Order'
    ];
    
    await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Habits!A1:I1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers]
      }
    });
  }
  
  async setupDailyLogsSheet(spreadsheetId) {
    const headers = ['Date', 'Habit_ID', 'Completed', 'Notes', 'Timestamp'];
    
    await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: 'Daily_Logs!A1:E1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers]
      }
    });
  }
  
  async loadHabitsFromSpreadsheet() {
    try {
      if (!this.config.spreadsheetId) return;
      
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.spreadsheetId,
        range: 'Habits!A2:I1000'
      });
      
      const rows = response.result.values || [];
      const habits = rows.map(row => ({
        id: row[0],
        name: row[1],
        category: row[2],
        description: row[3],
        color: row[4],
        createdDate: row[5],
        targetFrequency: row[6],
        isActive: row[7] === 'TRUE',
        sortOrder: parseInt(row[8]) || 0
      })).filter(habit => habit.id && habit.isActive);
      
      // Load today's completion status
      await this.loadTodayCompletions(habits);
      
      this.setState({ habits });
      
    } catch (error) {
      console.error('Failed to load habits:', error);
      this.showToast('Lỗi tải danh sách thói quen', 'error');
    }
  }
  
  async loadTodayCompletions(habits) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.spreadsheetId,
        range: 'Daily_Logs!A2:E1000'
      });
      
      const rows = response.result.values || [];
      const todayLogs = rows.filter(row => row[0] === today);
      
      habits.forEach(habit => {
        const log = todayLogs.find(log => log[1] === habit.id);
        habit.completedToday = log ? log[2] === 'TRUE' : false;
        habit.todayNotes = log ? log[3] : '';
      });
      
      // Calculate streaks
      await this.calculateStreaks(habits);
      
    } catch (error) {
      console.error('Failed to load today completions:', error);
    }
  }
  
  async calculateStreaks(habits) {
    // This is a simplified streak calculation
    // In a real app, you'd want to calculate based on historical data
    habits.forEach(habit => {
      habit.currentStreak = habit.completedToday ? 1 : 0;
    });
  }
  
  async saveHabitToSpreadsheet(habit) {
    try {
      const values = [
        habit.id,
        habit.name,
        habit.category,
        habit.description,
        habit.color,
        habit.createdDate,
        habit.targetFrequency,
        habit.isActive ? 'TRUE' : 'FALSE',
        habit.sortOrder
      ];
      
      await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: this.config.spreadsheetId,
        range: 'Habits!A:I',
        valueInputOption: 'RAW',
        resource: {
          values: [values]
        }
      });
      
    } catch (error) {
      console.error('Failed to save habit:', error);
      throw error;
    }
  }
  
  async toggleHabitCompletion(habitId) {
    try {
      const habit = this.state.habits.find(h => h.id === habitId);
      if (!habit) return;
      
      const today = new Date().toISOString().split('T')[0];
      const timestamp = new Date().toISOString();
      const newStatus = !habit.completedToday;
      
      // Update local state immediately for better UX
      habit.completedToday = newStatus;
      habit.currentStreak = newStatus ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1);
      this.setState({ habits: [...this.state.habits] });
      
      // Save to spreadsheet
      if (this.state.isOffline) {
        // Queue for later sync
        this.state.pendingChanges.push({
          type: 'habit_completion',
          habitId,
          date: today,
          completed: newStatus,
          timestamp
        });
        this.saveToLocalStorage();
      } else {
        await this.saveHabitCompletion(habitId, today, newStatus, timestamp);
      }
      
      this.render();
      
    } catch (error) {
      console.error('Failed to toggle habit:', error);
      this.showToast('Lỗi cập nhật thói quen', 'error');
    }
  }
  
  async saveHabitCompletion(habitId, date, completed, timestamp, notes = '') {
    try {
      // First, check if entry exists for today
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.spreadsheetId,
        range: 'Daily_Logs!A2:E1000'
      });
      
      const rows = response.result.values || [];
      const existingRowIndex = rows.findIndex(row => row[0] === date && row[1] === habitId);
      
      const values = [date, habitId, completed ? 'TRUE' : 'FALSE', notes, timestamp];
      
      if (existingRowIndex >= 0) {
        // Update existing row
        const range = `Daily_Logs!A${existingRowIndex + 2}:E${existingRowIndex + 2}`;
        await gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: this.config.spreadsheetId,
          range,
          valueInputOption: 'RAW',
          resource: {
            values: [values]
          }
        });
      } else {
        // Append new row
        await gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: this.config.spreadsheetId,
          range: 'Daily_Logs!A:E',
          valueInputOption: 'RAW',
          resource: {
            values: [values]
          }
        });
      }
      
    } catch (error) {
      console.error('Failed to save habit completion:', error);
      throw error;
    }
  }
  
  // ==========================================================================
  // Habit Management
  // ==========================================================================
  
  async addHabit(habitData) {
    try {
      const habit = {
        id: this.generateId(),
        name: habitData.name,
        category: habitData.category || 'Khác',
        description: habitData.description || '',
        color: habitData.color || CONFIG.app.defaultHabitColor,
        createdDate: new Date().toISOString().split('T')[0],
        targetFrequency: habitData.targetFrequency || 'daily',
        isActive: true,
        sortOrder: this.state.habits.length,
        completedToday: false,
        currentStreak: 0
      };
      
      // Add to local state
      this.setState({
        habits: [...this.state.habits, habit]
      });
      
      // Save to spreadsheet
      if (this.state.isOffline) {
        this.state.pendingChanges.push({
          type: 'add_habit',
          habit
        });
        this.saveToLocalStorage();
      } else {
        await this.saveHabitToSpreadsheet(habit);
      }
      
      this.render();
      this.showToast('Đã thêm thói quen mới', 'success');
      
    } catch (error) {
      console.error('Failed to add habit:', error);
      this.showToast('Lỗi thêm thói quen', 'error');
    }
  }
  
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // ==========================================================================
  // State Management
  // ==========================================================================
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.saveToLocalStorage();
  }
  
  setCurrentView(view) {
    this.setState({ currentView: view });
    this.updateNavigation();
    this.render();
  }
  
  updateNavigation() {
    this.elements.navItems.forEach(item => {
      const isActive = item.dataset.view === this.state.currentView;
      item.classList.toggle('active', isActive);
    });
  }
  
  // ==========================================================================
  // Local Storage
  // ==========================================================================
  
  saveToLocalStorage() {
    try {
      const dataToSave = {
        user: this.state.user,
        habits: this.state.habits,
        isAuthenticated: this.state.isAuthenticated,
        lastSync: this.state.lastSync,
        pendingChanges: this.state.pendingChanges,
        spreadsheetId: this.config.spreadsheetId
      };
      
      localStorage.setItem('habitTracker_state', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }
  
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('habitTracker_state');
      if (saved) {
        const data = JSON.parse(saved);
        this.setState({
          user: data.user,
          habits: data.habits || [],
          isAuthenticated: data.isAuthenticated || false,
          lastSync: data.lastSync,
          pendingChanges: data.pendingChanges || []
        });
        
        if (data.spreadsheetId) {
          this.config.spreadsheetId = data.spreadsheetId;
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }
  
  // ==========================================================================
  // Offline Support
  // ==========================================================================
  
  handleOnlineStatus(isOnline) {
    this.setState({ isOffline: !isOnline });
    
    if (isOnline && this.state.pendingChanges.length > 0) {
      this.syncPendingChanges();
    }
    
    this.updateOfflineIndicator();
  }
  
  async syncPendingChanges() {
    try {
      for (const change of this.state.pendingChanges) {
        switch (change.type) {
          case 'add_habit':
            await this.saveHabitToSpreadsheet(change.habit);
            break;
          case 'habit_completion':
            await this.saveHabitCompletion(
              change.habitId,
              change.date,
              change.completed,
              change.timestamp
            );
            break;
        }
      }
      
      this.setState({ 
        pendingChanges: [],
        lastSync: new Date().toISOString()
      });
      
      this.showToast('Đã đồng bộ dữ liệu', 'success');
      
    } catch (error) {
      console.error('Failed to sync pending changes:', error);
      this.showToast('Lỗi đồng bộ dữ liệu', 'error');
    }
  }
  
  updateOfflineIndicator() {
    if (this.elements.offlineIndicator) {
      this.elements.offlineIndicator.classList.toggle('hidden', !this.state.isOffline);
    }
  }
  
  // ==========================================================================
  // Service Worker
  // ==========================================================================
  
  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }
  
  // ==========================================================================
  // UI Event Handlers
  // ==========================================================================
  
  openAddHabitModal() {
    if (this.elements.addHabitModal) {
      this.elements.addHabitModal.classList.remove('hidden');
    }
  }
  
  openUserMenuModal() {
    if (this.elements.userMenuModal) {
      this.elements.userMenuModal.classList.remove('hidden');
    }
  }
  
  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.add('hidden');
    });
  }
  
  async handleAddHabit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const habitData = {
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      color: formData.get('color'),
      targetFrequency: formData.get('targetFrequency')
    };
    
    if (!habitData.name.trim()) {
      this.showToast('Vui lòng nhập tên thói quen', 'error');
      return;
    }
    
    await this.addHabit(habitData);
    this.closeAllModals();
    e.target.reset();
  }
  
  // ==========================================================================
  // Rendering
  // ==========================================================================
  
  render() {
    this.updateScreenVisibility();
    
    if (this.state.isAuthenticated) {
      this.renderDashboard();
      this.renderUserInfo();
    }
    
    this.updateOfflineIndicator();
  }
  
  updateScreenVisibility() {
    const screens = {
      loading: this.elements.loadingScreen,
      auth: this.elements.authScreen,
      dashboard: this.elements.dashboardScreen
    };
    
    Object.values(screens).forEach(screen => {
      if (screen) screen.classList.add('hidden');
    });
    
    if (this.state.isLoading) {
      screens.loading?.classList.remove('hidden');
    } else if (!this.state.isAuthenticated) {
      screens.auth?.classList.remove('hidden');
    } else {
      screens.dashboard?.classList.remove('hidden');
      this.elements.bottomNav?.classList.remove('hidden');
    }
  }
  
  renderDashboard() {
    this.renderHabits();
    this.renderStats();
  }
  
  renderHabits() {
    if (!this.elements.todayHabits) return;
    
    if (this.state.habits.length === 0) {
      this.elements.todayHabits.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            <path d="M3 12h6m6 0h6"/>
          </svg>
          <h3>Chưa có thói quen nào</h3>
          <p>Hãy thêm thói quen đầu tiên của bạn để bắt đầu hành trình tự cải thiện!</p>
          <button class="btn btn-primary" onclick="app.openAddHabitModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Thêm thói quen
          </button>
        </div>
      `;
      return;
    }
    
    const habitsHtml = this.state.habits.map(habit => `
      <div class="habit-card ${habit.completedToday ? 'completed' : ''}" 
           onclick="app.toggleHabitCompletion('${habit.id}')">
        <div class="habit-checkbox ${habit.completedToday ? 'checked' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
        <div class="habit-info">
          <div class="habit-name">${this.escapeHtml(habit.name)}</div>
          <div class="habit-meta">
            <span class="habit-streak">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
              ${habit.currentStreak} ngày
            </span>
            <span class="habit-category">${this.escapeHtml(habit.category)}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    this.elements.todayHabits.innerHTML = `
      <div class="habits-grid">
        ${habitsHtml}
      </div>
    `;
  }
  
  renderStats() {
    if (!this.elements.statsGrid) return;
    
    const totalHabits = this.state.habits.length;
    const completedToday = this.state.habits.filter(h => h.completedToday).length;
    const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
    const totalStreak = this.state.habits.reduce((sum, h) => sum + h.currentStreak, 0);
    
    this.elements.statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon" style="background-color: var(--color-primary);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            <path d="M3 12h6m6 0h6"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">${completedToday}/${totalHabits}</div>
          <div class="stat-label">Hoàn thành hôm nay</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background-color: var(--color-success);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">${completionRate}%</div>
          <div class="stat-label">Tỷ lệ hoàn thành</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background-color: var(--color-warning);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">${totalStreak}</div>
          <div class="stat-label">Tổng streak</div>
        </div>
      </div>
    `;
  }
  
  renderUserInfo() {
    if (this.elements.userAvatar && this.state.user) {
      this.elements.userAvatar.src = this.state.user.avatar;
      this.elements.userAvatar.alt = this.state.user.name;
    }
    
    // Update user menu content
    const userMenuContent = document.getElementById('user-menu-content');
    if (userMenuContent && this.state.user) {
      userMenuContent.innerHTML = `
        <div class="user-info">
          <img src="${this.state.user.avatar}" alt="${this.state.user.name}" class="user-avatar-img">
          <div>
            <div class="user-name">${this.escapeHtml(this.state.user.name)}</div>
            <div class="user-email">${this.escapeHtml(this.state.user.email)}</div>
          </div>
        </div>
        <div class="menu-actions">
          <button class="menu-item" onclick="app.openSettings()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Cài đặt
          </button>
          <button class="menu-item" onclick="app.exportData()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Xuất dữ liệu
          </button>
          <button class="menu-item menu-item-danger" onclick="app.signOut()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Đăng xuất
          </button>
        </div>
      `;
    }
  }
  
  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  showToast(message, type = 'info', duration = null) {
    if (!this.elements.toastContainer) return;
    
    const toastDuration = duration || CONFIG.app.toastDuration;
    const toastId = this.generateId();
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = toastId;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-message">${this.escapeHtml(message)}</div>
      </div>
      <button class="toast-close" onclick="app.removeToast('${toastId}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    
    this.elements.toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => this.removeToast(toastId), toastDuration);
  }
  
  removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.remove();
    }
  }
  
  // ==========================================================================
  // Additional Features (Placeholder)
  // ==========================================================================
  
  openSettings() {
    this.showToast('Tính năng cài đặt sẽ được phát triển trong phiên bản tiếp theo', 'info');
    this.closeAllModals();
  }
  
  exportData() {
    this.showToast('Tính năng xuất dữ liệu sẽ được phát triển trong phiên bản tiếp theo', 'info');
    this.closeAllModals();
  }
}

// ==========================================================================
// Application Initialization
// ==========================================================================

// Initialize app when DOM is loaded
let app;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new HabitTrackerApp();
    window.app = app; // Make available globally for onclick handlers
  });
} else {
  app = new HabitTrackerApp();
  window.app = app;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HabitTrackerApp;
}