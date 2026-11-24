/* Confirmar e-mail e criar nova senha, a partir do link recebido por e-mail. */
(function () {
  'use strict';
  // Chave pública do Firebase: identifica o projeto, não dá acesso a dados.
  var KEY = 'AIzaSyA9uwGWzxjRytxaHDbygMDEQshFpzASPl8';
  var q = new URLSearchParams(location.search);
  var mode = q.get('modo'), code = q.get('codigo');
  function $(id) { return document.getElementById(id); }
  // Tira o código da barra de endereço e do histórico
  if (code) history.replaceState(null, '', '/conta');

  function post(path, body) {
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:' + path + '?key=' + KEY, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error((j.error && j.error.message) || 'ERRO');
        return j;
      });
    });
  }
  function explain(e) {
    var m = String(e.message);
    if (/EXPIRED_OOB_CODE|INVALID_OOB_CODE/.test(m)) return 'Este link já foi usado ou venceu. Peça um novo pelo site.';
    if (/WEAK_PASSWORD/.test(m)) return 'A senha precisa de pelo menos 6 caracteres.';
    if (/USER_DISABLED|USER_NOT_FOUND/.test(m)) return 'Não encontramos esta conta.';
    return 'Não foi possível concluir. Verifique a internet e tente de novo.';
  }
  function done(title, text) {
    $('titulo').textContent = title;
    $('texto').textContent = text;
    $('senha').hidden = true;
    $('confirmar').hidden = true;
    $('aviso').textContent = '';
    $('seguir').hidden = false;
  }

  if (code && mode === 'confirmar') {
    $('titulo').textContent = 'Confirme seu e-mail';
    $('texto').textContent = 'Falta só um toque para concluir.';
    $('confirmar').hidden = false;
    // Confirma no toque: alguns leitores de e-mail abrem os links sozinhos
    $('confirmar').addEventListener('click', function () {
      $('confirmar').disabled = true;
      $('aviso').textContent = 'Confirmando...';
      post('update', { oobCode: code }).then(function () {
        done('E-mail confirmado', 'Tudo certo! Agora você recebe seus orçamentos e lembretes por e-mail.');
      }).catch(function (e) {
        $('confirmar').disabled = false;
        $('aviso').textContent = explain(e);
      });
    });
  } else if (code && mode === 'senha') {
    $('titulo').textContent = 'Crie uma nova senha';
    $('texto').textContent = 'Use pelo menos 6 caracteres.';
    $('senha').hidden = false;
    $('senha').addEventListener('submit', function (ev) {
      ev.preventDefault();
      if ($('s1').value !== $('s2').value) { $('aviso').textContent = 'As senhas não são iguais.'; return; }
      var button = $('senha').querySelector('button');
      button.disabled = true;
      $('aviso').textContent = 'Salvando...';
      post('resetPassword', { oobCode: code, newPassword: $('s1').value }).then(function () {
        done('Senha alterada', 'Pronto! Entre com a sua nova senha.');
      }).catch(function (e) {
        button.disabled = false;
        $('aviso').textContent = explain(e);
      });
    });
  }
})();
