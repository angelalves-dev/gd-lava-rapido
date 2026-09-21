/* =====================================================
   GD LAVA RÁPIDO
   SISTEMA DE AGENDAMENTO
===================================================== */


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://ljswwokxcgglqluzwctq.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_CS4rdWdRC9iVrHNvXXCzHA_6kH6WRlG";


window.supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   VARIÁVEIS DO PEDIDO
===================================================== */

let pedidoAtual = {
    pacote: "",
    precoPacote: 0,
    veiculo: "",
    extras: [],
    total: 0,
    data: "",
    horario: "",
    nome: "",
    whatsapp: "",
    modelo: "",
    placa: ""
};


/* =====================================================
   ELEMENTOS
===================================================== */

const vehicleModal =
    document.getElementById("vehicleModal");

const closeVehicleModal =
    document.getElementById("closeVehicleModal");


/* =====================================================
   SELEÇÃO DOS PACOTES
===================================================== */

const botoesPacote =
    document.querySelectorAll(".select-btn");


botoesPacote.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const pacote =
            botao.dataset.package;

        const preco =
            Number(botao.dataset.price);


        pedidoAtual.pacote = pacote;
        pedidoAtual.precoPacote = preco;
        pedidoAtual.total = preco;


        abrirModalVeiculo();

    });

});


/* =====================================================
   ABRIR MODAL DO VEÍCULO
===================================================== */

function abrirModalVeiculo() {

    if (!vehicleModal) {
        return;
    }


    vehicleModal.style.display = "flex";

    document.body.classList.add("modal-open");

}


/* =====================================================
   FECHAR MODAL DO VEÍCULO
===================================================== */

function fecharModalVeiculo() {

    if (!vehicleModal) {
        return;
    }


    vehicleModal.style.display = "none";

    document.body.classList.remove("modal-open");

}


/* =====================================================
   BOTÃO X
===================================================== */

if (closeVehicleModal) {

    closeVehicleModal.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            fecharModalVeiculo();

        }
    );

}


/* =====================================================
   CLICAR FORA DO MODAL
===================================================== */

if (vehicleModal) {

    vehicleModal.addEventListener(
        "click",
        function (event) {

            if (event.target === vehicleModal) {

                fecharModalVeiculo();

            }

        }
    );

}


/* =====================================================
   TECLA ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            fecharModalVeiculo();

        }

    }
);


/* =====================================================
   ESCOLHA DO VEÍCULO
===================================================== */

const botoesVeiculo =
    document.querySelectorAll(".vehicle-box");


botoesVeiculo.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const veiculo =
            botao.dataset.vehicle;


        pedidoAtual.veiculo = veiculo;


        fecharModalVeiculo();

        mostrarServicosExtras();

    });

});


/* =====================================================
   SERVIÇOS EXTRAS
===================================================== */

function mostrarServicosExtras() {

    const extrasExistentes =
        document.getElementById("extras-container");


    if (extrasExistentes) {
        extrasExistentes.remove();
    }


    const container =
        document.createElement("section");

    container.id = "extras-container";

    container.className = "extras-section";


    container.innerHTML = `

        <div class="section-title">

            <p class="subtitle">
                PERSONALIZE SEU ATENDIMENTO
            </p>

            <h2>
                ADICIONE <span>SERVIÇOS EXTRAS</span>
            </h2>

            <p>
                Escolha os serviços adicionais que deseja contratar.
            </p>

        </div>


        <div class="extras-list">

            <label class="extra-service">

                <input
                    type="checkbox"
                    class="extra-checkbox"
                    data-name="Lavagem externa"
                    data-price="30">

                <span>
                    Lavagem externa
                </span>

                <strong>
                    + R$ 30
                </strong>

            </label>


            <label class="extra-service">

                <input
                    type="checkbox"
                    class="extra-checkbox"
                    data-name="Higienização interna"
                    data-price="50">

                <span>
                    Higienização interna
                </span>

                <strong>
                    + R$ 50
                </strong>

            </label>


            <label class="extra-service">

                <input
                    type="checkbox"
                    class="extra-checkbox"
                    data-name="Enceramento"
                    data-price="40">

                <span>
                    Enceramento
                </span>

                <strong>
                    + R$ 40
                </strong>

            </label>


            <label class="extra-service">

                <input
                    type="checkbox"
                    class="extra-checkbox"
                    data-name="Polimento"
                    data-price="100">

                <span>
                    Polimento
                </span>

                <strong>
                    + R$ 100
                </strong>

            </label>

        </div>


        <div class="total-box">

            <span>
                TOTAL DO SERVIÇO
            </span>

            <strong id="total-display">
                R$ ${formatarMoeda(pedidoAtual.precoPacote)}
            </strong>

        </div>


        <button
            type="button"
            id="continuarExtras"
            class="btn">

            CONTINUAR

        </button>

    `;


    const services =
        document.getElementById("servicos");


    services.after(container);


    const checkboxes =
        container.querySelectorAll(".extra-checkbox");


    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            atualizarTotal
        );

    });


    document
        .getElementById("continuarExtras")
        .addEventListener(
            "click",
            function () {

                salvarExtras();

                mostrarAgendamento();

            }
        );


    container.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   ATUALIZAR TOTAL
