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
          {/* <div className="text_middle dark">
            {SetNativeTranslate(Translate.language, {
              russian: [
                "Биржа грузоперевозок и курьерских заказов, доска объявлений перевозчиков и курьеров, инструмент управления доставкой для автопарков и курьерских служб",
              ],
              english: [
                "Exchange of freight and courier orders, bulletin board for carriers and couriers, delivery management tool for fleets and courier services",
              ],
              spanish: [
                "Intercambio de pedidos de carga y mensajería, tablón de anuncios para transportistas y mensajería, herramienta de gestión de entregas para flotas y servicios de mensajería",
              ],
              turkish: [
                "Navlun ve kurye siparişlerinin değişimi, taşıyıcılar ve kuryeler için ilan panosu, filolar ve kurye hizmetleri için teslimat yönetimi aracı",
              ],
              сhinese: [
                "货运和快递订单交换、承运人和快递公司公告板、车队和快递服务的配送管理工具",
              ],
              hindi: [
                "माल ढुलाई और कूरियर आदेशों का आदान-प्रदान, वाहक और कूरियर के लिए बुलेटिन बोर्ड, बेड़े और कूरियर सेवाओं के लिए वितरण प्रबंधन उपकरण",
              ],
            })}
          </div> */}

          <div  className={classes.MainSlogan}>
          {SetNativeTranslate(Translate.language,{
            russian: ["Биржа грузоперевозок и курьерских заказов"],
              english: ["Exchange of cargo transportation and courier orders"],
              spanish: ["Intercambio de transporte de carga y pedidos de mensajería"],
              turkish: ["Kargo taşımacılığı ve kurye siparişlerinin değişimi"],
              сhinese: ["货物运输及快递单交换"],
              hindi: ["कार्गो परिवहन और कूरियर ऑर्डर का आदान-प्रदान"],
          })}          
        </div>
          <PreOrderForm />

          {/* <FastSignUp /> */}
        </div>
      ) : (
        <>
          <div className={classes.TextMiddle}>
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
        </>
      )}
    </div>
  );
});

export default BannerActionContent;
