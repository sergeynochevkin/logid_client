import { useContext } from "react";
import {
    TranslateContext
    //@ts-ignore
  } from "../../..";


export const useCourier = ()=>{
      //@ts-ignore
  const { Translate } = useContext(TranslateContext);

    return {Translate}
}