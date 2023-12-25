import React, { useContext } from "react";
import classes from "./AppWrapper.module.sass";
//@ts-ignore
import { SettingContext } from "..";
import { observer } from 'mobx-react-lite';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppWrapper = observer(({ children }: Props) => {
  //@ts-ignore
  const { Setting } = useContext(SettingContext);

  return (
    <div
      className={
        Setting.app_theme === "light"
          ? classes.Container
          : classes.ContainerDark
      }
    >
      {children}
    </div>
  );
});

export default AppWrapper;
