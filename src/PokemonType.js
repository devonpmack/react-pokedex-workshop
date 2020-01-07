import React from "react";

export function PokemonType(props) {
  return <div className={`type ${props.type}`}>{props.type}</div>;
}
