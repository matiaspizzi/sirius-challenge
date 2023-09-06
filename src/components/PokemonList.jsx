import { Link } from "react-router-dom"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import PropTypes from 'prop-types'

const PokemonList = ({ pokemons, prevPage, nextPage, page }) => {

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center min-h-[60vh] w-full mt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-fit">
            {pokemons?.map((pokemon, index) => (
              <Link to={`/pokemon/${pokemon.id}`} key={index}>
                <div key={index} className="flex flex-col items-center justify-center p-2 shadow-md bg-white m-2 h-[130px] w-[130px] hover:scale-110 ease-in duration-100">
                  <h3 className="text-sm font-medium">{pokemon.name.toUpperCase()}</h3>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} className="w-[100px]" alt={pokemon.name}/>
                </div>
              </Link>
            ))}
          </div>
          {pokemons.length === 0 && <div className="h-20 flex justify-center items-center">
            <p className="bg-white p-4 text-xl rounded-sm shadow-sm">No Pokemons Found</p>
          </div>}
        </div>
        <div className="flex gap-4 items-center my-4">
          {page !== 0 ?
            <Link to={`/home/${parseInt(page) - 1}`}>
              <button className="bg-white p-1 rounded-full shadow-md " onClick={prevPage}><AiOutlineArrowLeft /></button>
            </Link> : <button disabled className="bg-white p-1 rounded-full shadow-md text-slate-300"><AiOutlineArrowLeft /></button>}
          <p className="font-medium">{page}</p>
          <Link to={`/home/${parseInt(page) + 1}`}>
            <button className="bg-white p-1 rounded-full shadow-md" onClick={nextPage}><AiOutlineArrowRight /></button>
          </Link>
        </div>
      </div>
    </>
  )
}

PokemonList.propTypes = {
  pokemons: PropTypes.array.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
}

export default PokemonList