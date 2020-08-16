const divTarefas = document.getElementById('div-tarefas')
const divapp = document.getElementById('app')
const btnAddTarefa = document.getElementById('adiciona-tarefa')
const inputAddTarefa = document.getElementById('nova-tarefa')
const urlUsuarios = 'https://raphahf6.github.io/todo-list/db.json'
// Obtém a data/hora atual
var data = new Date();

// Guarda cada pedaço em uma variável
var dia = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes = data.getMonth();          // 0-11 (zero=janeiro)
var ano2 = data.getYear();           // 2 dígitos
var ano4 = data.getFullYear();       // 4 dígitos
var hora = data.getHours();          // 0-23
var min = data.getMinutes();        // 0-59
var seg = data.getSeconds();        // 0-59
var mseg = data.getMilliseconds();   // 0-999
var tz = data.getTimezoneOffset(); // em minutos

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes + 1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;





// btnAddTarefa.addEventListener('click', () => {
//     adicionaTarefa()
// })


axios.get(urlUsuarios)
    .then(response => {
        const api = response.data
        const { usuario } = api
        for (i = 0; i < usuario.length; i++) {
            const usuarioAtual = usuario[i]
            console.log(usuarioAtual.img)
            divapp.innerHTML += `<div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" id="usuario">
                  ${usuarioAtual.nome}
                </a>

              </div>`

              




        }

        const divUsuario = document.getElementById(`usuario`)

        const { mensagems } = api
        for (i = 0; i < mensagems.length; i++) {
            const mensagemAtual = mensagems[i]

            divUsuario.addEventListener('click', () => {
                if (divTarefas.childElementCount < mensagems.length) {
                    inputAddTarefa.removeAttribute('disabled')
                    btnAddTarefa.removeAttribute('disabled')
                    divTarefas.innerHTML += `<div class="container col-xl-12"><ul class="list-group form-inline col-xl-12">
                                                     <li class="list-group-item form-inline col-xl-12" id="tarefas">
                                                       <button type="button" class="list-group-item list-group-item-action" id="mensagem-adicionada-${api.id}">${mensagemAtual.mensagem} <img src="${usuario[0].img}" class="rounded float-right" id="img-${usuario.id}" alt="..." style="width: 50px; height:50px;margin-right: 9px;"></button>
                                                            </li>
                                                            </ul></div>`

                }



            })



        }


        btnAddTarefa.addEventListener('click', () => {
            axios.post(`${urlUsuarios}`, {
                "mensagem": `${inputAddTarefa.value} hora: ${str_hora} ${str_data} `
            })
                .then(response => {
                    if (divTarefas.childElementCount > 0) {
                        divTarefas.innerHTML += `<div class="container col-xl-12"><ul class="list-group form-inline col-xl-12">
                                                         <li class="list-group-item form-inline col-xl-12" id="tarefas">
                                                           <button type="button" class="list-group-item list-group-item-action" id="mensagem-adicionada-${divTarefas.childElementCount + 1}">${inputAddTarefa.value} hora: ${str_hora} ${str_data}<img src="${usuario[0].img}" class="rounded float-right" id="img-${usuario[0].id}" alt="..." style="width: 50px; height:50px;margin-right: 9px;"></button>
                                                                </li>
                                                                </ul></div>`
                    }



                })
                .catch(err => {
                    console.log(err)
                })



            // axios.get(urlUsuarios)
            //     .then(response => {
            //         const api = response.data

            //     })






        })






    })


