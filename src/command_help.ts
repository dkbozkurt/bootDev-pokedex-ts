import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("This is the help section!");
    console.log("Usage:\n");

    for (const command of Object.values(state.commands)) {
        console.log(`  ${command.name}: ${command.description}`);
    }

    console.log("");
}