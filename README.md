## Getting started

Get started by forking the Code Sandbox starter code:

[![Edit react-pokedex-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/devonpmack/react-pokedex-workshop/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

The page will reload if you make edits.

## React Basics

Welcome to my React workshop. React is a fantastic framework for Javascript that makes building interfaces more fun and simpler to develop. In this workshop I'll use the 💻 emoji to show that some coding must be done.

I've provided some starting code for you in `src/Pokedex.js`. Open it in CodeSandbox. You should see

```jsx
import React from 'react';

export function Pokedex() {
  return (
    <h4>
        Edit <code>src/Pokedex.js</code> and save to reload.
    </h4>
  );
}
```

This is what React code looks like. It's a combination of Javascript and HTML. The function `Pokedex` is called a "Component".

It represents the content in the center of our site. In here we can edit the content of our website.

💻 Remove the message we have right now.

```diff
  return (
    <div>
-    <h4>
-        Edit <code>src/Pokedex.js</code> and save to reload.
-    </h4>
    </div>
  );
```

💻 We want our Pokédex to display information about a Pokemon. Let's start with Squirtle. Add in his name and type.

```diff
  return (
    <div>
+      <h4>Squirtle: water</h4>
    </div>
  );
```

If you save the code, you should see that the text will now say "Squirtle: water".

💻 Now let's make the text look like an actual Pokemon type. I included a component called `PokemonType` which we can use for this. You'll have to import it.


```diff
import React from "react";
+ import { PokemonType } from "./PokemonType";

export function Pokedex() {
  return (
    <div>
-    <h4>Squirtle: water</h4>
+    <h4>Squirtle</h4>

+    <PokemonType type={"water"}/>
    </div>
  );
}
```

If you save that, you should see an actual Pokemon type. `PokemonType` is another React component. React components can take "properties", and `PokemonType` takes the property `type` which specifies what type it should display. You can try switching the value of `type` to "dragon" or "grass".

## Switching Pokemon

We can show one Pokemon, but since it's a Pokédex we want to be able to show details about more than one. Let's add functionality to view the types of different Pokemon .

First we need a database of Pokemon . We'll start by setting up the types for three Pokemon : Squirtle, Charmander, and Bulbasaur.

💻 Define this data in an `Object`:

```diff
export function Pokedex() {
+  const pokemon = {
+      Squirtle: {type: "water"},
+      Bulbasaur: {type: "grass"},
+      Charmander: {type: "fire"}
+  }

return (
```

Using the database we can access the type of Squirtle with the code

```js
pokemon["Squirtle"].type; // => water
```


💻 Instead of hardcoding the type of Squirtle to water, change the prop `type` of `PokemonType` to get the type from our new database. After implementing this code, nothing should change and it should still show Squirtle along with water type.

💻 Put `"Squirtle"` into a variable called `selectedPokemon` to make it so we can change the value. You can replace the text `Squirtle` inside the `<h4>` with `{selectedPokemon}` to display the pokemon name to the screen.

Once you've done this step, try changing the value of `selectedPokemon` to `"Bulbasaur"` to test if it works. The type should automatically update to display grass instead of water!

Now that we can easily change Pokemon  by editing the code, lets allow the user to change it as well. To do this we will add buttons for each Pokemon  in our database.

## Updating the "state" of the page

In React, when you want to use persistent variables that will change, you need to use a feature called "state". State gets updated as the user interacts with your page. We need a state to track what Pokemon  the user is currently viewing.

💻 Convert the variable `selectedPokemon` to a state. We will import a React hook called `useState`.

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

Now lets add a `<button>` to update the state. We need to modify the `return` value to include a button. While we're at it, we should also put the selected pokemon and type into `<div>` to keep it separate. 

💻 Change the return to
```jsx
return (
  <div>
      <div>
        <h4>{selectedPokemon}</h4>

        <PokemonType type={pokemon[selectedPokemon].type} />
      </div>

      <p>Select Pokemon:</p>
      <button>Squirtle</button>
      <button>Charmander</button>
      <button>Bulbasaur</button>
    </div>
);
```

You should see the page update to include our three buttons for selecting Pokemon . However, the buttons won't do anything yet since we haven't programmed them to update the state.

💻 Start with the button for Squirtle; add some `onClick` code which will run when the user clicks the button.

```diff
- <button>Squirtle</button>
+ <button onClick={() => setSelectedPokemon("Squirtle")}>Squirtle</button>
```

We use the javascript syntax for a short form function. The functoin sets the selected Pokemon to Squirtle on click. You can test this right away, when you click the button the Pokemon  should update to Squirtle!

💻 Program the other two buttons yourself.

Now we have a really basic Pokédex! We can click on different Pokemon to see their type. 

## Using the PokeAPI

What if we don't want to manually input the type of every Pokemon? To do this, we can use a publically available API (Application Programming Interface) called [PokeAPI](https://pokeapi.co/). We can ask this API for information about any Pokemon  programmatically! This will save us a lot of time so we don't have to input the information every single Pokemon. In addition, the PokeAPI gets updated constantly when they add or change Pokemon , so we don't have to worry about maintaining our data.

We can retrieve information from PokeAPI through HTTP get requests. Javascript will make this very easy for us.

On their [website](https://pokeapi.co/) you can see an example with the Pokemon "Ditto". As you can see the information for ditto is in JSON format at this URL: https://pokeapi.co/api/v2/pokemon/ditto. This info is hard to read without formatting it, I recommend the extension [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) for Chrome or to use Firefox which automatically formats the JSON.

In this JSON we have access to all kinds of information about the Pokemon . For example we can get the types, abilities, and even the Pokemon sprites (pictures).

Once we start using an API the code gets a bit trickier since we have to fetch information. 

💻 Start by removing our database, since we are going to use PokeAPI as our database from now on. 
```diff
-  const pokemon = {
-    Squirtle: { type: "water" },
-    Bulbasaur: { type: "grass" },
-    Charmander: { type: "fire" }
-  };
```

💻 Set the initial state of `selectedPokemon` to start as `undefined`. Just like a Pokédex, we will let the user pick which Pokemon they want to view before fetching any information.

<details>
  <summary>Solution</summary>
  
  ```diff
- const [selectedPokemon, setSelectedPokemon] = useState("Squirtle);
+ const [selectedPokemon, setSelectedPokemon] = useState(undefined);
  ```

</details>

To avoid errors when `selectedPokemon` is `undefined` we need to adjust our React code to only display Pokemon information when a Pokemon is selected. 

💻 To do this we can use a bit of weird Javascript / JSX syntax to ignore the `<div>` block if we don't have a value `selectedPokemon`. This is also important so that we don't show an error when data is fetching later.

```diff
return (
  <div>
-      <div>
-        <h4>{selectedPokemon}</h4>
-
-        <PokemonType type={pokemon[selectedPokemon].type} />
-      </div>
+     {selectedPokemon && (
+        <div>
+          {selectedPokemon}
+
+          <PokemonType type={pokemon[selectedPokemon].type} />
+        </div>
+      )}
      ...
  </div>
);
```

Now we can start fetching data. 

💻 Add a function at the top of our `Pokedex` function that fetches data from the API. Call it `getPokemonInfo()` and it takes the parameter `name` which is the name of the Pokemon  we want 
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

First we need to build the URL. 

💻 Create a variable `URL` to store the URL that we should fetch data from. This will be a combination of the PokeAPI URL and the parameter `name` (name of the Pokemon ). Note that we should apply `toLowerCase()` to the string because the API won't take capitals.

<details>
  <summary>Solution</summary>
  
  ```diff
  async function getPokemonInfo(name) {
+    const URL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  }
  ```

  I used Javascript string substitution syntax, but there are multiple ways to do this. For example with the `+` operator.
</details>

💻 Next, use a built in JavaScript function called `fetch()` to fetch the data from our URL.

<details>
  <summary>Solution</summary>
  
  ```diff
    async function getPokemonInfo(name) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  +
  +    const response = await fetch(URL);
  +    const data = await response.json();
    }
  ```
</details>

Using the `await` syntax we can tell javascript to asynchronously wait for the response from the API.

💻 Once we get the data from the API, update the state of selectedPokemon to store all the new data we got.

💻 Now that we have the function to retrieve data from the PokeAPI, update the `onClick` of all our buttons to instead call this new function which will update the state for us.

By now you're probably eager to test it, but it will give you errors until we fix one more thing! 

💻 Update our display to properly access the Pokemon data based on the API format. Try looking at the JSON response of the API at `https://pokeapi.co/api/v2/pokemon/squirtle` and see if you can figure out how to access the Pokemon type and name. In particular look at the field `types` and the field `species`.

<details>
  <summary>Hint</summary>
  
  The name can be accessed via `species.name`

  Since there can be more than one type, for now we should access the first index of the array. The first type can be accessed via `types[0].type.name`.
</details>

Once you've done this, refresh your preview in CodeSandbox and it should work! Try clicking on one of the buttons for a Pokemon . After a short delay it should fetch the data and display the Pokemon  name and type! The best part is that now the Pokédex can be easily extended on, you just finished the hardest part!

## Showing more than one type

You may have noticed that when you click on Bulbasaur it shows his type as Poison. What's going on?

In the newest generation of Pokemon , they made Bulbasaur actually have two types! If you go to [his page on the Pokemon website](https://www.pokemon.com/us/pokedex/bulbasaur) we can see that he's grass and poison. We are only showing his first type so we should update our code to show the second one as well.

There are two different approaches to this that are both valid.
1. Assume that a Pokemon  can only ever have 2 types and check for the case to display 2 types.
2. Loop through all the types received from the `PokeAPI` , and render a `<PokemonType>` for each one.

Feel free to try either these approaches yourself, but in this case, it's probably easier just to assume a Pokemon can only have 2 types. (so far there are no 3 type Pokemon).

#### Implementing Approach #1

💻 Copy and paste the `<PokemonType>` component so that we can view two different types at once. For the second `<PokemonType>` change it to access the second array index instead of the first.

This should actually do the trick right away, but you'll notice that if you click on Squirtle the page will crash. This is because we try to render his second type, but Squirtle only has one type!

To fix this we need to add a condition before rendering the second `<PokemonType>`, this will be similar to how we have the `selectedPokemon && ... ` syntax before the `<div>`. What do you think the condition will be?

<details>
  <summary>Hint</summary>
  
  We want to check if the array of types has more than one element before rendering the second one:
  ```js
  selectedPokemon.types.length > 1
  ```
</details>

💻 Implement the condition using the syntax `{CONDITION && <PokemonType ... > }`.

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

In this case we can just show `front_default`, but later on we could extend the Pokédex to allow viewing multiple pictures.

💻 Add an `<img>` tag to the bottom of the pokemon `<div>` and set the `src` to `selectedPokemon.sprites.front_default`. 

<details>
  <summary>Solution</summary>
  
  ```diff
      {selectedPokemon && (
          <div>
            {selectedPokemon.species.name}

            <PokemonType type={selectedPokemon.types[0].type.name} />
            {selectedPokemon.types.length > 1 && (
              <PokemonType type={selectedPokemon.types[1].type.name} />
            )}

+          <img src={selectedPokemon.sprites.front_default} alt="sprite" />
          </div>
      )}
  ```
</details>

Once this is implemented, you should be able to see an image for all three Pokemon !

## Adding an input box for any Pokemon

We want people to be able to find information on any Pokemon without needing buttons for all of them. So let's add an input box where they can search for a specific Pokemon .

💻 Under the buttons, add an `<input>` and a search `<button>`.

The searching will work as follows:
1. User types in Pokemon name
2. User clicks "Search" button
3. Call our `getPokemonInfo` function to fetch data on the Pokemon
4. If the Pokemon doesn't exist, show error message

💻 First we need access to what the user has typed into the `<input>`. To do this we can use a handy React function called `useRef` which will keep a reference to the `<input>` so that we can access the value in it. We first assign a variable to `useRef`, and then use that variable in the `<input>` to keep track of it.

```diff
- import React, { useState } from "react";
+ import React, { useState, useRef } from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);
+  const searchBox = useRef(null);
```

```diff
- <input />
+ <input ref={searchBox} />
<button>Search</button>
```

We can now access the value in the search box anywhere with `searchBox.current.value`.

💻 Next, add an `onClick` handler to the search button that calls our function `getPokemonInfo` with the value in the search box. 

You should now be able to search for info about any Pokemon! But if the Pokemon doesn't exist, the app will break. Let's fix that.

In `getPokemonInfo` the `response` object has a property `response.ok` which indicates whether the request was successful. 

💻 Leverage `response.ok` to show an `alert` error message if `ok` is false, and then exit the function.

<details>
  <summary>Solution</summary>
  
```diff
  async function getPokemonInfo(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    const response = await fetch(URL);
+    if (!response.ok) {
+      alert("Pokemon does not exist");
+      return;
+    }
    const data = await response.json();

    setSelectedPokemon(data);
  }
```
</details>

Everything should now be working!

## Making a hook for using the PokeAPI

Creating custom hooks is an advanced feature of React. It can be super useful for cleaning up and abstracting your code. We're going to do this with `getPokemonInfo` so we can move the PokeAPI logic into a reusable hook!

The hook will be used to fetch data from the PokeAPI.

💻 Start by creating a file `hooks.js` (really it's only going to store one hook but this is good practice). In the file import `useState` because we are going to store the state of `selectedPokemon` in this hook.

💻 Define and export a function called `usePokemonAPI`. In this function set up a state variable called `pokemon`. `pokemon` will store the pokemon that gets fetched from the API. It should start out as `null` or `undefined`.

💻 Copy over the `getPokemonInfo` function *inside* of your `usePokemonAPI` function (I know this sounds weird, but we want to keep all of the hook's functions encapsulated inside of it). We will also need access to the `pokemon` state. 

💻 Update `getPokemonInfo` to set the `pokemon` state variable that we declared.

We will return two things from the hook:
1. The current pokemon that has been fetched
2. The function to fetch a different pokemon

By convention hooks usually return an array:

💻 Return the pokemon state variable and get pokemon function

```js
return [pokemon, getPokemonInfo]
```

Once you've finished your hook, lets implement it in `Pokedex.js`. 

💻 Remove the old `getPokemonInfo` function, and the useState since we will now rely on `usePokemonAPI` to store our state.

Now we can use our new hook!
```js
const [selectedPokemon, getPokemonInfo] = usePokemonAPI();
```

Everything should work the same as before but our code has been nicely abstracted into a hook.

## The End

Congratulations and thanks for going through the workshop! I hope you enjoyed, you'll now be able to build your own React apps!

If you're interested in continuing the Pokédex here are some ideas:
- Fetch a list of Pokemon from the API and generate buttons for each
- Show more information about each Pokemon, like abilities, stats, or evolutions.
- Add a loading spinner when the API is fetching
- Show a gallery of pictures of the Pokemon
- If you know CSS, try styling it to look like a Pokédex. (edit `src/styles.css`)
- [Example](http://reactpoke.thebigoh.net/) of an awesome React Pokédex by Oscar Medrano using the same API. [Source code](https://github.com/OhMedrano/reactPokeDex)

Workshop by Devon Mack

<details>
  <summary>Final code</summary>

[Code Sandbox](https://codesandbox.io/s/pokedex-working-copy-j4kyr)  
```jsx
import React, { useState, useRef } from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);
  const searchBox = useRef(null);

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

  return (
    <div>
      {selectedPokemon && selectedPokemon.species && (
        <div>
          <h4>{selectedPokemon.species.name}</h4>

          <PokemonType type={selectedPokemon.types[0].type.name} />
          {selectedPokemon.types.length > 1 && (
            <PokemonType type={selectedPokemon.types[1].type.name} />
          )}

          <img src={selectedPokemon.sprites.front_default} alt="sprite" />
        </div>
      )}
      <p>Select Pokemon:</p>
      <button onClick={() => getPokemonInfo("squirtle")}>Squirtle</button>
      <button onClick={() => getPokemonInfo("bulbasaur")}>Bulbasaur</button>
      <button onClick={() => getPokemonInfo("charmander")}>Charmander</button>
      <input ref={searchBox} />
      <button onClick={() => getPokemonInfo(searchBox.current.value)}>
        Search
      </button>
    </div>
  );
}

```
</details>

Thanks to CodeSandbox for making it easy to write React code without any prior installation.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), a great way to get started on any React project. 

