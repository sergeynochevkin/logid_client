import { observer } from "mobx-react-lite";
import React from "react";

import MainBanner from "../banner/MainBanner";

import "./Main.css";
import "../../App.css";
import "../board/Board.css";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";

import AdminConsoleItem from "./AdminConsoleItem";
import classes from "./Main.module.sass";
import AdBlock from "./components/adBlock/AdBlock";
import { useMain } from "./hooks/useMain";

const Main = observer(() => {
  const { Ad, Translate, callRequested, setCallRequested, Setting } = useMain();

  return (
    <div className={`page_container ${Setting.app_theme}`}>
      <title>
        logid - биржа грузоперевозок и курьерских заказов, доска объявлений
        перевозчиков и курьеров, инструмент управления доставкой для автопарков
        и курьерских служб
      </title>

      <>
        <MainBanner
          callRequested={callRequested}
          setCallRequested={setCallRequested}
        />
        {Ad.carriers_count && Ad.customers_count && Ad.finished_orders_count ? (
          <div className="adv_rate_section">
            <AdminConsoleItem
              type={"value"}
              influence={"positive"}
              plan={Ad.carriers_count}
              currentRate={Ad.carriers_count}
              comment={SetNativeTranslate(
                Translate.language,
                {
                  russian: ["Активных перевозчиков"],
                  english: ["Active carriers"],
                  spanish: ["Portadores activos"],
                  turkish: ["Aktif taşıyıcılar"],
                  сhinese: ["活跃运营商"],
                  hindi: ["सक्रिय वाहक"],
                },
                ""
              )}
            />
            <AdminConsoleItem
              type={"value"}
              influence={"positive"}
              plan={Ad.customers_count}
              currentRate={Ad.customers_count}
              comment={SetNativeTranslate(
                Translate.language,
                {
                  russian: ["Активных заказчиков"],
                  english: ["Active customers"],
                  spanish: ["Clientes activos"],
                  turkish: ["Aktif müşteriler"],
                  сhinese: ["活跃客户"],
                  hindi: ["सक्रिय ग्राहक"],
                },
                ""
              )}
            />
            <AdminConsoleItem
              type={"value"}
              influence={"positive"}
              plan={Ad.finished_orders_count}
              currentRate={Ad.finished_orders_count}
              comment={SetNativeTranslate(
                Translate.language,
                {
                  russian: ["Завершенных заказов"],
                  english: ["Completed orders"],
                  spanish: ["Orden completada"],
                  turkish: ["Sipariş tamamlandı"],
                  сhinese: ["已完成订单"],
                  hindi: ["पूर्ण आदेश"],
                },
                ""
              )}
            />
          </div>
        ) : (
          <></>
        )}

        <AdBlock />
      </>
    </div>
  );
});

export default Main;
