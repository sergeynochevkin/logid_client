import { useContext } from "react";
import {
    TranslateContext
    //@ts-ignore
  } from "../../..";


export const useCarrier = ()=>{
      //@ts-ignore
  const { Translate } = useContext(TranslateContext);

    return {Translate}
}