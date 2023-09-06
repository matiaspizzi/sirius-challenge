import { MdOutlineCatchingPokemon } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useFindPath } from "../hooks/UseFindPath";

const Header = () => {

    const path = useFindPath();

    return (
      <div className="flex items-center w-full p-3 bg-red-400 shadow-md sticky top-0">
            <div className="flex w-full ">
                {path.includes("/pokemon/") ? <Link to="/home"><AiOutlineArrowLeft className="text-2xl"/></Link> : <MdOutlineCatchingPokemon className="text-2xl"/>}
            </div>
      </div>
    )
  }

  export default Header