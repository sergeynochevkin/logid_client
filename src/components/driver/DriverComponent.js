import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { TranslateContext, UserContext, UserInfoContext } from "../..";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { Button } from "../ui/button/Button";
import DriverForm from "./DriverForm";
import Modal from "../ui/modal/Modal";
import DriverList from "./DriverList";
import "./Driver.css";
import { useInput } from "../../hooks/useInput";

const DriverComponent = observer(() => {
  const { Translate } = useContext(TranslateContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { user } = useContext(UserContext);
  const [modalActive, setModalActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [pairs, setPairs] = useState([]);

  let initialValue = {
    email: "", //from form
    role: "driver",
    phone: "", //from form
    name_surname_fathersname: "", //from form

    user_id: user.user.id,
    user_info_uuid: UserInfo.userInfo.uuid,

    country: UserInfo.userInfo.country,
    legal: "person",
    city: UserInfo.userInfo.city,
    city_place_id: UserInfo.userInfo.city_place_id,
    city_latitude: UserInfo.userInfo.city_latitude,
    city_longitude: UserInfo.userInfo.city_longitude,
  };

  const [formData, setFormData] = useState(initialValue);

  const validPhone =
    /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
  formData.phone = useInput(
    "",
    { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone },
    SetNativeTranslate(Translate.language, {}, "phone_content")
  );
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formData.email = useInput(
    "",
    { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail },
    SetNativeTranslate(Translate.language, {
      russian: ["email"],
      english: ["email"],
      spanish: ["email"],
      turkish: ["e-posta"],
      сhinese: ["电子邮件"],
      hindi: ["ईमेल"],
    })
  );

  formData.name_surname_fathersname = useInput(
    "",
    { isEmpty: true, minLength: 10, maxLength: 50 },
    SetNativeTranslate(
      Translate.language,
      {},
      "name_surname_fathersname_content"
    ).toLowerCase()
  );

  const formReset = () => {
    setFormData(initialValue);
    formData.email.setValue("");
    formData.email.setDirty(false);
    formData.phone.setDirty(false);
    formData.name_surname_fathersname.setDirty(false);
    formData.phone.setValue("");
    formData.name_surname_fathersname.setValue("");
  };

  return (
    <>
      <div className="driver_component_container">
        <Button
          style={{ marginTop: "10px" }}
          onClick={() => {
            setModalActive(true);
          }}
        >
          {SetNativeTranslate(Translate.language, {}, "add")}
        </Button>
        <DriverList />
      </div>

      <Modal
        modalActive={modalActive}
        setModalActive={setModalActive}
        formReset={formReset}
        parent={"driverForm"}
      >
        <DriverForm
          files={files}
          pairs={pairs}
          setFiles={setFiles}
          setPairs={setPairs}
          setModalActive={setModalActive}
          formReset={formReset}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal>
    </>
  );
});

export default DriverComponent;
