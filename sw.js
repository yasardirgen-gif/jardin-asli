/* Réseau d'abord : les mises à jour arrivent dès qu'il y a du réseau ; hors ligne, on sert la copie gardée. */
const C='jardin-asli-shell';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','shim.js','manifest.webmanifest','icon-192.png','icon-180.png'])).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok&&(r.type==='basic'||/fonts\.(gstatic|googleapis)/.test(e.request.url))){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});
