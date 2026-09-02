export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId : NodeJS.Timeout | undefined = undefined;
    #interval: number; // in milliseconds

    constructor(initInterval: number) {
        this.#interval = initInterval;
        this.#startReaping();
    }

    add<T>(key:string, val:T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key:string): T | undefined {
        const entry = this.#cache.get(key);
        return entry ? entry.val : undefined;
    }

    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    #reap(): void {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReaping(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
        }
        if (this.#interval) {
            this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
        }
    }
}