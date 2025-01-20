let allPokemon = [];
let nextPokemonBigCard = [];
let pokemonMap = new Map();
let timer;
let endResult = [];

const allowedTypes = [
    "grass", "fire", "water", "bug", "normal",
    "poison", "electric", "ground", "fairy",
    "fighting", "psychic", "rock", "ghost",
    "ice", "dragon", "dark", "steel", "flying"
];

const indexFunctions = new Map([
    ['renderPokemonNormal', () => {
        let startIndex = allPokemon.length === 0 ? 0 : allPokemon.length - 25;
        return startIndex;
    }],

    ['renderBigPokemonCardNormal', (event) => {
        let index = event.currentTarget.id - 1;
        return index;
    }],

    ['countNextPokemonNormal', (event, currentPokemonIndex) => {
        let countId;
        let countIndex;
        switch (event.target.id) {
            case "plus":
                countId = Number(currentPokemonIndex) + 1 === 1025 ? 1 : Number(currentPokemonIndex) + 2;
                countIndex = Number(currentPokemonIndex) + 1 === 1025 ? 0 : Number(currentPokemonIndex) + 1;
                break;
            default:
                countId = Number(currentPokemonIndex) === 0 ? 1025 : currentPokemonIndex;
                countIndex = Number(currentPokemonIndex) === 0 ? 1024 : Number(currentPokemonIndex) - 1;
                break;
        }
        return [countId, countIndex];
    }],

    ['countNextPokemonSearch', (event, currentPokemonIndex) => {
        let countId;
        let countIndex;
        switch (event.target.id) {
            case "plus":
                countId = Number(currentPokemonIndex) + 1 === allPokemon.length ? allPokemon[0].id : allPokemon[Number(currentPokemonIndex) + 1].id;
                countIndex = Number(currentPokemonIndex) + 1 === allPokemon.length ? 0 : Number(currentPokemonIndex) + 1;
                break;
            default:
                countId = Number(currentPokemonIndex) === 0 ? allPokemon[allPokemon.length - 1].id : allPokemon[Number(currentPokemonIndex) - 1].id;
                countIndex = Number(currentPokemonIndex) === 0 ? allPokemon.length - 1 : Number(currentPokemonIndex) - 1;
                break;
        }
        return [countId, countIndex];
    }]
]);

function loadPokemonData(index, pokemonArray) {
    let typeArray = pokemonArray[index].types.map(element => element.type.name);
    let mainType = allowedTypes.includes(pokemonArray[index].types[0].type.name)
        ? pokemonArray[index].types[0].type.name
        : "notype";
    pokemonMap.set("data", {
        id: pokemonArray[index].id,
        type: mainType,
        name: pokemonArray[index].name,
        img: pokemonArray[index].sprites.other.dream_world.front_default || pokemonArray[index].sprites.other.home.front_default,
        typeCount: pokemonArray[index].types.length,
        cries: pokemonArray[index].cries.latest,
        typeArray: typeArray,
        index: index
    });
}

async function loadAndRenderPokemon() {
    if (allPokemon.length !== 1025) {
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
        renderPokemon("normal");
        loadingSpinnerId.classList.add("d-none");
    }
    buttonNextPokemonHidden();
}

function renderPokemon(mode) {
    let allPokemonBox = document.getElementById("all-pokemon-box");
    if (mode === "normal") {
        startIndex = indexFunctions.get("renderPokemonNormal")();
    } else {
        startIndex = 0;
        allPokemon.innerHTML = "";
    }
    let fragment = document.createDocumentFragment();
    for (let index = startIndex; index < allPokemon.length; index++) {
        loadPokemonData(index, allPokemon);
        let pokemonCard = templateSmallPokemonCard(pokemonMap.get("data").id, pokemonMap.get("data").type, pokemonMap.get("data").cries, pokemonMap.get("data").name, pokemonMap.get("data").img, pokemonMap.get("data").typeCount, pokemonMap.get("data").typeArray, pokemonMap.get("data").index, mode)
        let temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = pokemonCard;
        fragment.appendChild(temporaryDiv.firstElementChild);
    }
    allPokemonBox.appendChild(fragment);
}

