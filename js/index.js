// Informações do Pokémon
const pokemonID = document.getElementById('id-pokemon');
const pokemonName = document.getElementById('name-pokemon');
const pokemonImage = document.getElementById('img-pokemon');

// Botões
const form = document.getElementById('form');
const input = document.getElementById('input-search');
const btnDetails = document.getElementById('btn-details');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let searchPokemon = 1;

// Faz requisição para API que retorna os dados
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Renderiza os dados do Pokémon
const renderPokemon = async (pokemon) => {

    pokemonID.style.display = 'none';
    pokemonName.innerHTML = `Carregando...`;
    pokemonImage.src = '../img/pokebola.png';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonID.style.display = 'block';
        pokemonID.innerHTML = `# ${data.id}`
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        searchPokemon = data.id;

        input.value = '';
    } else {
        pokemonID.style.display = 'none';
        pokemonName.innerHTML = `Não encontrado!`;
        pokemonImage.style.imageRendering = 'auto';
        pokemonImage.src = '../img/pokebola.png';
    }
}

// Redireciona para página de detalhes com o ID do Pokémon na URL
btnDetails.addEventListener('click', () =>{
    window.location.href = `detailsPokemon.html?id=${searchPokemon}`;
});

// Busca pelo Pokémon
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Passa para o proximo Pokémon
btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

// Passa para o Pokémon anterior
btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

// Coleta ID do Pokémon na URL
document.addEventListener('DOMContentLoaded', () =>{
    const param = new URLSearchParams(window.location.search);
    searchPokemon = param.get('id');

    if(searchPokemon){
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);