const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://shanshkelqeje:41TfhtdVAMrHQL31@pokedb.ygio4.mongodb.net/?retryWrites=true&w=majority&appName=PokeDB",
            { dbName: "pokedex" }
        );
    } catch (error) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
