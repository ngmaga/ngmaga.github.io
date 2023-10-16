// Inputs
const categoria = document.querySelector("#categoria");
const valor = document.querySelector("#valor");
const error = document.querySelector("#error");
const data = document.querySelector("#data");

// Tabela
const tabela = document.querySelector("#gastos-tabela");

// Form
const formInputs = document.querySelector("#form-inputs");

// Buttons
const btnCalcular = document.querySelector("#calcular");
const btnLimparExtrato = document.querySelector("#limpar-extrato");

// Resumo
const resumo = document.querySelector("#resumo");
const totalGasto = document.querySelector("#total-gasto");
const maiorGasto = document.querySelector("#maior-gasto");
const totalData = document.querySelector("#total-data");
const totalCategoria = document.querySelector("#total-categoria");
const maiorCategoria = document.querySelector("#maior-categoria");

// Classes
class Gasto {
    static _totalGasto = 0;
    static _listaGastos = [];
    constructor(categoria, data, valor) {
        this.categoria = categoria;
        this.data = data;
        this.valor = valor;
    }
    static getTotalGasto() {
        Gasto.atualizarTotalGasto();
        return Gasto._totalGasto;
    }
    static atualizarTotalGasto() {
        Gasto._totalGasto = 0;
        Gasto._totalGasto = Gasto._listaGastos.reduce((sum, obj) => sum + obj.valor, 0);
    }
    static getLista() {
        return Gasto._listaGastos;
    }
    static limparLista() {
        Gasto._listaGastos.splice(0);
        Gasto._totalGasto = 0;
    }
    static adicionarALista(gasto) {
        if (!Gasto.validarGasto(gasto)) {
            console.error("Validação deu errado");
            return;
        }
        Gasto._listaGastos.push(gasto);
        Gasto.atualizarTotalGasto();
        Gasto._listaGastos.sort((a, b) => b.data.localeCompare(a.data));
    }
    static validarGasto(gasto) {
        if (Object.keys(gasto).length > 3) return false;
        if (typeof gasto.categoria !== "string") return false;
        if (typeof gasto.valor !== "number") return false;
        if (typeof gasto.data !== "string") return false;
        if (gasto.valor < 0) return false;
        // Validar Data
        const date = new Date(gasto.data);
        if (date.toISOString().slice(0, 10) !== gasto.data) return false;

        return true;
    }
}

// Event Listeners
formInputs.addEventListener("submit", adicionarValores);

btnCalcular.addEventListener("click", (event) => {
    atualizarResumo();
    event.preventDefault();
});

btnLimparExtrato.addEventListener("click", (event) => {
    limparDados();
    event.preventDefault();
});

// Functions
function limparCampo() {
    categoria.selectedIndex = 0;
    valor.value = "";
    data.value = "";
}

function limparDados() {
    limparCampo();
    Gasto.limparLista();
    atualizarTabela();
    resumo.style.display = "none";
}

function adicionarValores() {
    const valorNumber = Number(valor.value.replace(",", "."));
    if (verificarErro()) return;

    const novoGasto = new Gasto(categoria.value, data.value, valorNumber);
    Gasto.adicionarALista(novoGasto);
    atualizarTabela();
    limparCampo();
    valor.removeEventListener("input", adicionarValores);
}

function atualizarTabela() {
    tabela.innerHTML = "";
    const lista = Gasto.getLista();

    for (const gasto of lista) {
        const dataFormatada = [...gasto.data.split("-")].reverse().join("/");
        tabela.innerHTML += `
            <tr>
                <td>${gasto.categoria}</td>
                <td>${dataFormatada}</td>
                <td>${gasto.valor}</td>
            </tr>
        `
    }
}

function verificarErro() {
    const valorNumber = Number(valor.value.replace(",", "."));
    if (isNaN(valorNumber)) {
        error.style.display = "block";
        error.innerText = "* Só aceitamos números!";
        valor.addEventListener("input", verificarErro);
        return true;
    }
    if (valorNumber < 0) {
        error.style.display = "block";
        error.innerText = "* Só aceitamos números positivos!";
        valor.addEventListener("input", verificarErro);
        return true;
    }
    error.style.display = "none";
    return false;
}

function atualizarResumo() {
    if (tabela.innerHTML === "") {
        alert("Nada para resumir");
        return;
    }
    totalGasto.innerText = Gasto.getTotalGasto().toFixed(2);
    maiorGasto.innerText = Math.max(...Gasto.getLista().map((e) => e.valor)).toFixed(2);
    const lista = Gasto.getLista();
    atualizarResumoTotalGastoDatas(lista);
    atualizarResumoTotalGastoCategorias(lista);
    atualizarResumoMaiorGastoCategorias(lista);
    resumo.style.display = "block";
}

function atualizarResumoMaiorGastoCategorias(lista) {
    const listaCategoria = [...lista].sort((a,b) => a.categoria.localeCompare(b.categoria));
    maiorCategoria.innerHTML = "<hr>"; 
    let atualGasto = 0;
    let categoria;

    for (const gasto of listaCategoria) {
        if (gasto.categoria !== categoria) {
            maiorCategoria.innerHTML += `<p>Maior gasto com ${gasto.categoria}: <span class="valor">${gasto.valor.toFixed(2)}</span></p>`;
            atualGasto = gasto.valor;
            categoria = gasto.categoria;
        }
        else {
            const valores = maiorCategoria.querySelectorAll(".valor");
            const atualValor = valores[valores.length - 1];
            atualGasto = Math.max(atualGasto, gasto.valor);
            atualValor.innerText = atualGasto.toFixed(2);
        }
    }
}

function atualizarResumoTotalGastoCategorias(lista) {
    const listaCategoria = [...lista].sort((a,b) => a.categoria.localeCompare(b.categoria));
    totalCategoria.innerHTML = "<hr>"; 
    let categoria;

    for (const gasto of listaCategoria) {
        if (gasto.categoria !== categoria) {
            totalCategoria.innerHTML += `<p>Total de gastos com ${gasto.categoria}: <span class="valor">${gasto.valor.toFixed(2)}</span></p>`;
            categoria = gasto.categoria;
        }
        else {
            const valores = totalCategoria.querySelectorAll(".valor");
            const atualValor = valores[valores.length - 1];
            const soma = Number(atualValor.innerText) + gasto.valor;
            atualValor.innerText = soma.toFixed(2);
        }
    }
}

function atualizarResumoTotalGastoDatas(lista) {
    let ano;
    let mes;
    totalData.innerHTML = "";
    for (const gasto of lista) {
        const anoGasto = gasto.data.split("-")[0];
        const mesGasto = gasto.data.split("-")[1];
        if (ano !== anoGasto) {
            totalData.innerHTML += `
            <h3>${anoGasto}</h3>
            <hr>
            <p>Total no Mês ${mesGasto}: <span class="valor">${gasto.valor.toFixed(2)}</span></p>
            `;
            ano = anoGasto;
            mes = mesGasto;
        }
        else if (mes !== mesGasto) {
            totalData.innerHTML += `<p>Total no Mês ${mesGasto}: <span class="valor">${gasto.valor.toFixed(2)}</span></p>`;
            mes = mesGasto;
        }
        else {
            const valores = totalData.querySelectorAll(".valor");
            const atualValor = valores[valores.length - 1];
            const soma = Number(atualValor.innerText) + gasto.valor
            atualValor.innerText = soma.toFixed(2);
        }
    }
}