import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string,CLICommand>){


    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command of Object.values(commands)) {
    // command is a CLICommand object
    // you have access to command.name and command.description
    console.log(`${command.name}: ${command.description}`);
    }

}
