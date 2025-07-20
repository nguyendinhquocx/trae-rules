/**
 * Service Worker for Habit Tracker PWA
 * Provides offline support and caching strategies
 */

const CACHE_NAME = 'habit-tracker-v1.0.0';
const STATIC_CACHE_NAME = 'habit-tracker-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'habit-tracker-dynamic-v1.0.0';

// Files to cache for offline use
const STATIC_FILES = [
  '/',
  '/index.html',
  '/src/styles/main.css',
  '/src/js/app.js',
  '/manifest.json',
  // Add more static assets as needed
];

// URLs that should always be fetched from network
const NETWORK_ONLY_URLS = [
  'https://apis.google.com/',
  'https://accounts.google.com/',
  'https://sheets.googleapis.com/'
];

// URLs that can be cached dynamically
const CACHEABLE_URLS = [
  // Add external resources that can be cached
];

// Maximum number of items in dynamic cache
const MAX_DYNAMIC_CACHE_SIZE = 50;

// ==========================================================================
// Service Worker Events
// ==========================================================================

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('habit-tracker-')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Service Worker: Activation failed:', error);
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (isNetworkOnlyUrl(url.href)) {
    // Network only for API calls
    event.respondWith(handleNetworkOnly(request));
  } else if (isStaticFile(url.pathname)) {
    // Cache first for static files
    event.respondWith(handleCacheFirst(request));
  } else if (isCacheableUrl(url.href)) {
    // Network first for dynamic content
    event.respondWith(handleNetworkFirst(request));
  } else {
    // Default strategy
    event.respondWith(handleDefault(request));
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'habit-sync') {
    event.waitUntil(syncHabitData());
  }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Đã đến lúc check-in thói quen!',
    icon: '/assets/icon-192x192.png',
    badge: '/assets/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'check-in',
        title: 'Check-in ngay',
        icon: '/assets/action-check.png'
      },
      {
        action: 'dismiss',
        title: 'Bỏ qua',
        icon: '/assets/action-dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Habit Tracker', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'check-in') {
    event.waitUntil(
      clients.openWindow('/?action=check-in')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ==========================================================================
// Caching Strategies
// ==========================================================================

// Cache first strategy - for static files
async function handleCacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network first strategy - for dynamic content
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      
      // Limit cache size
      await limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
      
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error.message);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page or error response
    return createOfflineResponse(request);
  }
}

// Network only strategy - for API calls
async function handleNetworkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('Network only request failed:', error);
    return new Response(JSON.stringify({
      error: 'Network unavailable',
      message: 'Please check your internet connection'
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Default strategy
async function handleDefault(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Return cached version and update in background
      fetch(request).then(response => {
        if (response.ok) {
          const cache = caches.open(DYNAMIC_CACHE_NAME);
          cache.then(c => c.put(request, response));
        }
      }).catch(() => {});
      
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return createOfflineResponse(request);
  }
}

// ==========================================================================
// Helper Functions
// ==========================================================================

// Check if URL should be network only
function isNetworkOnlyUrl(url) {
  return NETWORK_ONLY_URLS.some(pattern => url.includes(pattern));
}

// Check if URL is a static file
function isStaticFile(pathname) {
  return STATIC_FILES.some(file => {
    if (file === '/') return pathname === '/' || pathname === '/index.html';
    return pathname === file;
  });
}

// Check if URL is cacheable
function isCacheableUrl(url) {
  return CACHEABLE_URLS.some(pattern => url.includes(pattern));
}

// Limit cache size
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const keysToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Create offline response
function createOfflineResponse(request) {
  const url = new URL(request.url);
  
  if (request.headers.get('accept')?.includes('text/html')) {
    // Return offline HTML page
    return new Response(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - Habit Tracker</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            background-color: #f8fafc;
            color: #334155;
            text-align: center;
          }
          .offline-icon {
            width: 64px;
            height: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #1e293b;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
            max-width: 400px;
          }
          .retry-btn {
            background-color: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .retry-btn:hover {
            background-color: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <svg class="offline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
        <h1>Bạn đang offline</h1>
        <p>Không thể kết nối internet. Vui lòng kiểm tra kết nối mạng và thử lại.</p>
        <button class="retry-btn" onclick="window.location.reload()">Thử lại</button>
        
        <script>
          // Auto retry when online
          window.addEventListener('online', () => {
            window.location.reload();
          });
        </script>
      </body>
      </html>
    `, {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }
  
  // Return JSON error for API requests
  if (request.headers.get('accept')?.includes('application/json')) {
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'No internet connection available'
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Default offline response
  return new Response('Offline - Content not available', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Sync habit data when back online
async function syncHabitData() {
  try {
    console.log('Service Worker: Syncing habit data...');
    
    // Get pending changes from IndexedDB or localStorage
    const pendingChanges = await getPendingChanges();
    
    if (pendingChanges.length === 0) {
      console.log('Service Worker: No pending changes to sync');
      return;
    }
    
    // Send message to main app to handle sync
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_PENDING_CHANGES',
        data: pendingChanges
      });
    });
    
    console.log('Service Worker: Sync request sent to main app');
  } catch (error) {
    console.error('Service Worker: Sync failed:', error);
  }
}

// Get pending changes (placeholder - implement based on your storage strategy)
async function getPendingChanges() {
  // This would typically read from IndexedDB
  // For now, return empty array
  return [];
}

// ==========================================================================
// Message Handling
// ==========================================================================

// Handle messages from main app
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_URLS':
      cacheUrls(data.urls);
      break;
      
    case 'CLEAR_CACHE':
      clearCache(data.cacheName);
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ size });
      });
      break;
      
    default:
      console.log('Service Worker: Unknown message type:', type);
  }
});

// Cache specific URLs
async function cacheUrls(urls) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    await cache.addAll(urls);
    console.log('Service Worker: URLs cached successfully');
  } catch (error) {
    console.error('Service Worker: Failed to cache URLs:', error);
  }
}

// Clear specific cache
async function clearCache(cacheName) {
  try {
    const deleted = await caches.delete(cacheName);
    console.log(`Service Worker: Cache ${cacheName} cleared:`, deleted);
  } catch (error) {
    console.error('Service Worker: Failed to clear cache:', error);
  }
}

// Get total cache size
async function getCacheSize() {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const key of keys) {
        const response = await cache.match(key);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('Service Worker: Failed to calculate cache size:', error);
    return 0;
  }
}

// ==========================================================================
// Periodic Background Sync (for future use)
// ==========================================================================

// Register periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'habit-reminder') {
    event.waitUntil(sendHabitReminder());
  }
});

// Send habit reminder notification
async function sendHabitReminder() {
  try {
    const clients = await self.clients.matchAll();
    
    if (clients.length === 0) {
      // App is not open, send push notification
      await self.registration.showNotification('Habit Tracker', {
        body: 'Đừng quên check-in thói quen hôm nay!',
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        tag: 'habit-reminder',
        renotify: true,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'check-in',
            title: 'Check-in ngay'
          }
        ]
      });
    }
  } catch (error) {
    console.error('Service Worker: Failed to send reminder:', error);
  }
}

console.log('Service Worker: Loaded successfully');