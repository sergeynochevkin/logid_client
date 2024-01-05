import React, { Dispatch, SetStateAction } from "react";
//@ts-ignore
import { SetNativeTranslate } from "../../../../modules/SetNativeTranslate";
import { useLinks } from "./hooks/useLinks";
import {
  COURIER_ROUTE,
  CARRIER_ROUTE,
  BOARD_ROUTE,
  MAIN_ORDER_ROUTE,
  //@ts-ignore
} from "../../../../utils/consts";
import classes from "./Links.module.sass";

type Props = {
  parent?: string;
  setIsComponentVisible?: Dispatch<SetStateAction<boolean>>;
};

const Links = ({ parent, setIsComponentVisible }: Props) => {
  const { Translate, width, navigate, user } = useLinks();

  return (
    <div
      className={
        parent === "burger" ? classes.ButtonsBlockBurger : classes.ButtonsBlock
      }
    >
      {/* <button
                 disabled={location.pathname === DISPATCHER_ROUTE}
                className={classes.NavBarItem}
                onClick={() => {
                  navigate(DISPATCHER_ROUTE);
                  setIsComponentVisible && setIsComponentVisible(false)
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Стать диспетчером"],
                  english: ["Become a dispatcher"],
                  spanish: ["Conviértete en despachador"],
                  turkish: ["Gönderici olun"],
                  сhinese: ["成为调度员"],
                  hindi: ["डिस्पैचर बनें"],
                })}
              </button> */}
      {/* <button
                 disabled={location.pathname === BUSINESS_ROUTE}

                className={classes.NavBarItem}
                onClick={() => {
                  navigate(BUSINESS_ROUTE);
                  setIsComponentVisible && setIsComponentVisible(false)
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Доставка для бизнеса"],
                  english: ["Delivery for business"],
                  spanish: ["Entrega para negocios"],
                  turkish: ["İş için teslimat"],
                  сhinese: ["商业送货"],
                  hindi: ["व्यवसाय के लिए डिलिवरी"],
                })}
              </button> */}
      {/* <button
                 disabled={location.pathname === FLEET_ROUTE}

                className={classes.NavBarItem}
                onClick={() => {
                  navigate(FLEET_ROUTE);
                  setIsComponentVisible && setIsComponentVisible(false)
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Автопаркам"],
                  english: ["For fleets"],
                  spanish: ["Para flotas"],
                  turkish: ["Filolar için"],
                  сhinese: ["对于车队"],
                  hindi: ["बेड़े के लिए"],
                })}
              </button> */}

      {(width > 1200 && !parent && !user.isAuth) ||
      (width < 1200 && parent === "burger" && !user.isAuth) ? (
        <>
          <button
            disabled={location.pathname === COURIER_ROUTE}
            className={classes.NavBarItem}
            onClick={() => {
              navigate(COURIER_ROUTE);
              setIsComponentVisible && setIsComponentVisible(false)
            }}
          >
            {" "}
            {SetNativeTranslate(Translate.language, {
              russian: ["Стать курьером"],
              english: ["Become a courier"],
              spanish: ["Conviértete en mensajero"],
              turkish: ["Kurye ol"],
              сhinese: ["成为一名快递员"],
              hindi: ["एक कूरियर बनें"],
            })}
          </button>
          <button
            disabled={location.pathname === CARRIER_ROUTE}
            className={classes.NavBarItem}
            onClick={() => {
              navigate(CARRIER_ROUTE);
              setIsComponentVisible && setIsComponentVisible(false)
            }}
          >
            {SetNativeTranslate(Translate.language, {
              russian: ["Стать перевозчиком"],
              english: ["Become a carrier"],
              spanish: ["Conviértete en transportista"],
              turkish: ["Taşıyıcı olun"],
              сhinese: ["成为载体"],
              hindi: ["एक वाहक बनें"],
            })}
          </button>
        </>
      ) : (
        <></>
      )}

      <div className={classes.ButtonsBlock}>
        {(width > 600 && !parent && !user.isAuth) ||
        (width < 600 && parent === "burger" && !user.isAuth) ? (
          <>
            <button
              disabled={location.pathname === MAIN_ORDER_ROUTE}
              className={classes.NavBarItem}
              onClick={() => {
                navigate(MAIN_ORDER_ROUTE);
                setIsComponentVisible && setIsComponentVisible(false)
              }}
            >
              {SetNativeTranslate(Translate.language, {
                russian: ["Заказать доставку"],
                english: ["Order delivery"],
                spanish: ["Entrega del pedido"],
                turkish: ["Sipariş teslim"],
                сhinese: ["订单发货"],
                hindi: ["आदेश वितरण"],
              })}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      {(width > 600 && !parent) || (width < 600 && parent === "burger") ? (
        <>
          {" "}
          <button
            disabled={location.pathname === BOARD_ROUTE}
            className={classes.NavBarItem}
            onClick={() => {
              navigate(BOARD_ROUTE);
              setIsComponentVisible && setIsComponentVisible(false)
            }}
          >
            {SetNativeTranslate(Translate.language, {
              russian: ["Объявления перевозчиков"],
              english: ["Carrier announcements"],
              spanish: ["Anuncios del operador"],
              turkish: ["Operatör duyuruları"],
              сhinese: ["运营商公告"],
              hindi: ["वाहक घोषणाएँ"],
            })}
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Links;
