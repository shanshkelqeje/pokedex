import { getPokemon } from "@/lib/pokemonApi";

export default async function PokemonPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const pokemon = await getPokemon(Number(params.id));

    // if (!pokemon)
    //     return <p className="text-center text-red-500">Pokémon not found.</p>;

    return (
        <div className="max-w-2xl mx-auto grid grid-rows-[minmax(35vh,45vh)_auto] gap-2 h-screen">
            <div className="flex">
                <div className="bg-[#83EEC5] p-6 md:p-8">
                    <div>
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                            alt="bulbasaur"
                            className="ring-4 ring-green-400/50 rounded-full border-2 border-neutral-700 bg-white shadow-[1px_1px_2px_rgba(0,0,0,0.7)]"
                        />
                        <h1 className="mt-4 text-[1.5rem] font-bold uppercase ">
                            bulbasaur
                        </h1>
                        <div className="mt-2 flex">
                            <p className="bg-[#4E8225] inline-block min-w-[66px] mr-2 rounded border border-[rgba(0,0,0,.2)] text-white text-[0.75rem] leading-6 text-center shadow-[1px_1px_2px_rgba(0,0,0,0.7)] uppercase">
                                Grass
                            </p>
                            <p className="bg-[#7d3c6f] inline-block min-w-[66px] mr-2 rounded border border-[rgba(0,0,0,.2)] text-white text-[0.75rem] leading-6 text-center shadow-[1px_1px_2px_rgba(0,0,0,0.7)] uppercase">
                                Poison
                            </p>
                        </div>
                        <div className="pt-4">
                            <p className="mt-2">Height: 7</p>
                            <p className="mt-2">Weight: 69</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#62D5B4] p-6 md:p-8">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                        className="mx-auto h-full mx-auto h-full opacity-100 transition duration-300 hover:opacity-100"
                    />
                </div>
            </div>
            <div className="bg-[#399494] p-6 md:p-8">
                <div className="grid gap-4">
                    <div className="flex flex-col">
                        <p className="mt-2 font-bold text-white">Overgrow</p>
                        <p className="text-gray-200 text-sm">
                            Boosts the power of Grass-type moves when HP is low.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <p className="mt-2 font-bold text-white">Chlorophyll</p>
                        <p className="text-gray-200 text-sm">
                            Doubles the Pokémon's Speed in sunny weather.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
