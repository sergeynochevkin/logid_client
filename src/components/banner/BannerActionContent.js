import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import classes from "./Banner.module.sass";
import {
  SettingContext,
  TranslateContext,
  UserContext,
  UserInfoContext,
} from "../..";
import RatingView from "../../components/rating/RatingView";
import { FieldName } from "../../components/ui/page/FieldName";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import "../../App.css";
import PreOrderForm from "../../components/order/preOrderForm/PreOrderForm";

import "../../components/account/Account.css";
import FastSignUp from "../fastSignUp/FastSignUp";

const BannerActionContent = observer(({ slogan }) => {
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { Translate } = useContext(TranslateContext);
  const { Setting } = useContext(SettingContext);

  return (
    <div className={classes.BannerActionSection}>
      {!user.user.role ? (
        <div className={classes.TextSection}>
          <div className={classes.MainSlogan}>{slogan}</div>
          {/* <PreOrderForm /> */}
          <FastSignUp />
        </div>
      ) : (
        <div className={classes.RatingSection}>
          <div className={classes.MainSlogan}>
            {SetNativeTranslate(Translate.language, {
              russian: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, успешных доставок!`,
              ],
              english: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, happy deliveries!`,
              ],
              spanish: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, entregas exitosas!`,
              ],
              turkish: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, başarılı teslimatlar!`,
              ],
              сhinese: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, 交货愉快！`,
              ],
              hindi: [
                `${
                  UserInfo.userInfo.legal === "person"
                    ? UserInfo.userInfo.name_surname_fathersname
                    : UserInfo.userInfo.company_name
                    ? UserInfo.userInfo.company_name
                    : UserInfo.userInfo.email
                }, शुभ प्रसव!`,
              ],
            })}
          </div>
          <div
            className={
              Setting.app_theme === "light"
                ? "account_container"
                : "account_container account_container_dark"
            }
          >
            <FieldName>
              {SetNativeTranslate(Translate.language, {}, "your_rating")}
            </FieldName>
            <RatingView
              parent={"account"}
              onePartnerInfo={UserInfo.userInfo}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default BannerActionContent;
