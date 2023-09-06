//UseFindPath custom hook
import { useLocation } from "react-router-dom";

export const useFindPath = () => {
    const location = useLocation();
    const path = location.pathname;
    return path;
}
