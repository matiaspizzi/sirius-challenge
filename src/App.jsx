import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import PokemonDetail from './components/PokemonDetail.jsx'

const App = () => {

  return (
      <Router>
          <Header/>
          <Routes >
            <Route path="/home/:numpage?" element={<Home />}/>
            <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
            <Route path="*" element={<h1>404</h1>}/>
          </Routes >
      </Router>
  )
}

export default App

