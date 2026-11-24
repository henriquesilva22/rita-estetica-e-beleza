/* Rita Beleza e Estética — notificações no celular. Não guarda páginas em cache. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data.json(); } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || 'Rita', {
    body: d.body || 'Você tem uma novidade.',
    icon: '/agendar/icons/Icon-192.png',
    badge: '/logos/aviso.png',
    vibrate: [180, 90, 180, 90, 300],
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/agendar?app=1&tab=pedidos' }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = new URL(e.notification.data.url, self.location.origin);
  if (url.origin !== self.location.origin) return;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (new URL(list[i].url).pathname.indexOf('/agendar') === 0 && 'navigate' in list[i]) {
        return list[i].focus().then(function (c) { return c.navigate(url.href); })
          .catch(function () { return self.clients.openWindow(url.href); });
      }
    }
    return self.clients.openWindow(url.href);
  }));
});
