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

        // =========================================
        // ESCOLHA DO VEÍCULO
        // =========================================

        const escolhaVeiculo = document.createElement("div");

        escolhaVeiculo.classList.add("vehicle-selection");

        escolhaVeiculo.innerHTML = `
            <div class="vehicle-box">

                <h2>Escolha seu veículo</h2>

                <p>
                    Você escolheu o pacote <strong>${nome}</strong>.
                </p>

                <p>
                    Agora informe o tipo de veículo:
                </p>

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

        // =========================================
        // BOTÕES CARRO / MOTO
        // =========================================

        const botoesVeiculo =
            escolhaVeiculo.querySelectorAll(".vehicle-btn");

        botoesVeiculo.forEach(function (botaoVeiculo) {

            botaoVeiculo.addEventListener("click", function () {

                const veiculo = botaoVeiculo.dataset.veiculo;

                mostrarServicosExtras(
                    escolhaVeiculo,
                    veiculo,
                    nome,
                    preco
                );

            });

        });

    });

});


// =========================================
// SERVIÇOS EXTRAS
// =========================================

function mostrarServicosExtras(
    janela,
    veiculo,
    nomePacote,
    precoPacote
) {

    janela.innerHTML = `
        <div class="vehicle-box">

            <h2>Personalize seu serviço</h2>

            <p>
                Veículo: <strong>${veiculo}</strong>
            </p>

            <p>
                Pacote: <strong>${nomePacote}</strong>
            </p>

            <hr>

            <h3>Serviços adicionais</h3>

            <div class="extra-service">

                <label>
                    <input type="checkbox"
                           class="extra-checkbox"
                           data-preco="30">
                    Lavagem externa — R$ 30,00
                </label>

            </div>

            <div class="extra-service">

                <label>
                    <input type="checkbox"
                           class="extra-checkbox"
                           data-preco="50">
                    Higienização interna — R$ 50,00
                </label>

            </div>

            <div class="extra-service">

                <label>
                    <input type="checkbox"
                           class="extra-checkbox"
                           data-preco="40">
                    Enceramento — R$ 40,00
                </label>

            </div>

            <div class="extra-service">

                <label>
                    <input type="checkbox"
                           class="extra-checkbox"
                           data-preco="100">
                    Polimento — R$ 100,00
                </label>

            </div>

            <div class="total-box">

                <strong>
                    Total: R$ <span id="total">${precoPacote.toFixed(2).replace(".", ",")}</span>
                </strong>

            </div>

            <button id="continuar-btn" class="vehicle-btn">
                CONTINUAR
            </button>

        </div>
    `;


    // =========================================
    // CALCULAR TOTAL
    // =========================================

    const checkboxes =
        janela.querySelectorAll(".extra-checkbox");

    const totalElemento =
        janela.querySelector("#total");

    function atualizarTotal() {

        let total = precoPacote;

        checkboxes.forEach(function (checkbox) {

            if (checkbox.checked) {

                total += parseFloat(
                    checkbox.dataset.preco
                );

            }

        });

        totalElemento.textContent =
            total.toFixed(2).replace(".", ",");

    }


    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            atualizarTotal
        );

    });


    // =========================================
    // CONTINUAR
    // =========================================

    const continuar =
        janela.querySelector("#continuar-btn");

   continuar.addEventListener("click", function () {

    mostrarAgendamento(
        janela,
        veiculo,
        nomePacote,
        totalElemento.textContent
    );

});
