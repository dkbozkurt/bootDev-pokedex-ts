import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands: Record<string, CLICommand> = {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Display a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Display the next 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Display the previous 20 location areas",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Explore a location area and list Pokemon",
            callback: commandExplore,
        }
    };
    return {
        readline: rl,
        commands: commands,
        pokeapi: new PokeAPI(5 * 60 * 1000),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}
