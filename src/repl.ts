import * as readline from "node:readline";

const inputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
    return input.split(' ').map((item) => item.trim().toLowerCase()).filter((item) => item !== '');
}

export function startREPL() {
    inputInterface.prompt();

    inputInterface.on("line", (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            inputInterface.prompt();
            return;
        }

        // TODO: dispatch on words[0] as the command name
        console.log(`Your command was: ${words[0]}`);

        inputInterface.prompt();
    });
}