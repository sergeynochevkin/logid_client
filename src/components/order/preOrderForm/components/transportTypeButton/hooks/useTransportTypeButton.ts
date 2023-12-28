import React from "react";
import { PreOrderData } from "../../../types";

export const useTransportTypeButton = (
  preorder: PreOrderData,
  setPreOrder: React.Dispatch<React.SetStateAction<PreOrderData>>
) => {
  const typeSelectHandler = (value: string) => {
    setPreOrder({ ...preorder, type: value });
  };

  return { typeSelectHandler };
};
