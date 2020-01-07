import React from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex() {
  const pokemon = {
    Squirtle: { type: "water" },
    Bulbasaur: { type: "grass" },
    Charmander: { type: "fire" }
  };
  const selectedPokemon = "Bulbasaur";

  return (
    <p>
      {selectedPokemon}

      <PokemonType type={pokemon[selectedPokemon].type} />
    </p>
  );
}
