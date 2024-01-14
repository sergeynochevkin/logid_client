import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//@ts-ignore
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {
  AdressContext,
  LinkContext,
  OrderContext,
  SettingContext,
  StateContext,
  TranslateContext,
  UserContext,
  UserInfoContext,
  //@ts-ignore
} from "../../..";

export const useNavBar = () => {
  //@ts-ignore
  const { Adress } = useContext(AdressContext);
  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { order } = useContext(OrderContext);
  //@ts-ignore
  const { State } = useContext(StateContext);
  //@ts-ignore
  const { UserInfo } = useContext(UserInfoContext);
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { link } = useContext(LinkContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalActive1, setModalActive1] = useState<boolean>(false);
  const [modalActive2, setModalActive2] = useState<boolean>(false);
  const [modalActive3, setModalActive3] = useState<boolean>(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  let location = useLocation();
  const { width } = useWindowDimensions();
  const queryParams = new URLSearchParams(window.location.search);
  const city = queryParams.get("city");

  useEffect(() => {
    if (
      !Adress.city.selected &&
      Object.keys(UserInfo.userInfo).length === 0 &&
      !city
    ) {
      setModalActive3(true);
      Adress.setCity({ ...Adress.city, selected: true });
    }
  }, []);

  return {
    Adress,
    user,
    order,
    State,
    Setting,
    link,
    UserInfo,
    Translate,
    modalActive,
    setModalActive,
    modalActive1,
    setModalActive1,
    modalActive2,
    setModalActive2,
    modalActive3,
    setModalActive3,
    name,
    setName,
    navigate,
    location,
    width,
  };
};
