import { observer } from "mobx-react-lite";
import React from "react";
import "../../App.css";
import "../board/Board.css";

import { useMain } from "./hooks/useMain";
import AdBlock from "../../components/adBlock/AdBlock";
import MainBanner from "../../components/banner/MainBanner";
import AdminConsole from "../../components/adminConsole/AdminConsole";
import classes from "./Main.module.sass";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";

const Main = observer(() => {
  const { callRequested, setCallRequested, Translate } = useMain();

  return (
    <div className={classes.Container}>
      <title>
        logid - биржа грузоперевозок и курьерских заказов, доска объявлений
        перевозчиков и курьеров, инструмент управления доставкой для автопарков
        и курьерских служб
      </title>

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
        callRequested={callRequested}
        setCallRequested={setCallRequested}
      />

      {/* <AdminConsole /> */}

      <AdBlock />
    </div>
  );
});

export default Main;
