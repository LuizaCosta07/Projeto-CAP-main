const userTableBody = document.getElementById('userTableBody');
const searchInput = document.getElementById('searchInput');
const message = document.getElementById('message');
let senhasVisiveis = new Set();

const getUsuarios = () => JSON.parse(localStorage.getItem('usuarios')) || [];

function renderUsuarios(lista) {
  userTableBody.innerHTML = lista.length
    ? lista.map(usuario => {
        const idx = getUsuarios().findIndex(u => u.email === usuario.email);
        const visivel = senhasVisiveis.has(idx);
        const senha = visivel ? usuario.senha : '*'.repeat(usuario.senha.length);
        const btnTexto = visivel ? 'Ocultar' : 'Mostrar';

        return `
          <tr>
            <td data-label="Nome">${usuario.nome}</td>
            <td data-label="E-mail">${usuario.email}</td>
            <td data-label="Senha">
              <span class="senha-text">${senha}</span>
              <button class="show-password-btn" aria-label="${btnTexto} senha do usuário ${usuario.nome}" data-index="${idx}">${btnTexto}</button>
            </td>
            <td data-label="Ações" class="actions">
              <button class="edit" aria-label="Editar usuário ${usuario.nome}" data-index="${idx}">Editar</button>
              <button class="delete" aria-label="Excluir usuário ${usuario.nome}" data-index="${idx}">Excluir</button>
            </td>
          </tr>`;
      }).join('')
    : `<tr><td colspan="4" style="text-align:center; padding:20px; color:#999;">Nenhum usuário encontrado.</td></tr>`;
}

function filtrarUsuarios() {
  const filtro = searchInput.value.toLowerCase();
  const lista = getUsuarios().filter(u => u.nome.toLowerCase().includes(filtro));
  renderUsuarios(lista);
}

searchInput.addEventListener('input', filtrarUsuarios);

userTableBody.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const index = +btn.dataset.index;
  if (btn.classList.contains('edit')) editarUsuario(index);
  else if (btn.classList.contains('delete')) deletarUsuario(index);
  else if (btn.classList.contains('show-password-btn')) toggleSenhaVisivel(index);
});

function toggleSenhaVisivel(index) {
  senhasVisiveis.has(index) ? senhasVisiveis.delete(index) : senhasVisiveis.add(index);
  filtrarUsuarios();
}

function editarUsuario(index) {
  const usuarios = getUsuarios();
  const u = usuarios[index];
  const nome = prompt('Editar nome:', u.nome);
  const email = nome !== null ? prompt('Editar e-mail:', u.email) : null;
  const senha = email !== null ? prompt('Editar senha:', u.senha) : null;

  if ([nome, email, senha].some(v => v === null)) return;
  if ([nome, email, senha].some(v => !v.trim())) return alert('Nenhum campo pode ficar vazio.');

  usuarios[index] = { nome: nome.trim(), email: email.trim(), senha: senha.trim() };
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  message.style.color = '#27ae60';
  message.textContent = 'Usuário atualizado com sucesso!';
  filtrarUsuarios();
}

function deletarUsuario(index) {
  const usuarios = getUsuarios();
  if (!confirm(`Tem certeza que deseja excluir o usuário "${usuarios[index].nome}"?`)) return;
  usuarios.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  message.style.color = '#d63031';
  message.textContent = 'Usuário excluído.';
  senhasVisiveis.clear();
  filtrarUsuarios();
}

filtrarUsuarios();
