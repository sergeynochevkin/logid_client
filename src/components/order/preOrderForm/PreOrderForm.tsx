import React from "react";
import classes from "./PreOrderForm.module.sass";
//@ts-ignore
import { Input } from "../../ui/form/Input";
//@ts-ignore
import { Button } from "../../ui/button/Button";
import { usePreOrderForm } from "./hooks/usePreOrderForm";
import TransportTypeButton from "./components/transportTypeButton/TransportTypeButton";
import { observer } from "mobx-react-lite";

const PreOrderForm = observer(() => {
  const { toOrderForm, disabled, dataReset, preOrder, setPreOrder } =
    usePreOrderForm();

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>Рассчитайте и закажите доставку</div>
      <div className={classes.Inputs}>
        <div>
          <Input
            id={"point_1"}
            name="point_1"
            placeholder="Откуда"
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
              ? "Выберите адрес из списка"
              : ""}
          </div>
        </div>

        <div>
          <Input
            id={"point_2"}
            name="point_2"
            placeholder="Куда"
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
              ? "Выберите адрес из списка"
              : ""}
          </div>
        </div>
        <div className={classes.TypeButtonsContainer}>
          <TransportTypeButton
            title="Пешком"
            value={"walk"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
          <TransportTypeButton
            title="Легковой"
            value={"car"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
          <TransportTypeButton
            title="Грузовой"
            value={"truck"}
            preOrder={preOrder}
            setPreOrder={setPreOrder}
          />
        </div>
      </div>

      <Button disabled={disabled} onClick={toOrderForm}>
        Рассчитать стоимость доставки
      </Button>
    </div>
  );
});

export default PreOrderForm;
