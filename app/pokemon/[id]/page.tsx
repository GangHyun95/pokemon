import PokemonCryButtons from '@/components/PokemonCryButtons';
import { fetchPokemonByName } from '@/lib/pokemon';
import { typeColor } from '@/utils/colors';
import { Ruler, Weight } from 'lucide-react';
import Image from 'next/image';

type Props = {
    params: {
        id: string;
    };
};

export default async function Page({ params }: Props) {
    const { id } = params;

    const activePokemon = await fetchPokemonByName(id);

    const typeName = activePokemon.types.length
        ? activePokemon.types[
              Math.floor(Math.random() * activePokemon.types.length)
          ].type.name
        : undefined;

    const backgroundColor = typeName ? typeColor[typeName] : 'transparent';

    console.log(activePokemon.stats);

    return (
        <main>
            <section
                className='px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8'
                style={{
                    background: backgroundColor,
                }}
            >
                <div className='flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-1'>
                        <PokemonCryButtons cries={activePokemon.cries} />

                        <h1 className='text-6xl font-bold capitalize text-white drop-shadow-sm'>
                            {activePokemon.name}
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>Abilities</h2>
                            <ul className='flex gap-2'>
                                {activePokemon.abilities.map(
                                    (ability, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full'
                                        >
                                            {ability.ability.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>Types</h2>
                            <ul className='flex flex-wrap gap-2'>
                                {activePokemon.types.map(
                                    (type, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-zinc-700 text-white rounded-full'
                                        >
                                            {type.type.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold'>Base Stats</h2>
                        <ul className='flex flex-col gap-4'>
                            {activePokemon.stats.map(
                                (stat, index) => (
                                    <li
                                        key={index}
                                        className='flex flex-col gap-1'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <span className='capitalize'>
                                                {stat.stat.name}
                                            </span>
                                            <span className='font-bold'>
                                                {stat.base_stat}
                                            </span>
                                        </div>

                                        <div className='w-full h-3 bg-white/15 rounded-md overflow-hidden mt-1'>
                                            <div
                                                className='h-full rounded-md bg-white'
                                                style={{
                                                    width: `${
                                                        (stat.base_stat / 200) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className='mt-2 flex gap-4'>
                        <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                            <span className='text-sm flex items-center gap-2'>
                                <Ruler size={18} />
                                Height
                            </span>
                            {activePokemon.height} m
                        </p>
                        <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                            <span className='text-sm flex items-center gap-2'>
                                <Weight size={18} />
                                Weight
                            </span>
                            {activePokemon.weight} kg
                        </p>
                        <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                            <span className='text-sm flex items-center gap-2'>
                                <Weight size={18} />
                                Base Exp
                            </span>
                            {activePokemon.base_experience} xp
                        </p>
                    </div>
                </div>
                <div className='relative flex justify-center items-center'>
                    <Image
                        src={`/icons/${activePokemon.types[0].type.name}.svg`}
                        alt='pokemon type'
                        width={700}
                        height={700}
                        className='absolute opacity-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    />
                    <Image
                        src={
                            activePokemon?.sprites?.other?.home?.front_shiny ||
                            activePokemon?.sprites?.other?.showdown
                                ?.front_default ||
                            activePokemon?.sprites?.front_default ||
                            '/pokemon--logo.png'
                        }
                        alt='pokemon image'
                        width={500}
                        height={500}
                        className='relative z-10 filter drop-shadow-lg'
                    />
                </div>
            </section>
        </main>
    );
}
