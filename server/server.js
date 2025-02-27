const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = 3000;

/*** MongoDB ***/
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

getAndSaveFirstGenPokemon = async () => {
    const promises = [];

    for (let id = 1; id <= 151; id++) {
        const json = await getPokemon(id);
        promises.push(savePokemon(json));
    }

    await Promise.all(promises); // Wait for all pokemon to be saved

    const count = await Pokemon.countDocuments();
    console.log(`${count} Pokemon in collection.`);
};

/** Retrieves a Pokemon's JSON data from the 'PokeAPI' server. */
getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

/** Saves a Pokemon's JSON data to the 'pokemon' collection of the 'pokedex' database in MongoDB */
savePokemon = async (json) => {
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

    await Pokemon.findOneAndUpdate(
        { _id: id },
        { $set: pokemon },
        { upsert: true } // Prevent duplicate key error
    );

    console.log(`Saved/Updated: ${name}`);
};

// Scripts
getAndSaveFirstGenPokemon();

/*** Express ***/
app.get("/", async (req, res) => {
    const pokemon = await Pokemon.find();
    res.send(pokemon);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
