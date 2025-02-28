const Pokemon = require("../models/Pokemon");
const Palette = require("../models/Palette");

const getPokedex = async (req, res) => {
    const pokemon = await Pokemon.find();
    res.send(pokemon);
};

const getPokemonById = async (req, res) => {
    const pokemon = await Pokemon.findById(req.params.id);
    const palette = await Palette.findById(req.params.id);
    res.send([pokemon, palette]);
};

module.exports = { getPokedex, getPokemonById };
