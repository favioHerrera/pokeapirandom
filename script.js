const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let especie = "https://pokeapi.co/api/v2/pokemon-species/";

function generar(pokes){
   document.getElementById("listaPokemon").innerHTML="";

   for(let i = 0; i<pokes.length; i++){
      fetch(URL+pokes[i])
      .then((response)=>response.json())
      .then(data => mostrarPokemon(data))
   }

   for(let i = 0; i<pokes.length; i++){
      fetch(especie+pokes[i])
      .then((response)=>response.json())
      .then(data => mostrarPokemon2(data, pokes[i]))
   }
}

function mostrarPokemon2(poke, name_){
   document.getElementById(`generacion_${name_}`).innerHTML=poke.generation.name;
}

function mostrarPokemon(poke){
   let tipos = poke.types.map((type)=>`<p class="${type.type.name} tipo">${type.type.name}</p>`);
   tipos= tipos.join('');

   const div = document.createElement("div");
   div.classList.add("pokemon");
   div.innerHTML =`<p class="pokemon-id-back" id="pokemon-id-back">#${poke.order}</p>
   <div class="pokemon-imagen">
      <img src="${poke.sprites.other["home"].front_default}" alt="${poke.name}">
   </div>   
   <div class="pokemon-info">
      <div class="nombre-contenedor">
         <p class="pokemon-id">#${poke.order}</p>
         <h2 class="pokemon-nombre">${inicialMayuscula(poke.name)}</h2>
      </div>
      <div class="pokemon-tipos">
         ${tipos}
      </div>
      <div class="generacion" id="generacion_${poke.name}"></div>
   </div>`;
   
   listaPokemon.append(div);
}

function inicialMayuscula(str) {
   return str.charAt(0).toUpperCase() + str.slice(1);
 }
//-----------------------------------------------------------------------------------
function shuffle(array_) {
for(let i = 0; i<5; i++)
   return array_.sort(() => Math.random() - 0.5);
 }

function mostrarPorTipo(tipo){
   document.getElementById("listaPokemon").innerHTML="";
   let tipo_p = document.getElementById("tipo_p").value; 
   fetch(`https://pokeapi.co/api/v2/type/${tipo_p}`)
   .then((response)=>response.json())
   .then(data => mostrarPokemonPorTipo(data))
}

function mostrarPokemonPorTipo(poke){
   let cantidad = parseInt(document.getElementById("cantidad").value, 10)+1; 
   let listPokes = poke.pokemon.map((name_)=>name_.pokemon.name);
   
   let pokes= shuffle(listPokes).slice(1, cantidad);
   generar(pokes);
}

