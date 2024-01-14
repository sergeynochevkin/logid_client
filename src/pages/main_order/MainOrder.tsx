import React, { useState } from "react";
import classes from "./MainOrder.module.sass";
//@ts-ignore
import OrderForm from "../../components/order/orderForm/OrderForm";
import { useMainOrder } from "./hooks/useMainOrder";

const MainOrder = () => {
  const {} = useMainOrder();

  return (
    <div className={classes.Container}>
      <OrderForm />
    </div>
  );
};

export default MainOrder;
