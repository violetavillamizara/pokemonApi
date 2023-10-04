const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const jsonserver="http://127.0.0.1:5013/stats";
let data;

async function traerPokemon(id) {
  data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)).json();
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
  flipCard.dataset.name = pokemon.name;

  flipCard.appendChild(cardContainer);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-back");
  cardBack.dataset.name = pokemon.name;

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

// progressBars ejemplo
function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");
  statsContainer.dataset.name = data.name;

  for (let i = 0; i < 6; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");
    statContainer.dataset.name = data.name;

    const statName = document.createElement("p");
    statName.dataset.name = data.name;
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");
    progress.dataset.name = data.name;

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.dataset.name = data.name;
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
  
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

document.addEventListener("click",async (e)=>{
  if(e.target.matches(".flip-card, .stats-container *")){
    console.log(e.target.dataset.name);
    let namePokemon = e.target.dataset.name;
    let data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)).json();
    console.log(data);
    Swal.fire({
      title: `${data.name}`,
      html: `
        ${data.stats.map(d=>`
        <div class="values-container">
          <input class="pokeInput" type="range" 
            value=${d.base_stat}
            max="200" id="${d.stat.name}"/>
          <label id="${d.stat.name}" class="text-white" data-name=${d.stat.name}> 
            <b>${d.base_stat}</b> 
            ${d.stat.name}
          </label>
        </div>`).join("")}`,
    })
    const newInputs = document.querySelectorAll(".pokeInput");
    newInputs.forEach((newInput) => {
    newInput.addEventListener("input", (e) => {
    let mystats = e.target.nextElementSibling;
    mystats.innerHTML = `${e.target.value} ${mystats.dataset.name}`;
    }
    )}
    )}
})

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

//buscar
const input = document.querySelector('#nombre');
const boton = document.querySelector('#buscar');

boton.addEventListener('click', () => {
  const pokemonName = input.value.toLowerCase();
    buscarName(pokemonName);

});

async function buscarName(name) {
  const response = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json();
  removeChildNodes(pokemonContainer);
  createPokemon(response);
}

// document.addEventListener("DOMContentLoaded", () => {
//   // Función que se llama cuando cambia el valor de un input
//   function updateValues() {
//     // Selecciona todos los inputs por su clase
//     const inputs = document.querySelectorAll('.pokeInput');
    
//     // Obtiene los valores de los inputs y los almacena en un array
//     const values = Array.from(inputs).map(input => input.value);
    
//     // Convierte los valores en una cadena y muestra en el div
//     const valuesContainer = document.querySelector('.values-container');