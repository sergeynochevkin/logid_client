import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {
  AdContext,
  FilterAndSortContext,
  SettingContext,
  TranslateContext,
} from "../..";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import BoardListItem from "../board/BoardListItem";

const AdTransportSection = observer(() => {
  const { Ad } = useContext(AdContext);
  const { Setting } = useContext(SettingContext);
  const { width } = useWindowDimensions();
  const { Translate } = useContext(TranslateContext);
  const { FilterAndSort } = useContext(FilterAndSortContext);

  useEffect(() => {
    FilterAndSort.setBoardFilters(
      {
        ...FilterAndSort.boardFilters.transports,
        main_limit: width < 501 ? 2 : width < 770 ? 3 : 6,
      },
      "transports"
    );
  }, []);

  return (
    <>
      <div className={`ad_transport_container ${Setting.app_theme}`}>
        <div className={`ad_transport_section`}>
          {Ad.transports.main.map((transport) => (
            <BoardListItem key={transport.id} transport={transport} />
          ))}
        </div>
        <div className="how_to_add_text_container">
          {SetNativeTranslate(Translate.language, {
            russian: [
              "Хотите увидесь свой транспорт здесь? Зарегистрируйтесь, добавьте транспорт и фотографии, заполните рекламный текст и включите показ. Дождитесь модерации. Сейчас это бесплатно!",
            ],
            english: [
              "Would you like to see your transport here? Sign up, add a vehicle, pop up your ad text, and turn on the display. Wait for moderation. Now it is free!",
            ],
            spanish: [
              "¿Quieres ver tu transporte aquí? Regístrese, agregue transporte y fotografías, complete el texto publicitario y encienda la pantalla. Espere la moderación. ¡Ahora es gratis!",
            ],
            turkish: [
              "Taşımanızı burada görmek ister misiniz? Kayıt olun, ulaşım ve fotoğraf ekleyin, reklam metnini doldurun ve ekranı açın. Lütfen moderasyon için bekleyin. Artık ücretsiz!",
            ],
            сhinese: [
              "您想在这里看看您的交通工具吗？ 注册、添加交通和照片、填写广告文字并打开显示屏。 请等待审核。 现在免费了！",
            ],
            hindi: [
              "क्या आप यहां अपना परिवहन देखना चाहेंगे? रजिस्टर करें, परिवहन और तस्वीरें जोड़ें, विज्ञापन टेक्स्ट भरें और डिस्प्ले चालू करें। कृपया मॉडरेशन के लिए प्रतीक्षा करें. अब यह मुफ़्त है!",
            ],
          })}
        </div>
      </div>
    </>
  );
});

export default AdTransportSection;
