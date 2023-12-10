import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { FetcherContext, SettingContext } from "../../..";
import ButtonLoader from "../loader/ButtonLoader";

const AdButton = observer(({ children, ...props }) => {
  const { Setting } = useContext(SettingContext);
  const { fetcher } = useContext(FetcherContext);

  return (
    <div
      disabled={fetcher.loading}
      className={`ad_button ${Setting.app_them}`}
      {...props}
    >
      {fetcher.loading ? <ButtonLoader parent={"button"} /> : children}
    </div>
  );
});

export { AdButton };
