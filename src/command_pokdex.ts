import type {State} from "./state.js";

export async function commandPokedex(state:State){

    console.log("Your Pokedex: ");


    console.log(`Total caught: ${Object.keys(state.pokedex).length} `);
    for(const pokemon of Object.values(state.pokedex)){
        console.log(`- ${pokemon.name}`);

    }
    
}