import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AdressContext } from "../..";
import FooterItem from "./FooterItem";

const FooterSection = observer(
  ({ section, items, setModalActive, setAgreement }) => {
    const { Adress } = useContext(AdressContext);

    return (
      <>
        {Adress.country.value === "russia" ? (
          <div className={section.class}>
            {items
              .filter((el) => el.id !== 5)
              .map((item) => (
                <FooterItem
                  item={item}
                  key={item.id}
                  setModalActive={setModalActive}
                  setAgreement={setAgreement}
                />
              ))}
          </div>
        ) : (
          <div className={section.class}>
            {items
              .filter((el) => el.id !== 5 && el.id !== 6 && el.id !== 4)
              .map((item) => (
                <FooterItem
                  item={item}
                  key={item.id}
                  setModalActive={setModalActive}
                  setAgreement={setAgreement}
                />
              ))}
          </div>
        )}
      </>
    );
  }
);

export default FooterSection;
