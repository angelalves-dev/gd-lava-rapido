/* =====================================================
   GD LAVA RÁPIDO
   SISTEMA DE AGENDAMENTO
   CHECKOUT EM MODAL
===================================================== */


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://ljswwokxcgglqluzwctq.supabase.co";

/*
   COLE AQUI A MESMA CHAVE PUBLICÁVEL
   QUE JÁ ESTÁ NO SEU SCRIPT ATUAL.
*/
const SUPABASE_KEY =
    "COLE_AQUI_A_MESMA_CHAVE_PUBLICAVEL_DO_SEU_SCRIPT_ATUAL";


window.supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   PEDIDO ATUAL
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

const botoesPacote =
    document.querySelectorAll(".select-btn");

const botoesVeiculo =
    document.querySelectorAll(".vehicle-box");


/* =====================================================
   VARIÁVEL DO CHECKOUT
===================================================== */

let checkoutModal = null;


/* =====================================================
   SELEÇÃO DO PACOTE
===================================================== */

botoesPacote.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const pacote =
            botao.dataset.package;

        const preco =
            Number(botao.dataset.price);

        pedidoAtual = {
            pacote: pacote,
            precoPacote: preco,
            veiculo: "",
            extras: [],
            total: preco,
            data: "",
            horario: "",
            nome: "",
            whatsapp: "",
            modelo: "",
            placa: ""
        };

        abrirModalVeiculo();

    });

});


/* =====================================================
   MODAL DO VEÍCULO
===================================================== */

function abrirModalVeiculo() {

    if (!vehicleModal) {
        return;
    }

    vehicleModal.style.display = "flex";

    document.body.classList.add("modal-open");
}


function fecharModalVeiculo() {

    if (!vehicleModal) {
        return;
    }

    vehicleModal.style.display = "none";

    document.body.classList.remove("modal-open");
}


/* =====================================================
   BOTÃO X DO VEÍCULO
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
   CLICAR FORA DO MODAL DO VEÍCULO
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
   ESCOLHA DO VEÍCULO
===================================================== */

botoesVeiculo.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const veiculo =
            botao.dataset.vehicle;

        pedidoAtual.veiculo =
            veiculo;

        fecharModalVeiculo();

        abrirCheckout();

    });

});


/* =====================================================
   TECLA ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (vehicleModal &&
                vehicleModal.style.display === "flex") {

                fecharModalVeiculo();

            }

            if (checkoutModal) {

                fecharCheckout();

            }

        }

    }
);


/* =====================================================
   CRIAR CHECKOUT
===================================================== */

function criarCheckout() {

    if (checkoutModal) {
        return;
    }

    checkoutModal =
        document.createElement("div");

    checkoutModal.id =
        "gdCheckoutModal";

    checkoutModal.className =
        "gd-checkout-modal";

    checkoutModal.innerHTML = `

        <div class="gd-checkout-box">

            <button
                type="button"
                class="gd-checkout-close"
                id="fecharCheckout">

                ×

            </button>


            <div class="gd-checkout-top">

                <p class="subtitle">
                    GD LAVA RÁPIDO
                </p>

                <h2>
                    SEU <span>AGENDAMENTO</span>
                </h2>

                <div class="checkout-progress">

                    <span
                        class="progress-step active"
                        data-step="1">
                        1
                    </span>

                    <span class="progress-line"></span>

                    <span
                        class="progress-step"
                        data-step="2">
                        2
                    </span>

                    <span class="progress-line"></span>

                    <span
                        class="progress-step"
                        data-step="3">
                        3
                    </span>

                    <span class="progress-line"></span>

                    <span
                        class="progress-step"
                        data-step="4">
                        4
                    </span>

                </div>

            </div>


            <div
                id="checkoutContent"
                class="gd-checkout-content">
            </div>

        </div>

    `;

    document.body.appendChild(
        checkoutModal
    );


    document
        .getElementById("fecharCheckout")
        .addEventListener(
            "click",
            fecharCheckout
        );


    checkoutModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                checkoutModal
            ) {

                fecharCheckout();

            }

        }
    );

}


