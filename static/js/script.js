document.addEventListener("DOMContentLoaded", () => {
    let respostaAtual = "";
    let nivelSelecionado = "Novato";

    const nivelSelector = document.getElementById("nivel");
    const perguntaContainer = document.getElementById("pergunta-container");
    const perguntaElement = document.getElementById("pergunta");
    const respostaElement = document.getElementById("resposta");
    const botaoResposta = document.getElementById("botaoResposta");
    const botoesContainer = document.getElementById("botoes");
    const botaoNumeradosContainer = document.getElementById("botaoNumeradosContainer");

    // Função para atualizar o nível selecionado e exibir os botões corretos
    function atualizarNivelSelecionado() {
        nivelSelecionado = nivelSelector.value;
        toggleContainersVisibility(nivelSelecionado === "Racha Cuca");
    }

    // Associa eventos aos botões numerados para "Racha Cuca"
    document.querySelectorAll(".numerado-button").forEach((button, index) => {
        button.addEventListener("click", () => getPerguntaRachaCuca(index + 1));
    });

    // Alterna a visibilidade dos contêineres com base no nível
    function toggleContainersVisibility(isRachaCuca) {
        botoesContainer.style.display = isRachaCuca ? "none" : "flex";
        botaoNumeradosContainer.style.display = isRachaCuca ? "flex" : "none";
    }

    // Função para buscar a pergunta
    async function getPergunta(tema) {
        try {
            const response = await fetch(`/pergunta/${tema}/${nivelSelecionado}`);
            const data = await response.json();
            exibirPergunta(data);
        } catch (error) {
            console.error("Erro ao buscar pergunta:", error);
            exibirErro("Erro ao buscar pergunta. Tente novamente.");
        }
    }

    // Função para buscar perguntas de "Racha Cuca" com base no número
    async function getPerguntaRachaCuca(numero) {
        try {
            const response = await fetch(`/pergunta/Racha Cuca/Racha Cuca/${numero}`);
            const data = await response.json();
            exibirPergunta(data);
        } catch (error) {
            console.error("Erro ao buscar pergunta Racha Cuca:", error);
            exibirErro("Erro ao buscar pergunta. Tente novamente.");
        }
    }

    // Função para exibir a pergunta e resposta
    function exibirPergunta(data) {
        if (!data || data.error) {
            exibirErro(data ? data.error : "Erro desconhecido ao buscar a pergunta.");
        } else {
            perguntaElement.innerText = data.pergunta || "Pergunta não encontrada.";
            respostaAtual = data.resposta || "Resposta não disponível.";
            botaoResposta.style.display = respostaAtual ? "inline" : "none";
            respostaElement.innerText = "";
        }
    }

    // Função para exibir erros
    function exibirErro(mensagem) {
        perguntaElement.innerText = mensagem;
        respostaElement.innerText = "";
        botaoResposta.style.display = "none";
    }

    // Função para exibir a resposta
    function mostrarResposta() {
        if (respostaAtual) {
            respostaElement.innerText = respostaAtual;
            botaoResposta.style.display = "none";
            setTimeout(limparExibicaoPergunta, 7000);
        } else {
            respostaElement.innerText = "Nenhuma resposta disponível.";
        }
    }

    // Limpa a exibição de pergunta e resposta
    function limparExibicaoPergunta() {
        perguntaElement.innerText = "";
        respostaElement.innerText = "";
        botaoResposta.style.display = "none";
    }

    // Adiciona o evento de clique para o botão de resposta
    botaoResposta.addEventListener("click", mostrarResposta);

    // Adiciona eventos aos botões temáticos
    document.querySelectorAll(".tema-button").forEach(button => {
        const tema = button.textContent;
        button.addEventListener("click", () => getPergunta(tema));
    });

    // Adiciona o evento de mudança de nível
    nivelSelector.addEventListener("change", atualizarNivelSelecionado);


    // Inicializa o app
    function inicializarApp() {
        // Você pode adicionar inicializações adicionais aqui, caso necessário
    }

    inicializarApp();
});
