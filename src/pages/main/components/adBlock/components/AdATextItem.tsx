import React from "react";
import classes  from '../AdBlock.module.sass';


type Props = {
  text: string;
};

const AdATextItem = ({ text }: Props) => {
  return <div className={classes.AdTextItem}>{text}</div>;
};

export default AdATextItem;
