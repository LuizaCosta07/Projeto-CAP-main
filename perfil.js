const perfilForm = document.getElementById('perfilForm');
const logoutBtn = document.getElementById('logoutBtn');
const message = document.getElementById('message');

function exibirMensagem(texto, tipo = '') {
  message.textContent = texto;
  message.className = tipo;
  if (tipo) {
    setTimeout(() => {
      message.textContent = '';
      message.className = '';
    }, 3500);
  }
}

function carregarPerfil() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuarioLogado) {
    alert('Você não está logado.');
    window.location.href = 'login.html';
    return;
  }
  perfilForm.nome.value = usuarioLogado.nome;
  perfilForm.email.value = usuarioLogado.email;
  perfilForm.senha.value = usuarioLogado.senha;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return senha.length >= 6 && /[A-Za-z]/.test(senha) && /\d/.test(senha);
}

perfilForm.addEventListener('submit', e => {
  e.preventDefault();
  const nome = perfilForm.nome.value.trim();
  const email = perfilForm.email.value.trim();
  const senha = perfilForm.senha.value.trim();

  if (!nome || !email || !senha) {
    exibirMensagem('Por favor, preencha todos os campos.', 'error');
    return;
  }
  if (!validarEmail(email)) {
    exibirMensagem('E-mail inválido.', 'error');
    return;
  }
  if (!validarSenha(senha)) {
    exibirMensagem('Senha deve ter no mínimo 6 caracteres, com letras e números.', 'error');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const usuarioIndex = usuarios.findIndex(u => u.email === usuarioLogado.email);

  if (usuarioIndex === -1) {
    alert('Usuário não encontrado.');
    window.location.href = 'login.html';
    return;
  }

  usuarios[usuarioIndex] = { nome, email, senha };
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioLogado', JSON.stringify({ nome, email, senha }));

  exibirMensagem('Perfil atualizado com sucesso!', 'success');
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
});

carregarPerfil();
