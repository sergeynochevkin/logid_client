import React, { useContext, useState } from "react";
import { TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Input } from "../../ui/form/Input";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const PassportDateOfIssue = ({ formData }) => {
  const { Translate } = useContext(TranslateContext);
  const [selected, setSelected] = useState(false);

  return (
    <VerticalContainer style={{ gap: "0px" }}>
      <Input
        placeholder={SetNativeTranslate(
          Translate.language,
          {},
          "passport_date_of_issue_place_holder"
        )}
        value={formData.passport_date_of_issue.value}
        onChange={(e) => {
          formData.passport_date_of_issue.onChange(e);
        }}
        onFocus={() => setSelected(true)}
        onBlur={(e) => formData.passport_date_of_issue.onBlur(e)}
        type={selected ? "date" : "text"}
        name="passport_date_of_issue"
        id="passport_date_of_issue"
        style={{
          borderLeft: formData.passport_date_of_issue.isEmpty
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
        {formData.passport_date_of_issue.isEmpty &&
        formData.passport_date_of_issue.isDirty
          ? formData.passport_date_of_issue.errorMessage
          : ""}
      </FieldName>
    </VerticalContainer>
  );
};

export default PassportDateOfIssue;
