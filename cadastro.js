const form = document.getElementById('formCadastro');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  errorMessage.textContent = '';

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value.trim();
  const confirmarSenha = form.confirmarSenha.value.trim();

  console.log('Tentando cadastrar:', { nome, email, senha, confirmarSenha });

  if (!nome || !email || !senha || !confirmarSenha) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  if (!validarEmail(email)) {
    errorMessage.textContent = 'E-mail inválido.';
    return;
  }

  if (!validarSenha(senha)) {
    errorMessage.textContent = 'Senha deve ter no mínimo 6 caracteres, com letras e números.';
    return;
  }

  if (senha !== confirmarSenha) {
    errorMessage.textContent = 'As senhas não coincidem.';
    return;
  }

  let usuarios = [];
  try {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  } catch (err) {
    console.error('Erro ao ler usuários do localStorage:', err);
    usuarios = [];
  }

  if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    errorMessage.textContent = 'E-mail já cadastrado.';
    return;
  }

  usuarios.push({ nome, email, senha });

  try {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuário cadastrado com sucesso:', { nome, email });
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'perfil.html';
  } catch (err) {
    console.error('Erro ao salvar usuário no localStorage:', err);
    errorMessage.textContent = 'Erro ao salvar usuário. Tente novamente.';
  }
});

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return senha.length >= 6 && /[A-Za-z]/.test(senha) && /\d/.test(senha);
}
