import { getPokemon } from "@/lib/pokemonApi";

export default async function PokemonPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const [pokemon, palette] = await getPokemon(Number(params.id));

    if (!pokemon)
        return <p className="text-center text-red-500">Pokémon not found.</p>;

    const parsedPalette = JSON.parse(palette.colors[0].replace(/'/g, '"'));

    return (
        <div className="max-w-2xl mx-auto grid grid-rows-[minmax(35vh,45vh)_auto] gap-2 h-screen">
            <div className="flex">
                <div
                    className="p-6 md:p-8"
                    style={{ backgroundColor: parsedPalette[2] }}
                >
                    <div>
                        <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            className="ring-4 ring-green-400/50 rounded-full border-2 border-neutral-700 bg-white shadow-[1px_1px_2px_rgba(0,0,0,0.7)]"
                        />
                        <h1 className="mt-4 text-[1.5rem] font-bold uppercase ">
                            {pokemon.name}
                        </h1>
                        <div className="mt-2 flex">
                            <p className="bg-[#4E8225] inline-block min-w-[66px] mr-2 rounded border border-[rgba(0,0,0,.2)] text-white text-[0.75rem] leading-6 text-center shadow-[1px_1px_2px_rgba(0,0,0,0.7)] uppercase">
                                {pokemon.types[0]}
                            </p>
                            <p className="bg-[#7d3c6f] inline-block min-w-[66px] mr-2 rounded border border-[rgba(0,0,0,.2)] text-white text-[0.75rem] leading-6 text-center shadow-[1px_1px_2px_rgba(0,0,0,0.7)] uppercase">
                                {pokemon.types[1]}
                            </p>
                        </div>
                        <div className="pt-4">
                            <p className="mt-2">Height: {pokemon.height}</p>
                            <p className="mt-2">Weight: {pokemon.weight}</p>
                        </div>
                    </div>
                </div>
                <div
                    className="p-6 md:p-8"
                    style={{ backgroundColor: parsedPalette[1] }}
                >
                    <img
                        src={pokemon.official_artwork}
                        className="mx-auto h-full mx-auto h-full opacity-100 transition duration-300 hover:opacity-100"
                    />
                </div>
            </div>
            <div
                className="p-6 md:p-8"
                style={{ backgroundColor: parsedPalette[0] }}
            >
                <div className="grid gap-4">
                    <div className="flex flex-col">
                        <p className="mt-2 font-bold text-white capitalize">
                            {pokemon.abilities[0]}
                        </p>
                        <p className="text-gray-200 text-sm">
                            Boosts the power of Grass-type moves when HP is low.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <p className="mt-2 font-bold text-white capitalize">
                            {pokemon.abilities[1]}
                        </p>
                        <p className="text-gray-200 text-sm">
                            Doubles the Pokémon's Speed in sunny weather.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
