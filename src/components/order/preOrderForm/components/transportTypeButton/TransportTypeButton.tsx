import React from "react";
import classes from "./TransportTypeButton.module.sass";
import { useTransportTypeButton } from "./hooks/useTransportTypeButton";
import { observer } from "mobx-react-lite";
import { PreOrderData } from "../../types";


type Props = {
  title: string;
  value: string;
  preOrder: PreOrderData
  setPreOrder:React.Dispatch<React.SetStateAction<PreOrderData>>
};

const TransportTypeButton = observer(({ title, value, preOrder, setPreOrder }: Props) => {
  const {  typeSelectHandler } = useTransportTypeButton(preOrder, setPreOrder);

  return (
    <button
    onClick={()=>{
      typeSelectHandler(value)
    }}
      className={
        preOrder.type !== value
          ? classes.TypeButton
          : classes.TypeButtonSelected
      }
    >
      {title}
    </button>
  );
});

export default TransportTypeButton;