===================================================== */

function atualizarTotal() {

    let total =
        pedidoAtual.precoPacote;


    const checkboxes =
        document.querySelectorAll(".extra-checkbox");


    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            total +=
                Number(checkbox.dataset.price);

        }

    });


    pedidoAtual.total = total;


    const display =
        document.getElementById("total-display");


    if (display) {

        display.textContent =
            formatarMoeda(total);

    }

}


/* =====================================================
   SALVAR EXTRAS
===================================================== */

function salvarExtras() {

    pedidoAtual.extras = [];


    const checkboxes =
        document.querySelectorAll(".extra-checkbox");


    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            pedidoAtual.extras.push({

                nome: checkbox.dataset.name,

                preco:
                    Number(checkbox.dataset.price)

            });

        }

    });

}


/* =====================================================
   AGENDAMENTO
===================================================== */

function mostrarAgendamento() {

    const antigo =
        document.getElementById("schedule-container");


    if (antigo) {
        antigo.remove();
    }


    const container =
        document.createElement("section");


    container.id =
        "schedule-container";


    container.className =
        "schedule-section";


    container.innerHTML = `

        <div class="section-title">

            <p class="subtitle">
                PRÓXIMO PASSO
            </p>

            <h2>
                ESCOLHA O <span>HORÁRIO</span>
            </h2>

            <p>
                Escolha a melhor data e horário para o atendimento.
            </p>

        </div>


        <div class="schedule-form">

            <label>
                Data
            </label>

            <input
                type="date"
                id="dataAgendamento"
                class="schedule-input">


            <label>
                Horário
            </label>

            <select
                id="horarioAgendamento"
                class="schedule-input">

                <option value="">
                    Selecione um horário
                </option>

                <option value="08:00">
                    08:00
                </option>

                <option value="09:00">
                    09:00
                </option>

                <option value="10:00">
                    10:00
                </option>

                <option value="11:00">
                    11:00
                </option>

                <option value="13:00">
                    13:00
                </option>

                <option value="14:00">
                    14:00
                </option>

                <option value="15:00">
                    15:00
                </option>

                <option value="16:00">
                    16:00
                </option>

                <option value="17:00">
                    17:00
                </option>

            </select>


            <button
                type="button"
                id="continuarAgendamento"
                class="btn">

                CONTINUAR

            </button>

        </div>

    `;


    document
        .getElementById("extras-container")
        .after(container);


    const dataInput =
        document.getElementById(
            "dataAgendamento"
        );


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");


    dataInput.min =
        `${ano}-${mes}-${dia}`;


    document
        .getElementById("continuarAgendamento")
        .addEventListener(
            "click",
            validarAgendamento
        );


    container.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   VALIDAR AGENDAMENTO
===================================================== */

function validarAgendamento() {

    const data =
        document.getElementById(
            "dataAgendamento"
        ).value;


    const horario =
        document.getElementById(
            "horarioAgendamento"
        ).value;


    if (!data || !horario) {

        alert(
            "Selecione a data e o horário do atendimento."
        );

        return;

    }


    pedidoAtual.data = data;
    pedidoAtual.horario = horario;


    mostrarFormularioCliente();

}


/* =====================================================
   FORMULÁRIO DO CLIENTE
===================================================== */

function mostrarFormularioCliente() {

    const antigo =
        document.getElementById(
            "customer-container"
        );


    if (antigo) {
        antigo.remove();
    }


    const container =
        document.createElement("section");


    container.id =
        "customer-container";


    container.className =
        "customer-section";


    container.innerHTML = `

        <div class="section-title">

            <p class="subtitle">
                ÚLTIMA ETAPA
            </p>

            <h2>
                SEUS <span>DADOS</span>
            </h2>

            <p>
                Informe seus dados para finalizar o pedido.
            </p>

        </div>


        <form id="customerForm" class="customer-form">

            <label>
                Nome
            </label>

            <input
                type="text"
                id="nomeCliente"
                required
                placeholder="Seu nome">


            <label>
                WhatsApp
            </label>

            <input
                type="tel"
                id="whatsappCliente"
                required
                placeholder="(92) 99999-9999">


            <label>
                Modelo do veículo
            </label>

            <input
                type="text"
                id="modeloVeiculo"
                required
                placeholder="Ex: Toyota Corolla">


            <label>
                Placa
            </label>

            <input
                type="text"
                id="placaVeiculo"
                required
                placeholder="ABC-1234">


            <button
                type="submit"
                class="btn">

                FINALIZAR AGENDAMENTO

            </button>

        </form>

    `;


    const schedule =
        document.getElementById(
            "schedule-container"
        );


    schedule.after(container);


    document
        .getElementById("customerForm")
        .addEventListener(
            "submit",
            finalizarPedido
        );


    container.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

async function finalizarPedido(event) {

    event.preventDefault();


    pedidoAtual.nome =
        document.getElementById(
            "nomeCliente"
        ).value.trim();


    pedidoAtual.whatsapp =
        document.getElementById(
            "whatsappCliente"
        ).value.trim();


    pedidoAtual.modelo =
        document.getElementById(
            "modeloVeiculo"
        ).value.trim();


    pedidoAtual.placa =
        document.getElementById(
            "placaVeiculo"
        ).value.trim();


    const pedido = {

        nome:
            pedidoAtual.nome,

        whatsapp:
            pedidoAtual.whatsapp,

        modelo:
            pedidoAtual.modelo,

        placa:
            pedidoAtual.placa,

        veiculo:
            pedidoAtual.veiculo,

        pacote:
            pedidoAtual.pacote,

        extras:
            pedidoAtual.extras,

        data:
            pedidoAtual.data,

        horario:
            pedidoAtual.horario,

        total:
            pedidoAtual.total,

        status:
            "Agendado"

    };


    try {

        const resultado =
            await window.supabaseClient
                .from("pedidos")
                .insert(pedido);


        if (resultado.error) {

            console.error(
                resultado.error
            );

            alert(
                "Não foi possível salvar o pedido."
            );

            return;

        }


        salvarPedidoLocal(pedido);

        mostrarSucesso(pedido);

    }

    catch (erro) {

        console.error(erro);

        alert(
            "Ocorreu um erro ao finalizar o agendamento."
        );

    }

}


/* =====================================================
   SALVAR BACKUP LOCAL
===================================================== */

function salvarPedidoLocal(pedido) {

    const pedidos =
        JSON.parse(
            localStorage.getItem(
                "pedidosGD"
            ) || "[]"
        );


    pedidos.push({

        ...pedido,

        created_at:
            new Date().toISOString()

    });


    localStorage.setItem(
        "pedidosGD",
        JSON.stringify(pedidos)
    );

}


/* =====================================================
   TELA DE SUCESSO
===================================================== */

function mostrarSucesso(pedido) {

    const customer =
        document.getElementById(
            "customer-container"
        );


    if (customer) {
        customer.remove();
    }


    const success =
        document.createElement("section");


    success.className =
        "success-section";


    success.innerHTML = `

        <div class="resumo-box">

            <div class="success-icon">
                ✓
            </div>

            <p class="subtitle">
                AGENDAMENTO REALIZADO
            </p>

            <h2>
                PEDIDO <span>CONFIRMADO!</span>
            </h2>

            <p>
                Obrigado, ${pedido.nome}.
                Seu atendimento foi registrado.
            </p>


            <div class="resumo-dados">

                <p>
                    <strong>Veículo:</strong>
                    ${pedido.veiculo}
                </p>

                <p>
                    <strong>Pacote:</strong>
                    ${pedido.pacote}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${formatarData(pedido.data)}
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${pedido.horario}
                </p>

                <p>
                    <strong>Total:</strong>
                    ${formatarMoeda(pedido.total)}
                </p>

            </div>

        </div>

    `;


    document
        .querySelector("main")
        .appendChild(success);


    success.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   FORMATAÇÃO DE MOEDA
===================================================== */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================================
   FORMATAÇÃO DE DATA
===================================================== */

function formatarData(data) {

    if (!data) {
        return "";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}
