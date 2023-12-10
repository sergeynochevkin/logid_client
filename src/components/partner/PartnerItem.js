import React, { useContext, useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";
import PartnerModalContent from "./PartnerModalContent";
import { PartnerContext, TranslateContext } from "../..";
import PartnerGroupModalContent from "./PartnerGroupModalContent";
import { OrderTd } from "../ui/table/OrderTd";

import OtherRatingComponent from "../rating/OtherRatingComponent";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { observer } from "mobx-react-lite";

const PartnerItem = observer(
  ({ onePartnerInfo, onePartner, onePartnerOtherRatingByThisUserInfo }) => {
    const [modalActive, setModalActive] = useState(false);
    const { Partner } = useContext(PartnerContext);
    const { Translate } = useContext(TranslateContext);
    const [modalFunction, setModalFunction] = useState("");
    const [partnerGroups, setPartnerGroups] = useState([1]);

    useEffect(() => {
      setPartnerGroups(
        Partner.groups
          .filter((el) => el.partners.includes(onePartnerInfo.id))
          .map((el) => el.dataValues.id)
      );
    }, [Partner.groups]);

    return (
      <>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          {modalFunction === "partnerInfo" ? (
            <PartnerModalContent
              setModalActive={setModalActive}
              onePartnerInfo={onePartnerInfo}
              onePartner={onePartner}
            />
          ) : modalFunction === "groups" ? (
            <PartnerGroupModalContent
              setModalActive={setModalActive}
              onePartnerInfo={onePartnerInfo}
            />
          ) : (
            <></>
          )}
        </Modal>
        {onePartner && (
          <tr>
            <OrderTd>{onePartnerInfo.id}</OrderTd>
            <OrderTd
              style={{
                backgroundColor:
                  onePartner?.status === "normal"
                    ? "rgb(241,196,15,0.6)"
                    : onePartner.status === "priority"
                    ? "rgb(129, 199, 132,0.6)"
                    : onePartner.status === "blocked"
                    ? "rgb(254, 111, 103,0.6)"
                    : "",
                cursor: "pointer",
              }}
              onClick={() => {
                setModalFunction("partnerInfo");
                setModalActive(true);
              }}
            >
              {!onePartnerInfo.legal ? (
                onePartnerInfo.email
              ) : onePartnerInfo.legal === "person" ? (
                <>{onePartnerInfo.name_surname_fathersname}</>
              ) : (
                <>{onePartnerInfo.company_name}</>
              )}
            </OrderTd>
            <OrderTd>{onePartnerInfo.phone}</OrderTd>
            <OrderTd>
              {!onePartnerInfo.in_time_amount &&
              !onePartnerInfo.solvency_amount &&
              !onePartnerInfo.politeness_amount &&
              !onePartnerInfo.facilities_amount
                ? SetNativeTranslate(Translate.language, {}, "no_ratings")
                : Math.floor(onePartnerInfo.total_rating * 100) / 100}
            </OrderTd>
            <OrderTd
              onClick={() => {
                if (Partner.groups.length !== 0) {
                  setModalFunction("groups");
                  setModalActive(true);
                }
              }}
              style={{
                cursor: Partner.groups.length !== 0 ? "pointer" : "default",
                backgroundColor:
                  partnerGroups.length > 0 ? "rgb(241,196,15,0.6)" : "",
              }}
            >
              {Partner.groups.length === 0
                ? SetNativeTranslate(Translate.language, {}, "no_groups")
                : partnerGroups.length === 0
                ? SetNativeTranslate(
                    Translate.language,
                    {},
                    "can_choose_groups"
                  )
                : `${partnerGroups.length}`}
            </OrderTd>
            <OrderTd>
              {onePartner.status === "normal"
                ? SetNativeTranslate(Translate.language, {}, "partner_normal")
                : onePartner.status === "blocked"
                ? SetNativeTranslate(Translate.language, {}, "partner_blocked")
                : onePartner.status === "priority"
                ? SetNativeTranslate(Translate.language, {}, "partner_favorite")
                : ""}
            </OrderTd>
            <OtherRatingComponent
              onePartnerInfo={onePartnerInfo}
              onePartnerOtherRatingByThisUserInfo={
                onePartnerOtherRatingByThisUserInfo
              }
              onePartner={onePartner}
            />
          </tr>
        )}
      </>
    );
  }
);

export default PartnerItem;
