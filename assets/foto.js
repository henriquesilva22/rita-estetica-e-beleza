/* Rita Beleza e Estética — diminui a foto no próprio aparelho antes de enviar. */
(function () {
  'use strict';
  function toBlob(canvas, quality) {
    return new Promise(function (ok, fail) {
      canvas.toBlob(function (b) { b ? ok(b) : fail(new Error('canvas')); }, 'image/jpeg', quality);
    });
  }
  function open(blob) {
    if (window.createImageBitmap) {
      return createImageBitmap(blob, { imageOrientation: 'from-image' }).catch(function () { return viaImg(blob); });
    }
    return viaImg(blob);
  }
  function viaImg(blob) {
    return new Promise(function (ok, fail) {
      var url = URL.createObjectURL(blob), img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); ok(img); };
      img.onerror = function () { URL.revokeObjectURL(url); fail(new Error('formato')); };
      img.src = url;
    });
  }
  // bytes da foto -> bytes de um JPEG com no máximo maxBytes
  window.ritaFoto = function (bytes, maxSide, maxBytes) {
    return open(new Blob([bytes])).then(function (img) {
      var w = img.width, h = img.height, side = maxSide, quality = 0.82;
      function attempt() {
        var k = Math.min(1, side / Math.max(w, h));
        var c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(w * k));
        c.height = Math.max(1, Math.round(h * k));
        var g = c.getContext('2d');
        g.fillStyle = '#fff'; // fundo de PNG transparente
        g.fillRect(0, 0, c.width, c.height);
        g.drawImage(img, 0, 0, c.width, c.height);
        return toBlob(c, quality).then(function (b) {
          if (b.size <= maxBytes || side < 420) return b;
          if (quality > 0.6) quality -= 0.1; else side = Math.round(side * 0.8);
          return attempt();
        });
      }
      return attempt().then(function (b) {
        if (img.close) img.close();
        return b.arrayBuffer();
      });
    }).then(function (buf) { return new Uint8Array(buf); });
  };
})();
