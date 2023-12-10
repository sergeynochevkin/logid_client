import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ManagementContext } from "../../..";
import AnaliticsReportItem from "./AnaliticsReportItem";
import "../../../App.css";

const AnaliticsReport = observer(() => {
  const { Management } = useContext(ManagementContext);
  const [items, setItems] = useState([]);

  const sortItems = (a, b) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  };
  const dataHandler = () => {
    let data = [];
    for (const city of new Set(
      Management.users
        .filter(
          (el) => el.user_info.city && Management.report_roles.includes(el.role)
        )
        .map((el) => el.user_info.city)
    )) {
      let obj = {
        id: undefined,
        name: "",
        count: 0,
      };
      obj.id = data.length + 1;
      obj.name = city;
      obj.count = Management.users
        .filter((el) => Management.report_roles.includes(el.role))
        .filter((el) => el.user_info.city === city).length;
      data.push(obj);
    }
    setItems([...data]);
  };
  const transportsDataHandler = () => {
    let data = [];
    let userInfos = Management.users
      .filter(
        (el) => el.user_info.city && Management.report_roles.includes(el.role)
      )
      .map((el) => el.user_info);

    for (const city of new Set(userInfos.map((el) => el.city))) {
      let cityUserInfoIds = userInfos
        .filter((el) => el.city === city)
        .map((el) => el.id);

      let transports = Management.transports.filter((el) =>
        cityUserInfoIds.includes(el.userInfoId)
      );

      let obj = {
        id: undefined,
        name: "",
        count: 0,
        for_courier_delivery: 0,
        for_cargo_delivery: 0,
        walk: 0,
        bike: 0,
        electric_scooter: 0,
        scooter: 0,
        car: 0,
        combi: 0,
        minibus: 0,
        truck: 0,
      };
      obj.id = data.length + 1;
      obj.name = city;
      obj.count = transports.length;
      obj.walk = transports.filter((el) => el.type === "walk").length;
      obj.bike = transports.filter((el) => el.type === "bike").length;
      obj.electric_scooter = transports.filter(
        (el) => el.type === "electric_scooter"
      ).length;
      obj.scooter = transports.filter((el) => el.type === "scooter").length;
      obj.car = transports.filter((el) => el.type === "car").length;
      obj.combi = transports.filter((el) => el.type === "combi").length;
      obj.minibus = transports.filter((el) => el.type === "minibus").length;
      obj.truck = transports.filter((el) => el.type === "truck").length;
      obj.for_courier_delivery =
        obj.walk + obj.bike + obj.electric_scooter + obj.scooter + obj.car;
      obj.for_cargo_delivery = obj.minibus + obj.combi + obj.truck;
      data.push(obj);
    }
    setItems([...data]);
  };

  useEffect(() => {
    if (
      Management.statistics_component_function === "user" ||
      Management.statistics_component_function === "carrier" ||
      Management.statistics_component_function === "customer"
    ) {
      dataHandler();
    }
    if (Management.statistics_component_function === "transports") {
      transportsDataHandler();
    }
  }, []);

  return (
    <div
      className={`management_wrapper ${
        Management.statistics_component_function !== "transports" && "column"
      }`}
    >
      {items.sort(sortItems).map((el) => (
        <AnaliticsReportItem key={el.id} oneItem={el} />
      ))}
    </div>
  );
});

export default AnaliticsReport;
