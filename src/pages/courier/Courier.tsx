import React from "react";
import classes from "./Courier.module.sass";
//@ts-ignore
import MainBanner from "../../components/banner/MainBanner";
import AdBlock from "../../components/adBlock/AdBlock";
import AdminConsole from "../../components/adminConsole/AdminConsole";
//@ts-ignore
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import { useCourier } from "./hooks/useCourier";

const Courier = () => {
const {Translate}  = useCourier()


  return (
    <div className={classes.Container}>
      <MainBanner
        slogan={SetNativeTranslate(Translate.language, {
          russian: ["Получайте уведомления о новых заказах"],
          english: ["Receive notifications about new orders"],
          spanish: [
            "Recibir notificaciones sobre nuevos pedidos",
          ],
          turkish: ["Yeni siparişlerle ilgili bildirimler alın"],
          сhinese: ["接收有关新订单的通知"],
          hindi: ["नए आदेशों के बारे में सूचनाएं प्राप्त करें"],
        })}
      />
      {/* <AdminConsole/> */}
      <AdBlock />
    </div>
  );
};

export default Courier;
