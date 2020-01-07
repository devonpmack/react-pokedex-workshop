import React from "react";
import { Pokedex } from "./Pokedex";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Card">
          <Pokedex />
        </div>
      </header>
    </div>
  );
}
