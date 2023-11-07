 const estadoImages = {
            "AC": { nome: "Acre", imagem: "img/acre.png" },
            "AL": { nome: "Alagoas", imagem: "img/alagoas.png" },
            "AP": { nome: "Amapá", imagem: "img/amapa.png" },
            "AM": { nome: "Amazonas", imagem: "img/amazonas.png" },
            "BA": { nome: "Bahia", imagem: "img/bahia.png" },
            "CE": { nome: "Ceará", imagem: "img/ceara.png" },
            "DF": { nome: "Distrito Federal", imagem: "img/distrito-federal.png" },
            "ES": { nome: "Espírito Santo", imagem: "img/espirito-santo.png" },
            "GO": { nome: "Goiás", imagem: "img/goias.png" },
            "MA": { nome: "Maranhão", imagem: "img/maranhão.jpg" },
            "MT": { nome: "Mato Grosso", imagem: "img/mato-grosso.png" },
            "MS": { nome: "Mato Grosso do Sul", imagem: "img/mato-grosso-do-sul.png" },
            "MG": { nome: "Minas Gerais", imagem: "img/minas-gerais.png" },
            "PA": { nome: "Pará", imagem: "img/para.png" },
            "PB": { nome: "Paraíba", imagem: "img/paraiba.png" },
            "PR": { nome: "Paraná", imagem: "img/parana.png" },
            "PE": { nome: "Pernambuco", imagem: "img/pernambuco.png" },
            "PI": { nome: "Piauí", imagem: "img/piauí.png" },
            "RJ": { nome: "Rio de Janeiro", imagem: "img/rio-de-janeiro.png" },
            "RN": { nome: "Rio Grande do Norte", imagem: "img/rio-grande-do-norte.png" },
            "RS": { nome: "Rio Grande do Sul", imagem: "img/rio-grande-do-sul.png" },
            "RO": { nome: "Rondônia", imagem: "img/rondonia.png" },
            "RR": { nome: "Roraima", imagem: "img/roraima.png" },
            "SC": { nome: "Santa Catarina", imagem: "img/santa-catarina.png" },
            "SP": { nome: "São Paulo", imagem: "img/são-paulo.png" },
            "SE": { nome: "Sergipe", imagem: "img/sergipe.png" },
            "TO": { nome: "Tocantins", imagem: "img/tocantins.png" },
        }

        const cepForm = document.getElementById("cepForm");
        cepForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const cepInput = document.getElementById("cep");
            const cep = cepInput.value;

            // Verifique se o CEP possui 8 dígitos
            if (cep.length !== 8) {
                alert("O CEP deve ter exatamente 8 dígitos.");
                return;
            }

            const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("logradouro").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("uf").value = data.uf;
                    document.getElementById("numero").focus();

                    const estadoImage = document.getElementById("estadoImage");
                    const estadoName = document.getElementById("estadoName");

                    if (estadoImages[data.uf]) {
                        estadoImage.style.display = "block";
                        estadoImage.src = estadoImages[data.uf].imagem;
                        estadoName.style.display = "block";
                        estadoName.textContent = estadoImages[data.uf].nome;
                    } else {
                        estadoImage.style.display = "none";
                        estadoName.style.display = "none";
                    }
                })
                .catch(error => {
                    alert.error("Erro ao buscar o endereço pelo CEP: " + error);
                });
        });

        const limparCampos = document.getElementById("limparCampos");
        limparCampos.addEventListener("click", function () {
            document.getElementById("cep").value = "";
            document.getElementById("logradouro").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("uf").value = "";
            document.getElementById("numero").value = "";
            const estadoImage = document.getElementById("estadoImage");
            const estadoName = document.getElementById("estadoName");
            estadoImage.style.display = "none";
            estadoName.style.display = "none";
        });