async function loadOnePokemonForBigPokemonCard(event) {
    let loadingSpinnerId = document.getElementById("loading-spinner");
    loadingSpinnerId.classList.remove("d-none");
    let mode = event.currentTarget.getAttribute("data-mode");
    let currentPokemonIndex = event.currentTarget.getAttribute("data-array-index");
    nextPokemonBigCard = [];
    let count = mode === "normal" ? indexFunctions.get("countNextPokemonNormal")(event, currentPokemonIndex) : indexFunctions.get("countNextPokemonSearch")(event, currentPokemonIndex);
    let countId = count[0];
    let countIndex = count[1];
    let result = await fetch("https://pokeapi.co/api/v2/pokemon/" + countId);
    let nextPokemon = await result.json();
    nextPokemonBigCard.push(nextPokemon);
    loadPokemonData(0, nextPokemonBigCard);
    renderNextBigPokemonCard(countIndex, mode);
    renderMainInformations(countIndex);
    loadingSpinnerId.classList.add("d-none");
}

function renderBigPokemonCard(event) {
    let index = event.currentTarget.getAttribute("data-array-index");
    let mode = event.currentTarget.getAttribute("data-mode");
    let bigPokemonCardOverlay = document.getElementById("big-pokemon-card-overlay");
    bigPokemonCardOverlay.innerHTML = "";
    let fragment = document.createDocumentFragment();
    loadPokemonData(index, allPokemon)
    let bigPokemonCard = templateBigPokemonCard(pokemonMap.get("data").id, pokemonMap.get("data").type, pokemonMap.get("data").name, pokemonMap.get("data").img, pokemonMap.get("data").typeCount, pokemonMap.get("data").typeArray, pokemonMap.get("data").index, mode);
    let temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = bigPokemonCard;
    fragment.appendChild(temporaryDiv.firstElementChild);
    bigPokemonCardOverlay.appendChild(fragment);
    bigPokemonCardOverlay.classList.remove("d-none");
    focusOnButtonMainInformations();
}

function renderNextBigPokemonCard(nextPokemonIndex, mode) {
    let bigPokemonCardOverlay = document.getElementById("big-pokemon-card-overlay");
    bigPokemonCardOverlay.innerHTML = "";
    let fragment = document.createDocumentFragment();
    let bigPokemonCard = templateBigPokemonCard(pokemonMap.get("data").id, pokemonMap.get("data").type, pokemonMap.get("data").name, pokemonMap.get("data").img, pokemonMap.get("data").typeCount, pokemonMap.get("data").typeArray, nextPokemonIndex, mode);
    let temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = bigPokemonCard;
    fragment.appendChild(temporaryDiv.firstElementChild);
    bigPokemonCardOverlay.appendChild(fragment);
    focusOnButtonMainInformations()
}

function renderMainInformations(index) {
    let pokemon = allPokemon[index] != undefined ? allPokemon[index] : nextPokemonBigCard[0]
    let informationViewBigPokemonCard = document.getElementById("information-view-big-pokemon-card");
    let height = pokemon.height / 10;
    height = height.toFixed(1);
    height = height.replace(".", ",");
    let weight = pokemon.weight / 10;
    weight = weight.toFixed(1);
    weight = weight.replace(".", ",");
    let baseExperience = pokemon.base_experience;
    let abilities = [];
    pokemon.abilities.forEach(element => abilities.push(element.ability.name));
    abilities.join(",");
    informationViewBigPokemonCard.innerHTML = templateViewMain(height, weight, baseExperience, abilities);
}

function renderStatsInformations(index) {
    let pokemon = allPokemon[index] != undefined ? allPokemon[index] : nextPokemonBigCard[0]
    let informationViewBigPokemonCard = document.getElementById("information-view-big-pokemon-card");
    let hp = pokemon.stats[0].base_stat;
    let attack = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let specialAttack = pokemon.stats[3].base_stat;
    let specialDefense = pokemon.stats[4].base_stat;
    let speed = pokemon.stats[5].base_stat;
    informationViewBigPokemonCard.innerHTML = templateViewStats(hp, attack, defense, specialAttack, specialDefense, speed);
}

