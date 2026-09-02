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

    let commandQueue: Promise<void> = Promise.resolve();

    state.readline.on("line", (line: string) => {
        commandQueue = commandQueue.then(async () => {
            const words = cleanInput(line);
            if (words.length === 0) {
                state.readline.prompt();
                return;
            }

            const commandName = words[0];
            const command = state.commands[commandName];

            if (command) {
                try {
                    const args = words.slice(1);
                    await command.callback(state, ...args);
                } catch (err) {
                    console.log(`Error: ${err instanceof Error ? err.message : String(err)}`);
                }
            } else {
                console.log(`Unknown command: ${commandName}`);
            }

            state.readline.prompt();
        });
    });
}
