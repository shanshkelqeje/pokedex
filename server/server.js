const express = require("express");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    var pokemon = await getPokemon();
    res.send(pokemon);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/** Retrieves a Pokemon's JSON data from the PokeAPI server. */
getPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/1/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
};
