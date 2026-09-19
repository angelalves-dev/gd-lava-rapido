const SUPABASE_URL = "https://ljswwokxcgglqluzwctq.supabase.co";

const SUPABASE_KEY = "sb_publishable_CS4rdWdRC9iVrHNvXXCzHA_6kH6WRlG";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
/* =========================================
   SELEÇÃO DO PACOTE
========================================= */

const botoes = document.querySelectorAll(".select-btn");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const card = botao.parentElement;

        const nome = card.querySelector("h3").textContent;

        const precoTexto = card.querySelector("strong").textContent;

        const preco = parseFloat(
            precoTexto
                .replace("A partir de R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        );

        const escolhaVeiculo = document.createElement("div");

        escolhaVeiculo.classList.add("vehicle-selection");

        escolhaVeiculo.innerHTML = `
            <div class="vehicle-box">

                <h2>Escolha seu veículo</h2>

                <p>
                    Você escolheu o pacote
                    <strong>${nome}</strong>.
                </p>

                <p>
                    Agora informe o tipo de veículo:
                </p>

                <div class="vehicle-buttons">

                    <button
                        class="vehicle-btn"
                        data-veiculo="Carro"
                    >
                        🚗 Carro
                    </button>

                    <button
                        class="vehicle-btn"
                        data-veiculo="Moto"
                    >
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

                const veiculo =
                    botaoVeiculo.dataset.veiculo;

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


/* =========================================
   SERVIÇOS EXTRAS
========================================= */

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
                Veículo selecionado:
                <strong>${veiculo}</strong>
            </p>

            <p>
                Pacote:
                <strong>${nomePacote}</strong>
            </p>

            <div class="extras-container">

                <label class="extra-item">

                    <input
                        type="checkbox"
                        class="extra-checkbox"
                        data-nome="Lavagem externa"
                        data-preco="30"
                    >

                    <span>
                        Lavagem externa
                    </span>

                    <strong>
                        + R$ 30,00
                    </strong>

                </label>


                <label class="extra-item">

                    <input
                        type="checkbox"
                        class="extra-checkbox"
                        data-nome="Higienização interna"
                        data-preco="50"
                    >

                    <span>
                        Higienização interna
                    </span>

                    <strong>
                        + R$ 50,00
                    </strong>

                </label>


                <label class="extra-item">

                    <input
                        type="checkbox"
                        class="extra-checkbox"
                        data-nome="Enceramento"
                        data-preco="40"
                    >

                    <span>
                        Enceramento
                    </span>

                    <strong>
                        + R$ 40,00
                    </strong>

                </label>


                <label class="extra-item">

                    <input
                        type="checkbox"
                        class="extra-checkbox"
                        data-nome="Polimento"
                        data-preco="100"
                    >

                    <span>
                        Polimento
                    </span>

                    <strong>
                        + R$ 100,00
                    </strong>

                </label>

            </div>


            <div class="total-box">

                <span>
                    Total:
                </span>

                <strong id="total-servico">
                    ${formatarMoeda(precoPacote)}
                </strong>

            </div>


            <button
                class="select-btn"
                id="continuar-extras"
            >
                CONTINUAR
            </button>

        </div>
    `;


    const checkboxes =
        janela.querySelectorAll(".extra-checkbox");

    const totalElemento =
        janela.querySelector("#total-servico");


    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                let total =
                    precoPacote;

                checkboxes.forEach(
                    function (item) {

                        if (item.checked) {

                            total +=
                                parseFloat(
                                    item.dataset.preco
                                );
                        }
                    }
                );

                totalElemento.textContent =
                    formatarMoeda(total);
            }
        );
    });


    const botaoContinuar =
        janela.querySelector("#continuar-extras");


    botaoContinuar.addEventListener(
        "click",
        function () {

            const extrasSelecionados = [];

            checkboxes.forEach(
                function (checkbox) {

                    if (checkbox.checked) {

                        extrasSelecionados.push({

                            nome:
                                checkbox.dataset.nome,

                            preco:
                                parseFloat(
                                    checkbox.dataset.preco
                                )
                        });
                    }
                }
            );


            let total =
                precoPacote;


            extrasSelecionados.forEach(
                function (extra) {

                    total += extra.preco;
                }
            );


            mostrarAgendamento(
                janela,
                veiculo,
                nomePacote,
                precoPacote,
                extrasSelecionados,
                total
            );
        }
    );
}


/* =========================================
   AGENDAMENTO
========================================= */

