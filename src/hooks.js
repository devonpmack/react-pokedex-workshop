import React, { useState } from "react";

export function usePokemonAPI() {
  const [pokemon, setPokemon] = useState(null);

  async function getPokemonInfo(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) {
      alert("Pokemon does not exist");
      return;
    }
    const data = await response.json();
    setPokemon(data);
  }

  return [pokemon, getPokemonInfo];
}
