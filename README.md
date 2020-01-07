## Getting started

Get started by forking the Code Sandbox starter code:

[![Edit react-pokedex-workshop](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-pokedex-workshop-tvr6s?fontsize=14&hidenavigation=1&theme=dark)

The page will reload if you make edits.

## React Basics

Welcome to my React workshop. If you know HTML or Javascript, React will be easy for you.

I've provided some starting code for you in `src/Pokedex.js`. Open it in your favourite text editor. You should see

```tsx
import React from 'react';

export function Pokedex() {
  return (
    <p>
        Edit <code>src/Pokedex.js</code> and save to reload.
    </p>
  );
}
```

This is what React code looks like. It's a combination of Javascript and HTML. The function `Pokedex` is called a "Component".

It represents the content in the center of our site. In here we can edit the content of our website.

Let's remove the message we have right now.

```diff
  return (
    <p>
-        Edit <code>src/Pokedex.js</code> and save to reload.
    </p>
  );
```

We want our Pokedex to display information about a Pokemon. Let's start with Squirtle. Add in his name and type.

```diff
  return (
    <p>
+        Squirtle: water
    </p>
  );
```

If you save the code and go back to your browser, you should see that the text will now say "Squirtle: water".

Lets make the type look like an actual Pokemon type. I included a component called `PokemonType` which we can use for this.

```diff
    <p>
-        Squirtle: water
+        Squirtle <PokemonType type={"water"}/>
    </p>
```

Now if you save that, you should see an actual pokemon type. `PokemonType` is another React component. React components can take "properties", and `PokemonType` takes the property `type` which specifies what type it should display. You can try switching the value of `type` to "dragon" or "grass".

## Switching Pokemon

Ok, so we can show one pokemon, but since it's a Pokedex we want to be able to show details about more than one. Lets add functionality to view the type of different pokemon.

First we need a database of pokemon. We'll start by setting up the types for three pokemon: Squirtle, Charmander, and Bulbasaur.

We define this data in an `Object`:

```diff
export function Pokedex() {
+  const pokemon = {
+      Squirtle: {type: "water"},
+      Bulbasaur: {type: "grass"},
+      Charmander: {type: "fire"}
+  }

return (
```

Now we can access the type of Squirtle with the code

```js
pokemon["Squirtle"].type; // => water
```

Instead of hardcoding the type of Squirtle to water, change the prop `type` of `PokemonType` to get the type from our new database.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
      <p>
-        Squirtle <PokemonType type={"water"}/>
+        Squirtle <PokemonType type={pokemon["Squirtle"].type} />
    </p>
  ```
  
</details>

After implementing this code, nothing should change and it should still show Squirtle along with water type.

Put `"Squirtle"` into a variable called `selectedPokemon` to make it so we can change the value. You can replace the text `Squirtle` inside the `<p>` with `{selectedPokemon}` to display the pokemon name to the screen.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
  const pokemon = {
      Squirtle: {type: "water"},
      Bulbasaur: {type: "grass"},
      Charmander: {type: "fire"}
  }
+  const selectedPokemon = "Squirtle"

return (

<p>

-        Squirtle <PokemonType type={pokemon["Squirtle"].type}/>

+        {selectedPokemon} <PokemonType type={pokemon[selectedPokemon].type}/>

    </p>
  );
  ```

</details>

Once you've done this step, try changing the value of `selectedPokemon` to `"Bulbasaur"` to test if it works. The type should automatically update to display grass instead of water!

Now that we can easily change pokemon by editing the code, lets allow the user to change it as well. To do this we will add buttons for each pokemon in our database.

## Updating the "state" of the page

In React, when you want to use persistent variables that will change, you need to use a feature called "state". State gets updated as the user interacts with your page. We need a state to track what pokemon the user is currently viewing.

Lets convert the variable `selectedPokemon` to a state. We will import a React function called `useState`.

```diff
- import React from "react";
+ import React, { useState } from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex() {
  const pokemon = {
    Squirtle: { type: "water" },
    Bulbasaur: { type: "grass" },
    Charmander: { type: "fire" }
  };
-  const selectedPokemon = "Bulbasaur"
+  const [selectedPokemon, setSelectedPokemon] = useState("Bulbasaur");
```

Once you've done this, the page should still look exactly the same, since we set the state to start with the value `"Bulbasaur"`.

Now lets add a `<button>` to update the state. We need to modify the `return` value to include a button, while we're at it, we should also put everything into a `<div>` which is just a container to keep everything together. 

Change the return to
```jsx
return (
  <div>
      <p>
        {selectedPokemon}

        <PokemonType type={pokemon[selectedPokemon].type} />
      </p>

      <p>Select pokemon:</p>
      <button>Squirtle</button>
      <button>Charmander</button>
      <button>Bulbasaur</button>
    </div>
);
```

You should see the page update to include our three buttons for selecting pokemon. However, the buttons won't do anything yet since we haven't programmed them to update the state.

Let's start with the button for Squirtle; we will add some `onClick` code which will run when the user clicks the button.

```diff
- <button>Squirtle</button>
+ <button onClick={() => setSelectedPokemon("Squirtle)}>Squirtle</button>
```

If you don't understand this, that's okay, its just the javascript syntax for a short form function. In our function we said to set the selected pokemon to Squirtle on click. You can test this right away, when you click the button the pokemon should update to Squirtle!

Try programming the other two buttons yourself.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
- <button>Charmander</button>
- <button>Bulbasaur</button>
+ <button onClick={() => setSelectedPokemon("Charmander")}>Charmander</button>
+ <button onClick={() => setSelectedPokemon("Bulbasaur")}>Bulbasaur</button>
  ```

</details>

Now we have a really basic Pokedex! We can click on different Pokemon to see their type. 

## Using the PokeAPI

What if we don't want to manually input the type of every Pokemon? To do this, we can use a publically available API (Application Programming Interface) called [PokeAPI](https://pokeapi.co/). We can ask this API for information about any pokemon programmatically! This will save us a lot of time so we don't have to input the type of every single Pokemon. In addition, the PokeAPI gets updated constantly when they add or change pokemon, so we don't have to worry about maintaining our data.



## Getting the image

## Adding a search box

Workshop by Devon Mack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
