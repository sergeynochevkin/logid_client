import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const location = useLocation();

  return {location};
};
