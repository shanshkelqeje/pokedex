import { getPokedex, getPokemon } from "@/lib/pokemonApi";

export default async function PokemonPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const pokedex = await getPokedex();
    const [pokemon, palette] = await getPokemon(params.id);

    if (!pokemon)
        return <p className="text-center text-red-500">Pokémon not found.</p>;

    const parsedPalette = JSON.parse(palette.colors[0].replace(/'/g, '"'));

    return (
        // Body wrapper
        <div
            className="grid grid-cols-[2fr_3fr_2fr]"
            style={{ backgroundColor: parsedPalette[0] }}
        >
            {/* Left column: Pokedex */}
            <div>
                <div className="ml-12 mt-12 grid auto-rows-max gap-4">
                    <div className="bg-white rounded-md shadow-md p-2">
                        <input
                            type="text"
                            placeholder="Filter..."
                            className="w-full text-gray-800 outline-none"
                        />
                    </div>
                    <div className="max-h-[75vh] overflow-y-auto border-gray-600 rounded-md">
                        <table className="w-full">
                            <tbody>
                                {pokedex.map(
                                    ({
                                        _id,
                                        sprite,
                                        name,
                                    }: {
                                        _id: number;
                                        sprite: string;
                                        name: string;
                                    }) => (
                                        <tr
                                            key={_id}
                                            className="border-b border-gray-700"
                                        >
                                            <td className="px-4 py-2">{_id}</td>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={sprite}
                                                    alt={name}
                                                    className="w-24 h-24"
                                                />
                                            </td>
                                            <td className="capitalize px-4 py-2">
                                                {name}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Middle column: Pokemon card */}
            <div className="max-w-2xl mx-auto grid grid-rows-[minmax(35vh,45vh)_auto] h-screen">
                {/* Middle top: Pokemon information and artwork */}
                <div className="flex">
                    {/* Middle top-left: Pokemon information */}
                    <div
                        className="p-6 md:p-8 w-[225px]"
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
                    {/* Middle top-right: Pokemon artwork */}
                    <div
                        className="p-6 md:p-8 w-[450px]"
                        style={{ backgroundColor: parsedPalette[1] }}
                    >
                        <img
                            src={pokemon.official_artwork}
                            alt={pokemon.name}
                            className="mx-auto h-full mx-auto h-full opacity-100 transition duration-300 hover:opacity-100"
                        />
                    </div>
                </div>
                {/* Middle bottom: Pokemon abilities */}
                <div className="p-6 md:p-8 bg-[#24272e]">
                    <div>
                        <div className="grid auto-cols-max gap-4">
                            {pokemon.abilities.map(
                                ({
                                    name,
                                    description,
                                }: {
                                    name: string;
                                    description: string;
                                }) => (
                                    <div key={name} className="mt-4">
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
            {/* Right column: Empty */}
            <div></div>
        </div>
    );
}
