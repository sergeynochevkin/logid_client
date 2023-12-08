import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import {
  AdressContext,
  SettingContext,
  TranslateContext,
  UserContext,
} from "../..";

import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import SubscriptionsSection from "./SubscriptionsSection";

const SubscriptionsPage = observer(() => {
  const { Setting } = useContext(SettingContext);
  const { user } = useContext(UserContext);
  const { Adress } = useContext(AdressContext);
  const { Translate } = useContext(TranslateContext);

  const sections = [
    {
      id: 4,
      header: SetNativeTranslate(Translate.language, {
        russian: ["Тарифные планы", "для перевозчика"],
        english: ["Tariff plans", "for the carrier"],
        spanish: ["Planes tarifarios para transportistas"],
        turkish: ["Taşıyıcılar için tarife planları"],
        сhinese: ["承运人的资费计划"],
        hindi: ["वाहक के लिए टैरिफ योजनाएँ"],
      }),
      header_comment: SetNativeTranslate(Translate.language, {
        russian: [
          Adress.country.value === "russia"
            ? "Вы можете пользоваться нашим сервисом бесплатно в личных целях. Для работы в множестве городов или с большим количеством заказов, выберите подходящий тарифный план"
            : "В настоящий момент наш сервис в полностью бесплатный!",
        ],
        english: [
          Adress.country.value === "russia"
            ? "You can use our service free of charge for personal purposes. To work in multiple cities or with a large number of orders, choose the appropriate tariff plan"
            : `At the moment our service in ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} is absolutely free!`,
        ],
        spanish: [
          Adress.country.value === "russia"
            ? "Puede utilizar nuestro servicio de forma gratuita para fines personales. Para trabajar en varias ciudades o con una gran cantidad de pedidos, elija el plan tarifario adecuado"
            : `¡Por el momento nuestro servicio en ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} es absolutamente gratuito!`,
        ],
        turkish: [
          Adress.country.value === "russia"
            ? "Hizmetimizden kişisel amaçlarınız için ücretsiz olarak yararlanabilirsiniz. Birden fazla şehirde veya çok sayıda siparişle çalışmak için uygun tarife planını seçin"
            : `Şu anda ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} hizmetimiz tamamen ücretsizdir!`,
        ],
        сhinese: [
          Adress.country.value === "russia"
            ? "您可以出于个人目的免费使用我们的服务。 如需在多个城市工作或订单量较大，请选择合适的资费方案"
            : `目前我们的服务在 ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} 是完全免费的！`,
        ],
        hindi: [
          Adress.country.value === "russia"
            ? "आप व्यक्तिगत उद्देश्यों के लिए हमारी सेवा का निःशुल्क उपयोग कर सकते हैं। कई शहरों में या बड़ी संख्या में ऑर्डर के साथ काम करने के लिए, उचित टैरिफ योजना चुनें"
            : `फिलहाल हमारी सेवा ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} बिल्कुल मुफ़्त है!`,
        ],
      }),
      description: "",
      class: "even",
      type: "self_content",
      role: "carrier",
    },
    {
      id: 5,
      header: SetNativeTranslate(Translate.language, {
        russian: ["Тарифные планы", "для заказчика"],
        english: ["Tariff plans", "for the customer"],
        spanish: ["Planes tarifarios para el cliente"],
        turkish: ["Müşteri için tarife planları"],
        сhinese: ["客户的资费计划"],
        hindi: ["ग्राहक के लिए टैरिफ योजनाएँ"],
      }),
      header_comment: SetNativeTranslate(Translate.language, {
        russian: [
          Adress.country.value === "russia"
            ? "Вы можете пользоваться нашим сервисом бесплатно в личных целях. Для работы в множестве городов или с большим количеством заказов, выберите подходящий тарифный план"
            : "В настоящий момент наш сервис в полностью бесплатный!",
        ],
        english: [
          Adress.country.value === "russia"
            ? "You can use our service free of charge for personal purposes. To work in multiple cities or with a large number of orders, choose the appropriate tariff plan"
            : `At the moment our service in ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} is absolutely free!`,
        ],
        spanish: [
          Adress.country.value === "russia"
            ? "Puede utilizar nuestro servicio de forma gratuita para fines personales. Para trabajar en varias ciudades o con una gran cantidad de pedidos, elija el plan tarifario adecuado"
            : `¡Por el momento nuestro servicio en ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} es absolutamente gratuito!`,
        ],
        turkish: [
          Adress.country.value === "russia"
            ? "Hizmetimizden kişisel amaçlarınız için ücretsiz olarak yararlanabilirsiniz. Birden fazla şehirde veya çok sayıda siparişle çalışmak için uygun tarife planını seçin"
            : `Şu anda ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} hizmetimiz tamamen ücretsizdir!`,
        ],
        сhinese: [
          Adress.country.value === "russia"
            ? "您可以出于个人目的免费使用我们的服务。 如需在多个城市工作或订单量较大，请选择合适的资费方案"
            : `目前我们的服务在 ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} 是完全免费的！`,
        ],
        hindi: [
          Adress.country.value === "russia"
            ? "आप व्यक्तिगत उद्देश्यों के लिए हमारी सेवा का निःशुल्क उपयोग कर सकते हैं। कई शहरों में या बड़ी संख्या में ऑर्डर के साथ काम करने के लिए, उचित टैरिफ योजना चुनें"
            : `फिलहाल हमारी सेवा ${SetNativeTranslate(
                Translate.language,
                {},
                Adress.country.value
              )} बिल्कुल मुफ़्त है!`,
        ],
      }),
      description: "",
      class: "even",
      type: "self_content",
      role: "customer",
    },
  ];

  return (
    <div className={`page_container ${Setting.app_theme}`}>
      <div className="self_content_container"></div>

      {user.user.role === "carrier"
        ? sections
            .filter((el) => el.id === 4)
            .map((section) => (
              <SubscriptionsSection key={section.id} section={section} />
            ))
        : user.user.role === "customer"
        ? sections
            .filter((el) => el.id === 5)
            .map((section) => (
              <SubscriptionsSection key={section.id} section={section} />
            ))
        : sections.map((section) => (
            <SubscriptionsSection key={section.id} section={section} />
          ))}
    </div>
  );
});

export default SubscriptionsPage;
