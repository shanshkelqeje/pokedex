const Pokemon = require("../models/pokemon");

const getPokedex = async (req, res) => {
    const pokemon = await Pokemon.find();
    res.send(pokemon);
};

const getPokemonById = async (req, res) => {
    const pokemon = await Pokemon.findOne({ _id: 1 });
    res.send(pokemon);
};

module.exports = { getPokedex, getPokemonById };
