import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const PersonalDataAgreementRussia = observer(() => {
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const { Setting } = useContext(SettingContext)

  return (
    <div className='modal_doc_container'>
      {Adress.country.value === 'russia' &&
        <div className={`modal_doc ${Setting.app_theme === 'dark' && 'dark'} new-line`}>{SetNativeTranslate(Translate.language, {
          russian: [`
          СОГЛАСИЕ
пользователя веб приложения, находящегося в сети интернет по ссылке https://logid.app/ (далее- приложения) на обработку персональных данных
Настоящим свободно, своей волей и в своих интересах даю согласие Ночевкину Сергею Михайловичу(далее – оператору), находящемуся по адресу: г. Санкт-Петербург, ул. Тамбасова, д. 4, корпус 2, кв. 465, на автоматизированную и неавтоматизированную обработку моих персональных данных, в соответствии с опубликованной на страницах https://logid.app/ и  https://logid.app/registration приложения политикой конфиденциальности, для целей обеспечения работоспособности моего аккаунта в веб приложении а также предоставления моих персональных данных по моему поручению в целях исполнения договора со мной других пользователей приложения, заключенного по моей инициативе. 
Оператор вправе осуществлять обработку моих персональных данных следующими способами: сбор, запись, систематизация, накопление, хранение, обновление, изменение, использование.
Настоящее согласие вступает в силу с момента его подтверждения мной на странице приложения, находящейся в сети интернет по адресу https://logid.app/registration  и действует в течение сроков, установленных действующим законодательством.
          `],
          english: [`
          AGREEMENT
the user of a web application located on the Internet at the link https://logid.app/ (hereinafter referred to as applications) for the processing of personal data
I hereby freely, by my own will and in my own interests, give my consent to Sergey Mikhailovich Nochevkin (hereinafter referred to as the operator), located at the address: St. Petersburg, st. Tambasova, d. 4, building 2, apt. 465, to the automated and non-automated processing of my personal data, in accordance with the privacy policy published on the pages https://logid.app/ and https://logid.app/registration of the application, for the purposes of ensuring the performance of my account in the web application, as well as providing my personal data on my behalf in order to fulfill the contract with me of other users of the application, concluded on my initiative.
The operator has the right to process my personal data in the following ways: collection, recording, systematization, accumulation, storage, updating, modification, use.
This consent comes into force from the moment it is confirmed by me on the application page located on the Internet at the address https://logid.app/application registration and is valid for the periods established by the current legislation.
          `],
          spanish: [`
          ACUERDO
el usuario de una aplicación web ubicada en Internet en el enlace https://logid.app/ (en adelante, aplicaciones) para el procesamiento de datos personales
Por la presente, libremente, por mi propia voluntad y en mi propio interés, doy mi consentimiento a Sergey Mikhailovich Nochevkin (en adelante, el operador), ubicado en la dirección: San Petersburgo, st. Tambasova, d. 4, edificio 2, apto. 465, al procesamiento automatizado y no automatizado de mis datos personales, de acuerdo con la política de privacidad publicada en las páginas https://logid.app/ y https://logid.app/registration de la aplicación, para los fines de garantizar el funcionamiento de mi cuenta en la aplicación web, así como de proporcionar mis datos personales en mi nombre para cumplir el contrato conmigo de otros usuarios de la aplicación, celebrado por mi iniciativa.
El operador tiene derecho a procesar mis datos personales de las siguientes formas: recopilación, registro, sistematización, acumulación, almacenamiento, actualización, modificación, uso.
Este consentimiento entra en vigor desde el momento en que lo confirmo en la página de la aplicación ubicada en Internet en la dirección https://logid.app/registro de la aplicación y es válido por los plazos establecidos por la legislación vigente.
          `],
          turkish: [`ANLAŞMA
kişisel verilerin işlenmesi için internette https://logid.app/ bağlantısında bulunan bir web uygulamasının kullanıcısı (bundan sonra uygulamalar olarak anılacaktır)
Burada serbestçe, kendi isteğimle ve kendi çıkarlarım doğrultusunda, şu adreste bulunan Sergey Mihayloviç Nochevkin'e (bundan sonra operatör olarak anılacaktır) onay veriyorum: St. Petersburg, st. Tambasova, d. 4, bina 2, daire. 465 sayılı Kanun uyarınca kişisel verilerimin, uygulamanın https://logid.app/ ve https://logid.app/registration sayfalarında yayınlanan gizlilik politikasına uygun olarak, belirtilen amaçlar doğrultusunda otomatik ve otomatik olmayan şekilde işlenmesine ilişkin hükümler yer almaktadır. Web uygulamasında hesabımın performansının sağlanması ve uygulamanın diğer kullanıcılarının benimle benim inisiyatifimle imzaladığı sözleşmenin yerine getirilmesi için kişisel verilerimin benim adıma sağlanması.
Operatör, kişisel verilerimi aşağıdaki şekillerde işleme hakkına sahiptir: toplama, kaydetme, sistemleştirme, biriktirme, saklama, güncelleme, değiştirme, kullanma.
Bu onay, internette https://logid.app/application kayıt adresinde yer alan başvuru sayfasında tarafımdan onaylandığı andan itibaren yürürlüğe girer ve mevcut mevzuatın belirlediği süreler boyunca geçerlidir.`],
          сhinese: [`协议
通过链接 https://logid.app/ 位于互联网上的网络应用程序（以下简称应用程序）的用户，用于处理个人数据
我特此出于我自己的自由意志和利益，同意谢尔盖·米哈伊洛维奇·诺切夫金（Sergei Mikhailovich Nochevkin）（以下简称运营商），地址为：圣彼得堡，圣彼得堡。 Tambasova，4 岁，2 号楼，公寓。 465，根据应用程序页面 https://logid.app/ 和 https://logid.app/registration 上发布的隐私政策，自动和非自动处理我的个人数据，目的是确保我的帐户在网络应用程序中的功能，并根据我的指示提供我的个人数据，以履行我主动与该应用程序的其他用户签订的合同。
运营商有权通过以下方式处理我的个人数据：收集、记录、系统化、积累、存储、更新、修改、使用。
本同意书自我在互联网 https://logid.app/registration 上的申请页面确认之日起生效，并在现行法律规定的期限内有效。`],
          hindi: [`समझौता
व्यक्तिगत डेटा के प्रसंस्करण के लिए लिंक https://logid.app/ (बाद में एप्लिकेशन के रूप में संदर्भित) के माध्यम से इंटरनेट पर स्थित एक वेब एप्लिकेशन का उपयोगकर्ता
मैं इसके द्वारा स्वतंत्र रूप से, अपनी स्वतंत्र इच्छा से और अपने हित में, सेंट पीटर्सबर्ग, सेंट के पते पर स्थित सर्गेई मिखाइलोविच नोचेवकिन (बाद में ऑपरेटर के रूप में संदर्भित) को अपनी सहमति देता हूं। ताम्बासोवा, 4, बिल्डिंग 2, उपयुक्त। 465, मेरे व्यक्तिगत डेटा के स्वचालित और गैर-स्वचालित प्रसंस्करण के लिए, एप्लिकेशन के पेज https://logid.app/ और https://logid.app/registration पर प्रकाशित गोपनीयता नीति के अनुसार, वेब एप्लिकेशन में मेरे खाते की कार्यक्षमता सुनिश्चित करना, साथ ही एप्लिकेशन के अन्य उपयोगकर्ताओं के साथ मेरे साथ अनुबंध को पूरा करने के लिए मेरे निर्देश पर मेरा व्यक्तिगत डेटा प्रदान करना, मेरी पहल पर संपन्न हुआ।
ऑपरेटर को मेरे व्यक्तिगत डेटा को निम्नलिखित तरीकों से संसाधित करने का अधिकार है: संग्रह, रिकॉर्डिंग, व्यवस्थितकरण, संचय, भंडारण, अद्यतन करना, संशोधन, उपयोग।
यह सहमति उस क्षण से लागू हो जाती है जब इंटरनेट पर https://logid.app/registration पर स्थित एप्लिकेशन पेज पर मेरे द्वारा इसकी पुष्टि की जाती है और यह वर्तमान कानून द्वारा स्थापित अवधि के लिए वैध है।`],
        })}</div>
      }
    </div>
  )
})

export default PersonalDataAgreementRussia