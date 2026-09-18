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

        // Criar área de escolha do veículo
        const escolhaVeiculo = document.createElement("div");

        escolhaVeiculo.classList.add("vehicle-selection");

        escolhaVeiculo.innerHTML = `
            <div class="vehicle-box">

                <h2>Escolha seu veículo</h2>

                <p>Você escolheu o pacote <strong>${nome}</strong>.</p>

                <p>Agora informe o tipo de veículo:</p>

                <div class="vehicle-buttons">

                    <button class="vehicle-btn" data-veiculo="Carro">
                        🚗 Carro
                    </button>

                    <button class="vehicle-btn" data-veiculo="Moto">
                        🏍️ Moto
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(escolhaVeiculo);

        // Botões Carro e Moto
        const botoesVeiculo =
            escolhaVeiculo.querySelectorAll(".vehicle-btn");

        botoesVeiculo.forEach(function (botaoVeiculo) {

            botaoVeiculo.addEventListener("click", function () {

                const veiculo = botaoVeiculo.dataset.veiculo;

                alert(
                    "Veículo escolhido: " +
                    veiculo +
                    "\n\nPacote: " +
                    nome +
                    "\nValor inicial: R$ " +
                    preco.toFixed(2).replace(".", ",")
                );

            });

        });

    });

});