function mostrarAgendamento(
    janela,
    veiculo,
    nomePacote,
    precoPacote,
    extrasSelecionados,
    total
) {

    janela.innerHTML = `

        <div class="vehicle-box">

            <h2>Escolha o dia e horário</h2>

            <p>
                Escolha quando deseja realizar
                o serviço.
            </p>


            <div class="form-group">

                <label>
                    Data:
                </label>

                <input
                    type="date"
                    id="data-agendamento"
                >

            </div>


            <div class="form-group">

                <label>
                    Horário:
                </label>

                <div
                    class="horarios-container"
                    id="horarios-container"
                >
                </div>

            </div>


            <button
                class="select-btn"
                id="continuar-agendamento"
            >
                CONTINUAR
            </button>

        </div>
    `;


    const inputData =
        janela.querySelector(
            "#data-agendamento"
        );


    const horariosContainer =
        janela.querySelector(
            "#horarios-container"
        );


    const botaoContinuar =
        janela.querySelector(
            "#continuar-agendamento"
        );


    /* DATA MÍNIMA = HOJE */

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


    const dataAtual =
        `${ano}-${mes}-${dia}`;


    inputData.min =
        dataAtual;


    /* =========================================
       CRIA HORÁRIOS
    ========================================= */

    const horarios = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
    ];


    function criarHorarios(dataSelecionada) {

        horariosContainer.innerHTML = "";

        let horarioSelecionado = "";


        const pedidosSalvos =
            JSON.parse(
                localStorage.getItem("pedidosGD")
            ) || [];


        const horariosOcupados =
            pedidosSalvos
                .filter(function (pedido) {

                    return (
                        pedido.data ===
                        dataSelecionada
                    );
                })
                .map(function (pedido) {

                    return pedido.horario;
                });


        horarios.forEach(
            function (horario) {

                const botaoHorario =
                    document.createElement(
                        "button"
                    );


                botaoHorario.type =
                    "button";


                botaoHorario.classList.add(
                    "vehicle-btn"
                );


                botaoHorario.textContent =
                    horario;


                /* HORÁRIO JÁ OCUPADO */

                if (
                    horariosOcupados.includes(
                        horario
                    )
                ) {

                    botaoHorario.disabled =
                        true;

                    botaoHorario.textContent =
                        `${horario} - Ocupado`;

                    botaoHorario.style.opacity =
                        "0.4";

                    botaoHorario.style.cursor =
                        "not-allowed";

                } else {

                    botaoHorario.addEventListener(
                        "click",
                        function () {

                            horarioSelecionado =
                                horario;


                            const botoes =
                                horariosContainer
                                    .querySelectorAll(
                                        ".vehicle-btn"
                                    );


                            botoes.forEach(
                                function (botao) {

                                    botao.classList
                                        .remove(
                                            "horario-selecionado"
                                        );
                                }
                            );


                            botaoHorario.classList.add(
                                "horario-selecionado"
                            );
                        }
                    );
                }


                horariosContainer.appendChild(
                    botaoHorario
                );
            }
        );


        return function () {
            return horarioSelecionado;
        };
    }


    let obterHorarioSelecionado =
        criarHorarios("");


    /* =========================================
       QUANDO ESCOLHER UMA DATA
    ========================================= */

    inputData.addEventListener(
        "change",
        function () {

            const dataSelecionada =
                inputData.value;


            obterHorarioSelecionado =
                criarHorarios(
                    dataSelecionada
                );
        }
    );


    /* =========================================
       CONTINUAR
    ========================================= */

    botaoContinuar.addEventListener(
        "click",
        function () {

            const data =
                inputData.value;


            const horario =
                obterHorarioSelecionado();


            if (!data) {

                alert(
                    "Escolha uma data."
                );

                return;
            }


            if (!horario) {

                alert(
                    "Escolha um horário disponível."
                );

                return;
            }


            /* =========================================
               SEGUNDA VERIFICAÇÃO
               EVITA DUPLICIDADE NO MOMENTO DO SALVAMENTO
            ========================================= */

            const pedidosSalvos =
                JSON.parse(
                    localStorage.getItem(
                        "pedidosGD"
                    )
                ) || [];


            const horarioJaOcupado =
                pedidosSalvos.some(
                    function (pedido) {

                        return (
                            pedido.data === data &&
                            pedido.horario === horario
                        );
                    }
                );


            if (horarioJaOcupado) {

                alert(
                    "Esse horário acabou de ser ocupado. Escolha outro horário."
                );

                obterHorarioSelecionado =
                    criarHorarios(data);

                return;
            }


            mostrarDadosCliente(
                janela,
                veiculo,
                nomePacote,
                extrasSelecionados,
                data,
                horario,
                total
            );
        }
    );
}


/* =========================================
   DADOS DO CLIENTE
========================================= */

