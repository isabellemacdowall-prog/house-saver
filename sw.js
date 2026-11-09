// Offline support: the app shell is cached; your data stays in Firebase (which keeps its own offline copy).
const VERSION = 'hs-v4';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.json', './me-manifest.json',
  './icon-192.png', './icon-512.png', './me-icon-192.png', './me-icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const CDN = /^(https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com\/firebasejs|fonts\.googleapis\.com|fonts\.gstatic\.com))/;
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // pages and our own files: network first so updates show straight away, cache when offline
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, copy)); }
      return res;
    }).catch(() => caches.match(req.mode === 'navigate' ? './index.html' : req, {ignoreSearch: req.mode === 'navigate'})));
    return;
  }
  // libraries and fonts: cache first (versioned URLs never change)
  if (CDN.test(req.url)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    })));
  }
  // everything else (Firebase sign-in and database) goes straight to the network
});
