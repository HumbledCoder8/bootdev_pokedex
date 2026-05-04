import { createInterface, type Interface} from "readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { FetchPokemon, PokeAPI } from "./pokeapi.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";


export type State = {
    rl: Interface,
    commands: Record<string,CLICommand>,
    pokeapi: PokeAPI,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
    pokedex: Record<string, FetchPokemon>

}



export type CLICommand = {
  name: string,
  description: string,
  callback: (state: State, ...args: string[]) => Promise<void>,
};

export function initState(cacheInterval:number):State{  
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeapi = new PokeAPI(cacheInterval);

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
        },

        mapb: {
            name: "mapb",
            description: "previous map locations",
            callback: commandMapb,
        },

        explore: {
            name: "explore",
            description: "list pokemon in location",
            callback: commandExplore,
        },

        catch: {
            name: "catch",
            description: "attempt to catch a pokemon",
            callback:commandCatch,
        },

        inspect: {
            name: "inspect",
            description: "inspect a pokemon",
            callback:commandInspect,
        }

    }
    return {rl,commands,pokeapi,nextLocationsURL:null,prevLocationsURL:null,pokedex:{}};

}