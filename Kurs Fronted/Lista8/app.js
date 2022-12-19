

const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    data = await response.json();
    document.getElementById("pokemons").innerHTML = data.results.map(
        (pokemon) => `
            <li class="pokedex-aside-list-element">${pokemon.name}</li>
        `
    ).join('');
    console.log(data);
}

getData().then(() => {
    const listElements = document.getElementsByClassName("pokedex-aside-list-element")
    for (let elem of listElements) {
        let pokemonName = elem.innerHTML;
        elem.addEventListener('click', async (e) => {
            let isMyPokemon = (pokemon) => {
                return pokemon.name === pokemonName;
            }
            let pokemonUrl = data.results.find(isMyPokemon).url;

            const pokemonFetch = await fetch(pokemonUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const pokemonInfo = await pokemonFetch.json();

            //fetchuje gatunki, zeby wyciagnac opis
            const speciesUrl = pokemonInfo.species.url;
            const speciesFetch = await (await fetch(speciesUrl)).json();

            const pokemonImg = pokemonInfo.sprites.back_default;
            const pokemonTypes = [];
            const pokemonDesc = speciesFetch.flavor_text_entries[0].flavor_text;
            for (let pokemonType of pokemonInfo.types) {
                pokemonTypes.push(pokemonType.type.name);
            }
            document.getElementById("pokemonName").innerHTML = `${pokemonName}`;
            document.getElementById("pokemonImg").src = pokemonImg;
            document.getElementById("pokemonSpecies").innerHTML = pokemonTypes.map(
                (specie) => `
                    <p class="pokedex-content-pokemonInfo-pokemonSpiece">${specie}</p>
                `
            ).join('');
            document.getElementById("pokemonDesc").innerHTML = `${pokemonDesc}`;
        });
    }
});



