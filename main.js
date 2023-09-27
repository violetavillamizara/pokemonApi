const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

async function traerPokemon(id) {
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)).json();
  createPokemon(data);
  spinner.style.display = "none";
};

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    traerPokemon(i);
  }
}


function createPokemon(pokemon) {
  //crear divs y asignar clases
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default; //agrega las img del api al src

  imgContainer.appendChild(img);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`; //001

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(imgContainer);
  card.appendChild(number);
  card.appendChild(name);

  // card container
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  flipCard.appendChild(cardContainer);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
}



let limit = 8;
let offset = 1;



fetchPokemons(offset, limit);
  