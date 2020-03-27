import { useState } from "react";

export function usePokemonAPI() {
  let [selectedPokemon, setSelectedPokemon] = useState(null);

  async function getPokemonInfo(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(URL);
    if (!response.ok) {
      alert("Pokemon does not exist");
      return;
    }
    const data = await response.json();
    setSelectedPokemon(data);
  }

  return [selectedPokemon, getPokemonInfo];
}