function mostrarDadosCliente(
    janela,
    veiculo,
    nomePacote,
    extrasSelecionados,
    data,
    horario,
    total
) {

    janela.innerHTML = `

        <div class="vehicle-box">

            <h2>Seus dados</h2>

            <p>
                Preencha os dados para
                finalizar o agendamento.
            </p>


            <div class="form-group">

                <label>
                    Nome:
                </label>

                <input
                    type="text"
                    id="nome-cliente"
                    placeholder="Seu nome"
                >

            </div>


            <div class="form-group">

                <label>
                    WhatsApp:
                </label>

                <input
                    type="tel"
                    id="whatsapp-cliente"
                    placeholder="(92) 99999-9999"
                >

            </div>


            <div class="form-group">

                <label>
                    Modelo do veículo:
                </label>

                <input
                    type="text"
                    id="modelo-veiculo"
                    placeholder="Ex: Honda Civic"
                >

            </div>


            <div class="form-group">

                <label>
                    Placa:
                </label>

                <input
                    type="text"
                    id="placa-veiculo"
                    placeholder="ABC1D23"
                >

            </div>


            <button
                class="select-btn"
                id="continuar-dados"
            >
                CONTINUAR
            </button>

        </div>
    `;


    const nomeInput =
        janela.querySelector(
            "#nome-cliente"
        );


    const whatsappInput =
        janela.querySelector(
            "#whatsapp-cliente"
        );


    const modeloInput =
        janela.querySelector(
            "#modelo-veiculo"
        );


    const placaInput =
        janela.querySelector(
            "#placa-veiculo"
        );


    const botaoContinuar =
        janela.querySelector(
            "#continuar-dados"
        );


    botaoContinuar.addEventListener(
        "click",
        function () {

            const nome =
                nomeInput.value.trim();


            const whatsapp =
                whatsappInput.value.trim();


            const modelo =
                modeloInput.value.trim();


            const placa =
                placaInput.value.trim();


            if (
                !nome ||
                !whatsapp ||
                !modelo ||
                !placa
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;
            }


            mostrarResumoPedido(
                janela,
                nome,
                whatsapp,
                modelo,
                placa,
                veiculo,
                nomePacote,
                extrasSelecionados,
                data,
                horario,
                total
            );
        }
    );
}


/* =========================================
   RESUMO DO PEDIDO
========================================= */

function mostrarResumoPedido(
    janela,
    nome,
    whatsapp,
    modelo,
    placa,
    veiculo,
    nomePacote,
    extrasSelecionados,
    data,
    horario,
    total
) {

    let listaExtras = "";


    if (
        extrasSelecionados.length === 0
    ) {

        listaExtras =
            "<p>Nenhum serviço extra.</p>";

    } else {

        listaExtras =
            extrasSelecionados
                .map(function (extra) {

                    return `
                        <p>
                            ${extra.nome}
                            -
                            ${formatarMoeda(
                                extra.preco
                            )}
                        </p>
                    `;
                })
                .join("");
    }


    janela.innerHTML = `

        <div class="vehicle-box">

            <h2>
                Confirme seu pedido
            </h2>


            <div class="resumo-pedido">

                <h3>
                    Cliente
                </h3>

                <p>
                    <strong>Nome:</strong>
                    ${nome}
                </p>

                <p>
                    <strong>WhatsApp:</strong>
                    ${whatsapp}
                </p>


                <h3>
                    Veículo
                </h3>

                <p>
                    <strong>Tipo:</strong>
                    ${veiculo}
                </p>

                <p>
                    <strong>Modelo:</strong>
                    ${modelo}
                </p>

                <p>
                    <strong>Placa:</strong>
                    ${placa}
                </p>


                <h3>
                    Serviço
                </h3>

                <p>
                    <strong>Pacote:</strong>
                    ${nomePacote}
                </p>


                <h3>
                    Serviços extras
                </h3>

                ${listaExtras}


                <h3>
                    Agendamento
                </h3>

                <p>
                    <strong>Data:</strong>
                    ${formatarData(data)}
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${horario}
                </p>


                <div class="total-box">

                    <span>
                        Total:
                    </span>

                    <strong>
                        ${formatarMoeda(total)}
                    </strong>

                </div>

            </div>


            <button
                class="select-btn"
                id="confirmar-pedido"
            >
                CONFIRMAR PEDIDO
            </button>

        </div>
    `;


    const botaoConfirmar =
        janela.querySelector(
            "#confirmar-pedido"
        );


    botaoConfirmar.addEventListener(
        "click",
        function () {


            /* =========================================
               ÚLTIMA VERIFICAÇÃO DO HORÁRIO
            ========================================= */

            const pedidosSalvos =
                JSON.parse(
                    localStorage.getItem(
                        "pedidosGD"
                    )
                ) || [];


            const horarioJaOcupado =
                pedidosSalvos.some(
                    function (pedido) {

                        return (
                            pedido.data === data &&
                            pedido.horario === horario
                        );
                    }
                );


            if (horarioJaOcupado) {

                alert(
                    "Esse horário já foi reservado. Por favor, faça um novo agendamento."
                );

                return;
            }


            /* =========================================
               CRIAR PEDIDO
            ========================================= */

            const pedido = {

                id:
                    Date.now(),

                nome:
                    nome,

                whatsapp:
                    whatsapp,

                modelo:
                    modelo,

                placa:
                    placa,

                veiculo:
                    veiculo,

                pacote:
                    nomePacote,

                extras:
                    extrasSelecionados,

                data:
                    data,

                horario:
                    horario,

                total:
                    total,

                status:
                    "Agendado"
            };


            pedidosSalvos.push(
                pedido
            );


            localStorage.setItem(
                "pedidosGD",
                JSON.stringify(
                    pedidosSalvos
                )
            );


            mostrarChecklist(
                janela,
                nome,
                whatsapp,
                modelo,
                placa,
                veiculo,
                nomePacote,
                extrasSelecionados,
                data,
                horario,
                total,
                pedido.id
            );
        }
    );
}


