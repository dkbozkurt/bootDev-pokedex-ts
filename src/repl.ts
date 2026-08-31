import * as readline from "node:readline";

import { getCommands } from "./command.js";

const inputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
    return input.split(' ').map((item) => item.trim().toLowerCase()).filter((item) => item !== '');
}

export function logWelcomeMessage() {
    console.log(`Welcome to the Pokedex!
Usage:\n\n`);

    for (const command of Object.values(getCommands())) {
        console.log(`  ${command.name}: ${command.description}`);
    }

}

export function startREPL() {
    logWelcomeMessage();
    inputInterface.prompt();

    inputInterface.on("line", (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            inputInterface.prompt();
            return;
        }

        // TODO: dispatch on words[0] as the command name
        // console.log(`Your command was: ${words[0]}`);

        if (words[0] in getCommands()) {
            const command = getCommands()[words[0]];
            command.callback(getCommands());
        } else {
            console.log(`Unknown command: ${words[0]}`);
        }

        inputInterface.prompt();
    });
}