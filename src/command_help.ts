import type { State } from "./state.js";

export function commandHelp(state: State) {
    console.log("This is the help section!");
    console.log("Usage:\n");

    for (const command of Object.values(state.commands)) {
        console.log(`  ${command.name}: ${command.description}`);
    }

    console.log("");
}
