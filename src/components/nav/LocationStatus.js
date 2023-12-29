import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AdressContext, SettingContext } from "../..";
import location_off from "../../assets/icons/location_off.webp";
import location_off_dark from "../../assets/icons/location_off_dark.webp";
import location_on from "../../assets/icons/location_on.webp";
import location_on_dark from "../../assets/icons/location_on_dark.webp";
import location_in_progress from "../../assets/icons/location_in_progress.webp";
import location_in_progress_dark from "../../assets/icons/location_in_progress_dark.webp";

const LocationStatus = observer(() => {
  const { Adress } = useContext(AdressContext);
  const { Setting } = useContext(SettingContext);

  return (
    <>
      <div className="internet_speed_container location">
        <img
          className="internet_speed_icon"
          onClick={() => {
            if (
              Adress.location.status === "not_enabled" ||
              Adress.location.status === "in_progress"
            ) {
              Adress.setLocation(true, "fetch");
            }
          }}
          style={{
            cursor:
              Adress.location.status === "not_enabled" ||
              Adress.location.status === "in_progress"
                ? "pointer"
                : "",
          }}
          src={
            Setting.app_theme === "light"
              ? Adress.location.status === "not_enabled"
                ? location_off
                : Adress.location.status === "detected"
                ? location_on
                : location_in_progress
              : Adress.location.status === "not_enabled"
              ? location_off_dark
              : Adress.location.status === "detected"
              ? location_on_dark
              : location_in_progress_dark
          }
        ></img>
      </div>
    </>
  );
});

export default LocationStatus;
