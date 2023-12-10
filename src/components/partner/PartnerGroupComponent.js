import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  FetcherContext,
  NotificationContext,
  PartnerContext,
  TranslateContext,
  UserInfoContext,
} from "../..";
import { useInput } from "../../hooks/useInput";
import { createGroup, updateGroups } from "../../http/partnerApi";
import AddPartnerGroupComponent from "./AddPartnerGroupComponent";
import PartnerGroupItem from "./PartnerGroupItem";
import { Button } from "../ui/button/Button";
import { CardButton } from "../ui/button/CardButton";
import Modal from "../ui/modal/Modal";
import { HorizontalContainer } from "../ui/page/HorizontalContainer";
import { VerticalContainer } from "../ui/page/VerticalContainer";
import { OrderTh } from "../ui/table/OrderTh";
import { v4 } from "uuid";

import NoData from "../ui/page/NoData";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";

const PartnerGroupComponent = observer(
  ({ parent, setModalActive, modalActive, onePartnerInfo }) => {
    const { UserInfo } = useContext(UserInfoContext);
    const { Partner } = useContext(PartnerContext);
    const { Notification } = useContext(NotificationContext);
    const initialValue = { userInfoId: UserInfo.userInfo.id, groupName: "" };
    const [formData, setFormData] = useState(initialValue);
    const { Translate } = useContext(TranslateContext);
    const { fetcher } = useContext(FetcherContext);
    const group_created = SetNativeTranslate(
      Translate.language,
      {},
      "group_created"
    );

    useEffect(() => {
      if (parent === "groupModal") {
        setSelectedGroups(
          Partner.groups
            .filter((el) => el.partners.includes(onePartnerInfo.id))
            .map((el) => el.dataValues.id)
        );
      }
    }, [Partner.groups]);

    const [selectedGroups, setSelectedGroups] = useState([]);

    formData.groupName = useInput(
      "",
      { isEmpty: true, minLength: 5, maxLength: 20 },
      SetNativeTranslate(Translate.language, {}, "group_name").toLowerCase()
    );
    formData.userInfoId = UserInfo.userInfo.id;

    const createNewGroup = async (event) => {
      event.preventDefault();
      await createGroup(formData.userInfoId, formData.groupName.value).then(
        (data) =>
          Notification.addNotification([
            {
              id: v4(),
              type: "success",
              message: `${group_created} ${data[0].name}`,
            },
          ])
      );
      formReset();
      fetcher.setPartners(true);
      setModalActive(false);
    };

    const updateAllGroups = async (event) => {
      event.preventDefault();
      await updateGroups(
        UserInfo.userInfo.id,
        onePartnerInfo.id,
        selectedGroups
      );
      setSelectedGroups([]);
      setModalActive(false);
      fetcher.setPartners(true);
    };

    const formReset = () => {
      formData.groupName.setValue("");
      formData.groupName.setDirty(false);
    };

    return (
      <VerticalContainer style={{ gap: "0px", alignItems: "center" }}>
        {parent !== "partnerList" && parent !== "groupModal" ? (
          <Button
            onClick={() => {
              setModalActive(true);
            }}
          >
            {SetNativeTranslate(Translate.language, {}, "add")}
          </Button>
        ) : (
          <></>
        )}

        <VerticalContainer
          style={{
            maxWidth: "700px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginTop: parent === "partnerList" ? "0px" : "10px",
            minWidth: "200px",
            flexDirection:
              parent === "partnerList" || parent === "groupModal"
                ? "row"
                : "column",
          }}
        >
          {Partner.groups.length > 0 && parent === "groupModal" ? (
            <>
              {Partner.groups.map((group) => (
                <PartnerGroupItem
                  key={group.dataValues.id}
                  group={group}
                  parent={parent}
                  setSelectedGroups={setSelectedGroups}
                  selectedGroups={selectedGroups}
                />
              ))}
            </>
          ) : Partner.groups.length > 0 && parent === "partnerList" ? (
            <>
              {Partner.groups
                .filter((el) => el.partners.length > 0)
                .map((group) => (
                  <PartnerGroupItem
                    key={group.dataValues.id}
                    group={group}
                    parent={parent}
                    setSelectedGroups={setSelectedGroups}
                    selectedGroups={selectedGroups}
                  />
                ))}
            </>
          ) : Partner.groups.length > 0 &&
            parent === "partners" &&
            parent !== "partnerList" ? (
            <table>
              <tbody>
                <tr>
                  <OrderTh>
                    {SetNativeTranslate(Translate.language, {}, "group_name")}
                  </OrderTh>
                  <OrderTh>
                    {SetNativeTranslate(
                      Translate.language,
                      {},
                      "number_of_members"
                    )}
                  </OrderTh>
                </tr>
              </tbody>
              <tbody>
                {Partner.groups.map((group) => (
                  <PartnerGroupItem
                    parent={"table"}
                    key={group.dataValues.id}
                    group={group}
                    setSelectedGroups={setSelectedGroups}
                    selectedGroups={selectedGroups}
                  />
                ))}
              </tbody>
            </table>
          ) : Partner.groups.length === 0 && parent !== "partnerList" ? (
            <NoData>
              {SetNativeTranslate(Translate.language, {}, "no_groups")}
            </NoData>
          ) : (
            <></>
          )}
        </VerticalContainer>
        {parent === "groupModal" ? (
          <HorizontalContainer style={{ marginTop: "30px" }}>
            <CardButton onClick={updateAllGroups}>
              {SetNativeTranslate(Translate.language, {}, "save")}
            </CardButton>
            <CardButton
              onClick={() => {
                setSelectedGroups(
                  Partner.groups
                    .filter((el) => el.partners.includes(onePartnerInfo.id))
                    .map((el) => el.dataValues.id)
                );
                setModalActive(false);
              }}
            >
              {SetNativeTranslate(Translate.language, {}, "close")}
            </CardButton>
          </HorizontalContainer>
        ) : (
          <></>
        )}

        <Modal
          setModalActive={setModalActive}
          modalActive={modalActive}
          formReset={formReset}
          parent={"createGroup"}
        >
          <AddPartnerGroupComponent
            formData={formData}
            setFormData={setFormData}
            createNewGroup={createNewGroup}
            parent={""}
            modalActive={modalActive}
            setModalActive={setModalActive}
            formReset={formReset}
          />
        </Modal>
      </VerticalContainer>
    );
  }
);

export default PartnerGroupComponent;
