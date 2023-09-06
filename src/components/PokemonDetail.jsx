
import { Link, useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { gql, useQuery } from '@apollo/client'

const query = gql`
query findPokemonById($id: Int!) {
  pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
    id
    name
    pokemon_v2_pokemonspecy {
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          name
          id
        }
      }
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    weight
  }
}`

const PokemonDetail = () => {

  const { id } = useParams()
  const { data, error, loading } = useQuery(query, { variables: { id: id } })
  error ? console.error(error) : null

  return (
    <div className='flex flex-col w-[100vw] min-h-[90vh] items-center justify-center'>
      {!loading ? <div className="flex flex-col items-center justify-center min-h-[87vh] w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 p-2 shadow-md bg-white w-[80vw]">
          <div className='flex flex-col items-center p-4 '>
            <p className="text-xl font-medium">{data?.pokemon_v2_pokemon[0].name.toUpperCase()}</p>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} className='w-[200px] h-[200px]' />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-20 p-2 bg-white m-2 ">

            <div>
              <p className="text-md font-medium">Type</p>
              <div className='flex gap-2 text-xs text-left justify-between'>
                {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between gap-6 text-xs border-b-[1px] border-slate-400 p-[2px]">
                    <p>{stat.pokemon_v2_type.name.toUpperCase()}</p>
                  </div>))}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.length > 0 && <p className="text-md font-medium">Evolution Chain</p>}
              {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution, index) => (
                <Link to={`/pokemon/${evolution.id}`} key={index}>
                  {evolution.name == data?.pokemon_v2_pokemon[0].name ? <p className='shadow-sm shadow-red-500 bg-red-200 p-1 rounded-sm w-full text-center text-xs'>{evolution.name.toUpperCase()}</p> : <p className="shadow-sm shadow-red-500 text-xs p-1 rounded-sm w-full text-center">{evolution.name.toUpperCase()}</p>}
                </Link>
              ))}

            </div>

            <div className='flex flex-col h-[100%] gap-4 w-fit items-center'>
              <p className="text-md font-medium">Stats</p>
              <div className='flex flex-col gap-2 text-xs text-left justify-between'>
                {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between gap-6 text-xs border-b-[1px] border-slate-400 p-[2px]">
                    <p>{stat.pokemon_v2_stat.name.toUpperCase()}</p>
                    <p className='font-semibold'>{stat.base_stat}</p>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </div> : <Oval height={80} color="red" secondaryColor="#ff4d4d"/>}
    </div>
  )
}

export default PokemonDetail