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

// progressBars ejemplo
function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 6; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
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

const statsContainer = document.createElement("div");
statsContainer.classList.add("stats-container");
statsContainer.addEventListener("click", ()=>{
  Swal.fire({
    title: pokemon.name,
    icon: 'info',
    input: 'range',
    inputLabel: pokemon.stats,
    inputAttributes: {
      min: 0,
      max: 100,
      step: 1
    },
    inputValue: stat.base_stat
  })
//   Swal.fire({
//     title: `${pokemon.name}`,
//     text: 'Modal with a custom image.',
//     imageUrl: `${pokemon.sprites.other.dream_world.front_default}`,
//     // imageUrl:  `${(img) ?  img : defaultImg}`,
//     html: `
//         ${pokemon.stats.map(data=>`
//         <div>
//             <input 
//                 type="range" 
//                 value=${data.base_stat}
//                 max="200" id="${data.stat.name}"/>
//             <label data-name=${data.stat.name}> 
//                 <b>${data.base_stat}</b> 
//                 ${data.stat.name}
//             </label>
//         </div>
//         `).join("")}   
//     `,
//     confirmButtonText: 'OK',
//     cancelButtonText: 'Enviar',
//     showCancelButton: true,
//     showCloseButton: true,
//     imageWidth: "80%",
//     imageHeight: "80%",
// });
});


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