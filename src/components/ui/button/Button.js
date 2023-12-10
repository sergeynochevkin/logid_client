import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { FetcherContext, SettingContext } from "../../..";
import ButtonLoader from "../loader/ButtonLoader";

const Button = observer(({ children, ...props }) => {
  const { Setting } = useContext(SettingContext);
  const { fetcher } = useContext(FetcherContext);

  return (
    <button
      disabled={fetcher.loading}
      className={
        Setting.app_theme === "light" ? "custom_button" : "custom_button dark"
      }
      {...props}
    >
      {fetcher.loading ? <ButtonLoader parent={"button"} /> : children}
    </button>
  );
});

export { Button };
