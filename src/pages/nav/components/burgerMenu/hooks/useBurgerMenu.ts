import { useContext, useState } from "react";
//@ts-ignore
import { SettingContext, TranslateContext } from "../../../../..";
import { useLocation, useNavigate } from "react-router-dom";
//@ts-ignore
import useComponentVisible from '../../../../../hooks/useComponentVisible';

export const useBurgerMenu = (width: number) => {
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const location = useLocation()

  const navigateAndClose = (path: string) => {
    setIsComponentVisible(false) 
    navigate(path);
  };



  return {  Setting, Translate, navigateAndClose, ref, isComponentVisible, setIsComponentVisible, location };
};
