import { useContext, useEffect } from "react";
import {
  TranslateContext,
  UserContext,
  //@ts-ignore
} from "../../..";
import { useNavigate } from "react-router-dom";

export const useCarrier = () => {
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
   //@ts-ignore
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    user.isAuth && navigate('/')
  }, []);

  return { Translate };
};
