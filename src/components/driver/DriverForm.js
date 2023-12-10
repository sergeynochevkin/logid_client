import React, { useContext } from "react";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { VerticalContainer } from "../ui/page/VerticalContainer";
import { FieldName } from "../ui/page/FieldName";
import { FetcherContext, NotificationContext, TranslateContext } from "../..";
import { Input } from "../ui/form/Input";
import { CardButton } from "../ui/button/CardButton";
import { Form } from "../ui/form/Form";
import NameSurNameFathersName from "../account/userInfoForm/NameSurNameFathersName";
import { driver_registration } from "../../http/userAPI";
import { v4 } from "uuid";

const DriverForm = ({ setModalActive, formData, setFormData, formReset }) => {
  const { Translate } = useContext(TranslateContext);
  const { Notification } = useContext(NotificationContext);
  const { fetcher } = useContext(FetcherContext);

  const click = async (event) => {
    event.preventDefault();
    try {
      await driver_registration(
        Translate.language,
        formData.email.value,
        formData.role,
        formData.phone.value,
        formData.user_id,
        formData.user_info_uuid,
        formData.country,
        formData.legal,
        formData.city,
        formData.city_place_id,
        formData.city_latitude,
        formData.city_longitude,

        formData.name_surname_fathersname.value
      );

      Notification.addNotification([
        {
          id: v4(),
          type: "success",
          message: SetNativeTranslate(Translate.language, {
            russian: [
              "Водитель зарегистрирован, пароль отрправлен на его email",
            ],
            english: [
              "The driver is registered, the password have been sent to his email",
            ],
            spanish: [
              "El conductor está registrado, la contraseña ha sido enviada a su correo electrónico.",
            ],
            turkish: ["Sürücü kayıtlı, şifre e-posta adresine gönderildi"],
            сhinese: ["司机已注册，密码已发送至司机邮箱"],
            hindi: ["ड्राइवर पंजीकृत है, पासवर्ड उसके ईमेल पर भेज दिया गया है"],
          }),
        },
      ]);
      formReset();
      fetcher.setDrivers(true);
      setModalActive(false);
    } catch (e) {
      Notification.addNotification([
        { id: v4(), type: "error", message: e.response.data.message },
      ]);
    }
  };

  return (
    <Form encType="multipart/form-data">
      <VerticalContainer style={{ gap: "0px" }}>
        <Input
          placeholder={SetNativeTranslate(
            Translate.language,
            {
              russian: ["Телефон водителя"],
              english: ["Drivers phone"],
              spanish: ["Teléfono del conductor"],
              turkish: ["Sürücü telefonu"],
              сhinese: ["司机电话号码"],
              hindi: ["ड्राइवर का फ़ोन नंबर"],
            },
            ""
          )}
          value={formData.phone.value}
          onChange={(e) => formData.phone.onChange(e)}
          onBlur={(e) => formData.phone.onBlur(e)}
          type="text"
          name="phone"
          id="phone"
          style={{
            borderLeft:
              formData.phone.notValid || formData.phone.isEmpty
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
          {(formData.phone.isEmpty && formData.phone.isDirty) ||
          formData.phone.minLengthError ||
          formData.phone.maxLengthError ||
          formData.phone.formatError
            ? formData.phone.errorMessage
            : ""}
        </FieldName>
      </VerticalContainer>
      <VerticalContainer style={{ gap: "0px" }}>
        <Input
          placeholder={SetNativeTranslate(Translate.language, {
            russian: ["Email водителя"],
            english: ["Drivers email"],
            spanish: ["Email de las conductoras"],
            turkish: ["Sürücü e-postası"],
            сhinese: ["司机电子邮件"],
            hindi: ["ड्राइवर ईमेल"],
          })}
          value={formData.email.value}
          style={{
            borderLeft:
              formData.email.notValid || formData.email.isEmpty
                ? " solid 1px rgb(254, 111, 103,0.8)"
                : "",
          }}
          onChange={(e) => formData.email.onChange(e)}
          onBlur={(e) => formData.email.onBlur(e)}
          type="text"
          autoComplete="email"
        ></Input>

        <FieldName
          style={{
            fontWeight: "normal",
            color: "rgb(254, 111, 103,0.8)",
          }}
        >
          {(formData.email.isEmpty && formData.email.isDirty) ||
          formData.email.minLengthError ||
          formData.email.maxLengthError ||
          formData.email.formatError
            ? formData.email.errorMessage
            : ""}
        </FieldName>
      </VerticalContainer>

      <NameSurNameFathersName formData={formData} setFormData={setFormData} />

      <CardButton
        onClick={click}
        disabled={
          formData.phone.isEmpty ||
          formData.email.notValid ||
          formData.name_surname_fathersname.notValid
        }
      >
        {SetNativeTranslate(Translate.language, {}, "add")}
      </CardButton>

      {/* <div>Text about drivers account and responsibility</div> */}
    </Form>
  );
};

export default DriverForm;
