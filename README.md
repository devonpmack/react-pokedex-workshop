## Getting started

Get started by forking the Code Sandbox starter code:

[![Edit react-pokedex-workshop](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-pokedex-workshop-tvr6s?fontsize=14&hidenavigation=1&theme=dark)

The page will reload if you make edits.

## React Basics

Welcome to my React workshop. React is a fantastic framework for Javascript that makes building interfaces more fun and simpler to develo.

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

What if we don't want to manually input the type of every Pokemon? To do this, we can use a publically available API (Application Programming Interface) called [PokeAPI](https://pokeapi.co/). We can ask this API for information about any pokemon programmatically! This will save us a lot of time so we don't have to input the information every single Pokemon. In addition, the PokeAPI gets updated constantly when they add or change pokemon, so we don't have to worry about maintaining our data.

PokeAPI is a "RESTful" api which means we can retrieve information through HTTP get requests. Javascript will make this very easy for us.

On their [website](https://pokeapi.co/) you can see an example with the pokemon "Ditto". As you can see the information for ditto is JSON format at this URL: https://pokeapi.co/api/v2/pokemon/ditto. This info is hard to read without formatting it, I recommend the extension [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) for Chrome or to use Firefox which automatically formats the JSON.

In this JSON we have access to all kinds of information about the pokemon. For example we can get the types, abilities, and even the pokemon sprites (pictures).

Once we start using an API the code gets a bit trickier since we have to fetch information. Let's start by removing our database, since we are going to use PokeAPI as our database from now on. 


```diff
-  const pokemon = {
-    Squirtle: { type: "water" },
-    Bulbasaur: { type: "grass" },
-    Charmander: { type: "fire" }
-  };
```

Next set the initial state of `selectedPokemon` to start as `undefined`. Just like a Pokedex, we will let the user pick which Pokemon they want to view before fetching any information.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
- const [selectedPokemon, setSelectedPokemon] = useState("Squirtle);
+ const [selectedPokemon, setSelectedPokemon] = useState(undefined);
  ```

</details>

To avoid errors when `selectedPokemon` is `undefined` we need to adjust our React code to only display Pokemon information when a Pokemon is selected. 
```diff
return (
  <div>
-      <p>
-        {selectedPokemon}
-
-        <PokemonType type={pokemon[selectedPokemon].type} />
-      </p>
+     {selectedPokemon && (
+        <p>
+          {selectedPokemon}
+
+          <PokemonType type={type={pokemon[selectedPokemon].type} />
+        </p>
+      )}
      ...
  </div>
);
```

To do this we used a bit of weird Javascript / JSX syntax, but what it means it to ignore the `<p>` block if we don't have a value `selectedPokemon`. This is also important so that we don't show an error when data is fetching later.

Now we can start fetching data, lets add a function at the top of our `Pokedex` function that fetches data from the API. We'll call it `getPokemonInfo()` and it takes the parameter `name` which is the name of the pokemon we want 
info on.

```diff
export function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);

+  async function getPokemonInfo(name) {
+      // add code here
+  }
```

We add `async` to the front of the function to let Javascript know that we want to run this function at the same time as the rest of our code. This allows us to keep the app runnning while we wait for data to load.

Goals of this function:
1. Build the URL to fetch data from the PokeAPI using `name`
2. Start fetching data from PokeAPI
2. Wait for the data to be received
3. Update the React state with our Pokemon data

First we need to build the URL. Create a variable `URL` to store the URL that we should fetch data from. This will be a combination of the PokeAPI URL and the parameter `name` (name of the pokemon). 

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
  async function getPokemonInfo(name) {
+    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  }
  ```

  I used Javascript string substitution syntax, but there are multiple ways to do this. For example with the `+` operator.
</details>

Next we will use a built in JavaScript function called `fetch()` to fetch the data from our URL.

```diff
  async function getPokemonInfo(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
+
+    const response = await fetch(URL);
+    const data = await response.json();
  }
```

Using the `await` syntax we can tell javascript to asynchronously wait for the response from the API.

Once we get the data from the API we should update the state of selectedPokemon to store all the new data we got.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
  async function getPokemonInfo(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const response = await fetch(URL);
    const data = await response.json();

+   setSelectedPokemon(data);
  }

  ```
</details>

Now that we have the function to retrieve data from the PokeAPI, update the `onClick` of all our buttons to call this new function which will update the state for us. Make sure you also change the pokemon names to be all lowercase or the API won't work.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
      <p>Select pokemon:</p>
- <button onClick={() => setSelectedPokemon("Squirtle")}>Charmander</button>
- <button onClick={() => setSelectedPokemon("Charmander")}>Charmander</button>
- <button onClick={() => setSelectedPokemon("Bulbasaur")}>Bulbasaur</button>
+      <button onClick={() => getPokemonInfo("squirtle")}>Squirtle</button>
+      <button onClick={() => getPokemonInfo("bulbasaur")}>Bulbasaur</button>
+      <button onClick={() => getPokemonInfo("charmander")}>Charmander</button>

  ```
</details>

By now you're probably eager to test it, but it will give you errors until we fix one more thing! We need to update our display to properly access the pokemon data based on the API format. If you're familiar with JSON, try looking at the JSON response of the API at `https://pokeapi.co/api/v2/pokemon/squirtle` and see if you can figure out how to access the Pokemon type and name. In particular look at the field `types` and the field `species`.

<details>
  <summary>Hint</summary>
  
  The name can be accessed via `species.name`

  Since there can be more than one type, for now we should access the first index of the array. The first type can be accessed via `types[0].type.name`.
</details>

If that doesn't help you,

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
  return (
    <div>
      {selectedPokemon && (
        <p>
-          {selectedPokemon}
+          {selectedPokemon.species.name}

-          <PokemonType type={pokemon[selectedPokemon].type />
+          <PokemonType type={selectedPokemon.types[0].type.name} />
        </p>
      )}

      ...
    </div>
  );
  ```
</details>

Once you've done this, refresh your preview in CodeSandbox and it should work! Try clicking on one of the buttons for a pokemon. After a short delay it should fetch the data and display the pokemon name and type! The best part is that now the Pokedex can be easily extended on, you just finished the hardest part!

## Showing more than one type

You may have noticed that when you click on Bulbasaur it shows his type as Poison. What's going on?

In the newest generation of pokemon, they made Bulbasaur actually have two types! If you go to [his page on the Pokemon website](https://www.pokemon.com/us/pokedex/bulbasaur) we can see that he's Grass and Poison. We are only showing his first type so we should update our code to show the second one as well.

There are two different approaches to this that are both valid.
1. Assume that a pokemon can only ever have 2 types and check for the case to display 2 types.
2. Loop through all the types received from the `PokeAPI` , and render a `<PokemonType>` for each one.

Feel free to try either these approaches yourself, but in this case, it's probably easier just to assume a Pokemon can only have 2 types. (so far there are no 3 type Pokemon).

#### Implementing Approach #1

Copy and paste the `<PokemonType>` component so that we can view two different types at once. For the second `<PokemonType>` change it to access the second array index instead of the first.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
  return (
    <div>
      {selectedPokemon && (
        <p>
          {selectedPokemon.species.name}

          <PokemonType type={selectedPokemon.types[0].type.name} />
+          <PokemonType type={selectedPokemon.types[1].type.name} />
        </p>
      )}

      ...
    </div>
  );
  ```
</details>

This should actually do the trick right away, but you'll notice that if you click on Squirtle the page will crash. This is because we try to render his second type, but Squirtle only has one type!

To fix this we need to add a condition before rendering the second `<PokemonType>`, this will be similar to how we have the `selectedPokemon && ... ` syntax before the `<p>`. What do you think the condition will be?

<details>
  <summary>The condition</summary>
  
  We want to check if the array of types has more than one element before rendering the second one:
  ```js
  selectedPokemon.types.length > 1
  ```
</details>

See if you can implement the condition yourself, you'll be able to use the syntax `{CONDITION && <PokemonType ... > }`.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
        <p>
          {selectedPokemon.species.name}

          <PokemonType type={selectedPokemon.types[0].type.name} />
+          {selectedPokemon.types.length > 1 && (
+            <PokemonType type={selectedPokemon.types[1].type.name} />
 +         )}
        </p>
  ```
</details>

Once you've added the condition, you should be able to view Squirtle with no problems.

## Showing an image

Showing an image of the Pokemon is surprisingly easy, thanks to the PokeAPI.

In HTML, we can display images using the `<img>` tag, and we can do the same thing in React. In React the `<img>` tag takes two main props: `src`, the url of the image, and `alt`, which is an alternative name for the image. 

We can get the `src` of the image from our `selectedPokemon` object. Looking at the JSON response of the API, we have access to `sprites`, which includes:
- back_female
- back_shiny
- back_shiny_female
- front_default
- front_female
- front_shiny
- front_shiny_female

In this case we can just show `front_default`, but later on we could extend the Pokedex to allow viewing multiple pictures.

Try adding an `<img>` tag and set the `src` to `selectedPokemon.sprite.front_default`. You may notice that the formatting is wrong, to fix that I surrounded the `<p>` in a `<div>` and moved the `<img>` outside of the `<p>` tag.

<details>
  <summary>Click here to reveal solution</summary>
  
  ```diff
      {selectedPokemon && (
+        <div>
          <p>
            {selectedPokemon.species.name}

            <PokemonType type={selectedPokemon.types[0].type.name} />
            {selectedPokemon.types.length > 1 && (
              <PokemonType type={selectedPokemon.types[1].type.name} />
            )}
          </p>

+          <img src={selectedPokemon.sprites.front_default} alt="sprite" />
+        </div>
      )}
  ```
</details>

Once this is implemented, you should be able to see an image for all three pokemon!

## Adding an input box for any Pokemon

We want people to be able to find information on any pokemon without needing buttons for all of them. So let's add an input box where they can search for a specific pokemon.

Under the buttons, add some text, an `<input>` and a `<button>` to search.

<details>
  <summary>Click here to reveal solution</summary>
  
```diff
+ <p>Or type in a name:</p> 
+ <input />
+ <button>Search</button>
```
</details>

The searching will work as follows:
1. User types in Pokemon name
2. User clicks "Search" button
3. Call our `getPokemonInfo` function to fetch data on the Pokemon
4. If the Pokemon doesn't exist, show error message

First we need access to what the user has typed into the `<input>`. To do this we can use a handy React function called `useRef` which will keep a reference to the `<input>` so that we can access the value in it. We first assign a variable to `useRef`, and then use that variable in the `<input>` to keep track of it.

```diff
export function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);
+  const searchBox = useRef(null);
```

```diff
<p>Or type in a name:</p> 
- <input />
+ <input ref={searchBox} />
<button>Search</button>
```

We can now access the value in the search box anywhere with `searchBox.current.value`.

Next, add an `onClick` handler to the search button that calls our function `getPokemonInfo` with the value in the search box. 

<details>
  <summary>Click here to reveal solution</summary>
  
```diff
-      <button>Search</button>
+      <button onClick={() => getPokemonInfo(searchBox.current.value)}>
+        Search
+      </button>
```
</details>


## The End

Thanks for going through the workshop, I hope you enjoyed! You should now be able to build your own React apps!

If you're interested in continuing the Pokedex here are some ideas:
- Capitalize the Pokemon name
- Fetch a list of Pokemon from the API and generate buttons for each
- Show more information about each Pokemon, like abilities, stats, or evolutions.
- Add a loading spinner when the API is fetching
- Show a gallery of pictures of the Pokemon
- If you know CSS, try styling it to look like a Pokedex. (edit `src/styles.css`)
- [Example](http://reactpoke.thebigoh.net/) of an awesome React Pokedex by Oscar Medrano using the same API. [Source code](https://github.com/OhMedrano/reactPokeDex)


Workshop by Devon Mack

Thanks to CodeSandbox for making it easy to write React code without any prior installation.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), a great way to get started on any React project. 