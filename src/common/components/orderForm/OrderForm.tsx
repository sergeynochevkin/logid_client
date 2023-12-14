import React from "react";
import classes from "./OrderForm.module.sass";
import OrderFormPoint from "./components/orderFormPoint/OrderFormPoint";

const OrderForm = () => {
  return <div className={classes.Container}>
    <OrderFormPoint/>
  </div>;
};

export default OrderForm;
