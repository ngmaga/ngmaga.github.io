
  const nomeCompleto = document.querySelector("#nome_completo");
  const sobrenome = document.querySelector("#sobrenome");
  const nome = document.querySelector("#nome");

  // botão separar
  const separar = document.querySelector("#separar");

  // separação de nomes
  separar.addEventListener("click", () => {
    const txt = nomeCompleto.value.trim().replace(/ +/g, ' ');
    const lista = txt.split(' ');
    nome.value = lista[0];
    sobrenome.value = lista[1] || '';
    nomeCompleto.value = ''; // Limpar o campo nome_completo
  });

