const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = 3000;

main = async () => {
    await mongoose.connect(
        "mongodb+srv://shanshkelqeje:41TfhtdVAMrHQL31@pokedb.ygio4.mongodb.net/?retryWrites=true&w=majority&appName=PokeDB",
        { dbName: "pokedex" }
    );
};

main().catch((err) => console.log(err));

const pokemonSchema = new mongoose.Schema(
    {
        _id: Number,
        name: String,
        height: Number,
        weight: Number,
        abilities: [String],
        sprite: String,
        cry: String,
        stats: {
            hp: Number,
            attack: Number,
            defense: Number,
            special_attack: Number,
            special_defense: Number,
            speed: Number,
        },
        types: [String],
    },
    { collection: "pokemon" }
);

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

app.get("/", async (req, res) => {
    const json = await getPokemon();
    const {
        id,
        name,
        height,
        weight,
        abilities,
        sprites,
        cries,
        stats,
        types,
    } = json;

    const pokemon = new Pokemon({
        _id: id,
        name,
        height,
        weight,
        abilities: abilities.map((slot) => slot.ability.name),
        sprite: sprites.front_default,
        cry: cries.legacy,
        stats: {
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            special_attack: stats[3].base_stat,
            special_defense: stats[4].base_stat,
            speed: stats[5].base_stat,
        },
        types: types.map((slot) => slot.type.name),
    });

    await pokemon.save();
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
