const express = require("express");
const connectDB = require("./config/db");
const pokemonRoutes = require("./routes/pokedexRoutes");

const app = express();
const port = 3000;

/*** MongoDB ***/
connectDB();

app.use(express.json());
app.use("/pokemon", pokemonRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
