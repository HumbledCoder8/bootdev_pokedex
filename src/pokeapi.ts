export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    //add try catch to handle network errors
    
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    try{
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const data: ShallowLocations = await resp.json();
   
        return data;
    }

    catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
    
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
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
    name: string,
};