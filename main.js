const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

async function traerPokemon(id) {
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)).json();
  createPokemon(data);
}

//rango offset,limit
let limit = 8;
let offset = 1;

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    traerPokemon(i);
  }
}

function fetchAllPokemons() {
  const totalPokemons = 898;

  for (let i = 1; i <= totalPokemons; i++) {
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
  cardBack.classList.add("pokemon-back");

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}



let btnPrevious=document.querySelector("#previous");
btnPrevious.style.display='none'

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  show();
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

function show(){
  btnPrevious.style.display = 'block';
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);
  