/* =====================================================
   ABRIR CHECKOUT
===================================================== */

function abrirCheckout() {

    criarCheckout();

    checkoutModal.style.display =
        "flex";

    document.body.classList.add(
        "modal-open"
    );

    mostrarExtras();

}


/* =====================================================
   FECHAR CHECKOUT
===================================================== */

function fecharCheckout() {

    if (!checkoutModal) {
        return;
    }

    checkoutModal.style.display =
        "none";

    document.body.classList.remove(
        "modal-open"
    );

}


/* =====================================================
   ATUALIZAR PROGRESSO
===================================================== */

function atualizarProgresso(etapa) {

    if (!checkoutModal) {
        return;
    }

    const passos =
        checkoutModal.querySelectorAll(
            ".progress-step"
        );

    passos.forEach(function (passo) {

        const numero =
            Number(
                passo.dataset.step
            );

        passo.classList.remove(
            "active",
            "completed"
        );

        if (numero === etapa) {

            passo.classList.add(
                "active"
            );

        }

        if (numero < etapa) {

            passo.classList.add(
                "completed"
            );

        }

    });

}


/* =====================================================
   ETAPA 1 - EXTRAS
===================================================== */

function mostrarExtras() {

    atualizarProgresso(1);

    const content =
        document.getElementById(
            "checkoutContent"
        );

    content.innerHTML = `

        <div class="checkout-step">

            <p class="checkout-label">
                ETAPA 1
            </p>

            <h3>
                Personalize seu serviço
            </h3>

            <p class="checkout-description">
                Escolha os serviços adicionais
                que deseja incluir no seu atendimento.
            </p>


            <div class="checkout-package">

                <div>
                    <span>Pacote escolhido</span>

                    <strong>
                        ${pedidoAtual.pacote}
                    </strong>
                </div>

                <strong>
                    ${formatarMoeda(
                        pedidoAtual.precoPacote
                    )}
                </strong>

            </div>


            <div class="checkout-vehicle">

                <span>Veículo</span>

                <strong>
                    ${pedidoAtual.veiculo}
                </strong>

            </div>


            <div class="extras-checkout">

                ${criarExtra(
                    "Lavagem externa",
                    30
                )}

                ${criarExtra(
                    "Higienização interna",
                    50
                )}

                ${criarExtra(
                    "Enceramento",
                    40
                )}

                ${criarExtra(
                    "Polimento",
                    100
                )}

            </div>


            <div class="checkout-total">

                <span>
                    TOTAL
                </span>

                <strong
                    id="checkoutTotal">
                    ${formatarMoeda(
                        pedidoAtual.total
                    )}
                </strong>

            </div>


            <button
                type="button"
                id="continuarExtras"
                class="btn checkout-btn">

                CONTINUAR

            </button>

        </div>

    `;


    const checkboxes =
        content.querySelectorAll(
            ".checkout-extra-checkbox"
        );


    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            atualizarTotalCheckout
        );

    });


    document
        .getElementById("continuarExtras")
        .addEventListener(
            "click",
            function () {

                salvarExtrasCheckout();

                mostrarAgendamento();

            }
        );

}


/* =====================================================
   CRIAR EXTRA
===================================================== */

function criarExtra(nome, preco) {

    return `

        <label class="checkout-extra">

            <input
                type="checkbox"
                class="checkout-extra-checkbox"
                data-name="${nome}"
                data-price="${preco}">

            <span class="checkout-extra-info">

                <strong>
                    ${nome}
                </strong>

                <small>
                    Serviço adicional
                </small>

            </span>

            <span class="checkout-extra-price">
                + ${formatarMoeda(preco)}
            </span>

        </label>

    `;

}


/* =====================================================
   ATUALIZAR TOTAL
===================================================== */

function atualizarTotalCheckout() {

    let total =
        pedidoAtual.precoPacote;


    const checkboxes =
        document.querySelectorAll(
            ".checkout-extra-checkbox"
        );


    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            total +=
                Number(
                    checkbox.dataset.price
                );

        }

    });


    pedidoAtual.total =
        total;


    const display =
        document.getElementById(
            "checkoutTotal"
        );


    if (display) {

        display.textContent =
            formatarMoeda(total);

    }

}


