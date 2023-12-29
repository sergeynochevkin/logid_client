import { useContext, useState } from "react";
//@ts-ignore
import { SettingContext, TranslateContext } from "../../../../..";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import useComponentVisible from '../../../../../hooks/useComponentVisible';

export const useBurgerMenu = (width: number) => {
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const navigateAndClose = (path: string) => {
    setIsComponentVisible(false) 
    navigate(path);
  };



  return {  Setting, Translate, navigateAndClose, ref, isComponentVisible, setIsComponentVisible };
};
