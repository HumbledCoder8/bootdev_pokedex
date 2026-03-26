import type { State } from "./state.js";

export function commandHelp(state:State){


    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command of Object.values(state.commands)) {
    // command is a CLICommand object
    // you have access to command.name and command.description
    console.log(`${command.name}: ${command.description}`);
    }

}
