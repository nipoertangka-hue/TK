// 每次更新網站 +1 例如 v1 → v2 → v3
const CACHE_NAME = 'thangka-admin-v3';

// 只快取根目錄，不要寫死 html 檔名！
const urlsToCache = ['/'];

// 安裝時快取 & 立刻啟用新 SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 啟用時「刪除所有舊快取」
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 核心：網路優先 → 永遠抓最新，沒網路才讀快取
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
