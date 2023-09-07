import { useState, useEffect } from 'react'
import Nav from './Nav'
import PokemonList from './PokemonList'
import { Oval } from 'react-loader-spinner'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { storeFilters, getFilters } from '../utils/filters'

const queryWithFilters = gql`
query findBaby($name: String, $type: String, $isBaby: Boolean, $weight_gt: Int, $weight_lt: Int, $limit: Int, $offset: Int, $color: String) {
  pokemon_v2_pokemon(
    where: {pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, pokemon_v2_pokemoncolor: {name: {_iregex: $color}}}, name: {_iregex: $name}, pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_iregex: $type}}}, weight: {_lte: $weight_lt, _gte: $weight_gt}}
    limit: $limit
    offset: $offset, 
    order_by: {id: asc}
  ) {
    name
    id
  }
}`

const Home = () => {

  const LIMIT = 18
  
  const { numpage } = useParams()

  const [filters, setFilters] = useState(getFilters() || {name: "", type: "", color: "", isBaby: false, weight_gt: 0, weight_lt: 1000})
  const [ page, setPage ] = useState(numpage ? parseInt(numpage) : 0)

  const { data, loading, error } = useQuery(queryWithFilters, {
    variables: {...filters, limit: LIMIT, offset: page * LIMIT}
  })

  useEffect(() => {
    storeFilters(filters);
  }, [filters]);


  const handleSearch = (name) => {
    setPage(0)
    setFilters({name, type: "", color: "", isBaby: false, weight_gt: 0, weight_lt: 1000})
  }

  const handleFilter = (name, type, color, isBaby, weight_gt, weight_lt) => {
    setPage(0)
    setFilters({ name, type, color, isBaby, weight_gt, weight_lt})
  }

  const nextPage = () => {
    setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    setPage((prev) => prev - 1)
  }

  if(error) {
    console.error(error)
    return (
      <>
        <Nav handleFilter={handleFilter} handleSearch={handleSearch} filters={filters} setFilters={setFilters}/>
        <div className='flex flex-col w-[100vw] min-h-[70vh] items-center justify-center'>
          <h1 className="text-2xl text-red-700 bg-red-200 p-4 rounded-sm font-medium shadow-sm">Error</h1>
          <p className='text-sm font-normal text-slate-600'>{error.message}</p>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <>
        <Nav handleFilter={handleFilter} handleSearch={handleSearch} filters={filters} setFilters={setFilters}/>
        <div className='flex flex-col w-[100vw] min-h-[70vh] items-center justify-center'>
          <Oval height={80} color="red" secondaryColor="#ff4d4d" />
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col w-[100vw] min-h-[70vh] items-center justify-center'>
      <Nav handleFilter={handleFilter} handleSearch={handleSearch} filters={filters}/>
      <PokemonList pokemons={data.pokemon_v2_pokemon} nextPage={nextPage} prevPage={prevPage} page={page} />
    </div>
  )

}

export default Home
