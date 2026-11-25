/* Rita Beleza e Estética — voltar para o app sem tela preta nem esticada.
   Carrega antes do Flutter.

   Em segundo plano, o Android pode tomar a memória de vídeo. O Flutter perde o
   desenho e não se refaz, então a página recarrega e o app reabre onde estava. */
(function () {
  'use strict';
  var last = null, pending = false;

  [window.HTMLCanvasElement, window.OffscreenCanvas].forEach(function (C) {
    if (!C) return;
    var original = C.prototype.getContext;
    C.prototype.getContext = function (type) {
      var gl = original.apply(this, arguments);
      if (gl && /webgl/.test(type) && gl !== last) {
        last = gl; // o desenho da tela é sempre o mais novo
        this.addEventListener('webglcontextlost', check);
      }
      return gl;
    };
  });

  function lost() { return !!(last && last.isContextLost && last.isContextLost()); }

  function reload() {
    // No máximo 3 vezes por minuto, para nunca ficar recarregando sem parar
    var now = Date.now(), times = [];
    try { times = JSON.parse(sessionStorage.getItem('rita-recargas') || '[]'); } catch (_) {}
    times = times.filter(function (t) { return now - t < 60000; });
    if (times.length >= 3) return;
    times.push(now);
    try {
      sessionStorage.setItem('rita-recargas', JSON.stringify(times));
      sessionStorage.setItem('rita-voltar', '1');
    } catch (_) {}
    location.reload();
  }

  function check() {
    if (pending || document.visibilityState === 'hidden') return;
    pending = true;
    // Dá um instante para o próprio Flutter trocar o desenho
    setTimeout(function () {
      pending = false;
      if (document.visibilityState !== 'hidden' && lost()) reload();
    }, 350);
  }

  // Ao voltar, refaz as medidas: as barras do celular podem ter mudado
  function wake() {
    if (document.visibilityState === 'hidden') return;
    check();
    [0, 250, 900].forEach(function (ms) {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
        if (window.visualViewport) window.visualViewport.dispatchEvent(new Event('resize'));
        if (window.ritaDesenhar) window.ritaDesenhar();
      }, ms);
    });
  }
  document.addEventListener('visibilitychange', wake);
  window.addEventListener('pageshow', function (e) { if (e.persisted) wake(); });
  window.addEventListener('focus', wake);
})();
