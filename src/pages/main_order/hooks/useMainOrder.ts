import { useEffect } from "react";
import ym from "react-yandex-metrika";

export const useMainOrder = () => {
  useEffect(() => {
    ym("hit", "/main_order");
  }, []);

  return {};
};
