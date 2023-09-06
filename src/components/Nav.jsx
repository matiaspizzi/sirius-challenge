import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { gql, useQuery } from '@apollo/client'
import MultiRangeSlider from './multiRangeSlider/MultiRangeSlider'
import PropTypes from 'prop-types'


const queryTypes = gql`
query {
  pokemon_v2_type {
    name
  }
}`

const queryColor = gql`
query {
  pokemon_v2_pokemoncolor {
    name
  }
}`


const Nav = ({ handleFilter, handleSearch }) => {

  const [type, setType] = useState('')
  const [color, setColor] = useState('')
  const [isBaby, setIsBaby] = useState(false)
  const [name, setName] = useState('')
  const [weight_gt, setWeight_gt] = useState(0)
  const [weight_lt, setWeight_lt] = useState(1000)

  const { data: types } = useQuery(queryTypes) // Para los selects
  const { data: colors } = useQuery(queryColor) // Para los selects

  const handleSubmit = () => {
    return (e) => {
      e.preventDefault()
      handleSearch(name, type, color, isBaby, weight_gt, weight_lt)
    }
  }

  const applyFilters = () => {
    handleFilter(name, type, color, isBaby, weight_gt, weight_lt)
  }

  return (
    <div className="flex flex-col w-full items-center gap-3 p-3 justify-center shadow-md bg-white text-black h-full">
      <form className="w-full md:max-w-[70vw] flex justify-center border border-gray-700 align-middle">
        <input id="searchBar" value={name} type="text" placeholder="Search" className="w-full  h-7 bg-white p-1 border focus:outline-none" onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="px-1 border-none text-lg" onClick={handleSubmit()}><AiOutlineSearch /></button>
      </form>
      <div className='flex gap-4 border border-slate-300 text-xs'>
        <div className="flex justify-center gap-2 p-1 items-center">
          <p>Type</p>
          <select name="" id="" selected={type} className='bg-white px-1 border border-slate-500' onChange={(e) => { setType(e.target.value) }}>
            <option value="">All</option>
            {types?.pokemon_v2_type?.map((type, index) => (
              <option key={index} value={type.name}>{type.name.toUpperCase()}</option>
            ))}
          </select>
          <p>Color</p>
          <select name="" selected={color} id="" className='bg-white px-1 border border-slate-500' onChange={(e) => { setColor(e.target.value) }}>
            <option value="">All</option>
            {colors?.pokemon_v2_pokemoncolor?.map((color, index) => (
              <option key={index} value={color.name}>{color.name.toUpperCase()}</option>
            ))}
          </select>
          <div className='flex items-center gap-1'>
            <input type="checkbox" checked={isBaby} onChange={(e) => setIsBaby(e.target.checked)} /> Baby
          </div>
          <div className='flex items-center gap-1'>
            <p>Weight</p>
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) => { setWeight_gt(min), setWeight_lt(max) }}
            />
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <button onClick={applyFilters} className='bg-white px-1 border border-slate-500 h-full text-md font-semibold'> Find </button>
        </div>
      </div>
    </div>
  )
}

Nav.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default Nav