import { Link } from "react-router-dom"
import { Oval } from 'react-loader-spinner'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

/* eslint-disable react/prop-types */
const PokemonList = ({ pokemons, loaderNextPage, prevPage, nextPage, page }) => {

  return (
    <>
      {loaderNextPage ? <div className="mt-8 min-h-[60vh]"><Oval height={40} color="black" secondaryColor="grey" /></div> :
        <div className="flex flex-col items-center">
          <div className="flex gap-4 items-center mt-8">
            {page !== 0 ? 
            <Link to={`/home/${parseInt(page) - 1}`}>
              <button className="bg-white p-1 rounded-full shadow-md " onClick={prevPage}><AiOutlineArrowLeft /></button>
            </Link> : <button disabled className="bg-white p-1 rounded-full shadow-md text-slate-300"><AiOutlineArrowLeft /></button>}
            <p className="font-medium">{page}</p>
            <Link to={`/home/${parseInt(page) + 1}`}>
              <button className="bg-white p-1 rounded-full shadow-md" onClick={nextPage}><AiOutlineArrowRight /></button>
            </Link>
          </div>
          <div className="flex flex-col items-center min-h-[80vh] w-full mt-6 mb-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 h-fit">
              {pokemons?.map((pokemon, index) => (
                <Link to={`/pokemon/${pokemon.id}`} key={index}>
                  <div key={index} className="flex flex-col items-center justify-center p-2 shadow-md bg-white m-2 w-40 h-40 hover:scale-110 ease-in duration-100">
                    <h3 className="text-sm font-medium">{pokemon.name.toUpperCase()}</h3>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                  </div>
                </Link>
              ))}
            </div>
            <div className="h-20 flex justify-center items-center">
            </div>
          </div>
        </div>}
    </>
  )
}

export default PokemonList