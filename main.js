const sectionApp = document.getElementById('app-main')
const sectionLogin = document.getElementById('login')
sectionApp.setAttribute('hidden', '')
const inputLogin = document.getElementById('input-login')
const bntLogin = document.getElementById('btn-login')

bntLogin.addEventListener('click', () => {
    const urlGit = `https://api.github.com/users/${inputLogin.value}`

    axios.get(urlGit)
        .then(response => {
            const { avatar_url, bio, name, blog, repos_url } = response.data

            if (name == null) {
                alert('Usuario invalido')
                location.reload()
            }
            sectionApp.removeAttribute('hidden')
            sectionLogin.setAttribute('hidden', '')
            const divTarefas = document.getElementById('div-tarefas')
            const divRepositorios = document.getElementById('div-repositorios')
            const divapp = document.getElementById('app')
            const btnAddTarefa = document.getElementById('adiciona-tarefa')
            const inputAddTarefa = document.getElementById('nova-tarefa')
            const btnDark = document.querySelector('button.dark')
            const urlUsuarios = 'http://localhost:3000/usuario'
            const urlTodo = 'https://raphahf6.github.io/todo-list/db.json'

            const nomeUsuario = document.getElementById('nome-titulo')
            const bioUsuario = document.getElementById('bio')
            const imgUsuario = document.getElementById('img-usuario')
            imgUsuario.setAttribute('src', `${avatar_url}`)
            nomeUsuario.textContent = `${name}`
            if (bio == null) {
                bioUsuario.setAttribute('hidden', '')
            }
            btnDark.addEventListener('click', () => {
                document.getElementById('perfil').setAttribute('style', 'background-color: black;')
                let colorir = document.querySelectorAll('.txt-usuario')
                colorir.forEach(element => {
                    element.setAttribute('style', 'color:white;')
                })

            })

            bioUsuario.textContent = `${bio}`

            axios.get(repos_url)
                .then(res => {

                    for (i = 0; i < res.data.length; i++) {
                        const { name } = res.data[i]
                        const bntRepos = document.getElementById('repositorios')
                        // const downloadLink = `https://github.com/raphahf6/${name}/archive/master.zip`
                        bntRepos.addEventListener('click', () => {
                            inputAddTarefa.setAttribute('hidden', '')
                            btnAddTarefa.setAttribute('hidden', '')
                            divRepositorios.removeAttribute('hidden')
                            divTarefas.setAttribute('hidden', '')
                            if (divRepositorios.childElementCount < res.data.length) {
                                divRepositorios.innerHTML += `<div class="list-group">
                            <a href="#" id="repositorio" class="list-group-item list-group-item-action active repos" id="">
                              ${name} <img src="${avatar_url}" class="rounded float-right" alt="..." style="width: 33px; height:33px;">
                            </a>
                            
                          </div>`

                                const repositorioAtual = document.querySelectorAll(`a#repositorio`)
                                repositorioAtual.forEach(repo => {
                                    // repo.setAttribute('href', `${downloadLink}`)
                                })
                            }


                        })

                    }
                    axios.get(urlTodo)
                        .then(response => {
                            const api = response.data
                            const { todo } = api
                            if (response.data.length == 0) {
                                btnAddTarefa.removeAttribute('hidden')
                                inputAddTarefa.removeAttribute('hidden')
                            }
                            for (j = 0; j < todo.length; j++) {

                                const { mensagem, id } = todo[j]

                                const btnTarefas = document.getElementById(`btn-tarefas`)


                                inputAddTarefa.removeAttribute('hidden')
                                btnAddTarefa.removeAttribute('hidden')

                                divTarefas.innerHTML += `<div class="container col-xl-12" id="mensagem-${id}"><ul class="list-group form-inline col-xl-12">
                                                             <li class="mensagem-${id} list-group-item form-inline col-xl-12 bg-transparent" id="tarefas" style="border-style:none;">
                                                               <button type="text" class="tarefa list-group-item list-group-item-action" id="${id}">${mensagem}<img src="${avatar_url}" class="rounded float-right" id="img-${id}" alt="..." style="width: 50px; height:50px;margin-right: 9px;"></button>
                                                                    </li>
                                                                    </ul></div>`





                                let tarefa = document.querySelectorAll('button.tarefa')



                                Array.of(tarefa).map((btn, index) => {
                                    addEventListener('click', () => {
                                        const msgRemovida = document.getElementById(`${btn.id}`)
                                        const divMensagem = document.querySelector(`div#mensagem-${btn.id}`)
                                        const liMensagem = document.querySelector(`li.mensagem-${btn.id}`)

                                        /* if (divTarefas.innerText.length > 35) {
                                             axios.delete(`${urlTodo}/${btn.id}`, {
     
                                             })
                                                 .then(res => {
                                                     liMensagem.removeChild(msgRemovida)
                                                     divMensagem.setAttribute('hidden', '')
                                                 })
                                                 .catch(err => {
                                                     console.log(err)
                                                 })
     
                                         }*/

                                    })
                                })
                                tarefa.forEach(btn => {
                                    btn.addEventListener('click', () => {



                                    })
                                })




                                btnTarefas.addEventListener('click', () => {
                                    inputAddTarefa.removeAttribute('hidden')
                                    btnAddTarefa.removeAttribute('hidden')
                                    divRepositorios.setAttribute('hidden', '')
                                    if (divTarefas.childElementCount < response.data.lengt || divRepositorios.hasAttribute('hidden')) {

                                        divTarefas.removeAttribute('hidden')


                                    }
                                })




                            }

                            btnAddTarefa.addEventListener('click', () => {
                                divTarefas.innerHTML += `<div class="container col-xl-12"><ul class="list-group form-inline col-xl-12">
                                                     <li class="list-group-item form-inline col-xl-12 bg-transparent" id="tarefas" style="border-style:none;">
                                                       <button type="button" class="btns list-group-item list-group-item-action" id="${divTarefas.childElementCount}">${inputAddTarefa.value}<img src="${avatar_url}" class="rounded float-right" id="img" alt="..." style="width: 50px; height:50px;margin-right: 9px;"></button>
                                                            </li>
                                                            </ul></div>`



                                inputAddTarefa.value = ''






                            })



                        })
                })


        })



})













