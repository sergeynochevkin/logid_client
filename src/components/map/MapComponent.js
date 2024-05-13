import React from "react";
import classes from "./MapComponent.module.sass";
import "./Map.css";
import { observer } from "mobx-react-lite";
import CitySelector from "./CitySelector";
import { setDistance } from "../../modules/setDistance";
import { setDuration } from "../../modules/setDuration";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { useMapComponent } from "./hooks/useMapComponent";
import { mapScaleSteps } from "./constants";
import { MAIN_ORDER_ROUTE } from "../../utils/consts";

const MapComponent = observer(
  ({
    pointFormData,
    formData,
    setFormData,
    setCalculate,
    setPointFormData,
    pointInitialValue,
    calculate,
    thisOrder,
    setRecommended,
  }) => {
    const {
      UserInfo,
      Transport,
      Limit,
      Setting,
      user,
      State,
      ComponentFunction,
      directionsResponse,
      distance,
      duration,
      setRefreshMap,
      Adress,
      Translate,
      calcAllCities,
      calcСityOrderBounds,
      calcBounds,
      clearRoute,
    } = useMapComponent(
      pointFormData,
      formData,
      setFormData,
      setCalculate,
      setPointFormData,
      pointInitialValue,
      calculate,
      thisOrder,
      setRecommended
    ); 

    return (
      <div className="map_container">
        <div id="map" className="map"></div>
        {ComponentFunction.PageFunction === "orderForm" || location.pathname === MAIN_ORDER_ROUTE &&  (
          <div className={"map_info_container"}>
            <div className={"button_container"}>
              {ComponentFunction.orderFormFunction === "newOrder" && (
                <button
                  className={
                    Setting.app_theme === "light"
                      ? "map_button"
                      : "map_button dark"
                  }
                  onClick={clearRoute}
                  disabled={!directionsResponse}
                >
                  {SetNativeTranslate(Translate.language, {}, "clear_route")}
                </button>
              )}
            </div>

            {distance && (
              <div
                className={
                  Setting.app_theme === "light"
                    ? "calculated_data_container"
                    : "calculated_data_container calculated_data_container_dark"
                }
              >
                <div className="calculated_data">
                  {`${SetNativeTranslate(
                    Translate.language,
                    {},
                    "distance"
                  )} ${setDistance(distance)} ${SetNativeTranslate(
                    Translate.language,
                    {},
                    Adress.country.distance
                  )}`}
                </div>
                <div className="calculated_data">{`${SetNativeTranslate(
                  Translate.language,
                  {},
                  "duration"
                )}
                             ${setDuration(duration)}
                            `}</div>
              </div>
            )}

            {Limit.user_limits.customer_new_order_range && (
              <div className={"scale_container"}>
                {mapScaleSteps
                  .filter(
                    (el) => el <= Limit.user_limits.customer_new_order_range
                  )
                  .map((step) => (
                    <div className="button_row" key={step}>
                      <button
                        className={
                          Setting.user_map_scale === step
                            ? "map_scale_button active only"
                            : Setting.app_theme === "light"
                            ? "map_scale_button only"
                            : "map_scale_button map_scale_button_dark only"
                        }
                        onClick={() => {
                          Setting.setUserMapScale(step);
                          Setting.setBoundsLimit(step / 100);
                          State.setUserStateField(
                            Setting.user_map_scale,
                            "user_map_scale",
                            UserInfo.userInfo.id
                          );
                          calcBounds();
                          setRefreshMap(true);
                        }}
                      >{`${step} ${SetNativeTranslate(
                        Translate.language,
                        {},
                        Adress.country.distance
                      )}`}</button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* for driver supervisor transport and self transport dependency */}
        {ComponentFunction.PageFunction === "orderList" &&
          ComponentFunction.OrdersComponentFunction !== "orderItem" &&
          (user.user.role === "carrier" ||
            (user.user.role === "driver" &&
              Transport.transports.find(
                (el) =>
                  el.type === "combi" ||
                  el.type === "truck" ||
                  el.type === "car" ||
                  el.type === "minibus"
              ))) &&
          user.user.role !== "driver" &&
          Limit.user_limits.carrier_take_order_city_limit !== 0 && (
            <>
              <div className={"map_info_container"}>
                <CitySelector
                  calcAllCities={calcAllCities}
                  calcСityOrderBounds={calcСityOrderBounds}
                  setRefreshMap={setRefreshMap}
                />
              </div>
            </>
          )}
      </div>
    );
  }
);

export default MapComponent;
