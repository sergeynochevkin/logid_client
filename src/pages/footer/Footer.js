import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {
  AdressContext,
  ComponentFunctionContext,
  SettingContext,
  TranslateContext,
} from "../..";
import Agreement from "../../components/legality/Agreement";
import Modal from "../../components/ui/modal/Modal";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import "./Footer.css";
import FooterSection from "./FooterSection";
import logo_dark from "../../assets/logo_dark.webp";
import {
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const Footer = observer(() => {
  const { Setting } = useContext(SettingContext);
  const { Translate } = useContext(TranslateContext);
  const { Adress } = useContext(AdressContext);

  const [agreement, setAgreement] = useState("");
  const { ComponentFunction } = useContext(ComponentFunctionContext);

  const sections = [
    {
      id: 1,
      header: SetNativeTranslate(Translate.language, {
        russian: ["О сервисе"],
        english: ["About"],
        spanish: ["Acerca de"],
        turkish: ["Hakkında"],
        сhinese: ["关于我们"],
        hindi: ["हमारे बारे में"],
      }),
      header_comment: "",
      description: "",
      class: "footer_copyright_container",
      type: "text",
    },
  ];

  const items = [
    {
      id: 1,
      icon: logo_dark,
      name: "logid",
      description: "",
      section_id: 1,
      class: "footer_logo",
    },
    {
      id: 2,
      icon: "",
      name: "logid 2023 © all rights reserved",
      description: "",
      section_id: 1,
      class: "footer_copyright",
    },
    {
      id: 11,
      icon: "",
      name: (
        <a href="./board">
          {SetNativeTranslate(Translate.language, {
            russian: ["Доска объявлений"],
            english: ["Bulletin board"],
            spanish: ["Tablón de anuncios"],
            turkish: ["Bülten tahtası"],
            сhinese: ["布告栏"],
            hindi: ["बुलेटिन बोर्ड"],
          })}
        </a>
      ),
      description: "",
      section_id: 1,
      class: "",
    },
    {
      id: 10,
      icon: "",
      name: (
        <a href="/fleet">
          {SetNativeTranslate(Translate.language, {
            russian: ["Автопаркам и курьерским службам"],
            english: ["Vehicle fleets and courier services"],
            spanish: ["Flotas de vehículos y servicios de mensajería"],
            turkish: ["Araç filoları ve kurye hizmetleri"],
            сhinese: ["车队和快递服务"],
            hindi: ["वाहन बेड़े और कूरियर सेवाएँ"],
          })}
        </a>
      ),
      description: "",
      section_id: 1,
      class: "footer_email",
    },
    {
      id: 9,
      icon: "",
      name: (
        <a href="./subscriptions">
          {SetNativeTranslate(Translate.language, {
            russian: ["Цены"],
            english: ["Prices"],
            spanish: ["Precios"],
            turkish: ["Fiyat:% s"],
            сhinese: ["价格"],
            hindi: ["कीमतों"],
          })}
        </a>
      ),
      description: "",
      section_id: 1,
      class: "footer_email",
    },
    {
      id: 3,
      icon: "",
      name: <a href="mailto:support@logid.app">support@logid.app</a>,
      description: "",
      section_id: 1,
      class: "footer_email",
    },
    {
      id: 4,
      icon: "",
      name: SetNativeTranslate(Translate.language, {
        russian: ["Пользовательское соглашение"],
        english: ["User agreement"],
        spanish: ["Acuerdo del usuario"],
        turkish: ["Kullanıcı sözleşmesi"],
        сhinese: ["使用条款"],
        hindi: ["उपयोग की शर्तें"],
      }),
      description: "",
      section_id: 1,
      class: "legality_link",
    },
    {
      id: 6,
      icon: "",
      name: SetNativeTranslate(Translate.language, {
        russian: ["Политика конфиденциальности"],
        english: ["Privacy policy"],
        spanish: ["Política de privacidad"],
        turkish: ["Gizlilik politikası"],
        сhinese: ["隐私政策"],
        hindi: ["गोपनीयता नीति"],
      }),
      description: "",
      section_id: 1,
      class: "legality_link",
    },
    {
      id: 5,
      icon: "",
      name: SetNativeTranslate(Translate.language, {
        russian: ["Согласие на обработку персональных данных"],
        english: ["Consent to the processing of personal data"],
        spanish: ["Consentimiento para el tratamiento de datos personales"],
        turkish: ["Kişisel verilerin işlenmesine onay"],
        сhinese: ["同意处理个人数据"],
        hindi: ["व्यक्तिगत डेटा के प्रसंस्करण के लिए सहमति"],
      }),
      description: "",
      section_id: 1,
      class: "legality_link",
    },
    {
      id: 7,
      icon: "",
      name:
        Adress.country.value === "russia"
          ? SetNativeTranslate(Translate.language, {
              russian: [
                "Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе по причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов.",
              ],
              english: [
                "All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The Service is not a carrier, carrier representative, customer, customer representative. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance.",
              ],
              spanish: [
                "Todos los datos facilitados en el servicio logid, en lo sucesivo denominado el servicio, tienen finalidad informativa y no constituyen una oferta pública determinada por lo dispuesto en el artículo 437 del Código Civil de la Federación de Rusia. El Servicio no es un transportista, un representante del transportista, un cliente, un representante del cliente. Por el momento, el servicio no comprueba la pureza jurídica ni la integridad comercial de los usuarios. El servicio no es de ninguna manera responsable de disputas mutuas, desacuerdos, circunstancias que surjan como parte de la implementación de relaciones contractuales entre transportistas, clientes, despachadores y logísticos. Incluyendo el motivo de la presentación por parte del transportista o del cliente de información inexacta o incompleta sobre el pedido o el estado de su paso, incluso en caso de errores técnicos en el servicio. Recomendamos encarecidamente ponerse en contacto con el socio seleccionado a través de los canales de comunicación proporcionados, así como verificar los documentos, realizar el trabajo contractual necesario y utilizar un seguro de carga.",
              ],
              turkish: [
                "Bundan sonra hizmet olarak anılacak olan logid hizmetinde sağlanan tüm veriler bilgilendirme amaçlıdır ve Rusya Federasyonu Medeni Kanunu`nun 437. maddesi hükümlerine göre belirlenen halka açık bir teklif değildir. Hizmet bir taşıyıcı, taşıyıcı temsilcisi, müşteri, müşteri temsilcisi değildir. Şu anda hizmet, kullanıcıları yasal saflık ve ticari bütünlük açısından kontrol etmiyor. Hizmet, taşıyıcılar, müşteriler, sevkıyatçılar ve lojistikçiler arasındaki sözleşmeye dayalı ilişkilerin uygulanmasının bir parçası olarak ortaya çıkan karşılıklı anlaşmazlıklardan, anlaşmazlıklardan ve durumlardan hiçbir şekilde sorumlu değildir. Hizmette teknik hatalar olması da dahil olmak üzere, taşıyıcı veya müşteri tarafından sipariş veya geçiş durumu hakkında yanlış veya eksik bilgi verilmesinin nedeni dahil. Seçilen iş ortağıyla sağlanan iletişim kanalları aracılığıyla iletişime geçmenizi, ayrıca belgeleri kontrol etmenizi, gerekli sözleşme çalışmalarını yürütmenizi ve kargo sigortasını kullanmanızı şiddetle tavsiye ederiz..",
              ],
              сhinese: [
                "Logid服务（以下简称服务）中提供的所有数据仅供参考，并非俄罗斯联邦民法典第437条规定所定义的公开要约。 该服务不是承运人、承运人的代表、客户或客户的代表。 目前，该服务不会检查用户的法律纯洁性和商业诚信。 对于承运人、客户、调度员和物流商之间在执行合同关系的框架内出现的相互争议、分歧或情况，本服务不承担任何责任。 包括由于承运商或客户发布了有关订单或其完成状态的不可靠或不完整的信息，包括服务中出现技术错误。 我们强烈建议您通过提供的沟通渠道联系您选择的合作伙伴，并检查文件、进行必要的合同工作并使用货物保险",
              ],
              hindi: [
                "लॉग सेवा में प्रदान किया गया सभी डेटा, जिसे इसके बाद सेवा के रूप में संदर्भित किया गया है, केवल सूचनात्मक उद्देश्यों के लिए है और रूसी संघ के नागरिक संहिता के अनुच्छेद 437 के प्रावधानों द्वारा परिभाषित सार्वजनिक प्रस्ताव नहीं है। सेवा कोई वाहक, वाहक का प्रतिनिधि, ग्राहक या ग्राहक का प्रतिनिधि नहीं है। फिलहाल, सेवा उपयोगकर्ताओं की कानूनी शुद्धता और व्यावसायिक अखंडता की जांच नहीं करती है। सेवा किसी भी तरह से वाहक, ग्राहकों, डिस्पैचर्स और लॉजिस्टिक के बीच संविदात्मक संबंधों के कार्यान्वयन के ढांचे में उत्पन्न होने वाले आपसी विवादों, असहमति या परिस्थितियों के लिए ज़िम्मेदार नहीं है। इसमें वाहक या ग्राहक द्वारा ऑर्डर या उसके पूरा होने की स्थिति के बारे में अविश्वसनीय या अधूरी जानकारी पोस्ट करने के कारण, सेवा में तकनीकी त्रुटियों की स्थिति भी शामिल है। हम दृढ़तापूर्वक अनुशंसा करते हैं कि आप दिए गए संचार चैनलों के माध्यम से अपने चुने हुए भागीदार से संपर्क करें, साथ ही दस्तावेजों की जांच करें, आवश्यक संविदात्मक कार्य करें और कार्गो बीमा का उपयोग करें।",
              ],
            })
          : SetNativeTranslate(Translate.language, {
              russian: [
                "Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе по причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов.",
              ],
              english: [
                "All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer. The Service is not a carrier, carrier representative, customer, customer representative. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance.",
              ],
              spanish: [
                "Todos los datos facilitados en el servicio logid, en adelante el servicio, tienen finalidad informativa y no suponen una oferta pública. El Servicio no es un transportista, un representante del transportista, un cliente, un representante del cliente. Por el momento, el servicio no comprueba la pureza jurídica ni la integridad comercial de los usuarios. El servicio no es de ninguna manera responsable de disputas mutuas, desacuerdos, circunstancias que surjan como parte de la implementación de relaciones contractuales entre transportistas, clientes, despachadores y logísticos. Incluyendo el motivo de la presentación por parte del transportista o del cliente de información inexacta o incompleta sobre el pedido o el estado de su paso, incluso en caso de errores técnicos en el servicio. Recomendamos encarecidamente ponerse en contacto con el socio seleccionado a través de los canales de comunicación proporcionados, así como verificar los documentos, realizar el trabajo contractual necesario y utilizar un seguro de carga.",
              ],
              turkish: [
                "Bundan sonra hizmet olarak anılacak olan logid hizmetinde sağlanan tüm veriler bilgilendirme amaçlıdır ve halka arz değildir. Hizmet bir taşıyıcı, taşıyıcı temsilcisi, müşteri, müşteri temsilcisi değildir. Şu anda hizmet, kullanıcıları yasal saflık ve ticari bütünlük açısından kontrol etmiyor. Hizmet, taşıyıcılar, müşteriler, sevkıyatçılar ve lojistikçiler arasındaki sözleşmeye dayalı ilişkilerin uygulanmasının bir parçası olarak ortaya çıkan karşılıklı anlaşmazlıklardan, anlaşmazlıklardan ve durumlardan hiçbir şekilde sorumlu değildir. Hizmette teknik hatalar olması da dahil olmak üzere, taşıyıcı veya müşteri tarafından sipariş veya geçiş durumu hakkında yanlış veya eksik bilgi verilmesinin nedeni dahil. Seçilen iş ortağıyla sağlanan iletişim kanalları aracılığıyla iletişime geçmenizi, belgeleri kontrol etmenizi, gerekli sözleşme çalışmalarını yürütmenizi ve kargo sigortasını kullanmanızı şiddetle tavsiye ederiz.",
              ],
              сhinese: [
                "logid服务中提供的所有数据（进一步简称为服务）仅供参考，并不构成公开要约。 该服务不是承运人、承运人的代表、客户或客户的代表。 目前，该服务不会检查用户的法律纯洁性和商业诚信。 对于承运人、客户、调度员和物流商之间在执行合同关系的框架内出现的相互争议、分歧或情况，本服务不承担任何责任。 包括由于承运商或客户发布了有关订单或其完成状态的不可靠或不完整的信息，包括服务中出现技术错误。 我们强烈建议您通过提供的沟通渠道联系您选择的合作伙伴，并检查文件、进行必要的合同工作并使用货物保险",
              ],
              hindi: [
                "लॉग सेवा में प्रदान किया गया सभी डेटा, जिसे आगे सेवा के रूप में जाना जाता है, केवल सूचनात्मक उद्देश्यों के लिए है और सार्वजनिक प्रस्ताव नहीं बनता है। सेवा कोई वाहक, वाहक का प्रतिनिधि, ग्राहक या ग्राहक का प्रतिनिधि नहीं है। फिलहाल, सेवा उपयोगकर्ताओं की कानूनी शुद्धता और व्यावसायिक अखंडता की जांच नहीं करती है। सेवा किसी भी तरह से वाहक, ग्राहकों, डिस्पैचर्स और लॉजिस्टिक के बीच संविदात्मक संबंधों के कार्यान्वयन के ढांचे में उत्पन्न होने वाले आपसी विवादों, असहमति या परिस्थितियों के लिए ज़िम्मेदार नहीं है। इसमें वाहक या ग्राहक द्वारा ऑर्डर या उसके पूरा होने की स्थिति के बारे में अविश्वसनीय या अधूरी जानकारी पोस्ट करने के कारण, सेवा में तकनीकी त्रुटियों की स्थिति भी शामिल है। हम दृढ़तापूर्वक अनुशंसा करते हैं कि आप दिए गए संचार चैनलों के माध्यम से अपने चुने हुए भागीदार से संपर्क करें, साथ ही दस्तावेजों की जांच करें, आवश्यक संविदात्मक कार्य करें और कार्गो बीमा का उपयोग करें।",
              ],
            }),
      description: "",
      section_id: 1,
      class: "footer_copyright",
    },
    {
      id: 8,
      icon: "",
      name: SetNativeTranslate(Translate.language, {
        russian: [
          "Услуги предосталяет  Ночевкин Сергей Михайлович ИНН 511500911204 телефон +79011016250",
        ],
        english: [
          "Services are provided by Nochevkin Sergey TIN 511500911204 phone +79011016250",
        ],
        spanish: [
          "Los servicios son proporcionados por Nochevkin Sergey TIN 511500911204 teléfono +79011016250",
        ],
        turkish: [
          "Hizmetler Nochevkin Sergey TIN 511500911204 telefon +79011016250 tarafından sağlanmaktadır",
        ],
        сhinese: [
          "服务由 Nochevkin Sergey Mikhailovich INN 511500911204 电话 +79011016250 提供",
        ],
        hindi: [
          "सेवाएं नोचेव्किन सर्गेई मिखाइलोविच आईएनएन 511500911204 फोन +79011016250 द्वारा प्रदान की जाती हैं",
        ],
      }),
      description: "",
      section_id: 1,
      class: "footer_copyright",
    },
  ];

  return (
    <>
      <Modal ComponentFunction={ComponentFunction} parent={"agreement"}>
        <Agreement agreement={agreement}></Agreement>
      </Modal>

      <div className="social_anchor">
        <div className="footer_social_share">
          <WhatsappShareButton url={"https://logid.app/"} title="logid">
            <WhatsappIcon size={32}></WhatsappIcon>
          </WhatsappShareButton>
          <TelegramShareButton url={"https://logid.app/"} title="logid">
            <TelegramIcon size={32}></TelegramIcon>
          </TelegramShareButton>
          <VKShareButton url={"https://logid.app/"} title="logid">
            <VKIcon size={32}></VKIcon>
          </VKShareButton>
        </div>
      </div>

      <div
        className={
          Setting.app_theme === "light"
            ? "footer_container"
            : "footer_container dark"
        }
      >
        {sections.map((section) => (
          <FooterSection
            section={section}
            items={items.filter((el) => el.section_id === section.id)}
            key={section.id}
            setAgreement={setAgreement}
          />
        ))}
      </div>
    </>
  );
});

export default Footer;
