let allPokemon = [];

const allowedTypes = [
    "grass", "fire", "water", "bug", "normal",
    "poison", "electric", "ground", "fairy",
    "fighting", "psychic", "rock", "ghost",
    "ice", "dragon", "dark", "steel"
];

async function loadPokemonInArray() {
    let count = allPokemon.length == 0 ? 1 : allPokemon.length + 1;
    for (let index = count; index <= count + 24; index++) {
        let result = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let pokemonObject = await result.json();
        allPokemon.push(pokemonObject);
    }
}

async function loadAndRenderNextPokemon() {
    let loadingSpinnerId = document.getElementById("loading-spinner");
    loadingSpinnerId.classList.remove("d-none");

    let count = allPokemon.length == 0 ? 1 : allPokemon.length + 1;
    for (let index = count; index <= count + 24; index++) {
        let result = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let pokemonObject = await result.json();
        allPokemon.push(pokemonObject);
    }
    renderPokemon();
    loadingSpinnerId.classList.add("d-none");
}

function renderPokemon() {
    let allPokemonBox = document.getElementById("all-pokemon-box");
    allPokemonBox.innerHTML = "";
    for (let index = 0; index < allPokemon.length; index++) {
        let pokemonType = allPokemon[index].types[0].type.name;
        let pokemonName = allPokemon[index].name;
        let pokemonId = allPokemon[index].id;

        allowedTypes.includes(pokemonType) ?
            allPokemonBox.innerHTML += templatePokemonType(pokemonId, pokemonType, allPokemon[index], pokemonName)
            : allPokemonBox.innerHTML += templatePokemonType(pokemonId, "notype", allPokemon[index], pokemonName);
    }
}

function audioPlay() {
    let audioId = document.getElementById("audio25");
    audioId.play();

}

function playBackgroundMusicAndVideo() {
    let musicId = document.getElementById("background-music");
    musicId.play();
    musicId.volume = 0.8;
    let videoId = document.getElementById("background-video");
    videoId.classList.remove("d-none");
    videoId.play();
}

function hideOverlay(overlay) {
    let overlayId = document.getElementById(overlay);
    overlayId.classList.add("d-none");
}

function showContent() {
    let contentId = document.getElementById("content");
    contentId.classList.remove("d-none");
}

function criesPokemon(Id) {
    let pokemonAudioId = document.getElementById("audio" + Id);
    pokemonAudioId.play();
}