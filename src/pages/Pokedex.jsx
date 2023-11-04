import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  //? Aqui estan todos los pokemon
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currenType, setCurrenType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const {itemsInCurrentPage, lastPage, pagesInCurrentBlock} = paginateData(pokemonsByName, currentPage)

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrenType(e.target.value)
  }

  const handlePreviusPage = () => {

    const newCurrentPage = currentPage -1
    if(newCurrentPage >= 1) setCurrentPage(newCurrentPage)
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage) setCurrentPage(newCurrentPage)
  }

  useEffect(() => {
    if(currenType === ""){
        axios
          .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
          .then(({ data }) => setPokemons(data.results))
          .catch((err) => console.log(err));
    }
  }, [currenType]);

  //? Trae todos los types disponibles para los pokemos
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

//? Traer todos los pokemons con base a un tipo
  useEffect(() => {
    if(currenType !== ""){
        axios
          .get(`https://pokeapi.co/api/v2/type/${currenType}`)
          .then(({ data }) => { setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))})
          .catch((err) => console.log(err))
    }
  }, [currenType]);

//? Reseteo de pagina actual al cambiar de tipo
  useEffect (() => {
    setCurrentPage(1)
  },[currenType])

  return (
    <main>
      <HeaderPokeball />
      <section>
        <div className="">
        </div>
        <div className="">

        </div>
        <p className="flex justify-center items-center font-extralight p-4">
          <span className="text-red-500 p-6 font-bold capitalize">Welcome {trainerName}, </span>
          Aqui puedes encontrar tu pokemón favorito.
        </p>
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input className="rounded-xl border-2 px-10 py-2 text-gray-900 outline-none" name="pokemonName" type="text" />
            <button className="bg-red-500 p-2 rounded-xl px-5 hover:bg-red-700">Search</button>
          </div>
          <select onChange={handleChangeType} className="capitalize">
            <option value="">All pokemons</option>
              {types.map((type) => (
              <option value={type.name} key={type.url}> {type.name}</option>
            ))}
          </select>
        </form>
      </section>
      
      <PokemonList pokemons={itemsInCurrentPage} />
      
      <ul className="flex justify-center gap-4 flex-wrap">
        {
          currentPage !== 1 && (
          <li>
            <button onClick={handlePreviusPage}>{"<"}</button>
          </li>
          )
        }
        {pagesInCurrentBlock.map((page) => (
        <li key={page}> 
        <button onClick={() => setCurrentPage(page)} className={`p-2 text-white font-bold rounded-md ${currentPage === page ? "bg-red-500" : "bg-red-400"}`}> {page} </button>  
        </li>))}
        {
          currentPage !== lastPage && (
          <li>
            <button onClick={handleNextPage}>{">"}</button>
          </li>
          )
        }
      </ul>
    </main>
  );
};

export default Pokedex;