/* =====================================================
   SALVAR EXTRAS
===================================================== */

function salvarExtrasCheckout() {

    pedidoAtual.extras = [];


    const checkboxes =
        document.querySelectorAll(
            ".checkout-extra-checkbox"
        );


    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            pedidoAtual.extras.push({

                nome:
                    checkbox.dataset.name,

                preco:
                    Number(
                        checkbox.dataset.price
                    )

            });

        }

    });

}


/* =====================================================
   ETAPA 2 - AGENDAMENTO
===================================================== */

function mostrarAgendamento() {

    atualizarProgresso(2);

    const content =
        document.getElementById(
            "checkoutContent"
        );


    content.innerHTML = `

        <div class="checkout-step">

            <p class="checkout-label">
                ETAPA 2
            </p>

            <h3>
                Escolha a data e o horário
            </h3>

            <p class="checkout-description">
                Selecione quando deseja realizar
                o atendimento.
            </p>


            <div class="checkout-selected">

                <span>
                    Serviço
                </span>

                <strong>
                    ${pedidoAtual.pacote}
                </strong>

                <small>
                    ${pedidoAtual.veiculo}
                </small>

            </div>


            <div class="schedule-grid">

                <div class="checkout-field">

                    <label for="dataAgendamento">
                        Data
                    </label>

                    <input
                        type="date"
                        id="dataAgendamento"
                        class="checkout-input">

                </div>


                <div class="checkout-field">

                    <label for="horarioAgendamento">
                        Horário
                    </label>

                    <select
                        id="horarioAgendamento"
                        class="checkout-input">

                        <option value="">
                            Selecione
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

                </div>

            </div>


            <div class="checkout-total">

                <span>
                    TOTAL
                </span>

                <strong>
                    ${formatarMoeda(
                        pedidoAtual.total
                    )}
                </strong>

            </div>


            <div class="checkout-buttons">

                <button
                    type="button"
                    id="voltarExtras"
                    class="checkout-back-btn">

                    VOLTAR

                </button>


                <button
                    type="button"
                    id="continuarAgendamento"
                    class="btn checkout-btn">

                    CONTINUAR

                </button>

            </div>

        </div>

    `;


    definirDataMinima();


    document
        .getElementById("voltarExtras")
        .addEventListener(
            "click",
            mostrarExtras
        );


    document
        .getElementById(
            "continuarAgendamento"
        )
        .addEventListener(
            "click",
            validarAgendamento
        );

}


/* =====================================================
   DATA MÍNIMA
===================================================== */

function definirDataMinima() {

    const input =
        document.getElementById(
            "dataAgendamento"
        );


    if (!input) {
        return;
    }


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


    input.min =
        `${ano}-${mes}-${dia}`;

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


    if (!data) {

        alert(
            "Selecione a data do atendimento."
        );

        return;

    }


    if (!horario) {

        alert(
            "Selecione o horário do atendimento."
        );

        return;

    }


    pedidoAtual.data =
        data;


    pedidoAtual.horario =
        horario;


    mostrarFormularioCliente();

}


/* =====================================================
   ETAPA 3 - DADOS DO CLIENTE
===================================================== */

