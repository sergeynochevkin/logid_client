//@ts-ignore
import {
  Dispatch,
  SetStateAction,
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

export const useCitySelector = (
  setModalActive: Dispatch<SetStateAction<boolean>>
) => {
  const [id] = useState(v4());

  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { Adress } = useContext(AdressContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  //@ts-ignore
  let autocomplete;
  function initAutocomplete(id: string, country: {}) {
    //eslint-disable-next-line no-undef
    autocomplete = new google.maps.places.Autocomplete(
      //@ts-ignore
      document.getElementById(id),
      {
        types: ["locality", "administrative_area_level_3"],
        componentRestrictions: { country: [`${country}`] },
        fields: ["geometry", "name"],
        language: Adress.country.google_language,
      }
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
  }

  function onPlaceChanged(id: string) {
    //@ts-ignore
    var place = autocomplete.getPlace();
    if (place) {
      if (!place.geometry) {
        //@ts-ignore
        document.getElementById(id).placeholder = SetNativeTranslate(
          Translate.language,
          {},
          "enter_city"
        );
      } else {
        Adress.setCity({
          lat: parseFloat(place.geometry.location.lat()),
          lng: parseFloat(place.geometry.location.lng()),
          value: place.name,
          selected: true
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
  }

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
    initAutocomplete(id, Adress.country.google_code);
  }, []);

  return { Setting, id, Translate };
};
