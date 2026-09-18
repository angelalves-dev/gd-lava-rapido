// =========================================
// SELEÇÃO DE PACOTE
// =========================================

const botoes = document.querySelectorAll(".select-btn");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const card = botao.parentElement;

        const nome = card.querySelector("h3").textContent;

        const precoTexto = card.querySelector("strong").textContent;

        const preco = parseFloat(
            precoTexto.replace("A partir de R$", "").replace(",", ".")
        );

        alert(
            "Você escolheu o pacote " +
            nome +
            "!\n\nValor inicial: R$ " +
            preco.toFixed(2).replace(".", ",")
        );

    });

});
