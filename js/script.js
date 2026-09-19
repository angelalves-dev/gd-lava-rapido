/* =========================================
   CONFIGURAÇÃO SUPABASE
========================================= */

const SUPABASE_URL = "https://ljswwokxcgglqluzwctq.supabase.co";

const SUPABASE_KEY = "COLE_AQUI_SUA_CHAVE_PUBLISHABLE";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   CONFIGURAÇÕES DO SISTEMA
========================================= */

const horariosDisponiveis = [
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


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    iniciarSelecaoPacotes();

});


/* =========================================
   SELEÇÃO DO PACOTE
========================================= */

function iniciarSelecaoPacotes() {

    const botoes = document.querySelectorAll(".select-btn");

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const card = botao.parentElement;

            const nome = card.querySelector("h3").textContent.trim();

            const precoTexto =
                card.querySelector("strong").textContent;

            const preco = parseFloat(
                precoTexto
                    .replace("A partir de R$", "")
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .trim()
            );

            mostrarEscolhaVeiculo(
                nome,
                preco
            );

        });

    });

}


/* =========================================
   ESCOLHA DO VEÍCULO
========================================= */

function mostrarEscolhaVeiculo(
    nomePacote,
    precoPacote
) {

    const escolhaVeiculo =
        document.createElement("div");

    escolhaVeiculo.classList.add(
        "vehicle-selection"
    );

    escolhaVeiculo.innerHTML = `

        <div class="vehicle-box">

            <h2>Escolha seu veículo</h2>

            <p>
                Você escolheu o pacote
                <strong>${nomePacote}</strong>.
            </p>

            <p>
                Agora informe o tipo de veículo:
            </p>

            <div class="vehicle-buttons">

                <button
                    class="vehicle-btn"
                    data-veiculo="Carro"
                    type="button"
                >
                    🚗 Carro
                </button>

                <button
                    class="vehicle-btn"
                    data-veiculo="Moto"
                    type="button"
                >
                    🏍️ Moto
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        escolhaVeiculo
    );


    const botoesVeiculo =
        escolhaVeiculo.querySelectorAll(
            ".vehicle-btn"
        );


    botoesVeiculo.forEach(function (botaoVeiculo) {

        botaoVeiculo.addEventListener(
            "click",
            function () {

                const veiculo =
                    botaoVeiculo.dataset.veiculo;

                mostrarServicosExtras(
                    escolhaVeiculo,
                    veiculo,
                    nomePacote,
                    precoPacote
                );

            }
        );

    });

}


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
                Veículo:
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
                type="button"
            >
                CONTINUAR
            </button>

        </div>

    `;


    const checkboxes =
        janela.querySelectorAll(
            ".extra-checkbox"
        );


    const totalElemento =
        janela.querySelector(
            "#total-servico"
        );


    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                let total =
                    precoPacote;


                checkboxes.forEach(
                    function (item) {

                        if (item.checked) {

                            total += parseFloat(
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
        janela.querySelector(
            "#continuar-extras"
        );


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

            <h2>
                Escolha o dia e horário
            </h2>

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
                type="button"
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


    let horarioSelecionado = "";


    async function carregarHorarios(dataSelecionada) {

        horariosContainer.innerHTML = "";

        horarioSelecionado = "";


        if (!dataSelecionada) {

            return;

        }


        horariosContainer.innerHTML =
            "<p>Verificando horários...</p>";


        const horariosOcupados =
            await buscarHorariosOcupados(
                dataSelecionada
            );


        horariosContainer.innerHTML = "";


        horariosDisponiveis.forEach(
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

    }


    inputData.addEventListener(
        "change",
        function () {

            carregarHorarios(
                inputData.value
            );

        }
    );


    botaoContinuar.addEventListener(
        "click",
        async function () {

            const data =
                inputData.value;


            if (!data) {

                alert(
                    "Escolha uma data."
                );

                return;

            }


            if (!horarioSelecionado) {

                alert(
                    "Escolha um horário disponível."
                );

                return;

            }


            botaoContinuar.disabled =
                true;


            botaoContinuar.textContent =
                "VERIFICANDO...";


            const horarioJaOcupado =
                await verificarHorarioOcupado(
                    data,
                    horarioSelecionado
                );


            if (horarioJaOcupado) {

                alert(
                    "Esse horário acabou de ser ocupado. Escolha outro horário."
                );


                botaoContinuar.disabled =
                    false;


                botaoContinuar.textContent =
                    "CONTINUAR";


                await carregarHorarios(
                    data
                );


                return;

            }


            mostrarDadosCliente(
                janela,
                veiculo,
                nomePacote,
                extrasSelecionados,
                data,
                horarioSelecionado,
                total
            );

        }
    );

}


/* =========================================
   BUSCAR HORÁRIOS OCUPADOS
========================================= */

async function buscarHorariosOcupados(
    data
) {

    try {

        const resultado =
            await window.supabaseClient
                .from("pedidos")
                .select("horario")
                .eq("data", data);


        if (resultado.error) {

            console.error(
                "Erro ao buscar horários:",
                resultado.error
            );


            return [];

        }


        return resultado.data.map(
            function (pedido) {

                return pedido.horario;

            }
        );

    } catch (erro) {

        console.error(
            "Erro inesperado:",
            erro
        );


        return [];

    }

}


/* =========================================
   VERIFICAR HORÁRIO
========================================= */

async function verificarHorarioOcupado(
    data,
    horario
) {

    try {

        const resultado =
            await window.supabaseClient
                .from("pedidos")
                .select("id")
                .eq("data", data)
                .eq("horario", horario)
                .limit(1);


        if (resultado.error) {

            console.error(
                "Erro ao verificar horário:",
                resultado.error
            );


            return false;

        }


        return resultado.data.length > 0;

    } catch (erro) {

        console.error(
            "Erro inesperado:",
            erro
        );


        return false;

    }

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

            <h2>
                Seus dados
            </h2>

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
                type="button"
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
                type="button"
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
        async function () {

            botaoConfirmar.disabled =
                true;


            botaoConfirmar.textContent =
                "SALVANDO...";


            const horarioJaOcupado =
                await verificarHorarioOcupado(
                    data,
                    horario
                );


            if (horarioJaOcupado) {

                alert(
                    "Esse horário já foi reservado. Por favor, escolha outro horário."
                );


                botaoConfirmar.disabled =
                    false;


                botaoConfirmar.textContent =
                    "CONFIRMAR PEDIDO";


                return;

            }


            const pedido = {

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


            const resultado =
                await window.supabaseClient
                    .from("pedidos")
                    .insert(pedido)
                    .select()
                    .single();


            if (resultado.error) {

                console.error(
                    "Erro ao salvar pedido:",
                    resultado.error
                );


                alert(
                    "Não foi possível salvar o pedido. Verifique a conexão com o sistema."
                );


                botaoConfirmar.disabled =
                    false;


                botaoConfirmar.textContent =
                    "CONFIRMAR PEDIDO";


                return;

            }


            const pedidoSalvo =
                resultado.data;


            /* =========================================
               BACKUP LOCAL
            ========================================= */

            salvarBackupLocal(
                pedidoSalvo
            );


            mostrarChecklist(
                janela,
                pedidoSalvo
            );

        }
    );

}


/* =========================================
   BACKUP LOCAL
========================================= */

function salvarBackupLocal(
    pedido
) {

    const pedidosSalvos =
        JSON.parse(
            localStorage.getItem(
                "pedidosGD"
            )
        ) || [];


    pedidosSalvos.push(
        pedido
    );


    localStorage.setItem(
        "pedidosGD",
        JSON.stringify(
            pedidosSalvos
        )
    );

}


/* =========================================
   CHECKLIST
========================================= */

function mostrarChecklist(
    janela,
    pedido
) {

    let checklistExtras = "";


    if (
        pedido.extras &&
        pedido.extras.length > 0
    ) {

        pedido.extras.forEach(
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

    }


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
                    ${pedido.nome}
                </p>

                <p>
                    <strong>WhatsApp:</strong>
                    ${pedido.whatsapp}
                </p>

                <p>
                    <strong>Veículo:</strong>
                    ${pedido.veiculo}
                </p>

                <p>
                    <strong>Modelo:</strong>
                    ${pedido.modelo}
                </p>

                <p>
                    <strong>Placa:</strong>
                    ${pedido.placa}
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
                    ${formatarMoeda(
                        Number(pedido.total)
                    )}
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
                type="button"
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
        async function () {

            let todosMarcados =
                true;


            checkboxes.forEach(
                function (checkbox) {

                    if (!checkbox.checked) {

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


            botaoFinalizar.disabled =
                true;


            botaoFinalizar.textContent =
                "FINALIZANDO...";


            const resultado =
                await window.supabaseClient
                    .from("pedidos")
                    .update({
                        status: "Concluído"
                    })
                    .eq("id", pedido.id);


            if (resultado.error) {

                console.error(
                    "Erro ao atualizar pedido:",
                    resultado.error
                );


                alert(
                    "Não foi possível finalizar o serviço no banco de dados."
                );


                botaoFinalizar.disabled =
                    false;


                botaoFinalizar.textContent =
                    "FINALIZAR SERVIÇO";


                return;

            }


            /* =========================================
               ATUALIZAR BACKUP LOCAL
            ========================================= */

            const pedidosSalvos =
                JSON.parse(
                    localStorage.getItem(
                        "pedidosGD"
                    )
                ) || [];


            const pedidoEncontrado =
                pedidosSalvos.find(
                    function (item) {

                        return (
                            String(item.id) ===
                            String(pedido.id)
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

function formatarMoeda(
    valor
) {

    return Number(valor).toLocaleString(
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

function formatarData(
    data
) {

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
