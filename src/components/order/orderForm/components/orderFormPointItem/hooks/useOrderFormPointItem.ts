//@ts-nocheck

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AdressContext,
  SettingContext,
  StateContext,
  TranslateContext,
  UserInfoContext,
} from "../../../../../..";
import { v4 } from "uuid";
import { mainOrderPointsLength } from "../../../../../../constants";

export const useOrderFormPointItem = (
  setPointFormData,
  pointFormData,
  setCalculate,
  pointItem,
  index
) => {
  const { UserInfo } = useContext(UserInfoContext);
  const { Setting } = useContext(SettingContext);
  const { Translate } = useContext(TranslateContext);
  const { Adress } = useContext(AdressContext);
  const [showHistory, setShowHistory] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const { State } = useContext(StateContext);
  const [addPointDisabled, setAddPointDisabled] = useState(false);

  useEffect(() => {
    if (location.pathname === "/user") {
      Setting.setCenter({
        lat: parseFloat(UserInfo.userInfo.city_latitude),
        lng: parseFloat(UserInfo.userInfo.city_longitude),
      });
      Setting.setBounds({
        north: Setting.center.lat + parseFloat(Setting.bounds_limit),
        south: Setting.center.lat - parseFloat(Setting.bounds_limit),
        east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
        west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
      });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/main_order") {    
      setAddPointDisabled((pointFormData.length >= mainOrderPointsLength));
    }
  }, [pointFormData.length]);

  const queryParams = new URLSearchParams(window.location.search);

  const from_value = queryParams.get("from_value");

  const [autocomplete] = useState({ value: {} });

  const initAutocomplete = useCallback((id) => {
    if (Adress.country) {
      //eslint-disable-next-line no-undef
      autocomplete.value = new google.maps.places.Autocomplete(
        document.getElementById(id),
        {
          bounds: Setting.bounds,
          strictBounds: true,
          types: ["geocode"],
          componentRestrictions: {
            country: [`${Adress.country.google_code}`],
          },
          fields: ["geometry", "address_components", "name"],
          language: Adress.country.google_language,
        }
      );

      autocomplete.value.addListener("place_changed", onPlaceChanged);
    }
  }, []);

  useEffect(() => {
    const regex = new RegExp("[0-9]");
    if (
      pointItem.point.value.length > 5 &&
      regex.test(pointItem.point.value) &&
      Object.keys(autocomplete.value).length === 0
    ) {
      initAutocomplete(`id_${pointItem.id}`);
      if (!from_value) {
        //@ts-ignore
        document.querySelector(`#id_${pointItem.id}`).blur();
        setTimeout(() => {
          //@ts-ignore
          document.querySelector(`#id_${pointItem.id}`).focus();
        }, 100);
      }
    }
  }, [pointItem.point.value]);

  const onPlaceChanged = useCallback((id) => {
    var place = autocomplete.value.getPlace();
    var address_components = autocomplete.value.getPlace().address_components;
    if (!place.geometry) {
      document.getElementById(id).placeholder = SetNativeTranslate(
        Translate.language,
        {},
        "enter_place"
      );
    } else {
      let data = [...pointFormData];
      data[index].point.value = place.name;
      data[index].latitude = place.geometry.location.lat();
      data[index].longitude = place.geometry.location.lng();
      data[index].city = address_components[2].long_name;
      data[index].point.isEmptyError = false;

      let historyObject = {
        id: v4(),
        value: data[index].point.value,
        latitude: data[index].latitude,
        longitude: data[index].longitude,
        city: address_components[2].long_name,
      };
      if (
        !Setting.adress_history.find(
          (el) =>
            el.latitude === historyObject.latitude &&
            el.longitude === historyObject.longitude
        )
      ) {
        if (Setting.adress_history.length === 15) {
          Setting.adress_history.splice(0, 1);
        }
        Setting.setAdressHistory([...Setting.adress_history, historyObject]);
        State.setUserStateField(
          Setting.adress_history,
          "adress_history",
          UserInfo.userInfo.id
        );
      }
      setPointFormData(data);
      setCalculate(true);
    }
  }, []);

  const dataReset = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let data = [...pointFormData];
    data[index].point.value = e.target.value;
    data[index].latitude = undefined;
    data[index].longitude = undefined;
    data[index].city = "";
    data[index].point.isEmptyError = true;
    setPointFormData(data);
    // autocomplete.set('place', null) // whether it is necessary?
  }, []);

  const selectFromHistoryAction = useCallback((point) => {
    let data = [...pointFormData];
    data[index].point.value = point.value;
    data[index].latitude = point.latitude;
    data[index].longitude = point.longitude;
    data[index].city = point.city;
    data[index].point.isEmptyError = false;
    setPointFormData(data);
    document.getElementById(`id_${pointItem.id}`).value = pointItem.point.value;
    setCalculate(true);
  }, []);

  return {
    UserInfo,
    Setting,
    Translate,
    Adress,
    showHistory,
    setShowHistory,
    State,
    setCustomInput,
    selectFromHistoryAction,
    dataReset,
    addPointDisabled,
  };
};
