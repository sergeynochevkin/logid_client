//@ts-nocheck
import { useContext, useEffect, useState } from "react";
import { OrderContext } from '../../../..';
import { ComponentFunctionContext } from '../../../..';

export const useFiles = () => {
    const { order } = useContext(OrderContext);
    const { ComponentFunction } = useContext(ComponentFunctionContext);

    const [files, setFiles] = useState<[]>(order.files);
    const [pairs, setPairs] = useState<[]>(order.pairs);


    
  let dataTransfer = new DataTransfer();

  const dataInit = (files: File[]) => {
    files.forEach((file: File) => {
      dataTransfer.items.add(file);
    });

    return dataTransfer.files;
  };

  useEffect(() => {
    if (
      ComponentFunction.orderFormFunction !== "newOrder" &&
      order.files.length > 0
    ) {
      setPairs(order.pairs);
      setFiles(order.files);
    }
  }, []);

    return {
        files,
        setFiles,
        pairs,
        setPairs,
        dataInit,
    }
};
