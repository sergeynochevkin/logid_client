import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
//@ts-ignore
import { TranslateContext, UserContext } from "../../../../..";
//@ts-ignore
import useWindowDimensions from "../../../../../hooks/useWindowDimensions";

export const useLinks = () => {
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  //@ts-ignore
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { width } = useWindowDimensions();
  return { Translate, width, navigate, user };
};
