const mongoose = require("mongoose");

const paletteSchema = new mongoose.Schema(
    {
        _id: Number,
        colors: [String],
        name: String,
    },
    { collection: "poke_palettes" }
);

module.exports = mongoose.model("Palette", paletteSchema);
