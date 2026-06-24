// Informações do Pokémon
const pokemonID = document.getElementById('id-pokemon');
const pokemonName = document.getElementById('name-pokemon');
const pokemonImage = document.getElementById('img-pokemon');
const pokemonHeight = document.getElementById('height-pokemon');
const pokemonWeight = document.getElementById('weight-pokemon');

// Habilidades do Pokémon
const pokemonHP = document.getElementById('hp-pokemon');
const pokemonAttack = document.getElementById('attack-pokemon');
const pokemonDefense = document.getElementById('defense-pokemon');
const pokemonSpecialAttack = document.getElementById('special-attack-pokemon');
const pokemonSpecialDefense = document.getElementById('special-defense-pokemon');
const pokemonSpeed = document.getElementById('speed-pokemon');
const pokemonPower = document.getElementById('power-pokemon');

// Faz requisição para API que retorna os dados
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Busca dados da espécie do Pokémon
const fetchPokemonSpecies = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Busca cadeia evolutiva atravez da url
const fetchEvolutionChain = async (url) => {

    const response = await fetch(url);

    if (response.status == 200) {
        let evolutionsChain = await response.json();
        return evolutionsChain;
    }
}

// Percorre a cadeita e busca apenas o ID do Pokémon 
const extractEvolutionChain = async (chain) => {

    const evolutions = [];

    while (chain) {

        // Coleta a URL do especie do Pokémon
        const urlPokemon = chain.species.url;

        // Trasforma em array(split), remove espaços vazios(filter), e coleta o ultimo valor(pop)
        const idPokemon = urlPokemon.split('/').filter(Boolean).pop();

        // Adiciona o ID no array
        evolutions.push({ id: idPokemon });

        // Passa para o proximo até ser null
        chain = chain.evolves_to[0] || null;
    }

    return evolutions;
}

// Renderiza as evoluções do Pokémon
function renderEvoluntions(evolutions) {
    const pokemonEvolutions = document.getElementById('evolutions-pokemon');

    evolutions.forEach((evolution, i) => {

        if (i > 0) {
            const separator = document.createElement('p');
            separator.textContent = '>';
            pokemonEvolutions.appendChild(separator);
        }

        const evoImg = document.createElement('img');
        evoImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/animated/${evolution.id}.gif`;

        pokemonEvolutions.appendChild(evoImg);
    });
}

// Renderiza os dados do Pokémon
const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonID.innerHTML = `# ${data.id}`
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pokemonHeight.innerHTML = `${(data.height) * 10} CM`;
        pokemonWeight.innerHTML = `${(data.weight) / 10} KG`;
        
        // Renderiza o Tipo do Pokémon
        renderTypesPokemon(data);
        
        // Lista com evolução do pokémon
        const speciesData = await fetchPokemonSpecies(pokemon);
        if (speciesData) {
            let evolutionsData = await fetchEvolutionChain(speciesData.evolution_chain.url);

            if (evolutionsData) {
                const evolutions = await extractEvolutionChain(evolutionsData.chain);
                renderEvoluntions(evolutions);
            }
        }
        
        // Habilidades
        pokemonHP.innerHTML = data['stats'][0]['base_stat'];
        pokemonAttack.innerHTML = data['stats'][1]['base_stat'];
        pokemonDefense.innerHTML = data['stats'][2]['base_stat'];
        pokemonSpecialAttack.innerHTML = data['stats'][3]['base_stat'];
        pokemonSpecialDefense.innerHTML = data['stats'][4]['base_stat'];
        pokemonSpeed.innerHTML = data['stats'][5]['base_stat'];
        
        //Soma dos poderes
        let sum = 0;
        for(let i = 0; i <= 5; i++){
            sum += data['stats'][i]['base_stat'];
        }
        pokemonPower.innerHTML = sum;
        
        // Renderiza barras de habilidade pela porcentagem
        renderStats(data.stats)
    } else {
        pokemonID.style.display = 'none';
        pokemonName.innerHTML = `Não encontrado!`;
        pokemonImage.style.imageRendering = 'auto';
        pokemonImage.src = '../img/pokebola.png';
    }
    
}

// Renderiza o tipo do Pokémon
function renderTypesPokemon(data) {
    const pokemonType = document.getElementById('types-pokemon');

    const listTypes = data.types;

    for (const item of listTypes) {

        const nameType = item.type.name;
        const badge = document.createElement('span');

        badge.className = 'type-badge';

        switch (nameType) {
            case 'normal':
                badge.style.background = '#A8A878';
                badge.textContent = 'Normal';
                break;
            case 'fire':
                badge.style.background = '#EE8130';
                badge.textContent = 'Fogo';
                break;
            case 'water':
                badge.style.background = '#6390F0';
                badge.textContent = 'Água';
                break;
            case 'grass':
                badge.style.background = '#7AC74C';
                badge.textContent = 'Planta';
                break;
            case 'electric':
                badge.style.background = '#F7D02C';
                badge.style.color = '#1A1A1A';
                badge.textContent = 'Elétrico';
                break;
            case 'ice':
                badge.style.background = '#96D9D6';
                badge.style.color = '#1A1A1A';
                badge.textContent = 'Gelo';
                break;
            case 'fighting':
                badge.style.background = '#C22E28';
                badge.textContent = 'Lutador';
                break;
            case 'poison':
                badge.style.background = '#A33EA1';
                badge.textContent = 'Veneno';
                break;
            case 'ground':
                badge.style.background = '#E2BF65';
                badge.style.color = '#1A1A1A';
                badge.textContent = 'Terra';
                break;
            case 'flying':
                badge.style.background = '#A98FF3';
                badge.textContent = 'Voador';
                break;
            case 'psychic':
                badge.style.background = '#F95587';
                badge.textContent = 'Psíquico';
                break;
            case 'bug':
                badge.style.background = '#A6B91A';
                badge.textContent = 'Inseto';
                break;
            case 'rock':
                badge.style.background = '#B6A136';
                badge.textContent = 'Pedra';
                break;
            case 'ghost':
                badge.style.background = '#735797';
                badge.textContent = 'Fantasma';
                break;
            case 'dragon':
                badge.style.background = '#6F35FC';
                badge.textContent = 'Dragão';
                break;
            case 'dark':
                badge.style.background = '#705746';
                badge.textContent = 'Sombrio';
                break;
            case 'steel':
                badge.style.background = '#B7B7CE';
                badge.style.color = '#1A1A1A';
                badge.textContent = 'Aço';
                break;
            case 'fairy':
                badge.style.background = '#D685AD';
                badge.textContent = 'Fada';
                break;
            default:
                badge.style.background = '#FFF';
                badge.textContent = 'Erro';
                break;
        }

        pokemonType.appendChild(badge);
    }
}

// Renderiza as habilidades do Pokémon
function renderStats(stats){

    const maxValue = 255;

    for(const stat of stats){

        const nameStat = stat.stat.name;
        const valueStat = stat.base_stat;
        const percentage = (valueStat / maxValue) * 100;

        const bar = document.getElementById(`${nameStat}-pokemon-bar`);

        if(bar){
            setTimeout(() => {
                bar.style.width = `${percentage}%`;
            }, 50);
        };
    };
}

// Coleta ID do Pokémon na URL
document.addEventListener('DOMContentLoaded', () =>{
    const param = new URLSearchParams(window.location.search);
    const pokemonID = param.get('id');

    if(pokemonID){
        renderPokemon(pokemonID);
    }
});