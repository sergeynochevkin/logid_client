import { useContext, useState } from "react";
//@ts-ignore
import { SettingContext } from '../../../../..';

export const useBurgerMenu = () => {
const [active, setActive] = useState(true)
//@ts-ignore
const {Setting} = useContext(SettingContext)

  return {active, setActive, Setting};
};
