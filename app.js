const pokedex = document.getElementById("pokedex");
const pokeIndex = document.getElementById("pokeIndex");


const fetchPokemon = () => {
    const promises = [];
    for(let i = 1; i <= 151; i++){
const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => 
              type.type.name).join(', ')
            
        }));
        displayPokemon(pokemon);
        });       
};

const displayPokemon = (pokemon) => {
    
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li class="card " onmouseover="selectPokemon()" onClick="selectPokemon(${pokeman.id})">
        <img class="card-image" src = "${pokeman.image}"/>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};




const selectPokemon = (elem) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${elem}`;
    const pokemonIndex = [];
    pokemonIndex.push(fetch(url).then(res => res.json()));
    Promise.all(pokemonIndex).then(results => {
        const pokemonIndex = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => 
              type.type.name).join(',') 
            }));
            displayIndex(pokemonIndex)
        });
}

            
const displayIndex = pokemonIndex => {
    console.log(pokemonIndex)
    // alert(`${pokemonIndex[0].name}`)
    const pokemonIndexHTMLString = pokemonIndex.map(pokeman => `
    <li class="card"> <img class="card-image" src="${pokeman.image}"/> <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2> <p class="card-subtitle">Type: ${pokeman.type}</p></li>
    `).join('');
    pokeIndex.innerHTML = pokemonIndexHTMLString;
};

fetchPokemon()