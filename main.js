// define que o JS seja executado de forma estrita
'use strict'

// cria constante que vai receber uma função que adiciona
// à lista de classes do elemento '#modal' a classe 'active'
const openModal = () => document.getElementById('modal').classList.add('active');

/**
 * cria a constante que vai receber a função que remove da lista de classes do elemento '#modal' a classe 'active'
 */
const closeModal = () => {
  clearFields();
  document.getElementById('modal').classList.remove('active');
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

//INTERAÇÃO COM O USUÁRIO
const isValidfields = () => {
  return document.getElementById('form').reportValidity();
}

//limpa os campos no modal "novo cliente"
const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach(field => field.value = "");

}

/**
 *após todos os campos serem preenchidos, ao clicar em 'salvar", irá cadastrar novo cliente, atualizar o BD e fechar o modal
 */
const saveClient = () => {
  if (isValidfields()) {
    const client = {
      nome: document.getElementById('nome').value,
      celular: document.getElementById('celular').value,
      email: document.getElementById('email').value,
      cidade: document.getElementById('cidade').value
    }
    const index = document.getElementById('nome').dataset.index ;
    if (index == 'new') {
      createClient(client);
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.celular}</td>
    <td>${client.email}</td>
    <td>${client.cidade}</td>
    <td>
    <button type="button" class="button green" id="edit-${index}">Editar</button>
    <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () =>{
  const rows = document.querySelectorAll('#tableClient>tbody tr');
  rows.forEach(row => row.parentNode.removeChild(row));
}


const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
}

const fillFields = (client) => {
  document.getElementById('nome').value = client.nome;
  document.getElementById('celular').value = client.celular;
  document.getElementById('email').value = client.email;
  document.getElementById('cidade').value = client.cidade;
  document.getElementById('nome').dataset.index = client.index;
}

//ao clicar em editar lê os dados constantes na posição do index no cadastro
 const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();

}

// botão de editar e excluir cadastro
const editDelete = (event) => {
  if (event.target.type == 'button') {
    const [action, index] = event.target.id.split('-');

    if (action == 'edit') {
      editClient(index)
    } else {
      const client = readClient()[index];
    const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`); {
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
    }
  }
}

updateTable()

//eventos / get traz as informações
document.getElementById('cadastrarClientes').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);
