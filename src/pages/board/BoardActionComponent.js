import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import FilterAndSortComponentForServer from "../../components/filterAndSort/FilterAndSortComponentForServer";
import { SettingContext } from "../..";

const BoardActionComponent = observer(({}) => {
  const { Setting } = useContext(SettingContext);

  return (
    <div className={`board_right_container ${Setting.app_theme}`}>
      <FilterAndSortComponentForServer parent={"board"} />
    </div>
  );
});

export default BoardActionComponent;
