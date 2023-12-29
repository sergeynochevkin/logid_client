import { useContext } from "react";

import {
    AdContext,
    FetcherContext,
    NotificationContext,
    SettingContext,
    TranslateContext,
    //@ts-ignore
  } from "../../..";

export const useAdminConsole = () => {
  //@ts-ignore
  const { Ad } = useContext(AdContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);

  return {Ad, Translate};
};
