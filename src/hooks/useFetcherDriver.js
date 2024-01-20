import { useContext, useEffect } from "react";
import { DriverContext, FetcherContext, OrderContext, UserContext } from "..";
import { fetchDrivers } from "../http/userAPI";
import useInterval from "@use-it/interval";

export const useFetcherDriver = (driverImageHandler) => {
  const { Driver } = useContext(DriverContext);
  const { user } = useContext(UserContext);
  const { fetcher } = useContext(FetcherContext);
  const { order } = useContext(OrderContext);

  async function fetch() {
    await fetchDrivers(user.user.id).then((data) => {
      Driver.setDrivers(data);
      driverImageHandler(data);
    });
  }
  useEffect(() => {
    fetcher.drivers && fetch();
    fetcher.setDrivers(false);
  }, [fetcher.drivers]);
  useEffect(() => {
    if (user.user.role === "customer" || user.user.role === "carrier")
      fetcher.drivers && fetch();
    fetcher.setDrivers(false);
  }, [order.divided_orders.inWork]);

  useInterval(() => {
    if (user.user.role === "carrier" || user.user.role === "customer") {
      !fetcher.drivers && fetcher.setDrivers(true);
    }
  }, 60000);

  return [];
};