function mostrarFormularioCliente() {

    atualizarProgresso(3);

    const content =
        document.getElementById(
            "checkoutContent"
        );


    content.innerHTML = `

        <div class="checkout-step">

            <p class="checkout-label">
                ETAPA 3
            </p>

            <h3>
                Seus dados
            </h3>

            <p class="checkout-description">
                Informe seus dados para
                finalizar o pedido.
            </p>


            <form
                id="customerForm"
                class="checkout-form">


                <div class="checkout-field">

                    <label for="nomeCliente">
                        Nome
                    </label>

                    <input
                        type="text"
                        id="nomeCliente"
                        class="checkout-input"
                        required
                        placeholder="Seu nome">

                </div>


                <div class="checkout-field">

                    <label for="whatsappCliente">
                        WhatsApp
                    </label>

                    <input
                        type="tel"
                        id="whatsappCliente"
                        class="checkout-input"
                        required
                        placeholder="(92) 99999-9999">

                </div>


                <div class="checkout-field">

                    <label for="modeloVeiculo">
                        Modelo do veículo
                    </label>

                    <input
                        type="text"
                        id="modeloVeiculo"
                        class="checkout-input"
                        required
                        placeholder="Ex: Toyota Corolla">

                </div>


                <div class="checkout-field">

                    <label for="placaVeiculo">
                        Placa
                    </label>

                    <input
                        type="text"
                        id="placaVeiculo"
                        class="checkout-input"
                        required
                        placeholder="ABC-1234">

                </div>


                <div class="checkout-total">

                    <span>
                        TOTAL DO PEDIDO
                    </span>

                    <strong>
                        ${formatarMoeda(
                            pedidoAtual.total
                        )}
                    </strong>

                </div>


                <div class="checkout-buttons">

                    <button
                        type="button"
                        id="voltarAgendamento"
                        class="checkout-back-btn">

                        VOLTAR

                    </button>


                    <button
                        type="submit"
                        class="btn checkout-btn">

                        REVISAR PEDIDO

                    </button>

                </div>

            </form>

        </div>

    `;


    document
        .getElementById(
            "voltarAgendamento"
        )
        .addEventListener(
            "click",
            mostrarAgendamento
        );


    document
        .getElementById("customerForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                salvarDadosCliente();

                mostrarResumo();

            }
        );

}


/* =====================================================
   SALVAR DADOS DO CLIENTE
===================================================== */

function salvarDadosCliente() {

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

}


/* =====================================================
   ETAPA 4 - RESUMO
===================================================== */

function mostrarResumo() {

    atualizarProgresso(4);

    const content =
        document.getElementById(
            "checkoutContent"
        );


    let extrasHTML =
        "";


    if (
        pedidoAtual.extras.length === 0
    ) {

        extrasHTML = `
            <p class="summary-empty">
                Nenhum serviço extra
            </p>
        `;

    } else {

        pedidoAtual.extras.forEach(
            function (extra) {

                extrasHTML += `

                    <div class="summary-extra">

                        <span>
                            ${extra.nome}
                        </span>

                        <strong>
                            ${formatarMoeda(
                                extra.preco
                            )}
                        </strong>

                    </div>

                `;

            }
        );

    }


    content.innerHTML = `

        <div class="checkout-step">

            <p class="checkout-label">
                ETAPA 4
            </p>

            <h3>
                Revise seu pedido
            </h3>

            <p class="checkout-description">
                Confira todas as informações
                antes de confirmar.
            </p>


            <div class="order-summary">


                <div class="summary-header">

                    <span>
                        PACOTE
                    </span>

                    <strong>
                        ${pedidoAtual.pacote}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Veículo
                    </span>

                    <strong>
                        ${pedidoAtual.veiculo}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Modelo
                    </span>

                    <strong>
                        ${pedidoAtual.modelo}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Placa
                    </span>

                    <strong>
                        ${pedidoAtual.placa}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Cliente
                    </span>

                    <strong>
                        ${pedidoAtual.nome}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        WhatsApp
                    </span>

                    <strong>
                        ${pedidoAtual.whatsapp}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Data
                    </span>

                    <strong>
                        ${formatarData(
                            pedidoAtual.data
                        )}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Horário
                    </span>

                    <strong>
                        ${pedidoAtual.horario}
                    </strong>

                </div>


                <div class="summary-extras">

                    <p>
                        Serviços extras
                    </p>

                    ${extrasHTML}

                </div>


                <div class="summary-total">

                    <span>
                        TOTAL
                    </span>

                    <strong>
                        ${formatarMoeda(
                            pedidoAtual.total
                        )}
                    </strong>

                </div>

            </div>


            <div class="checkout-buttons">

                <button
                    type="button"
                    id="voltarDados"
                    class="checkout-back-btn">

                    VOLTAR

                </button>


                <button
                    type="button"
                    id="confirmarPedido"
                    class="btn checkout-btn">

                    CONFIRMAR PEDIDO

                </button>

            </div>

        </div>

    `;


    document
        .getElementById("voltarDados")
        .addEventListener(
            "click",
            mostrarFormularioCliente
        );


    document
        .getElementById("confirmarPedido")
        .addEventListener(
            "click",
            finalizarPedido
        );

}


