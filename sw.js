const V = 'releve-v21';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://cdn.jsdelivr.net/npm/leaflet-rotate@0.2.8/dist/leaflet-rotate.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))));
// Cache d'abord ; les tuiles de carte visitées sont mémorisées pour le hors-ligne
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); }
    return r;
  }).catch(() => hit)));
});
