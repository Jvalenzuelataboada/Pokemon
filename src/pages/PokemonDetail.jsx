import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball";

const PokemonDetail = () => {

    const [pokemon, setPokemon] = useState(null)
    const { pokemonId } = useParams()
    
    const getPercentStat = (statValue) => {
        const MAX_STAT_VALUE = 255
        const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
        return `${percentStat}%`

    }

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, [])


    return (
        <main className="text-center capitalize">
            <HeaderPokeball />
            <article className="max-w-[500px] py-10 px-2 mx-auto">
                <header>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    <h3>#{pokemon?.id}</h3>
                    <h2>{pokemon?.name}</h2>
                    {/* Stats */}
                    <section>
                        <h3 className="text-start">Stats</h3>
                        <ul className="grid gap-4">
                            {pokemon?.stats.map((stat) => (
                                <li className="capitalize" key={stat.stat.name}>
                                    <div className="flex justify-between items-center">
                                        <h5>{stat.stat.name}</h5>
                                        <span>{stat.base_stat}/255</span>
                                    </div>
                                    {/* Total Bar */}
                                    <div className="bg-slate-200 h-6 rounded-md overflow-hidden">
                                        {/* Bar Progress */}
                                        <div style={{width: getPercentStat(stat.base_stat)}} className="bg-yellow-500 h-full w-1/2">
                                        </div>
                                    </div> 
                                </li>)
                            )}
                        </ul>
                    </section>
                </header>
            </article>
        </main>
    )
}

export default PokemonDetail