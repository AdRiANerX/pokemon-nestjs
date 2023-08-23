export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}
