import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { FetcherContext, NotificationContext, SettingContext } from "../../..";
import { CardButton } from "../../ui/button/CardButton";
import { updateField } from "../../../http/managementApi";
import { v4 } from "uuid";

const ManagementActionMenuModalContent = observer(
  ({ setModalActive, formData, setFormData, initialValue }) => {
    const { Setting } = useContext(SettingContext);
    const { fetcher } = useContext(FetcherContext);
    const { Notification } = useContext(NotificationContext);

    const moderationAction = async (option, moderated) => {
      try {
        await updateField({
          ...formData,
          option: option,
          moderated: moderated,
        }).then((data) => {
          Notification.addNotification([
            {
              id: v4(),
              type: moderated === "checked_accepted" ? "success" : "error",
              message: data,
            },
          ]);
        });

        fetcher.setManagementTransports(true);
        setTimeout(() => {
          setModalActive(false);
          setFormData(initialValue);
        }, 500);
      } catch (error) {
        Notification.addNotification([
          { id: v4(), type: "error", message: error.response.data.message },
        ]);
      }
    };

    return (
      <div
        className={`management_action_menu_modal_container ${Setting.app_theme}`}
      >
        <div className="users_action_menu_header">Transport moderation</div>

        <textarea
          style={{
            borderLeft:
              formData.message === "" ? "rgb(254, 111, 103,0.8) solid 1px" : "",
          }}
          placeholder={"Enter a comment on the solution"}
          rows="5"
          className={`management_search ${Setting.app_theme}`}
          value={formData.moderation_comment}
          onChange={(event) => {
            setFormData({
              ...formData,
              moderation_comment: event.target.value,
            });
          }}
        />

        <div className="management_action_menu_modal_buttons_container">
          <CardButton
            onClick={() => {
              setModalActive(false);
            }}
          >
            Close
          </CardButton>
          <CardButton
            disabled={formData.moderation_comment === ""}
            onClick={() => {
              moderationAction("transport", "checked_not_accepted");
            }}
          >
            Decline
          </CardButton>
          <CardButton
            onClick={() => {
              moderationAction("transport", "checked_accepted");
            }}
          >
            Accept
          </CardButton>
        </div>
      </div>
    );
  }
);

export default ManagementActionMenuModalContent;
