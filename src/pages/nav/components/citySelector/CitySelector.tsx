import React, {Dispatch,SetStateAction } from "react";
import classes from "./CitySelector.module.sass";
import { useCitySelector } from "./hooks/useCitySelector";
//@ts-ignore
import { Input } from "../../../../components/ui/form/Input";
//@ts-ignore
import { SetNativeTranslate } from "../../../../modules/SetNativeTranslate";


type Props = {
  setModalActive:Dispatch<SetStateAction<boolean>>
}


const CitySelector = ({setModalActive}:Props) => {
  const { Setting,  id, Translate } = useCitySelector(setModalActive);

  return (
    <div className={classes.Container}>
      <div
        className={
          Setting.app_theme === "dark" ? classes.TitleDark : classes.Title
        }
      >
        Начните вводить название вашего города и выбирете город из списка
      </div>
      <Input
        id={id}
        placeholder={SetNativeTranslate(Translate.language, {}, "enter_city")}
      />
    </div>
  );
};

export default CitySelector;
