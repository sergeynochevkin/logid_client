import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdressContext, TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Input } from "../../ui/form/Input";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const City = ({ formData, setFormData, id }) => {
  const { Adress } = useContext(AdressContext);
  const { Translate } = useContext(TranslateContext);

  if (!id) {
    id = "city";
  }

  const [autocomplete] = useState({ value: {} });
  const initAutocomplete = useCallback((id, country) => {
    //eslint-disable-next-line no-undef
    autocomplete.value = new google.maps.places.Autocomplete(
      document.getElementById(id),
      {
        types: ["locality", "administrative_area_level_3"],
        componentRestrictions: { country: [`${country}`] },
        fields: ["geometry", "name"],
        language: Adress.country.google_language,
      }
    );
    autocomplete.value.addListener("place_changed", onPlaceChanged);
  }, []);

  useEffect(() => {
    if (
      formData.city.value.length > 2 &&
      Object.keys(autocomplete.value).length === 0
    ) {
      initAutocomplete(id, Adress.country.google_code);
      document.querySelector(`#${id}`).blur();
      setTimeout(() => {
        document.querySelector(`#${id}`).focus();
      }, 100);
    }
  }, [formData.city.value]);

  const dataReset = useCallback((e) => {
    let data = { ...formData };
    data.city.value = e.target.value;
    data.city_latitude = undefined;
    data.city_longitude = undefined;
    data.city.notValid = true;

    data.company_adress.value = "";
    data.company_adress_latitude = undefined;
    data.company_adress_longitude = undefined;
    data.company_adress.notValid = true;

    setFormData(data);
  }, []);

  const onPlaceChanged = useCallback((id) => {
    var place = autocomplete.value.getPlace();
    if (place) {
      if (!place.geometry) {
        document.getElementById(id).placeholder = SetNativeTranslate(
          Translate.language,
          {},
          "enter_city"
        );
      } else {
        let data = { ...formData };
        data.city.value = place.name;
        data.city_latitude = place.geometry.location.lat();
        data.city_longitude = place.geometry.location.lng();
        data.city.notValid = false;
        setFormData(data);
      }
    }
  }, []);

  return (
    <>
      <VerticalContainer style={{ gap: "0px" }}>
        <Input
          placeholder={SetNativeTranslate(Translate.language, {}, "enter_city")}
          defaultValue={formData.city.value}
          name="city"
          id={id}
          onChange={(e) => {
            dataReset(e);
          }}
          onBlur={() => {
            let data = { ...formData };
            data.city.isDirty = true;
            setFormData(data);
          }}
          style={{
            borderLeft: formData.city.notValid
              ? "solid 1px rgb(254, 111, 103,0.8)"
              : "",
          }}
        ></Input>
        <FieldName
          style={{
            fontWeight: "normal",
            color: "rgb(254, 111, 103,0.8)",
          }}
        >
          {formData.city.notValid && formData.city.isDirty
            ? SetNativeTranslate(
                Translate.language,
                {},
                "select_city"
              ).toLowerCase()
            : ""}
        </FieldName>
      </VerticalContainer>
    </>
  );
};

export default City;
