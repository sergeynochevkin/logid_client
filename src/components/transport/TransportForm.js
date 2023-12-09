import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  DriverContext,
  FetcherContext,
  NotificationContext,
  TranslateContext,
  UserInfoContext,
} from "../..";
import { createTransport, updateTransport } from "../../http/transportApi";
import { uploadFiles } from "../../http/fileApi";
import { Form } from "../ui/form/Form";
import TransportFormSection from "./TransportFormSection";
import DragDropUpload from "../dragDropUpload/DragDropUpload";
import TransportFormTag from "./TransportFormTag";
import "./Transport.css";
import TransportFormAdText from "./TransportFormAdText";
import { CheckBoxContainer } from "../ui/form/CheckBoxContainer";
import { CheckBoxSection } from "../ui/form/CheckBoxSection";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { v4 } from "uuid";
import { FieldName } from "../ui/page/FieldName";
import TransportFormAdName from "./TransportFormAdName";
import { useInput } from "../../hooks/useInput";
import DriverSelector from "./DriverSelector";

const TransportForm = observer(
  ({
    setModalActive,
    formData,
    formReset,
    setFormData,
    parent,
    pairs,
    setPairs,
    files,
    setFiles,
    formFunction,
    transportId,
  }) => {
    const { UserInfo } = useContext(UserInfoContext);
    const { Translate } = useContext(TranslateContext);
    const { Driver } = useContext(DriverContext);
    const { fetcher } = useContext(FetcherContext);
    const { Notification } = useContext(NotificationContext);
    const [filesFormData, setFilesFormData] = useState(new FormData());

    let dataTransfer = new DataTransfer();
    let fileList;

    formData.ad_name = useInput(
      "",
      { isEmpty: false, minLength: 4, maxLength: 22 },
      SetNativeTranslate(Translate.language, {
        russian: ["Имя для рекламы"],
        english: ["Ad name"],
        spanish: ["Nombre publicitario"],
        turkish: ["Reklam adı"],
        сhinese: ["广告名称"],
        hindi: ["विज्ञापन का नाम"],
      })
    );

    formData.ad_text = useInput(
      "",
      { isEmpty: false, minLength: 20, maxLength: 150 },
      SetNativeTranslate(Translate.language, {
        russian: ["Рекламный текст"],
        english: ["Advertising text"],
        spanish: ["Texto publicitario"],
        turkish: ["Reklam metni"],
        сhinese: ["广告文字"],
        hindi: ["विज्ञापन पाठ"],
      })
    );

    formData.tag = useInput(
      "",
      { isEmpty: true, minLength: 4, maxLength: 20 },
      SetNativeTranslate(Translate.language, {
        russian: ["Метка"],
        english: ["Tag"],
        spanish: ["Etiqueta"],
        turkish: ["Etiket"],
        сhinese: ["标签"],
        hindi: ["टैग"],
      })
    );

    if (parent !== "fast_sign_up") {
      formData.userInfoId = UserInfo.userInfo.id;
    }

    const dataInit = (files) => {
      files.forEach((file) => {
        dataTransfer.items.add(file);
      });

      fileList = dataTransfer.files;
    };

    const click = async (event) => {
      event.preventDefault();
      try {
        let data;

        if (formFunction === "create" || !formFunction) {
          data = await createTransport(formData).then(async (data) => {
            dataInit(files);
            await uploadFiles(
              "transport",
              data.id,
              Translate.language,
              formFunction,
              fileList
            ).then(
              Notification.addNotification([
                {
                  id: v4(),
                  type: "success",
                  message: SetNativeTranslate(Translate.language, {
                    russian: ["Транспорт добавлен"],
                    english: ["Transport created"],
                    spanish: ["Transporte agregado"],
                    turkish: ["Taşıma eklendi"],
                    сhinese: ["创建运输"],
                    hindi: ["परिवहन बनाया गया"],
                  }),
                },
              ])
            );
          });
        }

        if (formFunction === "update" || formFunction === "update_from_fast") {
          data = await updateTransport(formData).then(async (data) => {
            dataInit(files);
            await uploadFiles(
              "transport",
              transportId,
              Translate.language,
              formFunction,
              fileList
            ).then(
              Notification.addNotification([
                {
                  id: v4(),
                  type: "success",
                  message: SetNativeTranslate(Translate.language, {
                    russian: ["Транспорт обновлен"],
                    english: ["Transport updated"],
                    spanish: ["Transporte actualizado"],
                    turkish: ["Taşıma güncellendi"],
                    сhinese: ["交通更新"],
                    hindi: ["परिवहन अद्यतन किया गया"],
                  }),
                },
              ])
            );
          });
        }

        formReset();
        fetcher.setTransports(true);
        fetcher.setDrivers(true);
        setModalActive(false);
      } catch (e) {
        Notification.addNotification([
          { id: v4(), type: "error", message: e.response.data.message },
        ]);
      }
    };

    useEffect(() => {
      if (
        formData.ad_text.isEmpty ||
        formData.ad_text.notValid ||
        formData.ad_name.notValid ||
        formData.ad_name.isEmpty
      ) {
        setFormData({ ...formData, ad_show: false });
      } else if (
        !formData.ad_show_dirty &&
        !formData.ad_text.isEmpty &&
        !formData.ad_text.notValid &&
        !formData.ad_name.isEmpty &&
        !formData.ad_name.notValid
      ) {
        setFormData({ ...formData, ad_show: true });
      }
    }, [formData.ad_name.value, formData.ad_text.value]);

    return (
      <div className="transport_form_container">
        <Form encType="multipart/form-data">
          <TransportFormTag formData={formData} />

          {Driver.drivers.length > 0 && (
            <DriverSelector formData={formData} setFormData={setFormData} />
          )}

          <TransportFormAdName formData={formData} />
          <TransportFormAdText formData={formData} />

          <div className="transport_form_check_box_and_error_container">
            <CheckBoxContainer>
              <CheckBoxSection>
                <input
                  disabled={
                    formData.ad_name.isEmpty ||
                    formData.ad_name.notValid ||
                    formData.ad_text.isEmpty ||
                    formData.ad_text.notValid
                  }
                  style={{
                    cursor:
                      formData.ad_name.isEmpty ||
                      formData.ad_name.notValid ||
                      formData.ad_text.isEmpty ||
                      formData.ad_text.notValid
                        ? "not-allowed"
                        : "",
                  }}
                  type="checkbox"
                  className="auth_checkbox"
                  checked={formData.ad_show && "checked"}
                  value={formData.ad_show}
                  onChange={() => {
                    let data = { ...formData };
                    if (!data.ad_show) {
                      data.ad_show = true;
                    } else {
                      data.ad_show = false;
                    }
                    if (!data.ad_show_dirty) {
                      data.ad_show_dirty = true;
                    }
                    setFormData(data);
                  }}
                ></input>
                <>
                  <label className="auth_check_box_label">
                    {SetNativeTranslate(Translate.language, {
                      russian: [`Рекламировать транспорт на главной странице`],
                      english: [`Advertise transport on the main page`],
                      spanish: [`Anunciar transporte en la página principal`],
                      turkish: [`Ana sayfada ulaşımın reklamını yapın`],
                      сhinese: ["在主页上刊登交通广告"],
                      hindi: ["मुख्य पृष्ठ पर परिवहन का विज्ञापन करें"],
                    })}
                  </label>
                </>
              </CheckBoxSection>
            </CheckBoxContainer>
            <FieldName
              style={{
                fontWeight: "normal",
                color: "rgb(254, 111, 103,0.8)",
              }}
            >
              {formData.ad_text.isEmpty ||
              formData.ad_name.isEmpty ||
              formData.ad_text.notValid ||
              formData.ad_name.notValid
                ? SetNativeTranslate(Translate.language, {
                    russian: [
                      "Для показа рекламы заполните рекламный текст и имя",
                    ],
                    english: ["To display ads, fill in the ad text and name"],
                    spanish: [
                      "Para mostrar publicidad, rellene el texto y el nombre del anuncio",
                    ],
                    turkish: [
                      "Reklam görüntülemek için reklam metnini ve adını girin",
                    ],
                    сhinese: ["如需展示广告，请填写广告文字和名称"],
                    hindi: [
                      "विज्ञापन प्रदर्शित करने के लिए, विज्ञापन टेक्स्ट और नाम भरें",
                    ],
                  })
                : ""}
            </FieldName>
          </div>

          <DragDropUpload
            filesFormData={filesFormData}
            pairs={pairs}
            setPairs={setPairs}
            files={files}
            setFiles={setFiles}
            parent={"transportForm"}
            formData={formData}
            setFormData={setFormData}
            length={5}
            min_length={1}
            extensions={["jpeg", "png", "jpg"]}
          ></DragDropUpload>

          <TransportFormSection
            formData={formData}
            setFormData={setFormData}
            click={click}
            setModalActive={setModalActive}
            formReset={formReset}
            files={files}
            formFunction={formFunction}
          />
        </Form>
      </div>
    );
  }
);

export default TransportForm;