/* =========================================
   CHECKLIST
========================================= */

function mostrarChecklist(
    janela,
    nome,
    whatsapp,
    modelo,
    placa,
    veiculo,
    nomePacote,
    extrasSelecionados,
    data,
    horario,
    total,
    pedidoId
) {

    let checklistExtras = "";


    extrasSelecionados.forEach(
        function (extra) {

            checklistExtras += `

                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Realizar:
                        ${extra.nome}
                    </span>

                </label>

            `;
        }
    );


    janela.innerHTML = `

        <div class="vehicle-box">

            <h2>
                Ordem de serviço
            </h2>


            <p>
                Pedido criado com sucesso.
            </p>


            <div class="resumo-pedido">

                <p>
                    <strong>Cliente:</strong>
                    ${nome}
                </p>

                <p>
                    <strong>WhatsApp:</strong>
                    ${whatsapp}
                </p>

                <p>
                    <strong>Veículo:</strong>
                    ${veiculo}
                </p>

                <p>
                    <strong>Modelo:</strong>
                    ${modelo}
                </p>

                <p>
                    <strong>Placa:</strong>
                    ${placa}
                </p>

                <p>
                    <strong>Pacote:</strong>
                    ${nomePacote}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${formatarData(data)}
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${horario}
                </p>

                <p>
                    <strong>Total:</strong>
                    ${formatarMoeda(total)}
                </p>

            </div>


            <h3>
                Checklist do serviço
            </h3>


            <div class="checklist">

                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Conferir estado geral do veículo
                    </span>

                </label>


                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Conferir rodas e pneus
                    </span>

                </label>


                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Realizar serviços do pacote
                    </span>

                </label>


                ${checklistExtras}


                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Secagem e acabamento
                    </span>

                </label>


                <label class="checklist-item">

                    <input
                        type="checkbox"
                        class="check-item"
                    >

                    <span>
                        Conferência final
                    </span>

                </label>

            </div>


            <button
                class="select-btn"
                id="finalizar-servico"
            >
                FINALIZAR SERVIÇO
            </button>

        </div>
    `;


    const checkboxes =
        janela.querySelectorAll(
            ".check-item"
        );


    const botaoFinalizar =
        janela.querySelector(
            "#finalizar-servico"
        );


    botaoFinalizar.addEventListener(
        "click",
        function () {

            let todosMarcados =
                true;


            checkboxes.forEach(
                function (checkbox) {

                    if (
                        !checkbox.checked
                    ) {

                        todosMarcados =
                            false;
                    }
                }
            );


            if (!todosMarcados) {

                alert(
                    "Marque todos os itens do checklist antes de finalizar."
                );

                return;
            }


            const pedidosSalvos =
                JSON.parse(
                    localStorage.getItem(
                        "pedidosGD"
                    )
                ) || [];


            const pedidoEncontrado =
                pedidosSalvos.find(
                    function (pedido) {

                        return (
                            pedido.id ===
                            pedidoId
                        );
                    }
                );


            if (pedidoEncontrado) {

                pedidoEncontrado.status =
                    "Concluído";


                localStorage.setItem(
                    "pedidosGD",
                    JSON.stringify(
                        pedidosSalvos
                    )
                );
            }


            alert(
                "Serviço finalizado com sucesso!"
            );


            janela.remove();
        }
    );
}


/* =========================================
   FORMATAR MOEDA
========================================= */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


/* =========================================
   FORMATAR DATA
========================================= */

function formatarData(data) {

    if (!data) {
        return "";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return `
        ${partes[2]}/${partes[1]}/${partes[0]}
    `;
}
