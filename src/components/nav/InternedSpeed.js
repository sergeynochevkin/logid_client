import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { LinkContext, SettingContext } from "../..";
import network_off from "../../assets/icons/network_off.webp";
import network_off_dark from "../../assets/icons/network_off_dark.webp";
import network_low from "../../assets/icons/network_low.webp";
import network_low_dark from "../../assets/icons/network_low_dark.webp";
import network_middle from "../../assets/icons/network_middle.webp";
import network_middle_dark from "../../assets/icons/network_middle_dark.webp";
import network_full from "../../assets/icons/network_full.webp";
import network_full_dark from "../../assets/icons/network_full_dark.webp";

const InternedSpeed = observer(() => {
  const { link } = useContext(LinkContext);
  const { Setting } = useContext(SettingContext);

  return (
    <>
      <div className="internet_speed_container">
        <img
          className="internet_speed_icon"
          src={
            Setting.app_theme === "light"
              ? !link.internet
                ? network_off
                : link.internet_speed < 5
                ? network_low
                : link.internet_speed < 20
                ? network_middle
                : network_full
              : !link.internet
              ? network_off_dark
              : link.internet_speed < 5
              ? network_low_dark
              : link.internet_speed < 20
              ? network_middle_dark
              : network_full_dark
          }
        ></img>
      </div>
    </>
  );
});

export default InternedSpeed;
