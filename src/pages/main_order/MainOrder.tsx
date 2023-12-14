import React, { useState } from "react";
import classes from "./MainOrder.module.sass";
import OrderForm from "../../common/components/orderForm/OrderForm";

const MainOrder = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  return (
    <div className={classes.Container}>
      <OrderForm />
    </div>
  );
};

export default MainOrder;
