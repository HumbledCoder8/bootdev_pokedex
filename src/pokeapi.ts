import { PassThrough } from "stream";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(interval:number) {
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    //add try catch to handle network errors

    
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cachedData = this.cache.get<ShallowLocations>(url)
    if (cachedData != undefined){
      return cachedData;
    }


    try{
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const data: ShallowLocations = await resp.json();

        this.cache.add(url,data);
   
        return data;
    }

    catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
    
  }


  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cachedData = this.cache.get<Location>(url);
    if (cachedData != undefined){
      return cachedData;
    }

    try{
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const data: Location = await resp.json();

        this.cache.add(url,data);
   
        return data;
    }
    catch (e) {
        throw new Error(`Error fetching Pokemon in location: ${(e as Error).message}`);
    }

  }

  async fetchPokemon(pokemonName:string): Promise<FetchPokemon>{

    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cachedData = this.cache.get<FetchPokemon>(url);

    if (cachedData != undefined){
      return cachedData;
    }

    try{
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const data: FetchPokemon = await resp.json();

        this.cache.add(url,data);
   
        return data;
    }
    catch (e) {
        throw new Error(`Invalid pokemon name.`);
    }

  }
}



export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string,
  }[]
};

export type Location = {
    pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type FetchPokemon = {

  base_experience: number;
}