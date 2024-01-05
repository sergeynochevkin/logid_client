import { useLocation } from "react-router-dom";



export const useFastSignUp = () => {
const location = useLocation()

  return {location};
};
