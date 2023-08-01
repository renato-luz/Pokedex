function abrirFechar() {
  // Seleciona a div secundária pelo ID
  const divSecundaria = document.getElementById("divSecundaria");

  // Verifica se a div secundária possui a classe "fechar"
  if (divSecundaria.classList.contains("fechar")) {
    // Remove a classe "fechar" e adiciona a classe "abrir"
    divSecundaria.classList.remove("fechar");
    divSecundaria.classList.add("abrir");
  } else {
    // Remove a classe "abrir" e adiciona a classe "fechar"
    divSecundaria.classList.remove("abrir");
    divSecundaria.classList.add("fechar");
  }

  // Seleciona as polylines pelos seletores
  const polylineAbrir = document.querySelector(".polyline-abrir");
  const polylineFechar = document.querySelector(".polyline-fechar");

  setTimeout(() => {
    // Alterna o fill de acordo com o estado atual
    if (polylineAbrir.style.fill === "rgb(220, 10, 45)") {
      polylineAbrir.style.fill = "#FFE18D";
      polylineFechar.style.fill = "none";
    } else {
      polylineAbrir.style.fill = "rgb(220, 10, 45)";
      polylineFechar.style.fill = "none";
    }
  }, 490);
}

const imageScreen = document.querySelector('.main-screen'); // Seleciona o elemento com a classe 'main-screen'

const getPokemonData = (pokemon) => {
  console.log(pokemon);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => {
          const id = String(data.id).padStart(3, '0'); // Formata o ID com três dígitos preenchidos com zeros à esquerda
          imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
          //nameScreen.innerHTML = data.name;
          //typeScreen.innerHTML = data.types[0].type.name;
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


