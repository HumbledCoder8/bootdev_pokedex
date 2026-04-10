import type { State } from "./state.js";

export async function commandMap(state:State){
    const response = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);

    for (const result of response.results){
        console.log(`area name" ${result.name}`);
    }

    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;



}