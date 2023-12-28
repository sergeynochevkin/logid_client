import {  useState } from "react";


export const useAdBlock = () => {
  //@ts-ignore
  const [section, setSection] = useState<"about" | "possibilities" | "reviews">(
    "about"
  );




  return { section, setSection, location };
};
