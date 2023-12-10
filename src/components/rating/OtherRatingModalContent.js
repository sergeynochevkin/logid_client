import { observer } from "mobx-react-lite";
import React from "react";
import { updateOtherRating } from "../../http/ratingApi";
import { CardButton } from "../ui/button/CardButton";
import { CardColName } from "../ui/card/CardColName";
import { CardRow } from "../ui/card/CardRow";
import { VerticalContainer } from "../ui/page/VerticalContainer";
import { v4 } from "uuid";
import {
  FetcherContext,
  NotificationContext,
  TranslateContext,
  UserContext,
} from "../..";
import { useContext } from "react";

import { SetNativeTranslate } from "../../modules/SetNativeTranslate";

const OtherRatingModalContent = observer(
  ({
    formData,
    setFormData,
    setModalActive,
    onePartnerInfo,
    UserInfo,
    onePartner,
    onePartnerOtherRatingByThisUserInfo,
    formReset,
  }) => {
    const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { Notification } = useContext(NotificationContext);
    const { Translate } = useContext(TranslateContext);
    const { user } = useContext(UserContext);
    const { fetcher } = useContext(FetcherContext);
    formData.raterUserInfoId = UserInfo.userInfo.id;
    formData.ratedUserInfoId = onePartnerInfo.id;
    const rated_customer_solvency = SetNativeTranslate(
      Translate.language,
      {},
      "rated_customer_solvency"
    );
    const rated_carrier_solvency = SetNativeTranslate(
      Translate.language,
      {},
      "rated_carrier_solvency"
    );

    const click = async () => {
      try {
        await updateOtherRating(formData);
        Notification.addNotification([
          {
            id: v4(),
            type: "success",
            message: `${
              user.user.role === "carrier"
                ? rated_customer_solvency
                : rated_carrier_solvency
            }`,
          },
        ]);
        fetcher.setPartners(true);
        setModalActive(false);
      } catch (e) {
        alert(e.response.data.message);
      }
    };

    return (
      <VerticalContainer>
        <CardRow>
          <CardColName>{onePartnerInfo.id}</CardColName>
          <CardColName
            style={{
              backgroundColor:
                onePartner.status === "normal"
                  ? "rgb(241,196,15,0.3)"
                  : onePartner.status === "priority"
                  ? "rgb(129, 199, 132,0.3)"
                  : onePartner.status === "blocked"
                  ? "rgb(254, 111, 103,0.3)"
                  : "",
            }}
          >
            {onePartnerInfo.legal === "person" ? (
              <>{onePartnerInfo.name_surname_fathersname}</>
            ) : (
              <>{onePartnerInfo.company_name}</>
            )}
          </CardColName>
        </CardRow>
        <CardRow>
          <CardColName>
            {SetNativeTranslate(Translate.language, {}, "solvency")}
          </CardColName>
          {ratingScale.map((grade) => (
            <CardColName
              value={formData.solvency}
              onClick={() => {
                setFormData({ ...formData, solvency: grade });
              }}
              key={grade}
              style={{
                cursor: formData.solvency !== grade ? "pointer" : "default",
                backgroundColor:
                  formData.solvency === grade ? "rgb(255, 186, 65, 0.3)" : "",
                padding: "5px",
              }}
            >
              {grade}
            </CardColName>
          ))}
        </CardRow>
        <CardRow>
          <CardButton onClick={click}>
            {SetNativeTranslate(Translate.language, {}, "rate")}
          </CardButton>
          <CardButton
            onClick={() => {
              setModalActive(false);
              formReset();
            }}
          >
            {SetNativeTranslate(Translate.language, {}, "close")}
          </CardButton>
        </CardRow>
      </VerticalContainer>
    );
  }
);

export default OtherRatingModalContent;
