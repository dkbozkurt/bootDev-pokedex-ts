import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    const caught = Object.entries(state.pokedex);
    if (caught.length === 0) {
        console.log("Your Pokedex is empty. Catch some Pokemon first!");
        return;
    }

    console.log("Your Pokedex:");
    for (const [name, pokemon] of caught) {
        console.log(` - ${name}`);
    }
}
