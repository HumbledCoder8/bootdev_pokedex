import type { State } from "./state.js";

export async function commandMapb(state:State){

    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
}
    const response = await state.pokeapi.fetchLocations(state.prevLocationsURL ?? undefined);

    for (const result of response.results){
        console.log(result.name);
    }

    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
}