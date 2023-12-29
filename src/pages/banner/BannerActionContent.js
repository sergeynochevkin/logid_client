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

const BannerActionContent = observer(() => {
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { Translate } = useContext(TranslateContext);
  const { Setting } = useContext(SettingContext);

  return (
    <div className={classes.BannerActionSection}>
      {!user.user.role ? (
        <div className={classes.TextSection}>
          <div className={classes.MainSlogan}>
            {SetNativeTranslate(Translate.language, {
              russian: ["Биржа грузоперевозок и курьерских заказов"],
              english: ["Exchange of cargo transportation and courier orders"],
              spanish: [
                "Intercambio de transporte de carga y pedidos de mensajería",
              ],
              turkish: ["Kargo taşımacılığı ve kurye siparişlerinin değişimi"],
              сhinese: ["货物运输及快递单交换"],
              hindi: ["कार्गो परिवहन और कूरियर ऑर्डर का आदान-प्रदान"],
            })}
          </div>
          <PreOrderForm />
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
