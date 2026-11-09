/* Rita Beleza e Estética — dados e comportamento do site.
   Para atualizar preços, telefones ou redes, edite apenas o bloco "DADOS". */
(function () {
  'use strict';

  /* =================== DADOS =================== */
  var P = {
    whatsapp: '5519991668269',
    phones: ['(19) 99166-8269', '(19) 99998-8530'],
    instagram: null, // ex.: 'ritabelezaestetica'
    facebook: 'https://www.facebook.com/p/Rita-Beleza-Est%C3%A9tica-100029109558790/',
    address: 'Avenida Rio Branco, 631, Itapira, SP',
    // 0 = domingo ... 6 = sábado; [abre, fecha] em horas
    open: { 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 18] }
  };

  var CATS = [
    { id: 'cabelos', nome: 'Cabelos', from: 'R$ 80', partir: true, img: 'img/cabelo-02.jpg',
      desc: 'Cortes, cor e tratamentos pensados para o tipo e a condição dos seus fios.',
      msg: 'Olá! Gostaria de solicitar atendimento para cabelos.',
      items: [['Corte', 'a partir de R$ 80,00'], ['Tintura', 'R$ 150,00 a R$ 180,00'], ['Luzes', 'a partir de R$ 200,00'], ['Progressiva', 'a partir de R$ 120,00'], ['Botox capilar', 'a partir de R$ 130,00'], ['Hidratação com queratina', 'a partir de R$ 130,00']] },
    { id: 'unhas', nome: 'Unhas', from: 'R$ 80', partir: false, img: 'img/unhas-01.jpg',
      desc: 'Mãos e pés com acabamento delicado e cuidado em cada detalhe.',
      msg: 'Olá! Gostaria de solicitar atendimento para unhas (pé e mão).',
      items: [['Pé e mão', 'R$ 80,00']] },
    { id: 'sobrancelhas', nome: 'Sobrancelhas', from: 'R$ 30', partir: true, img: 'img/sobrancelha-02.jpg',
      desc: 'Design que valoriza o seu olhar, do desenho com henna à sobrancelha definitiva.',
      msg: 'Olá! Gostaria de solicitar atendimento para sobrancelhas.',
      items: [['Design com henna', 'R$ 60,00'], ['Remoção simples', 'R$ 30,00'], ['Sobrancelha definitiva', 'a partir de R$ 200,00']] },
    { id: 'estetica', nome: 'Estética e maquiagem', from: 'R$ 20', partir: true, img: 'img/estetica-01.jpg',
      desc: 'Pele cuidada, depilação e maquiagem para o dia a dia ou uma ocasião especial.',
      msg: 'Olá! Gostaria de solicitar atendimento de estética ou maquiagem.',
      items: [['Limpeza de pele', 'R$ 100,00'], ['Depilação', 'a partir de R$ 20,00'], ['Maquiagem', 'R$ 150,00']] }
  ];

  var FATORES = [
    ['Comprimento', 'Curto, médio, longo ou muito longo.'],
    ['Volume', 'Pouco, médio ou muito.'],
    ['Tipo de cabelo', 'Liso, ondulado, cacheado ou crespo.'],
    ['Condição atual', 'Natural, tingido, descolorido ou com química.']
  ];

  var GAL = [
    ['cabelo-01', 'cabelos', 'Cabelo longo ondulado com mechas loiras', 708, 946],
    ['cabelo-02', 'cabelos', 'Corte chanel em camadas com luzes', 720, 921],
    ['sobrancelha-02', 'sobrancelhas', 'Sobrancelhas desenhadas', 1400, 1050],
    ['cabelo-03', 'cabelos', 'Cabelo longo com luzes e pontas modeladas', 701, 875],
    ['unhas-01', 'unhas', 'Unhas com acabamento francesinha', 632, 702],
    ['cabelo-06', 'cabelos', 'Cabelo com luzes, dois ângulos', 1400, 847],
    ['sobrancelha-01', 'sobrancelhas', 'Sobrancelhas com design finalizado', 1400, 1050],
    ['cabelo-04', 'cabelos', 'Cabelo médio com luzes cobre', 720, 1137],
    ['estetica-01', 'estetica', 'Maquiagem, unhas e cuidados de beleza', 1400, 1036],
    ['cabelo-07', 'cabelos', 'Corte curto repicado com luzes, três ângulos', 655, 626],
    ['cabelo-05', 'cabelos', 'Penteados com cachos e ondas', 1400, 1358],
    ['sobrancelha-03', 'sobrancelhas', 'Marcação do design de sobrancelhas', 1050, 1400]
  ].map(function (g) { return { src: 'img/' + g[0] + '.jpg', cat: g[1], alt: g[2], w: g[3], h: g[4] }; });

  /* =================== ÍCONES =================== */
  var I = {
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    insta: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    wa: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.9 0-3.18-1.24-6.17-3.48-8.41z"/>'
  };
  var FILLED = { wa: 1, star: 1 };
  function icon(n) {
    return '<svg class="ico' + (FILLED[n] ? ' fill' : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + I[n] + '</svg>';
  }
  function wa(msg) {
    return 'https://wa.me/' + P.whatsapp + '?text=' + encodeURIComponent(msg || 'Olá! Vim pelo site da Rita Beleza e Estética e gostaria de mais informações.');
  }
  function tel(p) { return 'tel:+55' + p.replace(/\D/g, ''); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }

  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------- ícones e links do WhatsApp ---------- */
    $$('[data-i]').forEach(function (el) { el.insertAdjacentHTML('afterbegin', icon(el.getAttribute('data-i'))); });
    $$('[data-wa]').forEach(function (a) {
      var m = a.getAttribute('data-wa');
      a.href = wa(m === 'geral' ? '' : m); a.target = '_blank'; a.rel = 'noopener';
    });
    $$('[data-tel]').forEach(function (a) { a.href = tel(P.phones[0]); });
    $('#year').textContent = new Date().getFullYear();

    /* ---------- aberto agora ---------- */
    var DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    function nextOpen(now) {
      for (var k = 0; k < 8; k++) {
        var d = (now.getDay() + k) % 7, h = P.open[d];
        if (!h) continue;
        if (k === 0 && now.getHours() >= h[0]) continue;
        return (k === 0 ? 'hoje' : k === 1 ? 'amanhã' : DIAS[d].toLowerCase()) + ' às ' + String(h[0]).padStart(2, '0') + 'h';
      }
      return '';
    }
    function status() {
      var now = new Date(), h = P.open[now.getDay()], hr = now.getHours() + now.getMinutes() / 60;
      var isOpen = !!h && hr >= h[0] && hr < h[1];
      $$('[data-status]').forEach(function (el) {
        el.classList.toggle('open', isOpen);
        el.innerHTML = '<i></i>' + (isOpen ? 'Aberto agora · até ' + h[1] + 'h' : 'Fechado · abre ' + nextOpen(now));
      });
    }
    status(); setInterval(status, 60000);

    var hoursEl = $('#hours');
    if (hoursEl) {
      var today = new Date().getDay();
      hoursEl.innerHTML = [2, 3, 4, 5, 6, 0, 1].map(function (d) {
        var h = P.open[d];
        return '<li' + (d === today ? ' class="today"' : '') + '><span>' + DIAS[d] + (d === today ? ' (hoje)' : '') + '</span><span>' + (h ? String(h[0]).padStart(2, '0') + 'h às ' + h[1] + 'h' : 'Fechado') + '</span></li>';
      }).join('');
    }

    /* ---------- serviços ---------- */
    var cards = $('#cards');
    cards.innerHTML = CATS.map(function (c) {
      return '<article class="card reveal"><figure><img src="' + c.img + '" alt="" width="800" height="600" loading="lazy" decoding="async"></figure>' +
        '<div class="b"><h3>' + c.nome + '</h3><p>' + c.desc + '</p><ul class="tags">' +
        c.items.map(function (i) { return '<li>' + i[0] + '</li>'; }).join('') + '</ul>' +
        '<div class="from"><div><small>' + (c.partir ? 'A partir de' : 'Valor') + '</small><strong>' + c.from + '</strong></div>' +
        '<a class="btn ghost" target="_blank" rel="noopener" href="' + wa(c.msg) + '">Agendar</a></div></div></article>';
    }).join('');
    var dots = $('#dots');
    dots.innerHTML = CATS.map(function (c, k) { return '<button type="button" aria-label="Ver ' + c.nome + '" data-k="' + k + '"></button>'; }).join('');
    function markDots() {
      var w = cards.firstElementChild.getBoundingClientRect().width + 16, k = Math.round(cards.scrollLeft / w);
      $$('button', dots).forEach(function (d, j) { d.classList.toggle('on', j === k); });
    }
    cards.addEventListener('scroll', function () { requestAnimationFrame(markDots); }, { passive: true });
    dots.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      cards.scrollTo({ left: cards.children[+b.dataset.k].offsetLeft - cards.offsetLeft - 20, behavior: 'smooth' });
    });
    markDots();

    /* ---------- valores (abas no mobile, grade no desktop) ---------- */
    var tabs = $('#price-tabs'), panels = $('#price-panels');
    tabs.innerHTML = CATS.map(function (c, k) {
      return '<button class="chip" role="tab" id="t-' + c.id + '" aria-controls="p-' + c.id + '" aria-selected="' + (k === 0) + '">' + c.nome.split(' ')[0] + '</button>';
    }).join('');
    panels.innerHTML = CATS.map(function (c, k) {
      return '<div class="price reveal" role="tabpanel" id="p-' + c.id + '" aria-labelledby="t-' + c.id + '"' + (k ? ' hidden' : '') + '><h3>' + c.nome + '</h3><ul>' +
        c.items.map(function (i) { return '<li><span>' + i[0] + '</span><i></i><b>' + i[1] + '</b></li>'; }).join('') +
        '</ul><a class="btn ghost sm" target="_blank" rel="noopener" href="' + wa(c.msg) + '">' + icon('wa') + 'Agendar ' + c.nome.split(' ')[0].toLowerCase() + '</a></div>';
    }).join('');
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('[role=tab]'); if (!b) return;
      $$('[role=tab]', tabs).forEach(function (t) { t.setAttribute('aria-selected', t === b); });
      $$('[role=tabpanel]', panels).forEach(function (p) { p.hidden = p.id !== b.getAttribute('aria-controls'); p.classList.add('in'); });
    });

    /* ---------- avaliação ---------- */
    $('#steps').innerHTML = FATORES.map(function (f, k) {
      return '<div class="step reveal"><b>' + (k + 1) + '</b><h3>' + f[0] + '</h3><p>' + f[1] + '</p></div>';
    }).join('');

    /* ---------- contato ---------- */
    $('#tels').innerHTML = P.phones.map(function (p) { return '<a href="' + tel(p) + '">' + icon('phone') + p + '</a>'; }).join('') +
      '<a href="' + wa('') + '" target="_blank" rel="noopener">' + icon('wa') + 'Conversar no WhatsApp</a>';
    var social = '';
    if (P.instagram) social += '<a href="https://instagram.com/' + P.instagram.replace('@', '') + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon('insta') + '</a>';
    if (P.facebook) social += '<a href="' + P.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon('fb') + '</a>';
    social += '<a href="' + wa('') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icon('wa') + '</a>';
    $$('[data-social]').forEach(function (el) { el.innerHTML = social; });
    var q = encodeURIComponent(P.address);
    $('#maps-link').href = 'https://www.google.com/maps/search/?api=1&query=' + q;
    var map = $('#map');
    // o mapa só carrega quando chega perto da tela (economiza dados no celular)
    var loadMap = function () { if (!map.firstChild) map.innerHTML = '<iframe title="Mapa: ' + P.address + '" src="https://www.google.com/maps?q=' + q + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'; };

    /* ---------- galeria + lightbox ---------- */
    var grid = $('#grid');
    grid.innerHTML = GAL.map(function (g, i) {
      return '<button class="item" data-n="' + i + '" data-cat="' + g.cat + '" aria-label="Ampliar foto: ' + g.alt + '"><img src="' + g.src + '" alt="' + g.alt + '" width="' + g.w + '" height="' + g.h + '" loading="lazy" decoding="async"><span class="zoom">' + icon('zoom') + '</span></button>';
    }).join('');
    var items = $$('.item', grid), visible = items.slice();
    $$('[data-f]').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-f');
        $$('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        items.forEach(function (it) { it.hidden = !(f === 'todos' || it.dataset.cat === f); });
        visible = items.filter(function (it) { return !it.hidden; });
      });
    });
    var lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Foto ampliada');
    lb.innerHTML = '<button class="x" aria-label="Fechar">' + icon('x') + '</button><button class="p" aria-label="Foto anterior">' + icon('left') + '</button><img alt=""><button class="n" aria-label="Próxima foto">' + icon('right') + '</button><div class="cap" aria-live="polite"></div>';
    document.body.appendChild(lb);
    var lbImg = $('img', lb), cap = $('.cap', lb), cur = 0, last = null;
    function show(k) {
      cur = (k + visible.length) % visible.length;
      var g = GAL[+visible[cur].dataset.n];
      lbImg.src = g.src; lbImg.alt = g.alt; cap.textContent = g.alt + ' · ' + (cur + 1) + '/' + visible.length;
    }
    function lock(on) { document.body.style.overflow = on ? 'hidden' : ''; }
    function openLb(it) { last = it; show(visible.indexOf(it)); lb.classList.add('open'); lock(true); $('.x', lb).focus(); }
    function closeLb() { lb.classList.remove('open'); lock(false); if (last) last.focus(); }
    grid.addEventListener('click', function (e) { var it = e.target.closest('.item'); if (it) openLb(it); });
    $('.x', lb).onclick = closeLb;
    $('.p', lb).onclick = function () { show(cur - 1); };
    $('.n', lb).onclick = function () { show(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); });

    /* ---------- menu mobile ---------- */
    var btn = $('#menuBtn'), drawer = $('#drawer');
    function setMenu(o) {
      drawer.classList.toggle('open', o); btn.setAttribute('aria-expanded', o);
      btn.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu');
      btn.innerHTML = icon(o ? 'x' : 'menu'); lock(o);
    }
    btn.innerHTML = icon('menu');
    btn.addEventListener('click', function () { setMenu(!drawer.classList.contains('open')); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    matchMedia('(min-width:960px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (lb.classList.contains('open')) closeLb(); else if (drawer.classList.contains('open')) setMenu(false); }
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });

    /* ---------- rolagem: cabeçalho, barra fixa, voltar ao topo ---------- */
    var header = $('.header'), dock = $('.dock'), top = $('.to-top'), hero = $('.hero');
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 8);
      var past = y > hero.offsetHeight * 0.6;
      dock.classList.toggle('show', past);
      top.classList.toggle('show', y > 900);
    }
    window.addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
    onScroll();
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    /* ---------- animações e menu ativo ---------- */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      $$('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

      var links = $$('.nav a');
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('section[id]').forEach(function (s) { spy.observe(s); });

      new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { loadMap(); o.disconnect(); } }, { rootMargin: '400px' }).observe(map);
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
      loadMap();
    }
  });
})();
