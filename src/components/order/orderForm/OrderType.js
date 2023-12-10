import React, { useContext } from "react";
import { TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Select } from "../../ui/form/Select";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const OrderType = ({ formData }) => {
  const { Translate } = useContext(TranslateContext);

  return (
    <VerticalContainer style={{ gap: "0px" }}>
      <Select
        value={formData.order_type.value}
        style={{
          borderLeft: formData.order_type.isEmpty
            ? " solid 1px rgb(254, 111, 103,0.8)"
            : "",
        }}
        onChange={(e) => formData.order_type.onChange(e)}
        onBlur={(e) => formData.order_type.onBlur(e)}
        name="order_type"
        id="order_type"
      >
        <option defaultValue hidden>
          {SetNativeTranslate(
            Translate.language,
            {},
            "order_type_place_holder"
          )}
        </option>
        <option value="order">
          {SetNativeTranslate(Translate.language, {}, "order")}
        </option>
        <option value="auction">
          {SetNativeTranslate(Translate.language, {}, "auction")}
        </option>
      </Select>
      <FieldName
        style={{
          fontWeight: "normal",
          color: "rgb(254, 111, 103,0.8)",
        }}
      >
        {formData.order_type.isEmpty && formData.order_type.isDirty
          ? SetNativeTranslate(Translate.language, {}, "select_order_type")
          : ""}
      </FieldName>
    </VerticalContainer>
  );
};

export default OrderType;
