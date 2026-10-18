// ARC — service worker: la app funciona sin conexión. Sube VERSION cuando publiques cambios.
const VERSION = 'arc-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.png', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if(!sameOrigin && !isFont) return;
  if(isFont){ // tipografías: caché primero, se guardan la primera vez que hay conexión
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req); if(hit) return hit;
      try{ const res = await fetch(req); c.put(req, res.clone()); return res; }catch(err){ return hit || Response.error(); }
    }));
    return;
  }
  // la propia app: red primero (para recibir actualizaciones) y, sin red, lo guardado
  e.respondWith(fetch(req).then(res => {
    if(res && res.ok){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
});
