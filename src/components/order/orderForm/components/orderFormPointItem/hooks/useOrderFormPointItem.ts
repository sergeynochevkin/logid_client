//@ts-nocheck

import { useContext, useEffect, useState } from "react";
import {
  AdressContext,
  SettingContext,
  StateContext,
  TranslateContext,
  UserInfoContext,
} from "../../../../../..";
import { v4 } from "uuid";

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

  let autocomplete;
  let autocompleteListener;
  function initAutocomplete(id) {
    if (Adress.country) {
      //eslint-disable-next-line no-undef
      autocomplete = new google.maps.places.Autocomplete(
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
      autocompleteListener = autocomplete.addListener(
        "place_changed",
        onPlaceChanged
      );
    }
  }

  useEffect(() => {
    initAutocomplete(pointItem.id);
  }, [Setting.bounds]);

  useEffect(() => {
    initAutocomplete(pointItem.id);
  }, [pointFormData.length, Setting.bounds_limit, pointItem.sequence]);

  function onPlaceChanged(id) {
    var place = autocomplete.getPlace();
    var address_components = autocomplete.getPlace().address_components;
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
  }

  const dataReset = () => {
    let data = [...pointFormData];
    if (data[index].latitude && data[index].longitude) {
      data[index].point.value = "";
      data[index].latitude = undefined;
      data[index].longitude = undefined;
      data[index].city = "";
      data[index].point.isEmptyError = true;
      setPointFormData(data);
      // autocomplete.set('place', null) // whether it is necessary?
    }
  };

  const selectFromHistoryAction = (point) => {
    let data = [...pointFormData];
    data[index].point.value = point.value;
    data[index].latitude = point.latitude;
    data[index].longitude = point.longitude;
    data[index].city = point.city;
    data[index].point.isEmptyError = false;
    setPointFormData(data);
    document.getElementById(`${pointItem.id}`).value = pointItem.point.value;
    setCalculate(true);
  };

  useEffect(() => {
    dataReset();
  }, [Adress.city.value]);

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
  };
};
