import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ym from "react-yandex-metrika";

export const useMainOrder = () => {
  const location = useLocation();

  useEffect(() => {
    ym("hit", `${location.pathname + location.search}`);
  }, []);

  return {};
};
