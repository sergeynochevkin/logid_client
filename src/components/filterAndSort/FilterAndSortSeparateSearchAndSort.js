import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import FilterInput from "../ui/form/FilterInput";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import {
  FetcherContext,
  FilterAndSortContext,
  SettingContext,
  TranslateContext,
} from "../..";
import tune from "../../assets/icons/tune.png";
import tune_dark from "../../assets/icons/tune_dark.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Modal from "../ui/modal/Modal";
import FilterAndSortComponentForServer from "./FilterAndSortComponentForServer";

const FilterAndSortSeparateSearchAndSort = observer(
  ({ parent, modalActive, setModalActive }) => {
    const { fetcher } = useContext(FetcherContext);
    const { FilterAndSort } = useContext(FilterAndSortContext);
    const { Translate } = useContext(TranslateContext);
    const { Setting } = useContext(SettingContext);
    const { width } = useWindowDimensions();

    const inputHandler = (e) => {
      if (parent === "board") {
        FilterAndSort.setBoardFilters(
          {
            ...FilterAndSort.boardFilters.transports,
            [e.target.name]: e.target.value,
          },
          "transports"
        );
        fetcher.setAdTransports(true);
      }
    };

    return (
      <>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <FilterAndSortComponentForServer
            parent={"board"}
            modalActive={modalActive}
            setModalActive={setModalActive}
          />
        </Modal>
        <div className="board_filters_search_string_container">
          <FilterInput
            fieldName="searchString"
            inputHandler={inputHandler}
            filterSection={"transports"}
            type="text"
            filterSet={"boardFilters"}
            placeHolder={SetNativeTranslate(Translate.language, {
              russian: [`Имя, или часть текста объявления`],
              english: [`Name, or part of the ad text`],
              spanish: [`Nombre o parte del texto del anuncio`],
              turkish: [`Ad veya reklam metninin bir kısmı`],
              сhinese: ["名称或广告文字的一部分"],
              hindi: ["विज्ञापन टेक्स्ट का नाम या भाग"],
            })}
          />

          {width < 770 && (
            <img
              className="board_filter_icon"
              src={Setting.app_theme === "light" ? tune : tune_dark}
              onClick={() => {
                modalActive && setModalActive(false);
                !modalActive && setModalActive(true);
              }}
            ></img>
          )}
        </div>
      </>
    );
  }
);

export default FilterAndSortSeparateSearchAndSort;
