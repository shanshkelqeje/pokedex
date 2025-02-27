const express = require("express");
const router = express.Router();
const {
    getPokedex,
    getPokemonById,
} = require("../controllers/pokedexController");

router.get("/", getPokedex);
router.get("/:id", getPokemonById);

module.exports = router;
