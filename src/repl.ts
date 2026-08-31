import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.split(' ').map((item) => item.trim().toLowerCase()).filter((item) => item !== '');
}

export function logWelcomeMessage(state: State) {
    console.log(`Welcome to the Pokedex!
Usage:\n\n`);

    for (const command of Object.values(state.commands)) {
        console.log(`  ${command.name}: ${command.description}`);
    }
}

export function startREPL(state: State) {
    logWelcomeMessage(state);
    state.readline.prompt();

    state.readline.on("line", (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandName = words[0];
        const command = state.commands[commandName];

        if (command) {
            command.callback(state);
        } else {
            console.log(`Unknown command: ${commandName}`);
        }

        state.readline.prompt();
    });
}