const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
    {
        _id: Number,
        name: String,
        height: Number,
        weight: Number,
        abilities: [{ name: String, description: String }],
        sprite: String,
        official_artwork: String,
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
        type_colors: [String],
    },
    { collection: "pokemon" }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);
