let allPokemon = [];

const allowedTypes = [
    "grass", "fire", "water", "bug", "normal",
    "poison", "electric", "ground", "fairy",
    "fighting", "psychic", "rock", "ghost",
    "ice", "dragon", "dark", "steel"
];

async function loadAndRenderPokemon() {
    let loadingSpinnerId = document.getElementById("loading-spinner");
    loadingSpinnerId.classList.remove("d-none");

    let count = allPokemon.length === 0 ? 1 : allPokemon.length + 1;
    let fetches = [];
    for (let index = count; index <= count + 24; index++) {
        fetches.push(fetch("https://pokeapi.co/api/v2/pokemon/" + index).then(response => response.json()));
    }
    try {
        let newPokemon = await Promise.all(fetches);
        newPokemon.forEach(pokemon => allPokemon.push(pokemon));
    } catch (error) {
        console.error("Fehler beim Laden der Pokemon:", error);
    }
    renderPokemon();
    loadingSpinnerId.classList.add("d-none");
}

function renderPokemon() {
    let startIndex = allPokemon.length === 0 ? 0 : allPokemon.length - 25;
    let allPokemonBox = document.getElementById("all-pokemon-box");
    let fragment = document.createDocumentFragment();
    for (let index = startIndex; index < allPokemon.length; index++) {
        let pokemonType = allPokemon[index].types[0].type.name;
        let pokemonName = allPokemon[index].name;
        let pokemonId = allPokemon[index].id;
        let pokemonImgSrc = allPokemon[index].sprites.other.dream_world.front_default != null ?
            allPokemon[index].sprites.other.dream_world.front_default
            : allPokemon[index].sprites.other.home.front_default;
        let pokemonCard = allowedTypes.includes(pokemonType) ?
            templateSmallPokemonCard(pokemonId, pokemonType, allPokemon[index], pokemonName, pokemonImgSrc)
            : templateSmallPokemonCard(pokemonId, "notype", allPokemon[index], pokemonName, pokemonImgSrc);
        let temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = pokemonCard;
        fragment.appendChild(temporaryDiv.firstElementChild);
    }
    allPokemonBox.appendChild(fragment);
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

function renderBigPokemonCard(event) {
    let index = event.target.id;
    console.log(index);
}