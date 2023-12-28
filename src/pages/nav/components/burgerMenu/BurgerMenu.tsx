import React from "react";
import { useBurgerMenu } from "./hooks/useBurgerMenu";
import classes from "./BurgerMenu.module.sass";
//@ts-ignore
import close from "../../../../assets/icons/close.png";
//@ts-ignore
import menu from "../../../../assets/icons/menu.svg";


const BurgerMenu = () => {
  const { active, setActive, Setting } = useBurgerMenu();

  return (
    <div>
      {active &&  
        <div className={classes.Container}>    
        </div> 
}
        
            <img
            onClick={() => {
                setActive(!active);
              }}
            src={!active ?  menu : close}
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
