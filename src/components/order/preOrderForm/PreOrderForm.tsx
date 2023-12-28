import React from "react";
import classes from "./PreOrderForm.module.sass";
//@ts-ignore
import { Input } from "../../ui/form/Input";
//@ts-ignore
import { Button } from "../../ui/button/Button";
import { usePreOrderForm } from "./hooks/usePreOrderForm";
import TransportTypeButton from "./components/transportTypeButton/TransportTypeButton";
import { observer } from "mobx-react-lite";
//@ts-ignore
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";

const PreOrderForm = observer(() => {
  const { toOrderForm, disabled, dataReset, preOrder, setPreOrder, Translate } =
    usePreOrderForm();

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        {SetNativeTranslate(Translate.language, {
          russian: ["Рассчитайте и закажите доставку"],
          english: ["Calculate and order delivery"],
          spanish: ["Calcular y ordenar la entrega"],
          turkish: ["Teslimatı hesaplayın ve sipariş edin"],
          сhinese: ["计算并订购交货"],
          hindi: ["गणना करें और डिलीवरी का ऑर्डर दें"],
        })}
      </div>
      <div className={classes.Inputs}>
        <div>
          <Input
            id={"point_1"}
            name="point_1"
            placeholder={SetNativeTranslate(Translate.language, {
              russian: ["Откуда"],
              english: ["Wherefrom"],
              spanish: ["De donde"],
              turkish: ["Nereden"],
              сhinese: ["从哪里来"],
              hindi: ["कहां से"],
            })}
            onChange={() => {
              dataReset("point_1");
            }}
            style={{
              borderLeft: preOrder["point_1"].isEmptyError
                ? " solid 1px rgb(254, 111, 103,0.8)"
                : "",
            }}
          />
          <div className={classes.FieldError}>
            {preOrder["point_1"].isEmptyError && preOrder["point_1"].isDirty
              ? SetNativeTranslate(Translate.language, {
                  russian: ["Выберите адрес из списка"],
                  english: ["Select an address from the list"],
                  spanish: ["Seleccione una dirección de la lista"],
                  turkish: ["Listeden bir adres seçin"],
                  сhinese: ["从列表中选择一个地址"],
                  hindi: ["सूची से एक पता चुनें"],
                })
              : ""}
          </div>
        </div>

        <div>
          <Input
            id={"point_2"}
            name="point_2"
            placeholder={SetNativeTranslate(Translate.language, {
              russian: ["Куда"],
              english: ["Whereto"],
              spanish: ["A donde"],
              turkish: ["Nereye"],
              сhinese: ["去哪儿"],
              hindi: ["कहाँ जाना है"],
            })}
            onChange={() => {
              dataReset("point_2");
            }}
            style={{
              borderLeft: preOrder["point_2"].isEmptyError
                ? " solid 1px rgb(254, 111, 103,0.8)"
                : "",
            }}
          />
          <div className={classes.FieldError}>
            {preOrder["point_2"].isEmptyError && preOrder["point_2"].isDirty
              ? SetNativeTranslate(Translate.language, {
                  russian: ["Выберите адрес из списка"],
                  english: ["Select an address from the list"],
                  spanish: ["Seleccione una dirección de la lista"],
                  turkish: ["Listeden bir adres seçin"],
                  сhinese: ["从列表中选择一个地址"],
                  hindi: ["सूची से एक पता चुनें"],
                })
              : ""}
          </div>
        </div>
        <div className={classes.TypeButtonsContainer}>
          <TransportTypeButton
            title={SetNativeTranslate(Translate.language, {
              russian: ["Пешком"],
              english: ["Walk"],
              spanish: ["Caminar"],
              turkish: ["Yürümek"],
              сhinese: ["走"],
              hindi: ["टहलना"],
            })}
            value={"walk"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
          <TransportTypeButton
            title={SetNativeTranslate(Translate.language, {
              russian: ["Легковой"],
              english: ["Car"],
              spanish: ["Auto"],
              turkish: ["Araba"],
              сhinese: ["车"],
              hindi: ["कार"],
            })}
            value={"car"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
          <TransportTypeButton
            title={SetNativeTranslate(Translate.language, {
              russian: ["Грузовой"],
              english: ["Truck"],
              spanish: ["Camión"],
              turkish: ["Kamyon"],
              сhinese: ["卡车"],
              hindi: ["ट्रक"],
            })}
            value={"truck"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
        </div>
      </div>

      <Button disabled={disabled} onClick={toOrderForm}>
      {SetNativeTranslate(Translate.language, {
              russian: ["Рассчитать стоимость доставки"],
              english: ["Calculate shipping cost"],
              spanish: ["Calcular el costo de envío"],
              turkish: ["Gönderim maliyetini hesaplayın"],
              сhinese: ["计算运费"],
              hindi: ["शिपिंग लागत की गणना करें"],
            })}
      </Button>
    </div>
  );
});

export default PreOrderForm;
