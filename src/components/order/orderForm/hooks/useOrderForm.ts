//@ts-nocheck
import { useContext, useEffect, useState } from "react";
import {
  ComponentFunctionContext,
  FetcherContext,
  LinkContext,
  PartnerContext,
  UserContext,
  UserInfoContext,
} from "../../../..";

export const useOrderForm = (
  setModalActive,
) => {
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { ComponentFunction } = useContext(ComponentFunctionContext);
  const { link } = useContext(LinkContext);
  const { Partner } = useContext(PartnerContext);
  const { fetcher } = useContext(FetcherContext);


  const [recommended, setRecommended] = useState<boolean>(false);
  const [parent] = useState<string>("orderForm");

  

  useEffect(() => {
    fetcher.setPartners(true);
  }, []);

  useEffect(() => {
    if (link.after_actions.add_order) {
      if (!UserInfo.userInfo.legal) {
        setModalActive(true);
        link.setAfterActions(false, "add_order");
      }
    }
  }, []);

  return {
    user,
    ComponentFunction,
    Partner,
    recommended,
    setRecommended,
    parent
  };
};
