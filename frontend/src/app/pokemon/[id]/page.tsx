import { getPokemon } from "@/lib/pokemonApi";

export default async function PokemonPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const [pokemon, palette] = await getPokemon(params.id);

    if (!pokemon)
        return <p className="text-center text-red-500">Pokémon not found.</p>;

    const parsedPalette = JSON.parse(palette.colors[0].replace(/'/g, '"'));

    return (
        <div
            className="grid grid-cols-[20vh_auto_20vh]"
            style={{ backgroundColor: parsedPalette[0] }}
        >
            <div></div>
            <div className="max-w-2xl mx-auto grid grid-rows-[minmax(35vh,45vh)_auto] h-screen">
                <div className="flex">
                    <div
                        className="p-6 md:p-8"
                        style={{ backgroundColor: parsedPalette[2] }}
                    >
                        <div>
                            <img
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                className="mx-auto rounded-full border-4 border-neutral-700 bg-white"
                            />
                            <h1 className="mt-6 text-[1.5rem] font-bold uppercase ">
                                {pokemon.name}
                            </h1>
                            <div className="mt-2 flex">
                                {pokemon.types.map(
                                    (type: string, index: number) => (
                                        <p
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    pokemon.type_colors[index],
                                            }}
                                            className="inline-block min-w-[66px] mr-2 rounded border border-[rgba(0,0,0,.2)] text-white text-[0.75rem] leading-6 text-center shadow-[1px_1px_2px_rgba(0,0,0,0.7)] uppercase"
                                        >
                                            {type}
                                        </p>
                                    )
                                )}
                            </div>
                            <div className="pt-2">
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
                <div className="p-6 md:p-8 bg-[#24272e]">
                    <div className="grid gap-4">
                        <div className="flex flex-col">
                            {pokemon.abilities.map(
                                ({
                                    name,
                                    description,
                                }: {
                                    name: string;
                                    description: string;
                                }) => (
                                    <div key={name} className="mt-2">
                                        <p className="font-bold text-white capitalize">
                                            {name}
                                        </p>
                                        <p className="text-gray-200 text-sm">
                                            {description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
