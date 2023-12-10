import React, { useContext } from "react";
import { Input } from "../ui/form/Input";
import { FieldName } from "../ui/page/FieldName";
import { VerticalContainer } from "../ui/page/VerticalContainer";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { TranslateContext } from "../..";

const TransportFormAdName = ({ formData }) => {
  const { Translate } = useContext(TranslateContext);

  return (
    <VerticalContainer style={{ gap: "0px" }}>
      <Input
        value={formData.ad_name.value}
        placeholder={SetNativeTranslate(Translate.language, {
          russian: ["Имя для рекламы"],
          english: ["Ad name"],
          spanish: ["Nombre publicitario"],
          turkish: ["Reklam adı"],
          сhinese: ["广告名称"],
          hindi: ["विज्ञापन का नाम"],
        })}
        onChange={(e) => {
          formData.ad_name.onChange(e);
        }}
        onBlur={(e) => formData.ad_name.onBlur(e)}
        style={{
          borderLeft:
            formData.ad_name.notValid && !formData.ad_name.isEmpty
              ? " solid 1px rgb(254, 111, 103,0.8)"
              : "",
        }}
        name="ad_name"
        id="ad_name"
      ></Input>
      <FieldName
        style={{
          fontWeight: "normal",
          color: "rgb(254, 111, 103,0.8)",
        }}
      >
        {formData.ad_name.minLengthError || formData.ad_name.maxLengthError
          ? formData.ad_name.errorMessage
          : ""}
      </FieldName>
    </VerticalContainer>
  );
};

export default TransportFormAdName;
