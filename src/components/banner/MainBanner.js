import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import classes from "./Banner.module.sass";
import image from '../../assets/girl_banner.webp'
import {
  ComponentFunctionContext,
  LinkContext,
  SettingContext,
  TranslateContext,
  UserContext,
} from "../..";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import BannerActionContent from "./BannerActionContent";
import { AdButton } from "../../components/ui/button/AdButton";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../../utils/consts";
import Modal from "../../components/ui/modal/Modal";
import Auth from "../../components/auth/Auth";
import Slider from "../../components/ui/slider/Slider";
import "../../App.css";
import PreOrderForm from "../../components/order/preOrderForm/PreOrderForm";

const MainBanner = observer(({ callRequested, setCallRequested, slogan }) => {
  const { Setting } = useContext(SettingContext);
  const { Translate } = useContext(TranslateContext);
  const { link } = useContext(LinkContext);
  const { user } = useContext(UserContext);
  const { ComponentFunction } = useContext(ComponentFunctionContext);
  const navigate = useNavigate();
  const [modalActive1, setModalActive1] = useState(false);
  const [action, setAction] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get("role");

  const addAdAction = (option) => {
    link.setAfterActions(true, option);
    if (user.isAuth) {
      if (option === "add_transport_form") {
        ComponentFunction.setPageFunction("transport");
      }
      navigate(USER_ROUTE);
    } else {
      setModalActive1(true);
    }
  };

  const images = [
    { id: 0, name: "partner", alt: "Partner card" },
    { id: 1, name: "transport", alt: "Transport screen" },
    { id: 2, name: "add_partner", alt: "Add partner screen" },
    { id: 3, name: "profile", alt: "Profile screen" },
    { id: 4, name: "canceled_orders", alt: "Canceled orders screen" },
    { id: 5, name: "orders_on_map", alt: "Order on map" },
    { id: 6, name: "order_form", alt: "New order form" },
    { id: 7, name: "new_order", alt: "New order screen" },
    { id: 8, name: "drivers", alt: "Drivers screen" },
    { id: 9, name: "board", alt: "Board screen" },
  ];

  return (
    <div className={classes.Container}>
      <div className={classes.BannerSection}>
        <BannerActionContent
          callRequested={callRequested}
          setCallRequested={setCallRequested}
          slogan={slogan}
        />
      </div>

      {role === "customer" && (
        <AdButton
          onClick={() => {
            setAction("add_order");
            addAdAction("add_order");
          }}
        >
          {SetNativeTranslate(Translate.language, {
            russian: ["Добавить заказ"],
            english: ["Add an order"],
            spanish: ["Añadir un pedido"],
            turkish: ["Sipariş ekle"],
            сhinese: ["添加订单"],
            hindi: ["एक ऑर्डर जोड़ें"],
          })}
        </AdButton>
      )}
      {role === "carrier" && (
        <AdButton
          onClick={() => {
            setAction("add_ad");
            addAdAction("add_transport_form");
          }}
        >
          {SetNativeTranslate(Translate.language, {
            russian: ["Добавить транспорт"],
            english: ["Add transport"],
            spanish: ["Añadir transporte"],
            turkish: ["Taşıma ekle"],
            сhinese: ["添加交通工具"],
            hindi: ["परिवहन जोड़ें"],
          })}
        </AdButton>
      )}

      <div className={classes.BannerSection}>
        {/* <Slider images={images} /> */}
 

        <img className={classes.MainImage} src={image}></img>
      </div>

      <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
        <Auth
          enterPoint={"isRegister"}
          modalActive={modalActive1}
          setModalActive={setModalActive1}
          after_action={{ action: action }}
        />
      </Modal>
    </div>
  );
});

export default MainBanner;
