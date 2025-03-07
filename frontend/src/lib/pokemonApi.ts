export const getPokemon = async (id: number | string) => {
    const API_URL = `http://localhost:3000/pokemon`;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

export const getPokedex = async () => {
    const API_URL = `http://localhost:3000/pokemon`;
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};
