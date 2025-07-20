/**
 * Google Sheets API Integration for Habit Tracker
 * Handles authentication and data synchronization with Google Sheets
 */

class GoogleSheetsAPI {
  constructor() {
    this.isInitialized = false;
    this.isSignedIn = false;
    this.spreadsheetId = null;
    this.auth = null;
    this.sheets = null;
    
    // Configuration
    this.config = {
      apiKey: 'YOUR_API_KEY', // Replace with your API key
      clientId: 'YOUR_CLIENT_ID', // Replace with your client ID
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    };
    
    // Sheet structure
    this.sheetNames = {
      habits: 'Habits',
      checkins: 'Check-ins',
      settings: 'Settings'
    };
    
    // Bind methods
    this.init = this.init.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  async init() {
    try {
      console.log('GoogleSheetsAPI: Initializing...');
      
      // Load Google API
      await this.loadGoogleAPI();
      
      // Initialize Google API client
      await gapi.load('client:auth2', async () => {
        await gapi.client.init(this.config);
        
        this.auth = gapi.auth2.getAuthInstance();
        this.isSignedIn = this.auth.isSignedIn.get();
        
        // Listen for sign-in state changes
        this.auth.isSignedIn.listen(this.onSignInStatusChange.bind(this));
        
        this.isInitialized = true;
        console.log('GoogleSheetsAPI: Initialized successfully');
        
        // Trigger initial sign-in status
        this.onSignInStatusChange(this.isSignedIn);
      });
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Initialization failed:', error);
      throw error;
    }
  }

  async loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  onSignInStatusChange(isSignedIn) {
    this.isSignedIn = isSignedIn;
    console.log('GoogleSheetsAPI: Sign-in status changed:', isSignedIn);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('google-auth-changed', {
      detail: { isSignedIn, user: isSignedIn ? this.getCurrentUser() : null }
    }));
    
    if (isSignedIn) {
      this.onSignedIn();
    } else {
      this.onSignedOut();
    }
  }

  async onSignedIn() {
    try {
      console.log('GoogleSheetsAPI: User signed in');
      
      // Get or create spreadsheet
      await this.ensureSpreadsheet();
      
      // Load existing data
      await this.loadUserData();
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Sign-in handling failed:', error);
    }
  }

  onSignedOut() {
    console.log('GoogleSheetsAPI: User signed out');
    this.spreadsheetId = null;
  }

  // ==========================================================================
  // Authentication
  // ==========================================================================

