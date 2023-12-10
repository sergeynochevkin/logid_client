import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  FetcherContext,
  FilterAndSortContext,
  ManagementContext,
  SettingContext,
} from "../../..";
import "../Management.css";
import UsersItem from "./UsersItem";

import sync from "../../../assets/icons/sync.png";
import sync_dark from "../../../assets/icons/sync_dark.png";
import arrow_back from "../../../assets/icons/arrow_back.png";
import arrow_back_dark from "../../../assets/icons/arrow_back_dark.png";
import mail from "../../../assets/icons/mail.png";
import mail_dark from "../../../assets/icons/mail_dark.png";
import alert from "../../../assets/icons/alert.png";
import alert_dark from "../../../assets/icons/alert_dark.png";
import block from "../../../assets/icons/block.png";
import block_dark from "../../../assets/icons/block_dark.png";
import select_all from "../../../assets/icons/select_all.png";
import select_all_dark from "../../../assets/icons/select_all_dark.png";
import deselect_all from "../../../assets/icons/deselect_all.png";
import deselect_all_dark from "../../../assets/icons/deselect_all_dark.png";
import send from "../../../assets/icons/send.png";
import send_dark from "../../../assets/icons/send_dark.png";
import Modal from "../../ui/modal/Modal";
import UsersItemActionModalContent from "./UsersItemActionModalContent";
import FilterAndSortComponentForServer from "../../filterAndSort/FilterAndSortComponentForServer";

const UsersList = observer(() => {
  const { Setting } = useContext(SettingContext);
  const { Management } = useContext(ManagementContext);
  const { fetcher } = useContext(FetcherContext);
  const [modalActive, setModalActive] = useState(false);
  const [action, setAction] = useState("");
  const [actionIcons, setActionIcons] = useState({
    one: "",
    two: "",
  });
  const { FilterAndSort } = useContext(FilterAndSortContext);

  let initialValue = {
    type: "",
    members: [],
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialValue);

  const buttonAction = (action, iconOne, iconTwo) => {
    setFormData({ ...formData, type: action });
    setActionIcons({ ...actionIcons, one: iconOne, two: iconTwo });
    setAction(action);
    setModalActive(true);
  };

  useEffect(() => {
    setFormData({ ...formData, members: [] });
  }, [FilterAndSort.managementFilters.users]);

  const sortUsers = (a, b) => {
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="management_actions_container">
        <img
          src={Setting.app_theme === "light" ? sync : sync_dark}
          className="management_sync_icon"
          alt="sync"
          onClick={() => {
            fetcher.setManagementUsers(true);
          }}
        ></img>

        {Management.users.length > 0 && (
          <>
            {formData.members.length < Management.users.length && (
              <img
                src={
                  Setting.app_theme === "light" ? select_all : select_all_dark
                }
                className="management_sync_icon"
                alt="select_all"
                onClick={() => {
                  setFormData(initialValue);
                  setFormData({
                    ...formData,
                    members: [...Management.users.map((el) => el.id)],
                  });
                }}
              />
            )}
            {formData.members.length === Management.users.length && (
              <img
                src={
                  Setting.app_theme === "light"
                    ? deselect_all
                    : deselect_all_dark
                }
                className="management_sync_icon"
                alt="select_all"
                onClick={() => {
                  setFormData(initialValue);
                }}
              />
            )}
          </>
        )}

        {formData.members.length >= 2 ? (
          <>
            <img
              src={Setting.app_theme === "light" ? mail : mail_dark}
              className="management_sync_icon"
              alt="mail"
              onClick={() => {
                buttonAction(
                  "mail",
                  Setting.app_theme === "light" ? arrow_back : arrow_back_dark,
                  Setting.app_theme === "light" ? send : send_dark
                );
                setModalActive(true);
              }}
            ></img>
            <img
              src={Setting.app_theme === "light" ? alert : alert_dark}
              className="management_sync_icon"
              alt="alert"
              onClick={() => {
                buttonAction(
                  "alert",
                  Setting.app_theme === "light" ? arrow_back : arrow_back_dark,
                  Setting.app_theme === "light" ? send : send_dark
                );
                setModalActive(true);
              }}
            ></img>
            <img
              src={Setting.app_theme === "light" ? block : block_dark}
              className="management_sync_icon"
              alt="block"
            ></img>
          </>
        ) : (
          <></>
        )}

        <FilterAndSortComponentForServer parent={"management_users"} />
      </div>
      <div className="management_container">
        {Management.users
          .slice()
          .sort(sortUsers)
          .map((oneUser) => (
            <UsersItem
              initialValue={initialValue}
              formData={formData}
              setFormData={setFormData}
              key={oneUser.id}
              oneUser={oneUser}
              modalActive={modalActive}
              setModalActive={setModalActive}
              action={action}
              setAction={setAction}
              actionIcons={actionIcons}
              setActionIcons={setActionIcons}
            />
          ))}
      </div>

      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <UsersItemActionModalContent
          initialValue={initialValue}
          formData={formData}
          setFormData={setFormData}
          setAction={setAction}
          action={action}
          setModalActive={setModalActive}
          actionIcons={actionIcons}
          setActionIcons={setActionIcons}
        />
      </Modal>
    </>
  );
});

export default UsersList;
