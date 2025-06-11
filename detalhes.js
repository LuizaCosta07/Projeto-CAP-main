function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const livroId = getIdFromUrl();

const container = document.getElementById("detalhes");
const btnVoltar = document.getElementById("btn-voltar");

btnVoltar.addEventListener("click", () => {
  window.location.href = "inicial.html"; 
});

if (livroId) {
  const url = `https://www.googleapis.com/books/v1/volumes/${livroId}`;

  fetch(url)
    .then(response => response.json())
    .then(livro => {
      const titulo = livro.volumeInfo.title;
      const autores = livro.volumeInfo.authors?.join(", ") || "Autor desconhecido";
      const descricao = livro.volumeInfo.description || "Sem descrição disponível.";
      const imagem = livro.volumeInfo.imageLinks?.thumbnail || "";
      const editora = livro.volumeInfo.publisher || "Editora desconhecida";
      const publicadoEm = livro.volumeInfo.publishedDate || "Data de publicação desconhecida";
      const paginas = livro.volumeInfo.pageCount || "Número de páginas desconhecido";
      const idioma = livro.volumeInfo.language || "Idioma desconhecido";

      container.innerHTML = `
        <h2>${titulo}</h2>
        <p><strong>Autores:</strong> ${autores}</p>
        ${imagem ? `<img src="${imagem}" alt="Capa do livro" />` : ""}
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Editora:</strong> ${editora}</p>
        <p><strong>Publicado em:</strong> ${publicadoEm}</p>
        <p><strong>Páginas:</strong> ${paginas}</p>
        <p><strong>Idioma:</strong> ${idioma.toUpperCase()}</p>
      `;
    })
    .catch(() => {
      container.textContent = "Erro ao carregar os detalhes do livro.";
    });
} else {
  container.textContent = "ID do livro não informado.";
}

