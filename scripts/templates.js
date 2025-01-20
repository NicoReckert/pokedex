function templateSmallPokemonCard(pokemonId, pokemonType, pokemonCries, pokemonName, pokemonImgSrc, pokemonTypeCount, pokemonTypeArray, arrayIndex, mode) {
    let createNumberOfIcons = pokemonTypeCount === 1 ?
        `<img class="icon ${pokemonTypeArray[0]}" src="assets/icons/${pokemonTypeArray[0]}.svg" alt="">` :
        `<img class="icon ${pokemonTypeArray[0]}" src="assets/icons/${pokemonTypeArray[0]}.svg" alt="">
        <img class="icon ${pokemonTypeArray[1]}" src="assets/icons/${pokemonTypeArray[1]}.svg" alt="">`
    return `<div class="pokemon-card pokemon-card-background-type-${pokemonType}" id="${pokemonId}" data-array-index="${arrayIndex}", data-mode="${mode}" onclick="criesPokemon(${pokemonId}); renderBigPokemonCard(event); renderMainInformations(${arrayIndex}); bodyOverflowHidden()">
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
                    <div class="pokemon-img-box pokemon-type-${pokemonType}">
                        <img class="pokemon-img" src="${pokemonImgSrc}" alt="" loading="lazy"> 
                    </div>
                </div>
                <div class="pokemon-type-box">
                    ${createNumberOfIcons}
                </div>
                <audio id="audio${pokemonId}" preload="none">
                    <source src="${pokemonCries}" type="audio/ogg">        
                </audio>
            </div>`;
}

function templateBigPokemonCard(pokemonId, pokemonType, pokemonName, pokemonImgSrc, pokemonTypeCount, pokemonTypeArray, arrayIndex, mode) {
    let createNumberOfIcons = pokemonTypeCount === 1 ?
        `<img class="icon-big ${pokemonTypeArray[0]}" src="assets/icons/${pokemonTypeArray[0]}.svg" alt="">` :
        `<img class="icon-big ${pokemonTypeArray[0]}" src="assets/icons/${pokemonTypeArray[0]}.svg" alt="">
        <img class="icon-big ${pokemonTypeArray[1]}" src="assets/icons/${pokemonTypeArray[1]}.svg" alt="">`;
    let fillScanHtml;
    let filldescriptionAudioHtml;
    if (pokemonId <= 25) {
        fillScanHtml = `<button class="scan-button-big-pokemon-card menu-type-${pokemonType}" id="scan-button" onclick="playAnimation()"><img class="img-scan-button" src="assets/icons/scan.png" alt=""></button>`;
        filldescriptionAudioHtml = `<audio id="description-pokemon-audio${pokemonId}" onended="descriptionPokemonAudioended()" preload="none">
                                    <source src="assets/audio/${pokemonId}.mp3" type="audio/mpeg">        
                                </audio>`;
    } else {
        fillScanHtml = `<button class="scan-button-big-pokemon-card-disabled menu-type-${pokemonType}" id="scan-button" disabled></button>`;
        filldescriptionAudioHtml = "";
    }
    return `<div class="big-pokemon-card" id="${pokemonId}" data-array-index="${arrayIndex}" data-mode="${mode}">
                <div class="big-pokemon-name-box pokemon-card-background-type-${pokemonType}">
                    <span class="big-pokemon-name">#${pokemonId} ${pokemonName}</span>
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
                    <div class="scan-box" id="scan-box">
                        <div class="big-pokemon-img-box pokemon-type-${pokemonType}">
                            <img class="big-pokemon-img" src="${pokemonImgSrc}" alt=""> 
                        </div>
                    </div>  
                </div>
                ${fillScanHtml} 
                <div class="button-box-big-pokemon-card">
                    <button class="button-big-pokemon-card menu-type-${pokemonType}" id="button-main-informations" onclick="renderMainInformations(${arrayIndex})">main</button>
                    <button class="button-big-pokemon-card menu-type-${pokemonType}" onclick="renderStatsInformations(${arrayIndex})">stats</button>
                    <button class="button-big-pokemon-card menu-type-${pokemonType}" onclick="extractPokemonEvolutionChain(${pokemonId})">evo chain</button>
                </div>
                <div class="information-view-big-pokemon-card menu-type-${pokemonType}" id="information-view-big-pokemon-card">   
                </div> 
                <div class="big-pokemon-type-box pokemon-card-background-type-${pokemonType}">
                    ${createNumberOfIcons}
                </div>
                <div class="all-buttons-box pokemon-card-background-type-${pokemonType}">
                    <button class="next-pokemon-button" id="minus" data-array-index="${arrayIndex}" data-pokemon-id="${pokemonId}" data-mode="${mode}" onclick="loadOnePokemonForBigPokemonCard(event); makeBackgroundMusicLouder()"><</button>
                    <button class="next-pokemon-button" id="plus" data-array-index="${arrayIndex}" data-pokemon-id="${pokemonId}" data-mode="${mode}" onclick="loadOnePokemonForBigPokemonCard(event); makeBackgroundMusicLouder()">></button>
                    <button class="next-pokemon-button" onclick="bodyOverflowView(); closeBigPokemonCardOverlay(); stopAllAudio(${pokemonId})">X</button>
                </div>
                <audio id="scan-sound" preload="none" onended="playDescriptionWhenScanEnded(${pokemonId})">
                    <source src="assets/sounds/scan.mp3" type="audio/mpeg">        
                </audio>
                ${filldescriptionAudioHtml}
            </div>`;
}

