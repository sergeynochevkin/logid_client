import React, { useContext } from "react";
import FilterAndSortSeparateSearchAndSort from "../../components/filterAndSort/FilterAndSortSeparateSearchAndSort";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { observer } from "mobx-react-lite";
import { SettingContext, TranslateContext, UserContext } from "../..";
import board_add from "../../assets/icons/board_add.png";
import board_add_dark from "../../assets/icons/board_add_dark.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const BoardFilter = observer(({ modalActive, setModalActive, addAdAction }) => {
  const { Translate } = useContext(TranslateContext);
  const { Setting } = useContext(SettingContext);
  const { user } = useContext(UserContext);

  const { width } = useWindowDimensions();

  return (
    <>
      <div className="board_filter_container">
        <FilterAndSortSeparateSearchAndSort
          parent={"board"}
          modalActive={modalActive}
          setModalActive={setModalActive}
        />

        {!user || !user.isAuth || user.user.role === "carrier" ? (
          <>
            {width < 0 ? (
              <></>
            ) : (
              <img
                onClick={() => {
                  addAdAction();
                }}
                alt={SetNativeTranslate(Translate.language, {
                  russian: ["Добавить объявление"],
                  english: ["Add ad"],
                  spanish: ["Para agregar un anuncio"],
                  turkish: ["İlan eklemek için"],
                  сhinese: ["添加广告"],
                  hindi: ["एक विज्ञापन जोड़ने के लिए"],
                })}
                className="board_add_ad_icon"
                src={Setting.app_theme === "light" ? board_add : board_add_dark}
              ></img>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
});

export default BoardFilter;
