import React from "react";
import classes from "./Carrier.module.sass";
//@ts-ignore
import MainBanner from "../../components/banner/MainBanner";
import AdBlock from "../../components/adBlock/AdBlock";
import AdminConsole from "../../components/adminConsole/AdminConsole";
import { useCarrier } from "./hooks/useCarrier";
//@ts-ignore
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';

const Carrier = () => {
  const { Translate } = useCarrier();

  return (
    <div className={classes.Container}>
      <MainBanner
        slogan={SetNativeTranslate(Translate.language, {
          russian: ["Получайте уведомления о доступных перевозках"],
          english: ["Receive notifications about available transportation"],
          spanish: [
            "Recibir notificaciones sobre transporte disponible.",
          ],
          turkish: ["Mevcut ulaşımla ilgili bildirimler alın"],
          сhinese: ["接收有关可用交通的通知"],
          hindi: ["उपलब्ध परिवहन के बारे में सूचनाएं प्राप्त करें"],
        })}
      />
      {/* <AdminConsole /> */}
      <AdBlock />
    </div>
  );
};

export default Carrier;
