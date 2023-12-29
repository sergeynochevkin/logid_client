import React from "react";
import { useBurgerMenu } from "./hooks/useBurgerMenu";
import classes from "./BurgerMenu.module.sass";
//@ts-ignore
import close from "../../../../assets/icons/close.png";
//@ts-ignore
import menu from "../../../../assets/icons/menu.svg";
import Links from "../links/Links";

type Props = {
  width: number;
};

const BurgerMenu = ({ width }: Props) => {
  const {
    Setting,
    Translate,
    navigateAndClose,
    ref,
    isComponentVisible,
    setIsComponentVisible,
    location,
  } = useBurgerMenu(width);

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div className={classes.Container}>
          <Links parent={"burger"} />
        </div>
      )}

      <img
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
        }}
        src={!isComponentVisible ? menu : close}
        className={
          Setting.app_theme === "dark"
            ? classes.NavBarIconDark
            : classes.NavBarIcon
        }
      ></img>
    </div>
  );
};

export default BurgerMenu;
