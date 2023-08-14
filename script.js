

const imageScreen = document.querySelector('.main-screen'); // Seleciona o elemento com a classe 'main-screen'
const nameScreen = document.querySelector('#nome');
const typeScreen = document.querySelector('#info');
const abilitiesScreen = document.querySelector('#abilitiesInfo');
const randomButton = document.querySelector('#randomButton');

randomButton.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 1000) + 1; // Gera um número aleatório entre 1 e 1000
  getPokemonData(randomId); // Chama a função com o número gerado
});


const getPokemonData = (pokemon) => {
  console.log(pokemon);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => {
          const id = String(data.id).padStart(3, '0'); // Formata o ID com três dígitos preenchidos com zeros à esquerda
          imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
          nameScreen.innerHTML = data.name + " -  id : " + data.id;
          let types = data.types.map(typeObj => typeObj.type.name); // Extrai os nomes dos tipos
          typeScreen.innerHTML = "Type: " + types.join(", ");
          let abilities = data.abilities.map(typeObj => typeObj.ability.name);
          abilitiesScreen.innerHTML = "Abilities: " + abilities.join(", ")
          //idScreen.innerHTML = `#${data.id}`;

          inputField.value = '';
      })
      .catch((error) => {
          console.error('Erro na requisição:', error);
      });
};


const inputField = document.getElementById('txtBusca'); 

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getPokemonData(inputField.value);
    }
});


/////////////////////////////////////////////////////////////////////

const userInput = document.getElementById("txtBusca");
const suggestionList = document.getElementById("suggestions");

let jsonOptions = [];

// Fetch JSON data from data.json file
fetch("pokemonData.json")
  .then((response) => response.json())
  .then((data) => {
    jsonOptions = data;
  })
  .catch((error) => console.error("Error fetching JSON data:", error));

userInput.addEventListener("input", handleInput);

function handleInput() {
  const inputText = userInput.value.trim().toLowerCase();

  // Filtra a lista de pokemons baseado no texto digitado pelo usuário.
  const filteredOptions = jsonOptions.filter((pokemonName) =>
    pokemonName.toLowerCase().startsWith(inputText)
  );

  // Limpa a lista de sugestões existente.
  suggestionList.innerHTML = "";

  // Adiciona as opções filtradas como sugestões para o campo de entrada.
  filteredOptions.forEach((pokemonName) => {
    const option = document.createElement("option");
    option.value = pokemonName;
    suggestionList.appendChild(option);
  });
}

// Adiciona um ouvinte de evento 'input' ao campo de entrada para acionar a pesquisa quando o valor for alterado.
userInput.addEventListener("input", () => {
  getPokemonData(userInput.value);
});


