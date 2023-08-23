import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PokeResponse } from "./poke-response.interface";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=650",
      );
      const data: PokeResponse = await response.json();

      await this.pokemonModel.deleteMany();

      const manyPokemon = [];
      data.results.forEach(async ({ name, url }) => {
        const segments = url.split("/");
        const no = +segments[segments.length - 2];
        manyPokemon.push({ name, no });
      });

      await this.pokemonModel.insertMany(manyPokemon);
    } catch (error) {
      console.log(
        "🚀 ~ file: seed.service.ts:33 ~ SeedService ~ executeSeed ~ error:",
        error,
      );
      // this.handleExceptions(error);
    }

    return "Seed Executed";
  }
}
