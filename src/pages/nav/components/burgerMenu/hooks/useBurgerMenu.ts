import { useContext, useState } from "react";
//@ts-ignore
import { SettingContext, TranslateContext } from "../../../../..";
import { useNavigate } from "react-router-dom";

export const useBurgerMenu = (width: number) => {
  const [active, setActive] = useState(false);
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  const navigate = useNavigate();

  return { active, setActive, Setting, Translate, navigate };
};
