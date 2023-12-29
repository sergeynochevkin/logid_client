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
import { useLocation } from "react-router-dom";

export const useOrderForm = (
  setModalActive,
) => {
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { ComponentFunction } = useContext(ComponentFunctionContext);
  const { link } = useContext(LinkContext);
  const { Partner } = useContext(PartnerContext);
  const { fetcher } = useContext(FetcherContext);
  const location = useLocation()
  const [reCapchaChecked, setReCapchaChecked] = useState(false);


  const [recommended, setRecommended] = useState<boolean>(false);
  const [parent] = useState<string>("orderForm");

  function onRecaptchaChange() {
    setReCapchaChecked(true);
  }


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
    parent,
    location,
    onRecaptchaChange,
    reCapchaChecked
  };
};
