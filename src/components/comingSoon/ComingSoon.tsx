import React from "react";
import classes from "./ComingSoon.module.sass";
//@ts-ignore
import logo from "../../assets/images/logo.png";

const ComingSoon = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.LeftBlock}>
        <div className={classes.Message}>Становимся лучше, скоро вернемся</div>
      </div>
      <div className={classes.Map}></div>
      <img className={classes.Logo} src={logo} />
    </div>
  );
};

export default ComingSoon;
