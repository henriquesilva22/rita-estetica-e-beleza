/* Rita Beleza e Estética — permissão e inscrição para notificações. */
(function () {
  'use strict';
  var PUBLIC_KEY = 'BF6jPPXyZUO-zxn62Y8R1GR00MF1buSdYWNMLxCoGZGGqoUYZ27WecNuZ9_lbisRX_NneJ1K-BY2hTQr04q0j-s';
  var supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  var ios = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  function bytes(b64) {
    var s = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(s, function (c) { return c.charCodeAt(0); });
  }

  // 'sim', 'nao', 'perguntar', 'instalar' (iPhone fora do app) ou 'indisponivel'
  function state() {
    if (ios && !installed) return 'instalar';
    if (!supported) return 'indisponivel';
    return { granted: 'sim', denied: 'nao' }[Notification.permission] || 'perguntar';
  }

  function subscription() {
    return navigator.serviceWorker.register('/sw.js')
      .then(function () { return navigator.serviceWorker.ready; })
      .then(function (reg) {
        return reg.pushManager.getSubscription().then(function (s) {
          return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes(PUBLIC_KEY) });
        });
      })
      .then(function (s) { return JSON.stringify(s); });
  }

  window.ritaPush = {
    state: state,
    // Precisa ser chamado num toque: o navegador só pergunta assim
    ask: function () {
      if (state() === 'sim') return Promise.resolve('sim');
      if (state() !== 'perguntar') return Promise.resolve(state());
      return Promise.resolve(Notification.requestPermission()).then(function () { return state(); });
    },
    // Inscrição deste aparelho, só se já permitiu; '' se não há
    current: function () {
      return state() === 'sim' ? subscription().catch(function () { return ''; }) : Promise.resolve('');
    }
  };

  /* ---------- convite na página principal, uma vez ---------- */
  function seen() { try { return localStorage.getItem('aviso-notificacao'); } catch (_) { return '1'; } }
  function mark() { try { localStorage.setItem('aviso-notificacao', '1'); } catch (_) {} }
  var box = document.getElementById('convite');
  if (box && state() === 'perguntar' && !seen()) {
    setTimeout(function () { box.hidden = false; }, 3500);
    box.querySelector('[data-sim]').addEventListener('click', function () {
      mark();
      window.ritaPush.ask().then(function () { box.hidden = true; });
    });
    box.querySelector('[data-nao]').addEventListener('click', function () { mark(); box.hidden = true; });
  }
})();