async function extractPokemonEvolutionChain(pokemonId) {
    let loadingSpinnerId = document.getElementById("loading-spinner");
    loadingSpinnerId.classList.remove("d-none");
    let response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonId);
    let resultPokemonData = await response.json();
    response = await fetch(resultPokemonData.evolution_chain.url);
    resultPokemonData = await response.json();
    let pokemonEvolutionUrl = [];
    let pokemonEvolutionId;
    if (!resultPokemonData.chain) {
        return;
    } else {
        pokemonEvolutionUrl.push(resultPokemonData.chain.species.url)
        resultPokemonData.chain.evolves_to.forEach(element => {
            pokemonEvolutionUrl.push(element.species.url);
            if (element.evolves_to.length > 0) {
                element.evolves_to.forEach(nextElement => pokemonEvolutionUrl.push(nextElement.species.url));
            }
        });
    };
    pokemonEvolutionId = pokemonEvolutionUrl.map(element => element.slice(42, -1));
    extractPokemonImgUrlAndName(pokemonEvolutionId, pokemonId);
    loadingSpinnerId.classList.add("d-none");
}

async function extractPokemonImgUrlAndName(pokemonEvolutionId, pokemonId) {
    let fetches = [];
    let allPokemonObjects = [];
    let allPokemonImgUrl = [];
    let allPokemonName = [];
    for (let index = 0; index < pokemonEvolutionId.length; index++) {
        fetches.push(fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonEvolutionId[index]).then(response => response.json()));
    }
    try {
        let allNewPokemon = await Promise.all(fetches);
        allNewPokemon.forEach(pokemon => allPokemonObjects.push(pokemon));
    } catch (error) {
        console.error("Fehler beim Laden der Pokemon:", error);
    }
    allPokemonImgUrl = allPokemonObjects.map(url => url.sprites.other.dream_world.front_default || url.sprites.other.home.front_default);
    allPokemonName = allPokemonObjects.map(name => name.name)
    renderEvoChainInformations(allPokemonImgUrl, pokemonId, allPokemonName);
}

function renderEvoChainInformations(allPokemonImgUrl, pokemonId, allPokemonName) {
    let informationViewBigPokemonCard = document.getElementById("information-view-big-pokemon-card");
    informationViewBigPokemonCard.innerHTML = "";
    let fragment = document.createDocumentFragment();
    let temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = templateViewEvoChain(allPokemonImgUrl, pokemonId, allPokemonName);
    fragment.appendChild(temporaryDiv.firstElementChild);
    informationViewBigPokemonCard.appendChild(fragment);
}

async function checkSearchWordAndLoadAllPokemonIds() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
        let searchInput = document.getElementById("search-input");
        let searchInfoText = document.getElementById("search-info-text");
        let searchWord = searchInput.value.trim();
        let searchResultId = [];
        let infoButton = document.getElementById("info-button");
        endResult = [];
        allPokemon = [];
        if (searchWord.length >= 3) {
            changeClassList()
            englishPokemonNames.forEach((element, index) => {
                if (element.toLowerCase().startsWith(searchWord.toLowerCase())) {
                    searchResultId.push(index + 1);
                }
            });
            loadAndRenderAllSeachResultPokemon(searchResultId, infoButton);
        } else {
            searchInfoText.classList.remove("opacity-no-visable");
        }
    }, 300);

}

function changeClassList() {
    let buttonNextPokemon = document.getElementById("button-next-pokemon");
    let searchModeBox = document.getElementById("search-mode-box");
    let searchInfoText = document.getElementById("search-info-text");
    buttonNextPokemon.classList.add("d-none");
    searchModeBox.classList.remove("d-none");
    searchInfoText.classList.add("opacity-no-visable");
}

