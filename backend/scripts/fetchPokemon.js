const Pokemon = require("../models/Pokemon");
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const typeColorDict = {
    normal: "#4e5356",
    fire: "#a92e18",
    water: "#204e92",
    electric: "#6e581b",
    grass: "#587b35",
    ice: "#23547b",
    fighting: "#7a4236",
    poison: "#6f416a",
    ground: "#5c4f21",
    flying: "#071268",
    psychic: "#7a1839",
    bug: "#798330",
    rock: "#534c2d",
    ghost: "#33336c",
    dragon: "#1c1274",
    dark: "#513f34",
    steel: "#3e4245",
    fairy: "#55195a",
};

/** Retrieves a Pokemon's JSON data from the 'PokeAPI' server. */
const getPokemon = async (id) => {
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

/** Retrieves an Ability's description from the 'PokeAPI' server */
const getAbilityDescription = async (abilityName) => {
    const url = `https://pokeapi.co/api/v2/ability/${abilityName}/`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const description = data.effect_entries.find(
            (entry) => entry.language.name === "en"
        );
        return (
            description?.short_effect ||
            "No description available for this ability."
        );
    } catch (error) {
        console.error(error.message);
    }
};

const getAbilitiesWithDescriptions = async (abilities) => {
    const abilitiesWithDescriptions = await Promise.all(
        abilities.map(async (ability) => {
            const description = await getAbilityDescription(ability);
            return { name: ability, description };
        })
    );
    return abilitiesWithDescriptions;
};

/** Saves a Pokemon's JSON data to the 'pokemon' collection of the 'pokedex' database in MongoDB */
const savePokemon = async (json) => {
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

    const abilityNames = abilities.map((slot) => slot.ability.name);
    const abilityNamesWithDescriptions = await getAbilitiesWithDescriptions(
        abilityNames
    );
    const typeNames = types.map((slot) => slot.type.name);
    const typeColors = typeNames.map((type) => typeColorDict[type]);

    const pokemon = new Pokemon({
        _id: id,
        name,
        height,
        weight,
        abilities: abilityNamesWithDescriptions,
        sprite: sprites.front_default,
        official_artwork: sprites.other["official-artwork"].front_default,
        cry: cries.legacy,
        stats: {
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            special_attack: stats[3].base_stat,
            special_defense: stats[4].base_stat,
            speed: stats[5].base_stat,
        },
        types: typeNames,
        type_colors: typeColors,
    });

    await Pokemon.findOneAndUpdate(
        { _id: id },
        { $set: pokemon },
        { upsert: true } // Prevent duplicate key error
    );

    // console.log(`Saved/Updated: ${name}`);
};

const getAndSaveFirstGenPokemon = async () => {
    await connectDB();

    const promises = [];
    for (let id = 1; id <= 151; id++) {
        const json = await getPokemon(id);
        promises.push(savePokemon(json));
    }
    await Promise.all(promises); // Wait for all pokemon to be saved

    const count = await Pokemon.countDocuments();
    console.log(`${count} Pokemon in collection.`);

    mongoose.connection.close();
};

// Run script
getAndSaveFirstGenPokemon();
