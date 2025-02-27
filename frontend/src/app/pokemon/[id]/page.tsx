import { getPokemon } from "@/lib/pokemonApi";

export default async function PokemonPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const pokemon = await getPokemon(Number(params.id));

    // if (!pokemon)
    //     return <p className="text-center text-red-500">Pokémon not found.</p>;

    return (
        <div>
            <h1>bulbasaur</h1>
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                alt="bulbasaur"
            />
            <p>Height: 7</p>
            <p>Weight: 69</p>
            <p>Abilities: overgrow, chlorophyll</p>
        </div>
    );
}
