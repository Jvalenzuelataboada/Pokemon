import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate('/pokedex')
}

    return (
        <main className="h-screen grid grid-rows-[1fr,_auto]"> 
            <section className="grid place-content-center p-3">
                <div className="">
                    <div className="">
                        <img src="/imagepokedex.png" alt="" />
                    </div>
                    <h3 className="flex text-red-600 text-4xl justify-center p-7 font-extrabold">
                        !Hola entrenador!
                    </h3>
                    <p className="flex justify-center">Para poder comenzar, dame tu nombre </p>
                    <form className="flex justify-center p-4" onSubmit={handleSubmit}>
                        <input className="w-full rounded-xl border-none bg-transparent px-4 py-1 text-gray-900 outline-none" name="trainerName" type="text" placeholder="Your name ..." />
                        <button className="m-2 rounded bg-red-800 px-4 py-2 text-white">Star!</button>
                    </form>
                </div>
            </section>
            <footer>
                <div className="bg-red-600 h-16"></div>
                <div className="bg-black h-12 relative">
                    <div className="h-16 w-16 bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
                        <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default Home