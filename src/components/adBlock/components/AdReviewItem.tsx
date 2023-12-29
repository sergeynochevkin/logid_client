import React from "react";
import classes from "../AdBlock.module.sass";
import { ReviewItem } from "../types";

type Props = {
  item: ReviewItem;
};

const AdReviewItem = ({ item }: Props) => {
  return (
    <div className={classes.AdReviewItem}>
      <div className={classes.AdReviewFace}>
        <img src={item.av} className={classes.AdReviewIcon} />
        <div>{item.name}</div>
      </div>
      <div className={classes.AdReviewBack}>{item.description}</div>
    </div>
  );
};

export default AdReviewItem;