async function loadAndRenderAllSeachResultPokemon(searchResultId, infoButton) {
    let allfetches = [];
    let allPokemonBox = document.getElementById("all-pokemon-box");
    if (searchResultId.length != 0) {
        infoButton.classList.add("d-none");
        for (let index = 0; index < searchResultId.length; index++) {
            allfetches.push(fetch("https://pokeapi.co/api/v2/pokemon/" + searchResultId[index]).then(response => response.json()));
        }
        let allSearchResultPokemon = await Promise.all(allfetches);
        allSearchResultPokemon.forEach(element => endResult.push(element))

        let allPokemonBox = document.getElementById("all-pokemon-box");
        allPokemonBox.innerHTML = "";

        allPokemon = endResult;
        renderPokemon("search");
    } else {
        allPokemonBox.innerHTML = "";
        infoButton.classList.remove("d-none");
    }
}

function clearAndLoadNormalPokemon() {
    allPokemon = [];
    let allPokemonBox = document.getElementById("all-pokemon-box");
    let searchModeBox = document.getElementById("search-mode-box");
    let searchInput = document.getElementById("search-input");
    let searchInfoText = document.getElementById("search-info-text");
    let buttonNextPokemon = document.getElementById("button-next-pokemon");
    let infoButton = document.getElementById("info-button");
    allPokemonBox.innerHTML = "";
    searchInput.value = "";
    searchModeBox.classList.add("d-none");
    searchInfoText.classList.add("opacity-no-visable");
    infoButton.classList.add("d-none");
    buttonNextPokemon.classList.remove("d-none");
    loadAndRenderPokemon();
}

function clearInputValue() {
    searchInput = document.getElementById("search-input");
    searchInput.value = "";
}

function playBackgroundMusicAndVideo() {
    let musicId = document.getElementById("background-music");
    musicId.play();
    musicId.volume = 0.6;
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

function criesPokemon(id) {
    let pokemonAudioId = document.getElementById("audio" + id);
    pokemonAudioId.play();
}

function playDescriptionPokemonAudio(id) {
    let descriptionPokemonAudio = document.getElementById("description-pokemon-audio" + id);
    descriptionPokemonAudio.play();
}

function closeBigPokemonCardOverlay() {
    let bigPokemonCardOverlay = document.getElementById("big-pokemon-card-overlay");
    bigPokemonCardOverlay.classList.add("d-none");
}

function playAnimation() {
    let scanBox = document.getElementById("scan-box");
    let scanSound = document.getElementById("scan-sound");
    let musicId = document.getElementById("background-music");
    let scanButton = document.getElementById("scan-button");
    scanButton.setAttribute("disabled", "true");
    musicId.volume = 0.1;
    scanSound.play();
    scanBox.classList.add('animate');
}

function playDescriptionWhenScanEnded(id) {
    let scanBox = document.getElementById("scan-box");
    scanBox.classList.remove('animate');
    playDescriptionPokemonAudio(id);
}

function makeBackgroundMusicLouder() {
    let musicId = document.getElementById("background-music");
    musicId.volume = 0.6;
}

function stopAllAudio(id) {
    let descriptionPokemonAudio = document.getElementById("description-pokemon-audio" + id);
    let scanSound = document.getElementById("scan-sound");
    if (descriptionPokemonAudio != null) {
        descriptionPokemonAudio.pause();
        scanSound.pause();
        makeBackgroundMusicLouder();
    }
}

function descriptionPokemonAudioended() {
    let scanBox = document.getElementById("scan-box");
    let scanButton = document.getElementById("scan-button");
    let musicId = document.getElementById("background-music");
    scanBox.classList.remove('animate');
    musicId.volume = 0.6;
    scanButton.removeAttribute("disabled", "false");
}

function bodyOverflowHidden() {
    let body = document.getElementById("body");
    body.classList.add("overflow-hidden");
}

function bodyOverflowView() {
    let body = document.getElementById("body");
    body.classList.remove("overflow-hidden");
}

function buttonNextPokemonHidden() {
    buttonNextPokemon = document.getElementById("button-next-pokemon");
    if (allPokemon.length === 1025) {
        buttonNextPokemon.classList.add("d-none");
    }
}

function focusOnButtonMainInformations() {
    let interval = setInterval(() => {
        let buttonMainInformations = document.getElementById("button-main-informations");
        if (buttonMainInformations) {
            buttonMainInformations.focus();
            clearInterval(interval);
        }
    }, 100);
}