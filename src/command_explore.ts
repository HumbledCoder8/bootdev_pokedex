    import type {State} from "./state.js"

    export async function commandExplore(state:State, ...args:string[]){

        const location = args[0];
        const response = await state.pokeapi.fetchLocation(location);

        console.log(`Exploring ${location}...`);
        console.log("Found Pokemon:");
        for(const poke of response.pokemon_encounters){
            console.log(`- ${poke["pokemon"].name}`);
        }
    }