//@ts-nocheck
import { useContext } from "react";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { TranslateContext } from "../../..";

export const useMapComponentTranslate = () => {
  const { Translate } = useContext(TranslateContext);

  const Order = SetNativeTranslate(Translate.language, {}, "order");
  const Auction = SetNativeTranslate(Translate.language, {}, "auction");
  const cost = SetNativeTranslate(Translate.language, {}, "cost");
  const arrival_time_field_name = SetNativeTranslate(
    Translate.language,
    {},
    "arrival_time_field_name"
  );
  const start = SetNativeTranslate(Translate.language, {}, "start");
  const finish = SetNativeTranslate(Translate.language, {}, "finish");
  const Distance = SetNativeTranslate(Translate.language, {}, "distance");
  const go_to_order = SetNativeTranslate(Translate.language, {}, "go_to_order");
  const go_to_auction = SetNativeTranslate(
    Translate.language,
    {},
    "go_to_auction"
  );
  const points_in_the_order = SetNativeTranslate(
    Translate.language,
    {},
    "points_in_the_order"
  );

  return {
    Order,
    Auction,
    cost,
    arrival_time_field_name,
    start,
    finish,
    Distance,
    go_to_order,
    go_to_auction,
    points_in_the_order,
  };
};
