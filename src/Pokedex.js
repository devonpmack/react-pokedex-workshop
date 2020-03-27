import React, { useRef } from "react";
import { PokemonType } from "./PokemonType";
import { usePokemonAPI } from "./hooks";

export function Pokedex() {
  const [selectedPokemon, getPokemonInfo] = usePokemonAPI();

  const searchBox = useRef(null);

  return (
    <div>
      {selectedPokemon && (
        <div>
          {selectedPokemon.name}
          <PokemonType type={selectedPokemon.types[0].type.name} />
          {selectedPokemon.types.length > 1 && (
            <PokemonType type={selectedPokemon.types[1].type.name} />
          )}

          <img src={selectedPokemon.sprites.front_default} alt="sprite" />
        </div>
      )}
      <p>Select Pokemon:</p>
      <button onClick={() => getPokemonInfo("Squirtle")}>Squirtle</button>
      <button onClick={() => getPokemonInfo("Bulbasaur")}>Bulbasaur</button>
      <button onClick={() => getPokemonInfo("Charmander")}>Charmander</button>
      <input ref={searchBox} />
      <button onClick={() => getPokemonInfo(searchBox.current.value)}>
        Search
      </button>
    </div>
  );
}
