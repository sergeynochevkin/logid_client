import {  useState } from "react";


export const useAdBlock = () => {
  //@ts-ignore
  const [section, setSection] = useState<"about" | "possibilities" | "reviews">(
    "possibilities"
  );




  return { section, setSection, location };
};
