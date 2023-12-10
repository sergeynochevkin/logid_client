import React, { useEffect, useState } from "react";
import { Input } from "../ui/form/Input";
import { observer } from "mobx-react-lite";

const PromoCodeComponent = observer(({ formData, setFormData }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const promo_code = queryParams.get("promo_code");
  const [promoCodeVisible, setPromocodeVisible] = useState(false);

  useEffect(() => {
    promo_code && setPromocodeVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, promo_code: e.target.value });
  };

  return (
    <>
      {promoCodeVisible && (
        <div>
          <div className="text_small">Have an promocode?</div>
          <Input
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.promo_code}
            placeholder="Promocode"
          ></Input>
        </div>
      )}
    </>
  );
});

export default PromoCodeComponent;
