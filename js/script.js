const botoes = document.querySelectorAll(".select-btn");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const card = botao.parentElement;

        const nome = card.querySelector("h3").textContent;

        const precoTexto = card.querySelector("strong").textContent;

        const preco = parseFloat(
            precoTexto.replace("A partir de R$", "").replace(",", ".")
        );

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
                    <input type="checkbox" class="extra-checkbox" data-preco="30">
                    Lavagem externa — R$ 30,00
                </label>
            </div>

            <div class="extra-service">
                <label>
                    <input type="checkbox" class="extra-checkbox" data-preco="50">
                    Higienização interna — R$ 50,00
                </label>
            </div>

            <div class="extra-service">
                <label>
                    <input type="checkbox" class="extra-checkbox" data-preco="40">
                    Enceramento — R$ 40,00
                </label>
            </div>

            <div class="extra-service">
                <label>
                    <input type="checkbox" class="extra-checkbox" data-preco="100">
                    Polimento — R$ 100,00
                </label>
            </div>

            <div class="total-box">
                <strong>
                    Total: R$ 
                    <span id="total">
                        ${precoPacote.toFixed(2).replace(".", ",")}
                    </span>
                </strong>
            </div>

            <button id="continuar-btn" class="vehicle-btn">
                CONTINUAR
            </button>

        </div>
    `;

    const checkboxes =
        janela.querySelectorAll(".extra-checkbox");

    const totalElemento =
        janela.querySelector("#total");

    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            let total = precoPacote;

            checkboxes.forEach(function (item) {

                if (item.checked) {
                    total += parseFloat(item.dataset.preco);
                }

            });

            totalElemento.textContent =
                total.toFixed(2).replace(".", ",");

        });

    });

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

}


function mostrarAgendamento(
    janela,
    veiculo,
    nomePacote,
    total
) {

    janela.innerHTML = `
        <div class="vehicle-box">

            <h2>Agende seu atendimento</h2>

            <p>
                Veículo: <strong>${veiculo}</strong>
            </p>

            <p>
                Pacote: <strong>${nomePacote}</strong>
            </p>

            <p>
                Total: <strong>R$ ${total}</strong>
            </p>

            <hr>

            <h3>Escolha a data</h3>

            <input
                type="date"
                id="data-agendamento"
                class="schedule-input"
            >

            <h3>Escolha o horário</h3>

            <select
                id="horario-agendamento"
                class="schedule-input"
            >

                <option value="">
                    Selecione um horário
                </option>

                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>

            </select>

            <button
                id="agendar-btn"
                class="vehicle-btn"
            >
                CONTINUAR
            </button>

        </div>
    `;

    const campoData =
        janela.querySelector("#data-agendamento");

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    campoData.min = `${ano}-${mes}-${dia}`;

    const botaoAgendar =
        janela.querySelector("#agendar-btn");

    botaoAgendar.addEventListener("click", function () {

    const data = campoData.value;

    const horario =
        janela.querySelector("#horario-agendamento").value;

    if (!data) {

        alert("Por favor, escolha uma data.");

        return;
    }

    if (!horario) {

        alert("Por favor, escolha um horário.");

        return;
    }

    mostrarDadosCliente(
        janela,
        veiculo,
        nomePacote,
        data,
        horario,
        total
    );

});
}


// =========================================
// DADOS DO CLIENTE
// =========================================

function mostrarDadosCliente(
    janela,
    veiculo,
    nomePacote,
    data,
    horario,
    total
) {

    janela.innerHTML = `
        <div class="vehicle-box">

            <h2>Seus dados</h2>

            <p>
                Preencha seus dados para continuar.
            </p>

            <hr>

            <label class="form-label">
                Nome completo
            </label>

            <input
                type="text"
                id="nome-cliente"
                class="schedule-input"
                placeholder="Digite seu nome"
            >

            <label class="form-label">
                WhatsApp
            </label>

            <input
                type="tel"
                id="whatsapp-cliente"
                class="schedule-input"
                placeholder="(92) 99999-9999"
            >

            <label class="form-label">
                Modelo do veículo
            </label>

            <input
                type="text"
                id="modelo-veiculo"
                class="schedule-input"
                placeholder="Ex: Honda Civic"
            >

            <label class="form-label">
                Placa
            </label>

            <input
                type="text"
                id="placa-veiculo"
                class="schedule-input"
                placeholder="Ex: ABC1D23"
            >

            <button
                id="finalizar-dados-btn"
                class="vehicle-btn"
            >
                CONTINUAR
            </button>

        </div>
    `;


    // =========================================
    // BOTÃO CONTINUAR
    // =========================================

    const botaoFinalizar =
        janela.querySelector("#finalizar-dados-btn");


    botaoFinalizar.addEventListener(
        "click",
        function () {

            const nome =
                janela.querySelector("#nome-cliente").value.trim();

            const whatsapp =
                janela.querySelector("#whatsapp-cliente").value.trim();

            const modelo =
                janela.querySelector("#modelo-veiculo").value.trim();

            const placa =
                janela.querySelector("#placa-veiculo").value.trim();


            // =========================================
            // VALIDAÇÃO
            // =========================================

            if (!nome) {

                alert("Digite seu nome.");

                return;
            }

            if (!whatsapp) {

                alert("Digite seu WhatsApp.");

                return;
            }

            if (!modelo) {

                alert("Digite o modelo do veículo.");

                return;
            }

            if (!placa) {

                alert("Digite a placa do veículo.");

                return;
            }


            // =========================================
            // TESTE FINAL
            // =========================================

            mostrarResumoPedido(
    janela,
    nome,
    whatsapp,
    modelo,
    placa,
    veiculo,
    nomePacote,
    data,
    horario,
    total
);

}

        // =========================================
// RESUMO DO PEDIDO
// =========================================

function mostrarResumoPedido(
    janela,
    nome,
    whatsapp,
    modelo,
    placa,
    veiculo,
    nomePacote,
    data,
    horario,
    total
) {

    janela.innerHTML = `
        <div class="vehicle-box resumo-box">

            <h2>Resumo do pedido</h2>

            <p>
                Confira os dados antes de confirmar.
            </p>

            <hr>

            <div class="resumo-item">
                <span>Cliente</span>
                <strong>${nome}</strong>
            </div>

            <div class="resumo-item">
                <span>WhatsApp</span>
                <strong>${whatsapp}</strong>
            </div>

            <div class="resumo-item">
                <span>Veículo</span>
                <strong>${veiculo}</strong>
            </div>

            <div class="resumo-item">
                <span>Modelo</span>
                <strong>${modelo}</strong>
            </div>

            <div class="resumo-item">
                <span>Placa</span>
                <strong>${placa}</strong>
            </div>

            <div class="resumo-item">
                <span>Pacote</span>
                <strong>${nomePacote}</strong>
            </div>

            <div class="resumo-item">
                <span>Data</span>
                <strong>${data}</strong>
            </div>

            <div class="resumo-item">
                <span>Horário</span>
                <strong>${horario}</strong>
            </div>

            <div class="resumo-total">
                TOTAL: R$ ${total}
            </div>

            <button
                id="confirmar-btn"
                class="vehicle-btn"
            >
                CONFIRMAR AGENDAMENTO
            </button>

        </div>
    `;


    // =========================================
    // CONFIRMAR
    // =========================================

    const confirmar =
        janela.querySelector("#confirmar-btn");

    confirmar.addEventListener(
        "click",
        function () {

            alert(
                "Agendamento confirmado!\n\n" +
                "Obrigado, " + nome + "!"
            );

        }
    );

}
