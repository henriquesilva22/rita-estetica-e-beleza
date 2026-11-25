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

  /* ---------- baixar o aplicativo ---------- */
  var ua = navigator.userAgent;
  var android = /Android/.test(ua);
  var ios = /iPhone|iPad|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  // Navegador de dentro de outro app (Instagram, Facebook...): não instala nada
  var inApp = /; wv\)|FBAN|FBAV|Instagram|Line\//.test(ua);
  var APP = '/agendar?app=1';
  var CHROME = ['Abrir no Chrome',
    'intent://' + location.host + '/#Intent;scheme=https;package=com.android.chrome;end'];

  function installed() {
    if (!navigator.getInstalledRelatedApps) return Promise.resolve(false);
    return navigator.getInstalledRelatedApps()
      .then(function (list) { return list.length > 0; }).catch(function () { return false; });
  }
  // O aviso do Chrome pode demorar alguns segundos depois de abrir a página
  function waitPrompt(ms) {
    return new Promise(function (ok) {
      var end = Date.now() + ms;
      (function look() {
        if (window.ritaInstalar || Date.now() > end) return ok(window.ritaInstalar || null);
        setTimeout(look, 150);
      })();
    });
  }
  function explain(b, text, link) {
    // a ajuda mais próxima do botão; o da barra usa a da capa
    var section = b.closest('section');
    var help = (section && section.querySelector('.instalar-ajuda')) || document.querySelector('.instalar-ajuda');
    if (!help) return;
    help.textContent = text;
    if (link) {
      var a = document.createElement('a');
      a.className = 'btn sm';
      a.href = link[1];
      a.textContent = link[0];
      help.appendChild(document.createElement('br'));
      help.appendChild(a);
    }
    help.hidden = false;
    if (!section) help.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function help(b) {
    if (inApp) {
      return android
        ? explain(b, 'Para baixar, abra este site no Chrome.', CHROME)
        : explain(b, 'Para baixar, abra este site no Safari.');
    }
    if (ios) return explain(b, 'No Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início".');
    if (!android) {
      return explain(b, 'Abra este site no celular e toque em "Baixe nosso aplicativo". No computador, use o ícone de instalar na barra de endereço do Chrome.');
    }
    if (!/Chrome\//.test(ua) || /OPR\//.test(ua)) {
      return explain(b, 'Para baixar com um toque, abra este site no Chrome.', CHROME);
    }
    explain(b, 'O Chrome não liberou a instalação agora. Confira se não está em guia anônima e se o aplicativo Rita já não está no celular. Se preferir, abra o menu (três pontinhos) e toque em "Instalar app".',
      ['Abrir o aplicativo', APP]);
  }

  window.addEventListener('appinstalled', function () { window.ritaInstalar = null; });
  document.querySelectorAll('[data-instalar]').forEach(function (b) {
    b.addEventListener('click', function () {
      function show(event) {
        window.ritaInstalar = null; // cada aviso do Chrome só pode ser usado uma vez
        return event.prompt();
      }
      if (window.ritaInstalar) { show(window.ritaInstalar); return; }
      if (b.disabled) return;
      b.disabled = true;
      installed().then(function (yes) {
        if (yes) return explain(b, 'O aplicativo já está neste celular.', ['Abrir o aplicativo', APP]);
        return (inApp || ios ? Promise.resolve(null) : waitPrompt(3000)).then(function (event) {
          if (!event) return help(b);
          // Depois da espera, o Chrome pode exigir um toque novo
          return Promise.resolve(show(event)).catch(function () {
            window.ritaInstalar = event;
            explain(b, 'Pronto para baixar. Toque no botão mais uma vez.');
          });
        });
      }).then(function () { b.disabled = false; }, function () { b.disabled = false; });
    });
  });
})();
