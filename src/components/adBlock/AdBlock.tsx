import React from "react";
import classes from "./AdBlock.module.sass";
import { useAdBlock } from "./hooks/useAdBlock";
import AdSectionItem from "./components/AdSectionItem";
import { observer } from "mobx-react-lite";
import { useAdBlockContent } from "./hooks/useAdBlockContent";
import AdATextItem from "./components/AdATextItem";
import AdPossibilityItem from "./components/AdPossibilityItem";
import AdReviewItem from "./components/AdReviewItem";

const AdBlock = observer(() => {
  const { section, setSection } = useAdBlock();
  const { sections, possibilities, reviews } = useAdBlockContent();

  return (
    <div className={classes.AdBlock}>
      <AdSectionItem
        onClick={() => {
          setSection("about");
        }}
        title={sections[0].header}
        className={
          section === "about"
            ? classes.AdBlockSectionActive
            : classes.AdBlockSection
        }
      >
        <AdATextItem text={sections[0].description} />
      </AdSectionItem>
      <AdSectionItem
        onClick={() => {
          setSection("possibilities");
        }}
        title={sections[1].header}
        className={
          section === "possibilities"
            ? classes.AdBlockSectionActive
            : classes.AdBlockSection
        }
      >
        <div className={classes.AdItemsContainer}>
          {possibilities.map((item) => (
            <AdPossibilityItem key={item.id} item={item} />
          ))}
        </div>
      </AdSectionItem>
      <AdSectionItem
        onClick={() => {
          setSection("reviews");
        }}
        title={sections[2].header}
        className={
          section === "reviews"
            ? classes.AdBlockSectionActive
            : classes.AdBlockSection
        }
      >
        <div className={classes.AdItemsContainer}>
          {reviews.map((item) => (
            <AdReviewItem key={item.id} item={item} />
          ))}
        </div>
      </AdSectionItem>
    </div>
  );
});

export default AdBlock;
