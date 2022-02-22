// define que o JS seja executado de forma estrita
'use strict'

// cria constante que vai receber uma função que adiciona
// à lista de classes do elemento '#modal' a classe 'active'
const openModal = () => document.getElementById('modal').classList.add('active');

/**
 * cria a constante que vai receber a função que remove da lista de classes do elemento '#modal' a classe 'active'
 */
const closeModal = () => document.getElementById('modal').classList.remove('active');

//variável global
const tempClient = {
  nome: "Mateus",
  email: "mateus@gmail.com",
  celular: "12324456777",
  cidade: "Washington-DC"
}

// set pega as informações
const createClient = (client) => {
  //pega as informações no BD, transforma em JSON e armazena em uma variável 'db_client'
  const db_client = JSON.parse(localStorage.getItem('db_client'))
  // push -> acrescenta + 1cliente que chegou no meu parâmetro
  db_client.push (client)
  // manda as informações acrescentadas de volta ('db_client'=key, JSON.stringify= value)
  localStorage.setItem("db_client", JSON.stringify(db_client))
}

//eventos / get traz as informações
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);