  async signIn() {
    try {
      if (!this.isInitialized) {
        throw new Error('Google API not initialized');
      }
      
      console.log('GoogleSheetsAPI: Signing in...');
      const authResult = await this.auth.signIn();
      
      if (authResult.isSignedIn()) {
        console.log('GoogleSheetsAPI: Sign-in successful');
        return this.getCurrentUser();
      } else {
        throw new Error('Sign-in failed');
      }
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Sign-in error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      if (!this.isInitialized) {
        return;
      }
      
      console.log('GoogleSheetsAPI: Signing out...');
      await this.auth.signOut();
      console.log('GoogleSheetsAPI: Sign-out successful');
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Sign-out error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    if (!this.isSignedIn) {
      return null;
    }
    
    const user = this.auth.currentUser.get();
    const profile = user.getBasicProfile();
    
    return {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    };
  }

  // ==========================================================================
  // Spreadsheet Management
  // ==========================================================================

  async ensureSpreadsheet() {
    try {
      // Check if spreadsheet ID is stored locally
      const storedSpreadsheetId = localStorage.getItem('habit-tracker-spreadsheet-id');
      
      if (storedSpreadsheetId) {
        // Verify spreadsheet exists and is accessible
        try {
          await this.getSpreadsheet(storedSpreadsheetId);
          this.spreadsheetId = storedSpreadsheetId;
          console.log('GoogleSheetsAPI: Using existing spreadsheet:', storedSpreadsheetId);
          return;
        } catch (error) {
          console.log('GoogleSheetsAPI: Stored spreadsheet not accessible, creating new one');
          localStorage.removeItem('habit-tracker-spreadsheet-id');
        }
      }
      
      // Create new spreadsheet
      await this.createSpreadsheet();
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to ensure spreadsheet:', error);
      throw error;
    }
  }

  async createSpreadsheet() {
    try {
      console.log('GoogleSheetsAPI: Creating new spreadsheet...');
      
      const response = await gapi.client.sheets.spreadsheets.create({
        properties: {
          title: `Habit Tracker - ${new Date().getFullYear()}`
        },
        sheets: [
          {
            properties: {
              title: this.sheetNames.habits,
              gridProperties: {
                rowCount: 1000,
                columnCount: 10
              }
            }
          },
          {
            properties: {
              title: this.sheetNames.checkins,
              gridProperties: {
                rowCount: 10000,
                columnCount: 5
              }
            }
          },
          {
            properties: {
              title: this.sheetNames.settings,
              gridProperties: {
                rowCount: 100,
                columnCount: 3
              }
            }
          }
        ]
      });
      
      this.spreadsheetId = response.result.spreadsheetId;
      localStorage.setItem('habit-tracker-spreadsheet-id', this.spreadsheetId);
      
      console.log('GoogleSheetsAPI: Spreadsheet created:', this.spreadsheetId);
      
      // Initialize sheet headers
      await this.initializeSheetHeaders();
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to create spreadsheet:', error);
      throw error;
    }
  }

  async getSpreadsheet(spreadsheetId) {
    try {
      const response = await gapi.client.sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId
      });
      
      return response.result;
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to get spreadsheet:', error);
      throw error;
    }
  }

  async initializeSheetHeaders() {
    try {
      console.log('GoogleSheetsAPI: Initializing sheet headers...');
      
      const requests = [
        // Habits sheet headers
        {
          range: `${this.sheetNames.habits}!A1:F1`,
          values: [[
            'ID',
            'Name',
            'Description',
            'Color',
            'Created Date',
            'Is Active'
          ]]
        },
        // Check-ins sheet headers
        {
          range: `${this.sheetNames.checkins}!A1:E1`,
          values: [[
            'ID',
            'Habit ID',
            'Date',
            'Completed',
            'Notes'
          ]]
        },
        // Settings sheet headers
        {
          range: `${this.sheetNames.settings}!A1:C1`,
          values: [[
            'Key',
            'Value',
            'Updated Date'
          ]]
        }
      ];
      
      await this.batchUpdate(requests);
      
      // Format headers
      await this.formatHeaders();
      
      console.log('GoogleSheetsAPI: Sheet headers initialized');
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to initialize headers:', error);
      throw error;
    }
  }

  async formatHeaders() {
    try {
      const requests = [
        {
          repeatCell: {
            range: {
              sheetId: 0, // Habits sheet
              startRowIndex: 0,
              endRowIndex: 1
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 0.2,
                  green: 0.4,
                  blue: 0.8
                },
                textFormat: {
                  foregroundColor: {
                    red: 1.0,
                    green: 1.0,
                    blue: 1.0
                  },
                  bold: true
                }
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)'
          }
        }
      ];
      
      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requests: requests
      });
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to format headers:', error);
    }
  }

  // ==========================================================================
  // Data Operations
  // ==========================================================================

  async loadUserData() {
    try {
      console.log('GoogleSheetsAPI: Loading user data...');
      
      const [habits, checkins, settings] = await Promise.all([
        this.getHabits(),
        this.getCheckins(),
        this.getSettings()
      ]);
      
      // Dispatch data loaded event
      window.dispatchEvent(new CustomEvent('google-data-loaded', {
        detail: { habits, checkins, settings }
      }));
      
      console.log('GoogleSheetsAPI: User data loaded successfully');
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to load user data:', error);
      throw error;
    }
  }

  async getHabits() {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetNames.habits}!A2:F1000`
      });
      
      const rows = response.result.values || [];
      return rows.map(row => ({
        id: row[0],
        name: row[1],
        description: row[2],
        color: row[3],
        createdDate: row[4],
        isActive: row[5] === 'TRUE'
      })).filter(habit => habit.id); // Filter out empty rows
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to get habits:', error);
      return [];
    }
  }

  async getCheckins(startDate = null, endDate = null) {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetNames.checkins}!A2:E10000`
      });
      
      const rows = response.result.values || [];
      let checkins = rows.map(row => ({
        id: row[0],
        habitId: row[1],
        date: row[2],
        completed: row[3] === 'TRUE',
        notes: row[4] || ''
      })).filter(checkin => checkin.id); // Filter out empty rows
      
      // Filter by date range if provided
      if (startDate || endDate) {
        checkins = checkins.filter(checkin => {
          const checkinDate = new Date(checkin.date);
          if (startDate && checkinDate < new Date(startDate)) return false;
          if (endDate && checkinDate > new Date(endDate)) return false;
          return true;
        });
      }
      
      return checkins;
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to get check-ins:', error);
      return [];
    }
  }

  async getSettings() {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetNames.settings}!A2:C100`
      });
      
      const rows = response.result.values || [];
      const settings = {};
      
      rows.forEach(row => {
        if (row[0]) {
          settings[row[0]] = row[1];
        }
      });
      
      return settings;
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to get settings:', error);
      return {};
    }
  }

  // ==========================================================================
  // Create Operations
  // ==========================================================================

  async createHabit(habit) {
    try {
      const habitId = this.generateId();
      const row = [
        habitId,
        habit.name,
        habit.description || '',
        habit.color || '#2563eb',
        new Date().toISOString().split('T')[0],
        'TRUE'
      ];
      
      await this.appendRow(this.sheetNames.habits, row);
      
      console.log('GoogleSheetsAPI: Habit created:', habitId);
      return { ...habit, id: habitId };
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to create habit:', error);
      throw error;
    }
  }

  async createCheckin(checkin) {
    try {
      const checkinId = this.generateId();
      const row = [
        checkinId,
        checkin.habitId,
        checkin.date,
        checkin.completed ? 'TRUE' : 'FALSE',
        checkin.notes || ''
      ];
      
      await this.appendRow(this.sheetNames.checkins, row);
      
      console.log('GoogleSheetsAPI: Check-in created:', checkinId);
      return { ...checkin, id: checkinId };
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to create check-in:', error);
      throw error;
    }
  }

  async setSetting(key, value) {
    try {
      // First, try to find existing setting
      const settings = await this.getSettings();
      
      if (settings.hasOwnProperty(key)) {
        // Update existing setting
        await this.updateSetting(key, value);
      } else {
        // Create new setting
        const row = [
          key,
          value,
          new Date().toISOString()
        ];
        
        await this.appendRow(this.sheetNames.settings, row);
      }
      
      console.log('GoogleSheetsAPI: Setting saved:', key, value);
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to set setting:', error);
      throw error;
    }
  }

  // ==========================================================================
  // Update Operations
  // ==========================================================================

  async updateHabit(habitId, updates) {
    try {
      // Find habit row
      const habits = await this.getHabits();
      const habitIndex = habits.findIndex(h => h.id === habitId);
      
      if (habitIndex === -1) {
        throw new Error('Habit not found');
      }
      
      const habit = habits[habitIndex];
      const updatedHabit = { ...habit, ...updates };
      
      const row = [
        updatedHabit.id,
        updatedHabit.name,
        updatedHabit.description || '',
        updatedHabit.color || '#2563eb',
        updatedHabit.createdDate,
        updatedHabit.isActive ? 'TRUE' : 'FALSE'
      ];
      
      const range = `${this.sheetNames.habits}!A${habitIndex + 2}:F${habitIndex + 2}`;
      await this.updateRow(range, [row]);
      
      console.log('GoogleSheetsAPI: Habit updated:', habitId);
      return updatedHabit;
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to update habit:', error);
      throw error;
    }
  }

  async updateCheckin(checkinId, updates) {
    try {
      // Find checkin row
      const checkins = await this.getCheckins();
      const checkinIndex = checkins.findIndex(c => c.id === checkinId);
      
      if (checkinIndex === -1) {
        throw new Error('Check-in not found');
      }
      
      const checkin = checkins[checkinIndex];
      const updatedCheckin = { ...checkin, ...updates };
      
      const row = [
        updatedCheckin.id,
        updatedCheckin.habitId,
        updatedCheckin.date,
        updatedCheckin.completed ? 'TRUE' : 'FALSE',
        updatedCheckin.notes || ''
      ];
      
      const range = `${this.sheetNames.checkins}!A${checkinIndex + 2}:E${checkinIndex + 2}`;
      await this.updateRow(range, [row]);
      
      console.log('GoogleSheetsAPI: Check-in updated:', checkinId);
      return updatedCheckin;
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to update check-in:', error);
      throw error;
    }
  }

  async updateSetting(key, value) {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetNames.settings}!A2:C100`
      });
      
      const rows = response.result.values || [];
      const settingIndex = rows.findIndex(row => row[0] === key);
      
      if (settingIndex === -1) {
        throw new Error('Setting not found');
      }
      
      const range = `${this.sheetNames.settings}!B${settingIndex + 2}:C${settingIndex + 2}`;
      await this.updateRow(range, [[
        value,
        new Date().toISOString()
      ]]);
      
      console.log('GoogleSheetsAPI: Setting updated:', key, value);
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to update setting:', error);
      throw error;
    }
  }

  // ==========================================================================
  // Helper Methods
  // ==========================================================================

  async appendRow(sheetName, row) {
    try {
      await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        values: [row]
      });
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to append row:', error);
      throw error;
    }
  }

  async updateRow(range, values) {
    try {
      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        values: values
      });
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to update row:', error);
      throw error;
    }
  }

  async batchUpdate(requests) {
    try {
      const batchRequests = requests.map(request => ({
        updateCells: {
          range: this.parseRange(request.range),
          rows: request.values.map(row => ({
            values: row.map(cell => ({
              userEnteredValue: { stringValue: cell }
            }))
          })),
          fields: 'userEnteredValue'
        }
      }));
      
      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requests: batchRequests
      });
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to batch update:', error);
      throw error;
    }
  }

  parseRange(range) {
    // Simple range parser for batch updates
    // This is a simplified version - you might want to use a more robust parser
    const [sheetName, cellRange] = range.split('!');
    const [start, end] = cellRange.split(':');
    
    return {
      sheetId: this.getSheetId(sheetName),
      startRowIndex: this.getRowIndex(start) - 1,
      endRowIndex: this.getRowIndex(end),
      startColumnIndex: this.getColumnIndex(start),
      endColumnIndex: this.getColumnIndex(end) + 1
    };
  }

  getSheetId(sheetName) {
    const sheetIds = {
      [this.sheetNames.habits]: 0,
      [this.sheetNames.checkins]: 1,
      [this.sheetNames.settings]: 2
    };
    return sheetIds[sheetName] || 0;
  }

  getRowIndex(cell) {
    return parseInt(cell.match(/\d+/)[0]);
  }

  getColumnIndex(cell) {
    const column = cell.match(/[A-Z]+/)[0];
    let index = 0;
    for (let i = 0; i < column.length; i++) {
      index = index * 26 + (column.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return index - 1;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // ==========================================================================
  // Batch Operations for Offline Sync
  // ==========================================================================

  async syncPendingChanges(changes) {
    try {
      console.log('GoogleSheetsAPI: Syncing pending changes:', changes.length);
      
      const results = [];
      
      for (const change of changes) {
        try {
          let result;
          
          switch (change.type) {
            case 'CREATE_HABIT':
              result = await this.createHabit(change.data);
              break;
              
            case 'UPDATE_HABIT':
              result = await this.updateHabit(change.data.id, change.data.updates);
              break;
              
            case 'CREATE_CHECKIN':
              result = await this.createCheckin(change.data);
              break;
              
            case 'UPDATE_CHECKIN':
              result = await this.updateCheckin(change.data.id, change.data.updates);
              break;
              
            case 'SET_SETTING':
              await this.setSetting(change.data.key, change.data.value);
              result = { key: change.data.key, value: change.data.value };
              break;
              
            default:
              console.warn('GoogleSheetsAPI: Unknown change type:', change.type);
              continue;
          }
          
          results.push({ success: true, change, result });
          
        } catch (error) {
          console.error('GoogleSheetsAPI: Failed to sync change:', change, error);
          results.push({ success: false, change, error: error.message });
        }
      }
      
      console.log('GoogleSheetsAPI: Sync completed:', results);
      return results;
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Sync failed:', error);
      throw error;
    }
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  getSpreadsheetUrl() {
    if (!this.spreadsheetId) {
      return null;
    }
    return `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit`;
  }

  async exportData() {
    try {
      const [habits, checkins, settings] = await Promise.all([
        this.getHabits(),
        this.getCheckins(),
        this.getSettings()
      ]);
      
      return {
        habits,
        checkins,
        settings,
        exportDate: new Date().toISOString(),
        spreadsheetId: this.spreadsheetId
      };
      
    } catch (error) {
      console.error('GoogleSheetsAPI: Failed to export data:', error);
      throw error;
    }
  }

  async getQuotaUsage() {
    // This would require additional API calls to get quota information
    // For now, return placeholder data
    return {
      requestsUsed: 0,
      requestsLimit: 100,
      resetTime: new Date(Date.now() + 60000).toISOString()
    };
  }
}

// Export for use in main app
window.GoogleSheetsAPI = GoogleSheetsAPI;

// Create global instance
window.googleSheetsAPI = new GoogleSheetsAPI();

console.log('GoogleSheetsAPI: Module loaded');