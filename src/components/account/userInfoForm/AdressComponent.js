import React, { useContext, useEffect, useState } from "react";
import { AdressContext, TranslateContext, UserInfoContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Input } from "../../ui/form/Input";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";
import { v4 } from "uuid";

const AdressComponent = ({ formData, setFormData, parent }) => {
  const { Adress } = useContext(AdressContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { Translate } = useContext(TranslateContext);
  const [id] = useState(`a${v4()}`);

  let lat;
  let lng;

  if (parent === "account" || parent === "user") {
    lat = parseFloat(UserInfo.userInfo.city_latitude);
    lng = parseFloat(UserInfo.userInfo.city_longitude);
  }

  const center =
    parent !== "account"
      ? { lat: formData.city_latitude, lng: formData.city_longitude }
      : { lat: lat, lng: lng };

  const defaultBounds = {
    north: center.lat + 0.2,
    south: center.lat - 0.2,
    east: center.lng + 0.2,
    west: center.lng - 0.2,
  };

  const [autocomplete] = useState({ value: {} });
  function initAutocomplete(id, country) {
    //eslint-disable-next-line no-undef
    autocomplete.value = new google.maps.places.Autocomplete(
      document.getElementById(id),
      {
        bounds: defaultBounds,
        strictBounds: true,
        types: ["geocode"],
        componentRestrictions: { country: [`${country}`] },
        fields: ["geometry", "name"],
        language: Adress.country.google_language,
      }
    );
    autocomplete.value.addListener("place_changed", onPlaceChanged);
  }

  useEffect(() => {
    const regex = new RegExp("[0-9]");
    if (
      formData.company_adress.value.length > 4 &&
      regex.test(formData.company_adress.value) &&
      Object.keys(autocomplete.value).length === 0
    ) {
      initAutocomplete(id, Adress.country.google_code);
      document.querySelector(`#${id}`).blur();
      setTimeout(() => {
        document.querySelector(`#${id}`).focus();
      }, 100);
    }
  }, [formData.company_adress.value]);

  function onPlaceChanged(id) {
    var place = autocomplete.value.getPlace();
    if (place) {
      if (!place.geometry) {
        document.getElementById(id).placeholder = SetNativeTranslate(
          Translate.language,
          {},
          "adress_place_holder"
        );
      } else {
        let data = { ...formData };
        data.company_adress.value = place.name;
        data.company_adress_latitude = place.geometry.location.lat();
        data.company_adress_longitude = place.geometry.location.lng();
        data.company_adress.notValid = false;
        setFormData(data);
      }
    }
  }

  const dataReset = (e) => {
    let data = { ...formData };
    data.company_adress.value = e.target.value;
    data.company_adress_latitude = undefined;
    data.company_adress_longitude = undefined;
    data.company_adress.notValid = true;
    setFormData(data);
  };

  return (
    <>
      <VerticalContainer style={{ gap: "0px" }}>
        <Input
          placeholder={SetNativeTranslate(Translate.language, {
            russian: ["Введите улицу и номер дома"],
            english: ["Enter street and house number"],
            spanish: ["Introduzca la calle y el número de casa"],
            turkish: ["Sokak ve ev numarasını girin"],
            сhinese: ["输入街道和门牌号"],
            hindi: ["सड़क और मकान नंबर दर्ज करें"],
          })}
          defaultValue={formData.company_adress.value}
          onChange={(e) => {
            dataReset(e);
          }}
          onBlur={() => {
            let data = { ...formData };
            data.company_adress.isDirty = true;
            setFormData(data);
          }}
          style={{
            borderLeft: formData.company_adress.notValid
              ? "solid 1px rgb(254, 111, 103,0.8)"
              : "",
          }}
          type="text"
          name="company_adress"
          id={id}
        ></Input>

        <FieldName
          style={{
            fontWeight: "normal",
            color: "rgb(254, 111, 103,0.8)",
          }}
        >
          {formData.company_adress.notValid && formData.company_adress.isDirty
            ? SetNativeTranslate(
                Translate.language,
                {},
                "select_adress"
              ).toLowerCase()
            : ""}
        </FieldName>
      </VerticalContainer>
    </>
  );
};

export default AdressComponent;
