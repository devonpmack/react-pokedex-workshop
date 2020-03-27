import React, { useRef } from "react";
import { PokemonType } from "./PokemonType.js";
import { usePokemonAPI } from "./hook.js";

export function Pokedex() {
  const [selectedPokemon, getPokemonInfo] = usePokemonAPI();
  const searchBox = useRef(null);

  return (
    <div>
      {selectedPokemon && selectedPokemon.species && (
        <div>
          <h4>{selectedPokemon.name}</h4>
          <PokemonType type={selectedPokemon.types[0].type.name} />

          {selectedPokemon.types.length > 1 && (
            <PokemonType type={selectedPokemon.types[1].type.name} />
          )}
          <img src={selectedPokemon.sprites.front_default} alt="sprite" />
        </div>
      )}
      <input ref={searchBox} />
      <button
        onClick={async () => {
          getPokemonInfo(searchBox.current.value);
        }}
      >
        Search
      </button>

      <button onClick={async () => getPokemonInfo("Squirtle")}>Squirtle</button>
      <button onClick={async () => getPokemonInfo("Charmander")}>
        Charmander
      </button>
      <button onClick={async () => getPokemonInfo("Bulbasaur")}>
        Bulbasaur
      </button>
    </div>
  );
}
