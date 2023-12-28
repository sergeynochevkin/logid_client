import React from "react";
import { PossibilityItem } from "../types";
import classes from "../AdBlock.module.sass";

type Props = {
  item: PossibilityItem;
};

const AdPossibilityItem = ({ item }: Props) => {
  return (
    <div className={classes.AdPossibilityItem}>
      <div className={classes.AdPossibilityFace}>
        <img src={item.icon} className={classes.AdPossibilityIcon} />
        <div>{item.name}</div>
      </div>
      <div className={classes.AdPossibilityBack}>{item.description}</div>
    </div>
  );
};

export default AdPossibilityItem;
