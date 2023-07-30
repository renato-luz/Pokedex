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
            let id = ('00' + data.id).slice(-3);
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
const searchBtn = document.querySelector('.botao'); 

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getPokemonData(inputField.value);
    }
});

searchBtn.addEventListener('click', () => {
    getPokemonData(inputField.value);
});

/////////////////////////////////////////////////////////////////////
