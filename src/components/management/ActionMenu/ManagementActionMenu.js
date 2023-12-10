import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { SettingContext } from "../../..";

import useComponentVisible from "../../../hooks/useComponentVisible";

import moderated from "../../../assets/icons/moderated.png";
import moderated_dark from "../../../assets/icons/moderated_dark.png";

const ManagementActionMenu = observer(
  ({
    formData,
    setFormData,
    setModalActive,
    setActionMenuActive,
    setAction,
    item,
  }) => {
    const { Setting } = useContext(SettingContext);

    const { ref } = useComponentVisible(true);

    const buttonAction = (action) => {
      setFormData({ ...formData, type: action });
      setFormData({ ...formData, id: item.id });
      setActionMenuActive(false);
      setAction(action);
      setModalActive(true);
    };

    return (
      <>
        <div className="item_action_menu" ref={ref}>
          {
            <img
              src={Setting.app_theme === "light" ? moderated : moderated_dark}
              className="management_sync_icon"
              alt="mail"
              onClick={(event) => {
                event.stopPropagation();
                buttonAction("transport_moderation");
              }}
            ></img>
          }
        </div>
      </>
    );
  }
);

export default ManagementActionMenu;
