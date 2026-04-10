import { createInterface, type Interface} from "readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface,
    commands: Record<string,CLICommand>,
    pokeapi: PokeAPI,
    nextLocationsURL: string | null
    prevLocationsURL: string | null,
}



export type CLICommand = {
  name: string,
  description: string,
  callback: (state: State) => Promise<void>,
};

export function initState():State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeapi = new PokeAPI();

    const commands = {

        help:{
                name: "help",
                description: "Displays a help message",
                callback: commandHelp,
            },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },

        map: {
            name: "map",
            description: "maps locations",
            callback: commandMap,
        }

    }
    return {rl,commands,pokeapi,nextLocationsURL:null,prevLocationsURL:null};

}