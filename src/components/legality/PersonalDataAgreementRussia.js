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
Bu onay, internette https://logid.app/application kayıt adresinde yer alan başvuru sayfasında tarafımdan onaylandığı andan itibaren yürürlüğe girer ve mevcut mevzuatın belirlediği süreler boyunca geçerlidir.`]
        })}</div>
      }
    </div>
  )
})

export default PersonalDataAgreementRussia