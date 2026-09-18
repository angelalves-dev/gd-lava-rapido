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

/* =========================================
   ESCOLHA DO VEÍCULO
========================================= */

.vehicle-selection {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
}

.vehicle-box {
    background: #111;
    border: 1px solid #c9a227;
    border-radius: 12px;

    width: 90%;
    max-width: 500px;

    padding: 40px;

    text-align: center;
}

.vehicle-box h2 {
    color: #c9a227;
    margin-bottom: 20px;
}

.vehicle-box p {
    color: #ddd;
    margin-bottom: 12px;
}

.vehicle-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;

    margin-top: 30px;
}

.vehicle-btn {
    background: #c9a227;
    color: #111;

    border: none;
    border-radius: 6px;

    padding: 15px 30px;

    font-size: 16px;
    font-weight: bold;

    cursor: pointer;

    transition: 0.3s;
}

.vehicle-btn:hover {
    transform: translateY(-3px);
    background: #e0bd3a;
}

@media (max-width: 500px) {

    .vehicle-buttons {
        flex-direction: column;
    }

    .vehicle-btn {
        width: 100%;
    }

}
