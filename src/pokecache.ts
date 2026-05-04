//for caching logic


export type CacheEntry<T> = {
    createdAt: number;
    val: T;

}

export class Cache {
    #cache = new Map<string,CacheEntry<any>>();
    #reapIntervalId : NodeJS.Timeout | undefined = undefined;
    #interval: number;

    
    constructor(val:number){
        this.#interval = val;
        this.#startReapLoop();
    }

    add<T>(key:string, val:T){
        this.#cache.set(key,{createdAt:Date.now(),val})
    }

    get<T>(key:string): T | undefined {

        const item = this.#cache.get(key);

        if (item === undefined){
            return undefined;
        }
        return item.val;

    }

    #reap(){
        for (const[key,value] of this.#cache){
            if(value.createdAt < (Date.now()-this.#interval)){
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => this.#reap(),this.#interval);   
    }


    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }



    
}

