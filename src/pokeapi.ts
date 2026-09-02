import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        return this.fetchWithCache<ShallowLocations>(url);
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        return this.fetchWithCache<Location>(url);
    }

    private async fetchWithCache<T>(url: string): Promise<T> {
        const cached = this.cache.get<T>(url);
        if (cached) {
            console.log(`(cache hit) ${url}`);
            return cached;
        }

        console.log(`(cache miss, fetching) ${url}`);
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as T;
        this.cache.add(url, data);
        return data;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    location: {
        name: string;
        url: string;
    };
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            version: {
                name: string;
                url: string;
            };
            max_chance: number;
            encounter_details: {
                min_level: number;
                max_level: number;
                condition_values: {
                    name: string;
                    url: string;
                }[];
                chance: number;
                method: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    }[];
};
