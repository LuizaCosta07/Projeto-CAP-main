function buscarLivro() {
  const termo = document.getElementById("busca").value.trim();
  if (!termo) {
    alert("Por favor, digite o título do livro para buscar.");
    return;
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termo)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById("resultado");
      lista.innerHTML = "";

      if (data.items && data.items.length > 0) {
        data.items.forEach(livro => {
          const titulo = livro.volumeInfo.title;
          const autores = livro.volumeInfo.authors?.join(", ") || "Autor desconhecido";
          const id = livro.id;

          const li = document.createElement("li");

          const a = document.createElement("a");
          a.href = `detalhes.html?id=${id}`;
          a.textContent = titulo;

          li.appendChild(a);
          li.append(` — ${autores}`);

          lista.appendChild(li);
        });
      } else {
        lista.innerHTML = "<li>Nenhum livro encontrado</li>";
      }
    })
    .catch(error => {
      console.error("Erro ao buscar livros:", error);
      document.getElementById("resultado").innerHTML = "<li>Erro ao buscar livros. Tente novamente.</li>";
    });
}
