function templateSmallPokemonCard(pokemonId, pokemonType, allPokemon, pokemonName, pokemonImgSrc) {
    return `<div class="pokemon-card pokemon-card-background-type-${pokemonType}" id="${pokemonId}" onclick="renderBigPokemonCard(event)">
                <div class="pokemon-name-box">
                    <span class="pokemon-name">#${pokemonId} ${pokemonName}</span>
                </div>
                <div class="moving-picture-border">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div class="pokemon-img-box pokemon-type-${pokemonType}" onclick="criesPokemon(${pokemonId})">
                        <img class="pokemon-img" src="${pokemonImgSrc}" alt="" loading="lazy"> 
                    </div>
                </div>
                <div class="pokemon-type-box">
                    <span class="pokemon-name">${pokemonType}</span>
                </div>
                <audio id="audio${pokemonId}" preload="none">
                    <source src="${allPokemon.cries.latest}" type="audio/ogg">        
                </audio>
            </div>`
}

function templateBigPokemonCard(pokemonId, pokemonType, allPokemon, pokemonName) {
    return `<div class="big-pokemon-card pokemon-card-background-type-${pokemonType}" id="${pokemonId}">
                <div class="big-pokemon-name-box">
                    <span class="big-pokemon-name">#${pokemonId} ${pokemonName}</span>
                </div>
                <div class="big-pokemon-img-box pokemon-type-${pokemonType}" onclick="criesPokemon(${pokemonId})">
                    <img class="big-pokemon-img" src="${allPokemon.sprites.other.dream_world.front_default}" alt=""> 
                </div>
                <div class="big-pokemon-type-box">
                    <span class="big-pokemon-name">${pokemonType}</span>
                </div>
            </div>`
}