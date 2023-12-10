import React, { useContext } from "react";
import "./Notification.css";
import { FetcherContext, NotificationContext } from "../..";
import { deleteNotification } from "../../http/notificationApi";
import { setTime } from "../../modules/setTime";
import { observer } from "mobx-react-lite";

import remove_dark from "../../assets/icons/remove_dark.png";

const ServerNotificationItem = observer(({ notification, setModalActive }) => {
  const { Notification } = useContext(NotificationContext);
  const { fetcher } = useContext(FetcherContext);
  const deleteNotificationAction = () => {
    deleteNotification(notification.id);
    fetcher.setServerNotifications(true);
    if (Notification.server_notifications.length === 1) {
      setModalActive(false);
    }
  };

  return (
    <>
      <div className={"list_item_container"}>
        <img
          className={"order_action_icon"}
          src={remove_dark}
          alt="delete notification"
          onClick={deleteNotificationAction}
        />

        <div className={"list_time"}>
          {setTime(new Date(notification.createdAt), 0, "show")}
        </div>
        <div className={"list_meassage"}>{notification.message}</div>
      </div>
    </>
  );
});

export default ServerNotificationItem;
