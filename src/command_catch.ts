import { State } from "./state.js";

const CATCH_THRESHOLD = 50;

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log("Usage: catch <pokemon>");
        return;
    }

    const pokemonName = args[0];
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    const roll = Math.random() * pokemon.base_experience;
    if (roll > CATCH_THRESHOLD) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
}
