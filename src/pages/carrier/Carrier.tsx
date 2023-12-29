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
          russian: ["Биржа грузоперевозок и курьерских заказов"],
          english: ["Exchange of cargo transportation and courier orders"],
          spanish: [
            "Intercambio de transporte de carga y pedidos de mensajería",
          ],
          turkish: ["Kargo taşımacılığı ve kurye siparişlerinin değişimi"],
          сhinese: ["货物运输及快递单交换"],
          hindi: ["कार्गो परिवहन और कूरियर ऑर्डर का आदान-प्रदान"],
        })}
      />
      <AdminConsole />
      <AdBlock />
    </div>
  );
};

export default Carrier;
