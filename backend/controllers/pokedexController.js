const Pokemon = require("../models/Pokemon");
const Palette = require("../models/Palette");

const getPokedex = async (req, res) => {
    const pokemon = await Pokemon.find();
    res.send(pokemon);
};

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    let pokemon, palette;

    if (!isNaN(id)) {
        pokemon = await Pokemon.findById(id);
        palette = await Palette.findById(id);
    } else {
        pokemon = await Pokemon.findOne({ name: new RegExp(`^${id}$`, "i") });
        palette = await Palette.findOne({ _id: pokemon?._id });
    }

    if (!pokemon) {
        return res.status(404).send({ error: "Pokemon not found" });
    }

    res.send([pokemon, palette]);
};

module.exports = { getPokedex, getPokemonById };