function templateViewMain(height, weight, baseExperience, abilities) {
    let abilitiesHtml;
    switch (abilities.length) {
        case 1: abilitiesHtml = `<span>1. ${abilities[0]}</span>`;
            break;
        case 2: abilitiesHtml = `<span>1. ${abilities[0]}</span>
                                 <span>2. ${abilities[1]}</span>`;
            break;
        case 3: abilitiesHtml = `<span>1. ${abilities[0]}</span>
                                 <span>2. ${abilities[1]}</span>
                                 <span>3. ${abilities[2]}</span>`;
            break;
    }
    return `<div class="text-information-box-big-pokemon-card">
                <span>Height:</span>
                <span>Weight:</span>
                <span>Base Experience:</span>
                <span>Abilities:</span>
            </div>
            <div class="text-information-box-big-pokemon-card2">
                <span>${height} m</span>
                <span>${weight} Kg</span>
                <span>${baseExperience}</span>
                <div class="abilities-box">
                    ${abilitiesHtml}
                </div>
            </div>`;
}

function templateViewStats(hp, attack, defense, specialAttack, specialDefense, speed) {
    let maxBaseHp = 255;
    let maxBaseAttack = 190;
    let maxBaseDefense = 230;
    let maxBaseSpecialAttack = 194;
    let maxBaseSpecialDefense = 230;
    let maxBaseSpeed = 180;
    let hpStatsBarValue = ((hp / maxBaseHp) * 100).toFixed(2);
    let attackStatsBarValue = ((attack / maxBaseAttack) * 100).toFixed(2);
    let defenseStatsBarValue = ((defense / maxBaseDefense) * 100).toFixed(2);
    let specialAttackStatsBarValue = ((specialAttack / maxBaseSpecialAttack) * 100).toFixed(2);
    let specialDefenseStatsBarValue = ((specialDefense / maxBaseSpecialDefense) * 100).toFixed(2);
    let speedStatsBarValue = ((speed / maxBaseSpeed) * 100).toFixed(2);
    return `<div class="text-information-box-big-pokemon-card">
                <span>HP:</span>
                <span>Attack:</span>
                <span>Defense:</span>
                <span>Special-Attack:</span>
                <span>Special-Defense:</span>
                <span>Speed:</span>
            </div>
            <div class="text-information-box-big-pokemon-card2">
                <div class="stats-box">
                    <div class="stats-value-box">   
                        <span class="stats-value">${hp}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${hpStatsBarValue}%"></div>
                    </div>
                </div>
                <div class="stats-box">
                    <div class="stats-value-box">
                        <span class="stats-value">${attack}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${attackStatsBarValue}%"></div>
                    </div>
                </div>
                <div class="stats-box">
                    <div class="stats-value-box">
                        <span class="stats-value">${defense}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${defenseStatsBarValue}%"></div>
                    </div>
                </div>
                <div class="stats-box">
                    <div class="stats-value-box">
                        <span class="stats-value">${specialAttack}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${specialAttackStatsBarValue}%"></div>
                    </div>
                </div>
                <div class="stats-box">
                    <div class="stats-value-box">
                        <span class="stats-value">${specialDefense}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${specialDefenseStatsBarValue}%"></div>
                    </div>
                </div>
                <div class="stats-box">
                    <div class="stats-value-box">
                        <span class="stats-value">${speed}</span>
                    </div>
                    <div class="stats-bar">
                        <div class="stats-fill" style="width: ${speedStatsBarValue}%"></div>
                    </div>
                </div>
            </div>`;
}

function templateViewEvoChain(urlArray, pokemonId, allPokemonName) {
    let allEvoChainImgHtml;
    let evoChainBoxClassHtml;
    const eeveeIds = [133, 134, 135, 136, 196, 197, 470, 471, 700];
    allEvoChainImgHtml = eeveeIds.includes(pokemonId)
        ? urlArray.map((url, index) => `<div class="pokemon-evo-chain-img-name-box-eevee">
                                            <img class="pokemon-evo-chain-img-eevee" src="${url}" alt="" loading="lazy">
                                            <span class="pokemon-evo-chain-name-eevee">${allPokemonName[index]}</span>
                                        </div>
                                        ${index < urlArray.length - 1 ? '<div class="evo-chain-or"></div>' : ''}
                                        `).join('')
        : allPokemonName.length > 3 
        ?  urlArray.map((url, index) => `<div class="pokemon-evo-chain-img-name-box-more-as-three">
                                            <img class="pokemon-evo-chain-img-more-as-three" src="${url}" alt="" loading="lazy">
                                            <span class="pokemon-evo-chain-name-more-as-three">${allPokemonName[index]}</span>
                                        </div>
                                        ${index < urlArray.length - 1 ? '<div class="evo-chain-arrow"></div>' : ''}
                                        `).join('')
        : urlArray.map((url, index) => `<div class="pokemon-evo-chain-img-name-box">
                                            <img class="pokemon-evo-chain-img" src="${url}" alt="" loading="lazy">
                                            <span class="pokemon-evo-chain-name">${allPokemonName[index]}</span>
                                        </div>
                                        ${index < urlArray.length - 1 ? '<div class="evo-chain-arrow"></div>' : ''}
                                        `).join('');
    evoChainBoxClassHtml = eeveeIds.includes(pokemonId) ? `class="evo-chain-box-eevee"` : allPokemonName.length > 3 ? `class="evo-chain-box-more-as-three"` : `class="evo-chain-box"`;
    return `<div ${evoChainBoxClassHtml}>
                ${allEvoChainImgHtml}
            </div>`;
}