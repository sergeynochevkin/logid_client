//@ts-ignore
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
//@ts-ignore
import {
  SettingContext,
  AdressContext,
  TranslateContext,
  //@ts-ignore
} from "../../../../..";
//@ts-ignore
import { SetNativeTranslate } from "../../../../../modules/SetNativeTranslate";
import { v4 } from "uuid";
import { log } from "console";

export const useCitySelector = (
  setModalActive: Dispatch<SetStateAction<boolean>>
) => {
  const [id] = useState(`a${v4()}`);
  const [cityValue, setCityValue] = useState("");

  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { Adress } = useContext(AdressContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  //@ts-ignore
  const  [autocomplete] = useState({value:{}});
  const initAutocomplete = useCallback((id: string, country: {}) => {
    //eslint-disable-next-line no-undef
    autocomplete.value = new google.maps.places.Autocomplete(
      //@ts-ignore
      document.getElementById(id),
      {
        types: ["locality", "administrative_area_level_3"],
        componentRestrictions: { country: [`${country}`] },
        fields: ["geometry", "name"],
        language: Adress.country.google_language,
      }
    );

    //@ts-ignore
    autocomplete.value.addListener("place_changed", onPlaceChanged);
  }, []);

  const onPlaceChanged = useCallback((id: string) => {
    //@ts-ignore
    var place =  autocomplete.value.getPlace();
    if (place) {
      if (!place.geometry) {
        //@ts-ignore
        document.getElementById(id).placeholder = SetNativeTranslate(
          Translate.language,
          {},
          "enter_city"
        );
      } else {
        console.log("yes");
        Adress.setCity({
          lat: parseFloat(place.geometry.location.lat()),
          lng: parseFloat(place.geometry.location.lng()),
          value: place.name,
          selected: true,
        });
        Setting.setBoundsLimit(0.5);
        Setting.setCenter({
          lat: parseFloat(place.geometry.location.lat()),
          lng: parseFloat(place.geometry.location.lng()),
        });
        Setting.setBounds({
          north: Setting.center.lat + parseFloat(Setting.bounds_limit),
          south: Setting.center.lat - parseFloat(Setting.bounds_limit),
          east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
          west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
        });
        
        setModalActive(false);
      }
    }
  }, []);

  useEffect(() => {
    Setting.setCenter({
      lat: parseFloat(Adress.city.lat),
      lng: parseFloat(Adress.city.lng),
    });
    Setting.setBounds({
      north: Setting.center.lat + parseFloat(Setting.bounds_limit),
      south: Setting.center.lat - parseFloat(Setting.bounds_limit),
      east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
      west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
    });
  }, []);

  useEffect(() => {
    if (cityValue.length > 2 && Object.keys(autocomplete.value).length === 0) {
      initAutocomplete(id, Adress.country.google_code);
      //@ts-ignore
      document.querySelector(`#${id}`).blur();
      setTimeout(() => {
        //@ts-ignore
        document.querySelector(`#${id}`).focus();
      }, 100);
    }
  }, [cityValue]);

  return { Setting, id, Translate, cityValue, setCityValue };
};