/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

async function finalizarPedido() {

    const botao =
        document.getElementById(
            "confirmarPedido"
        );


    if (botao) {

        botao.disabled = true;

        botao.textContent =
            "SALVANDO PEDIDO...";

    }


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

            if (botao) {

                botao.disabled = false;

                botao.textContent =
                    "CONFIRMAR PEDIDO";

            }

            return;

        }


        salvarPedidoLocal(pedido);

        mostrarSucesso(pedido);

    }

    catch (erro) {

        console.error(erro);

        alert(
            "Ocorreu um erro ao finalizar o pedido."
        );


        if (botao) {

            botao.disabled = false;

            botao.textContent =
                "CONFIRMAR PEDIDO";

        }

    }

}


/* =====================================================
   BACKUP LOCAL
===================================================== */

function salvarPedidoLocal(pedido) {

    try {

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

    catch (erro) {

        console.error(
            "Erro no backup local:",
            erro
        );

    }

}


/* =====================================================
   TELA DE SUCESSO
===================================================== */

function mostrarSucesso(pedido) {

    atualizarProgresso(4);


    const content =
        document.getElementById(
            "checkoutContent"
        );


    content.innerHTML = `

        <div class="checkout-success">

            <div class="success-icon">
                ✓
            </div>


            <p class="subtitle">
                AGENDAMENTO REALIZADO
            </p>


            <h3>
                PEDIDO <span>CONFIRMADO!</span>
            </h3>


            <p class="success-message">
                Obrigado, ${pedido.nome}.
                Seu atendimento foi registrado
                com sucesso.
            </p>


            <div class="success-details">

                <div>

                    <span>
                        Veículo
                    </span>

                    <strong>
                        ${pedido.veiculo}
                    </strong>

                </div>


                <div>

                    <span>
                        Pacote
                    </span>

                    <strong>
                        ${pedido.pacote}
                    </strong>

                </div>


                <div>

                    <span>
                        Data
                    </span>

                    <strong>
                        ${formatarData(
                            pedido.data
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Horário
                    </span>

                    <strong>
                        ${pedido.horario}
                    </strong>

                </div>


                <div>

                    <span>
                        Total
                    </span>

                    <strong>
                        ${formatarMoeda(
                            pedido.total
                        )}
                    </strong>

                </div>

            </div>


            <button
                type="button"
                id="finalizarTela"
                class="btn checkout-btn">

                FECHAR

            </button>

        </div>

    `;


    document
        .getElementById("finalizarTela")
        .addEventListener(
            "click",
            function () {

                fecharCheckout();

            }
        );

}


/* =====================================================
   FORMATAÇÃO DE MOEDA
===================================================== */

function formatarMoeda(valor) {

    return Number(valor)
        .toLocaleString(
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


/* =====================================================
   ESTILOS DO CHECKOUT
===================================================== */

const checkoutStyle =
    document.createElement("style");


checkoutStyle.textContent = `

    .gd-checkout-modal {

        position: fixed;

        inset: 0;

        z-index: 99999;

        display: none;

        align-items: center;

        justify-content: center;

        padding: 20px;

        background:
            rgba(0, 0, 0, 0.82);

        backdrop-filter:
            blur(8px);

        overflow-y: auto;

    }


    .gd-checkout-box {

        position: relative;

        width: min(720px, 100%);

        max-height: 92vh;

        overflow-y: auto;

        background: #111;

        border: 1px solid #333;

        border-radius: 20px;

        box-shadow:
            0 30px 80px rgba(0,0,0,.5);

        color: #fff;

    }


    .gd-checkout-top {

        padding: 30px 35px 20px;

        border-bottom: 1px solid #292929;

        text-align: center;

    }


    .gd-checkout-top h2 {

        margin: 5px 0 20px;

        font-size: 28px;

    }


    .gd-checkout-top h2 span {

        color: #d6a84f;

    }


    .gd-checkout-close {

        position: absolute;

        top: 15px;

        right: 18px;

        width: 38px;

        height: 38px;

        border: 0;

        border-radius: 50%;

        background: #222;

        color: #fff;

        font-size: 25px;

        cursor: pointer;

    }


    .gd-checkout-close:hover {

        background: #d6a84f;

        color: #111;

    }


    .checkout-progress {

        display: flex;

        align-items: center;

        justify-content: center;

        gap: 8px;

    }


    .progress-step {

        width: 34px;

        height: 34px;

        display: flex;

        align-items: center;

        justify-content: center;

        border-radius: 50%;

        border: 1px solid #444;

        color: #777;

        font-weight: 700;

        font-size: 13px;

    }


    .progress-step.active {

        background: #d6a84f;

        color: #111;

        border-color: #d6a84f;

    }


    .progress-step.completed {

        background: #333;

        color: #d6a84f;

        border-color: #d6a84f;

    }


    .progress-line {

        width: 35px;

        height: 1px;

        background: #444;

    }


    .gd-checkout-content {

        padding: 30px 35px 35px;

    }


    .checkout-step h3 {

        margin: 5px 0 10px;

        font-size: 25px;

    }


    .checkout-label {

        margin: 0;

        color: #d6a84f;

        font-size: 12px;

        font-weight: 700;

        letter-spacing: 2px;

    }


    .checkout-description {

        margin: 0 0 25px;

        color: #999;

        line-height: 1.6;

    }


    .checkout-package,
    .checkout-vehicle,
    .checkout-selected {

        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 20px;

        padding: 16px 18px;

        margin-bottom: 10px;

        border: 1px solid #292929;

        border-radius: 12px;

        background: #181818;

    }


    .checkout-package span,
    .checkout-vehicle span,
    .checkout-selected span {

        display: block;

        color: #888;

        font-size: 12px;

        margin-bottom: 4px;

    }


    .checkout-package strong,
    .checkout-vehicle strong,
    .checkout-selected strong {

        color: #fff;

    }


    .checkout-selected small {

        color: #d6a84f;

    }


    .extras-checkout {

        display: grid;

        gap: 10px;

        margin: 20px 0;

    }


    .checkout-extra {

        display: flex;

        align-items: center;

        gap: 14px;

        padding: 16px;

        border: 1px solid #292929;

        border-radius: 12px;

        background: #161616;

        cursor: pointer;

        transition: .2s;

    }


    .checkout-extra:hover {

        border-color: #d6a84f;

    }


    .checkout-extra input {

        width: 18px;

        height: 18px;

        accent-color: #d6a84f;

    }


    .checkout-extra-info {

        flex: 1;

    }


    .checkout-extra-info strong {

        display: block;

        color: #fff;

    }


    .checkout-extra-info small {

        color: #777;

    }


    .checkout-extra-price {

        color: #d6a84f;

        font-weight: 700;

        white-space: nowrap;

    }


    .checkout-total {

        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 20px;

        margin: 22px 0;

        padding: 18px;

        border-radius: 12px;

        background: #202020;

        border: 1px solid #333;

    }


    .checkout-total span {

        color: #999;

        font-size: 12px;

        font-weight: 700;

        letter-spacing: 1px;

    }


    .checkout-total strong {

        color: #d6a84f;

        font-size: 22px;

    }


    .schedule-grid {

        display: grid;

        grid-template-columns:
            1fr 1fr;

        gap: 15px;

        margin-top: 20px;

    }


    .checkout-form {

        display: grid;

        gap: 15px;

    }


    .checkout-field {

        display: flex;

        flex-direction: column;

        gap: 7px;

    }


    .checkout-field label {

        color: #ccc;

        font-size: 13px;

        font-weight: 600;

    }


    .checkout-input {

        width: 100%;

        padding: 14px 15px;

        box-sizing: border-box;

        border: 1px solid #333;

        border-radius: 10px;

        background: #181818;

        color: #fff;

        outline: none;

        font: inherit;

    }


    .checkout-input:focus {

        border-color: #d6a84f;

    }


    .checkout-buttons {

        display: flex;

        gap: 12px;

        margin-top: 10px;

    }


    .checkout-buttons .checkout-btn {

        flex: 1;

    }


    .checkout-back-btn {

        flex: 0 0 120px;

        border: 1px solid #333;

        border-radius: 8px;

        background: transparent;

        color: #aaa;

        font-weight: 700;

        cursor: pointer;

    }


    .checkout-back-btn:hover {

        border-color: #d6a84f;

        color: #d6a84f;

    }


    .order-summary {

        border: 1px solid #292929;

        border-radius: 14px;

        overflow: hidden;

        background: #161616;

    }


    .summary-header {

        display: flex;

        justify-content: space-between;

        gap: 20px;

        padding: 18px;

        background: #202020;

        border-bottom: 1px solid #333;

    }


    .summary-header span {

        color: #999;

        font-size: 11px;

    }


    .summary-header strong {

        color: #d6a84f;

    }


    .summary-row {

        display: flex;

        justify-content: space-between;

        gap: 20px;

        padding: 13px 18px;

        border-bottom: 1px solid #252525;

    }


    .summary-row span {

        color: #888;

    }


    .summary-row strong {

        color: #eee;

        text-align: right;

    }


    .summary-extras {

        padding: 18px;

        border-bottom: 1px solid #252525;

    }


    .summary-extras > p {

        margin: 0 0 12px;

        color: #999;

        font-size: 12px;

        text-transform: uppercase;

        letter-spacing: 1px;

    }


    .summary-extra {

        display: flex;

        justify-content: space-between;

        padding: 7px 0;

    }


    .summary-extra strong {

        color: #d6a84f;

    }


    .summary-empty {

        color: #666;

        margin: 0;

    }


    .summary-total {

        display: flex;

        justify-content: space-between;

        padding: 20px 18px;

    }


    .summary-total span {

        font-weight: 700;

    }


    .summary-total strong {

        color: #d6a84f;

        font-size: 24px;

    }


    .checkout-success {

        text-align: center;

        padding: 15px 0 5px;

    }


    .success-icon {

        width: 70px;

        height: 70px;

        display: flex;

        align-items: center;

        justify-content: center;

        margin: 0 auto 20px;

        border-radius: 50%;

        background: #d6a84f;

        color: #111;

        font-size: 35px;

        font-weight: 800;

    }


    .checkout-success h3 {

        font-size: 28px;

        margin: 5px 0 12px;

    }


    .checkout-success h3 span {

        color: #d6a84f;

    }


    .success-message {

        color: #999;

        line-height: 1.6;

    }


    .success-details {

        display: grid;

        grid-template-columns:
            repeat(2, 1fr);

        gap: 10px;

        margin: 25px 0;

        text-align: left;

    }


    .success-details div {

        padding: 15px;

        border: 1px solid #292929;

        border-radius: 10px;

        background: #181818;

    }


    .success-details span {

        display: block;

        color: #777;

        font-size: 11px;

        margin-bottom: 5px;

    }


    .success-details strong {

        color: #fff;

    }


    .checkout-btn {

        width: 100%;

    }


    body.modal-open {

        overflow: hidden;

    }


    @media (max-width: 600px) {

        .gd-checkout-modal {

            padding: 10px;

            align-items: flex-start;

        }


        .gd-checkout-box {

            max-height: 96vh;

            margin-top: 10px;

            border-radius: 15px;

        }


        .gd-checkout-top {

            padding: 25px 20px 18px;

        }


        .gd-checkout-content {

            padding: 25px 20px 30px;

        }


        .gd-checkout-top h2 {

            font-size: 22px;

        }


        .checkout-step h3 {

            font-size: 21px;

        }


        .schedule-grid {

            grid-template-columns: 1fr;

        }


        .checkout-buttons {

            flex-direction: column;

        }


        .checkout-back-btn {

            flex: auto;

            min-height: 48px;

        }


        .summary-row {

            flex-direction: column;

            gap: 5px;

        }


        .summary-row strong {

            text-align: left;

        }


        .success-details {

            grid-template-columns: 1fr;

        }

    }

`;


document.head.appendChild(
    checkoutStyle
);
