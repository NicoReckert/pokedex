function templatePokemonType(pokemonId, pokemonType, allPokemon, pokemonName) {
    return `<div class="pokemon-card pokemon-card-background-type-${pokemonType}" id="${pokemonId}">
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
                        <img class="pokemon-img" src="${allPokemon.sprites.other.dream_world.front_default}" alt=""> 
                    </div>
                </div>
                <div class="pokemon-type-box">
                    <span class="pokemon-name">${pokemonType}</span>
                </div>
                <audio id="audio${pokemonId}">
                    <source src="${allPokemon.cries.latest}" type="audio/ogg">        
                </audio>
            </div>`
}