import React from "react";
import classes from "../AdBlock.module.sass";

type Props = {
  title: string;
  className: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[] 
};

const AdSectionItem = ({ title, className, onClick, children }: Props) => {
  return(
  <div className={className} onClick={onClick}>
    <div className={classes.AdBlockSectionTitle} >{title}</div>
    {children}
  </div>
  )
};

export default AdSectionItem;
