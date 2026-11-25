/* Rita Beleza e Estética — menu, conta e instalação do app.
   Usado na página principal e em /agendar. */
(function () {
  'use strict';

  /* ---------- menu do celular em /agendar (na principal quem cuida é o app.js) ---------- */
  function svg(d) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; }
  var btn = document.getElementById('menuBtn'), drawer = document.getElementById('drawer');
  if (btn && drawer && document.getElementById('agendamento')) {
    var setMenu = function (open) {
      drawer.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      btn.innerHTML = svg(open ? 'M18 6 6 18M6 6l12 12' : 'M4 7h16M4 12h16M4 17h10');
    };
    setMenu(false);
    btn.addEventListener('click', function () { setMenu(!drawer.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    matchMedia('(min-width:960px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- "Entrar" vira "Minha conta" para quem já entrou ----------
     Só lê, neste aparelho, a sessão que o agendamento guardou. */
  var account = document.querySelectorAll('[data-conta]');
  function markLoggedIn() {
    account.forEach(function (a) {
      a.textContent = 'Minha conta';
      a.href = '/agendar?tab=pedidos';
    });
  }
  if (account.length && window.indexedDB && indexedDB.databases) {
    // databases() antes de open(): abrir criaria um banco vazio e atrapalharia o login
    indexedDB.databases().then(function (list) {
      if (!list.some(function (d) { return d.name === 'firebaseLocalStorageDb'; })) return;
      var open = indexedDB.open('firebaseLocalStorageDb');
      open.onsuccess = function () {
        var db = open.result;
        if (!db.objectStoreNames.contains('firebaseLocalStorage')) return db.close();
        var all = db.transaction('firebaseLocalStorage').objectStore('firebaseLocalStorage').getAll();
        all.onsuccess = function () {
          var user = all.result.map(function (r) { return r.value; })
            .find(function (v) { return v && v.uid && !v.isAnonymous; });
          if (user) markLoggedIn();
          db.close();
        };
        all.onerror = function () { db.close(); };
      };
    }).catch(function () {});
  }

  /* ---------- instalar o aplicativo ---------- */
  var installPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    installPrompt = e;
  });
  document.querySelectorAll('[data-instalar]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt = null;
        return;
      }
      // a ajuda mais próxima do botão; o da barra usa a da capa
      var section = b.closest('section');
      var help = (section && section.querySelector('.instalar-ajuda')) || document.querySelector('.instalar-ajuda');
      if (!help) return;
      var ios = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      var installed = matchMedia('(display-mode: standalone)').matches;
      help.hidden = false;
      if (!section) help.scrollIntoView({ behavior: 'smooth', block: 'center' });
      help.textContent = installed
        ? 'O aplicativo já está instalado neste aparelho.'
        : ios
          ? 'No Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início".'
          : /Android/.test(navigator.userAgent)
            ? 'No Chrome, abra o menu (três pontinhos) e toque em "Instalar app" ou "Adicionar à tela inicial".'
            : 'Abra este site no celular e toque em "Baixar o aplicativo". No computador, use o ícone de instalar na barra de endereço do Chrome.';
    });
  });
})();
