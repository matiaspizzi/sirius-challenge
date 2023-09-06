import { useState } from 'react'
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdUnfoldMore } from 'react-icons/md'
import { gql, useQuery } from '@apollo/client'
import MultiRangeSlider from './multiRangeSlider/MultiRangeSlider'
import { useContext } from 'react'
import { FilterContext } from '../contexts/FilterContext'
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

  const { filters } = useContext(FilterContext);

  const [type, setType] = useState(filters.type || '')
  const [color, setColor] = useState(filters.color || '')
  const [isBaby, setIsBaby] = useState(filters.isBaby || false)
  const [name, setName] = useState(filters.name || '')
  const [weight_gt, setWeight_gt] = useState(0)
  const [weight_lt, setWeight_lt] = useState(1000)

  const [displayNav, setDisplayNav] = useState(true)

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

  const showNav = () => {
    setDisplayNav(true)
  }

  const removeFilters = (e) => {
    e.preventDefault()
    setDisplayNav(false)
    handleSearch("", "", "", false, 0, 1000)
  } 

  return (
    <div className="flex flex-col w-full items-center gap-2 p-3 justify-center shadow-md bg-white text-black h-full">
      <form className="w-full md:max-w-[70vw] flex justify-center border border-gray-700 align-middle">
        <input id="searchBar" value={name} type="text" placeholder="Search" className="w-full  h-7 bg-white p-1 border focus:outline-none" onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="px-1 border-none text-lg" onClick={handleSubmit()}><AiOutlineSearch /></button>
      </form>
      {!displayNav && <button onClick={showNav}><MdUnfoldMore/></button>}
      {displayNav && 
      <div className='flex flex-col md:flex-row md:gap-4 items-center justify-center border border-slate-300 text-xs'>
        <button onClick={removeFilters} className='p-2 text-lg'><AiOutlineCloseCircle /></button>
        <div className="flex flex-col md:flex-row justify-center gap-2 p-1 items-center">
            <div className='flex gap-2'>
              <p>Type</p>
              <select name="" id="" defaultValue={filters.type} className='bg-white px-1 border border-slate-500' onChange={(e) => { setType(e.target.value) }}>
                <option value="">All</option>
                {types?.pokemon_v2_type?.map((type, index) => (
                  <option key={index} value={type.name}>{type.name.toUpperCase()}</option>
                ))}
              </select>
              <p>Color</p>
              <select name="" defaultValue={color} id="" className='bg-white px-1 border border-slate-500' onChange={(e) => { setColor(e.target.value) }}>
                <option value="">All</option>
                {colors?.pokemon_v2_pokemoncolor?.map((color, index) => (
                  <option key={index} value={color.name}>{color.name.toUpperCase()}</option>
                ))}
              </select>
            </div>
          <div className='flex items-center gap-1'>
            <input type="checkbox" defaultChecked={filters.isBaby} onChange={(e) => setIsBaby(e.target.checked)} /> Baby
          </div>
          <div className='flex md:flex-row flex-col items-center gap-1'>
            <p>Weight</p>
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) => { setWeight_gt(min), setWeight_lt(max) }}
            />
            <p>current: {filters.weight_gt} - {filters.weight_lt}</p>
          </div>

        </div>
        <div className='flex items-center gap-1'>
          <button onClick={applyFilters} className='bg-white p-2 px-3 border border-slate-500 h-full text-md font-semibold'> Find </button>
        </div>
      </div>}
      
    </div>
  )
}

Nav.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default Nav