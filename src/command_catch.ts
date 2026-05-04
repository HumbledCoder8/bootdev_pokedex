import type {State} from "./state.js";

export async function commandCatch(state:State, ...args:string[]){

    const pokemon = args[0];
    const response = await state.pokeapi.fetchPokemon(pokemon);

    let chance = 50 / response.base_experience;
    let caught = false;

    if (Math.random() < chance) {
        caught = true;
}

    console.log(`Throwing a Pokeball at ${pokemon}...`);
    console.log(chance);


    if(caught === true){
        console.log(`${pokemon} was caught!`);
        state.pokedex[pokemon] = response;
    }

    else{
        console.log(`${pokemon} escaped!`);
    }



}