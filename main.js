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
  nome: "brenda",
  email: "brenda@gmail.com",
  celular: "12324456777",
  cidade: "Washington-DC"
}

//pega as informações no BD, transforma em JSON e armazena em uma variável 'db_client'
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

// set pega as informações
// manda as informações acrescentadas de volta ('db_client'=key, JSON.stringify= value)
const setLocalStorage = (dbClient) =>  localStorage.setItem("db_client", JSON.stringify(dbClient));


//DELETE
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
}

//UPDATE
const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
}

//READ
const readClient = () => getLocalStorage();

//CREATE
const createClient = (client) => {
  const dbClient = getLocalStorage();
  console.log(dbClient);
  dbClient.push(client)
  console.log(dbClient);
  setLocalStorage(dbClient)
}

//eventos / get traz as informações
document.getElementById('cadastrarClientes').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);
