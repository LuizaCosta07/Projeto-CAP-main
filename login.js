const form = document.getElementById('formLogin');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = form.email.value.trim();
  const senha = form.senha.value.trim();

  errorMessage.textContent = '';

  if (!email || !senha) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
  );

  if (!usuarioEncontrado) {
    errorMessage.textContent = 'E-mail ou senha incorretos.';
    return;
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
  window.location.href = 'perfil.html';
});
