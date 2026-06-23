const pokemonID = document.getElementById('id-pokemon');
const pokemonName = document.getElementById('name-pokemon');
const pokemonImage = document.getElementById('img-pokemon');

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonID.style.display = 'none';
    pokemonName.innerHTML = `Carregando...`;
    pokemonImage.src = '../img/pokebola.png';
    
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonID.style.display = 'block';
        pokemonID.innerHTML = `# ${data.id}`
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }else{
        pokemonID.style.display = 'none';
        pokemonName.innerHTML = `Não encontrado!`;
        pokemonImage.style.imageRendering = 'auto';
        pokemonImage.src = '../img/pokebola.png';
    }
}

renderPokemon(20);