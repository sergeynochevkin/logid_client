import React from "react";
import { useAdminConsole } from "./hooks/useAdminConsole";
//@ts-ignore
import AdminConsoleItem from '../../pages/main/components/adminConsole/AdminConsoleItem';
//@ts-ignore
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import classes from './AdminConsole.module.sass'

const AdminConsole = () => {
  const {Ad, Translate} = useAdminConsole()
  
    return (
    
    <div>
      {Ad.carriers_count && Ad.customers_count && Ad.finished_orders_count ? (
        <div className={classes.AdminConsoleItemsContainer}>
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
    </div>
  );
};

export default AdminConsole;
