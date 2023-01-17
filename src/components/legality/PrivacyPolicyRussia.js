import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const PrivacyPolicyRussia = observer(() => {
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const { Setting } = useContext(SettingContext)

  return (
    <div className='modal_doc_container'>
      {Adress.country.value === 'russia' &&
        <div className={`modal_doc ${Setting.app_theme === 'dark' && 'dark'} new-line`}>{SetNativeTranslate(Translate.language, {
          russian: [`
          Политика в отношении обработки персональных данных
1. Общие положения
Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» (далее - Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Ночевкиным Сергеем Михайловичем, адрес г. Санкт-Петербург, ул. Тамбасова 4 к 2, кв. 465,  (далее – Оператор).
1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-приложения, доступного в сети интернет по сетевому адресу https://logid.app.
2. Основные понятия, используемые в Политике
2.1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники.
2.2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).
2.3. Веб-приложение – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://logid.app.
2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных, и обеспечивающих их обработку информационных технологий и технических средств.
2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.
2.6. Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
2.7. Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.
2.8. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-приложения https://logid.app.
2.9. Персональные данные, разрешенные субъектом персональных данных для распространения, - персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее - персональные данные, разрешенные для распространения).
2.10. Пользователь – любой посетитель веб-приложения https://logid.app.
2.11. Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
2.12. Распространение персональных данных – любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом. 
2.13. Трансграничная передача персональных данных – передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.
2.14. Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) уничтожаются материальные носители персональных данных.
3. Основные права и обязанности Оператора
3.1. Оператор имеет право:
– получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;
– в случае отзыва субъектом персональных данных согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;
– самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.
3.2. Оператор обязан:
– предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;
– организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;
– отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;
– сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 30 дней с даты получения такого запроса;
– публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;
– принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;
– прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;
– исполнять иные обязанности, предусмотренные Законом о персональных данных.
4. Основные права и обязанности субъектов персональных данных
4.1. Субъекты персональных данных имеют право:
– получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных;
– требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;
– выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;
– на отзыв согласия на обработку персональных данных;
– обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;
– на осуществление иных прав, предусмотренных законодательством РФ.
4.2. Субъекты персональных данных обязаны:
– предоставлять Оператору достоверные данные о себе;
– сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.
4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.
5. Оператор может обрабатывать следующие персональные данные Пользователя
5.1. Фамилия, имя, отчество.
5.2. Электронный адрес.
5.3. Номера телефонов.
5.4. Реквизиты документа, удостоверяющего личность.
5.5. Идентификационный номер налогоплательщика, дата постановки его на учет, реквизиты свидетельства постановки на учет в налоговом органе.
5.6. Адрес фактического места проживания и регистрации по месту жительства и (или) по месту пребывания.
5.7. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).
5.8. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.
5.9. Обработка специальных категорий персональных данных, касающихся расовой, национальной принадлежности, политических взглядов, религиозных или философских убеждений, интимной жизни, Оператором не осуществляется.
5.10. Обработка персональных данных, разрешенных для распространения, из числа специальных категорий персональных данных, указанных в ч. 1 ст. 10 Закона о персональных данных, допускается, если соблюдаются запреты и условия, предусмотренные ст. 10.1 Закона о персональных данных.
5.11. Согласие Пользователя на обработку персональных данных, разрешенных для распространения, оформляется отдельно от других согласий на обработку его персональных данных. При этом соблюдаются условия, предусмотренные, в частности, ст. 10.1 Закона о персональных данных. Требования к содержанию такого согласия устанавливаются уполномоченным органом по защите прав субъектов персональных данных.
5.11.1 Согласие на обработку персональных данных, разрешенных для распространения, Пользователь предоставляет Оператору непосредственно.
5.11.2 Оператор обязан в срок не позднее трех рабочих дней с момента получения указанного согласия Пользователя опубликовать информацию об условиях обработки, о наличии запретов и условий на обработку неограниченным кругом лиц персональных данных, разрешенных для распространения.
5.11.3 Передача (распространение, предоставление, доступ) персональных данных, разрешенных субъектом персональных данных для распространения, должна быть прекращена в любое время по требованию субъекта персональных данных. Данное требование должно включать в себя фамилию, имя, отчество (при наличии), контактную информацию (номер телефона, адрес электронной почты или почтовый адрес) субъекта персональных данных, а также перечень персональных данных, обработка которых подлежит прекращению. Указанные в данном требовании персональные данные могут обрабатываться только Оператором, которому оно направлено.
5.11.4 Согласие на обработку персональных данных, разрешенных для распространения, прекращает свое действие с момента поступления Оператору требования, указанного в п. 5.11.3 настоящей Политики в отношении обработки персональных данных.

6. Принципы обработки персональных данных
6.1. Обработка персональных данных осуществляется на законной и справедливой основе.
6.2. Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.
6.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.
6.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.
6.5. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.
6.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.
6.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.
7. Цели обработки персональных данных
7.1. Цель обработки персональных данных Пользователя:
– информирование Пользователя посредством отправки электронных писем и смс уведомлений;
– заключение, исполнение и прекращение гражданско-правовых договоров;
– предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся в веб-приложении https://logid.app.
7.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты support@logid.app с пометкой «Отказ от уведомлений о новых продуктах и услугах и специальных предложениях».
7.3. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.

8. Правовые основания обработки персональных данных
8.1. Правовыми основаниями обработки персональных данных Оператором являются:
–  Федеральный закон "Об информации, информационных технологиях и о защите информации" от 27.07.2006 N 149-ФЗ;
– уставные документы Оператора;
– договоры, заключаемые между оператором и субъектом персональных данных;
– федеральные законы, иные нормативно-правовые акты в сфере защиты персональных данных;
– согласия Пользователей на обработку их персональных данных, на обработку персональных данных, разрешенных для распространения.
8.2. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные в веб-приложении https://logid.app или направленные Оператору посредством электронной почты. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.
8.3. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).
8.4. Субъект персональных данных самостоятельно принимает решение о предоставлении его персональных данных и дает согласие свободно, своей волей и в своем интересе.
9. Условия обработки персональных данных
9.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.
9.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.
9.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.
9.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем, по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.
9.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.
9.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе.
9.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.
10. Порядок сбора, хранения, передачи и других видов обработки персональных данных
10.1 Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
10.2. Персональные данные Пользователя никогда, в случае, если субъект не дал согласия на их распространение, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.
10.3. В случае выявления неточностей в персональных данных Пользователь может актуализировать их самостоятельно или путем направления Оператору уведомление на адрес электронной почты Оператора support@logid.app с пометкой «Актуализация персональных данных».
10.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством.
Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора support@logid.app с пометкой «Отзыв согласия на обработку персональных данных».
10.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Субъект персональных данных и/или Пользователь обязан самостоятельно своевременно ознакомиться с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг.
10.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ.
10.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.
10.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.
10.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных или отзыв согласия субъектом персональных данных, а также выявление неправомерной обработки персональных данных.
11. Перечень действий, производимых Оператором с полученными персональными данными
11.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.
11.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.
12. Трансграничная передача персональных данных
12.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.
12.2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.
13. Конфиденциальность персональных данных
Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.
14. Размещение данных в приложении
Когда пользователь публикует в приложении заказы на перевозку берет заказы в работу или делает по ним предложения, предоставляет другому пользователю свой уникальный id для добавления партнера, публикует отзывы или информацию в своём профиле, персональные данные в составе такой информации становятся доступными неопределённому кругу лиц. Вы раскрываете такие данные самостоятельно без предоставления Оператору персональных данных отдельного согласия. Оператор не распространяет ваши персональные данные. Мы обрабатываем такие данные в целях исполнения договора с вами, заключенного по вашей инициативе. Цель, с которой пользователи размещают данные в приложении – установить контакт с потенциальным заказчиком или перевозчиком (клиентом, исполнителем), который заинтересован в заключении сделки по заказу на перевозку. Пользователи не вправе обрабатывать данные других пользователей для любых иных целей. Это означает, что:
вы не можете звонить или отправлять сообщения пользователям, чтобы предлагать свои товары или услуги; 
вы не можете копировать данные пользователей, чтобы размещать их на других сервисах;
вы не можете использовать информацию пользователей приложения в целях скоринга.
15. Безопасность
Ответственное отношение к персональным данным – стандарт работы Оператора.
Для защиты персональных данных Оператор:
издал и опубликовали в приложении политику обработки данных. Утвердил локальные акты по вопросам обработки и защиты персональных данных.
несет ответственность за организацию обработки персональных данных.
регулярно проверяет процессы и документы на их соответствие закону.
оценивает риски и вред, который может причинить, если нарушит закон о персональных данных. С учетом проведенной оценки подбирает подходящие меры для соблюдения закона.
применяет правовые, организационные и технические меры, чтобы обеспечить безопасность персональных данных.
Принимая меры по защите персональных данных, оператор основывается на:
требованиях законодательства;
установленном уровне защищенности персональных данных;
актуальных угрозах, определенных моделью угроз;
базовом наборе мер защиты, установленном нормативными правовыми актами для соответствующего уровня защищенности;
риск-ориентированном подходе при выборе оптимальных мер;
приоритете законных интересов пользователей.
16. Хранение персональных данных 
Оператор осуществляет запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение ваших персональных данных с использованием баз данных, находящихся на территории России.
Для хранения Оператор использует центры обработки данных, находящиеся на территории г. Москва. Оператор хранит персональные данные в соответствии со сроками обработки данных, необходимыми для достижения целей обработки.
17. Заключительные положения
17.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты support@logid.app.
17.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
17.3. Актуальная версия Политики и все предыдущие ее версии в свободном доступе расположена в сети Интернет по адресу https://logid.app.
          `],
          english: [`
          Policy regarding the processing of personal data
1. General Provisions
This personal data processing policy has been drawn up in accordance with the requirements of the Federal Law of July 27, 2006. No. 152-FZ “On Personal Data” (hereinafter referred to as the Law on Personal Data) and determines the procedure for processing personal data and measures to ensure the security of personal data taken by Sergey Mikhailovich Nochevkin, address St. Petersburg, st. Tambasova 4 to 2, apt. 465, (hereinafter referred to as the Operator).
1.1. The operator sets as its most important goal and condition for the implementation of its activities the observance of the rights and freedoms of a person and a citizen in the processing of his personal data, including the protection of the rights to privacy, personal and family secrets.
1.2. This Operator's policy regarding the processing of personal data (hereinafter referred to as the Policy) applies to all information that the Operator can receive about visitors to a web application available on the Internet at the network address https://logid.app.
2. Basic concepts used in the Policy
2.1. Automated processing of personal data - processing of personal data using computer technology.
2.2. Blocking of personal data is a temporary suspension of the processing of personal data (unless the processing is necessary to clarify personal data).
2.3. Web application - a set of graphic and information materials, as well as computer programs and databases that ensure their availability on the Internet at the network address https://logid.app.
2.4. Personal data information system - a set of personal data contained in databases, and information technologies and technical means that ensure their processing.
2.5. Depersonalization of personal data - actions as a result of which it is impossible to determine, without the use of additional information, the ownership of personal data by a specific User or other subject of personal data.
2.6. Processing of personal data - any action (operation) or a set of actions (operations) performed with or without the use of automation tools with personal data, including collection, recording, systematization, accumulation, storage, clarification (updating, changing), extraction, use, transfer (distribution, provision, access), depersonalization, blocking, deletion, destruction of personal data.
2.7. Operator - a state body, municipal body, legal entity or individual, independently or jointly with other persons organizing and (or) carrying out the processing of personal data, as well as determining the purposes of processing personal data, the composition of personal data to be processed, the actions (operations) performed with personal data.
2.8. Personal data - any information relating directly or indirectly to a specific or identifiable User of the https://logid.app web application.
2.9. Personal data permitted by the subject of personal data for dissemination - personal data, access to an unlimited number of persons to which is provided by the subject of personal data by giving consent to the processing of personal data permitted by the subject of personal data for distribution in the manner prescribed by the Law on Personal Data (hereinafter referred to as personal data). data allowed for distribution).
2.10. User - any visitor to the https://logid.app web application.
2.11. Providing personal data - actions aimed at disclosing personal data to a certain person or a certain circle of persons.
2.12. Dissemination of personal data - any actions aimed at disclosing personal data to an indefinite circle of persons (transfer of personal data) or familiarizing with personal data of an unlimited number of persons, including the disclosure of personal data in the media, placement in information and telecommunication networks or providing access to personal data in any other way.
2.13. Cross-border transfer of personal data is the transfer of personal data to the territory of a foreign state to an authority of a foreign state, a foreign individual or a foreign legal entity.
2.14. Destruction of personal data - any actions as a result of which personal data is irretrievably destroyed with the impossibility of further restoration of the content of personal data in the information system of personal data and (or) material carriers of personal data are destroyed.
3. Basic rights and obligations of the Operator
3.1. The operator has the right:
– receive from the subject of personal data reliable information and / or documents containing personal data;
- in the event that the subject of personal data withdraws consent to the processing of personal data, the Operator has the right to continue processing personal data without the consent of the subject of personal data if there are grounds specified in the Law on Personal Data;
- independently determine the composition and list of measures necessary and sufficient to ensure the fulfillment of the obligations provided for by the Law on Personal Data and the regulatory legal acts adopted in accordance with it, unless otherwise provided by the Law on Personal Data or other federal laws.
3.2. The operator is obliged:
- provide the subject of personal data, at his request, with information regarding the processing of his personal data;
– organize the processing of personal data in the manner prescribed by the current legislation of the Russian Federation;
– respond to requests and requests from personal data subjects and their legal representatives in accordance with the requirements of the Law on Personal Data;
- report to the authorized body for the protection of the rights of subjects of personal data, at the request of this body, the necessary information within 30 days from the date of receipt of such a request;
– publish or otherwise provide unrestricted access to this Policy regarding the processing of personal data;
- take legal, organizational and technical measures to protect personal data from unauthorized or accidental access to them, destruction, modification, blocking, copying, provision, distribution of personal data, as well as from other illegal actions in relation to personal data;
- stop the transfer (distribution, provision, access) of personal data, stop processing and destroy personal data in the manner and cases provided for by the Personal Data Law;
– perform other duties provided for by the Law on Personal Data.
4. Basic rights and obligations of personal data subjects
4.1. Subjects of personal data have the right to:
- receive information regarding the processing of his personal data, except as otherwise provided by federal laws. The information is provided to the subject of personal data by the Operator in an accessible form, and it should not contain personal data related to other subjects of personal data, unless there are legal grounds for disclosing such personal data. The list of information and the procedure for obtaining it is established by the Law on Personal Data;
- require the operator to clarify his personal data, block or destroy them if the personal data is incomplete, outdated, inaccurate, illegally obtained or not necessary for the stated purpose of processing, as well as take legal measures to protect their rights;
– put forward the condition of prior consent when processing personal data in order to promote goods, works and services on the market;
– to withdraw consent to the processing of personal data;
- appeal to the authorized body for the protection of the rights of subjects of personal data or in court against illegal actions or inaction of the Operator when processing his personal data;
– to exercise other rights provided for by the legislation of the Russian Federation.
4.2. Subjects of personal data are obliged to:
– provide the Operator with reliable data about yourself;
– inform the Operator about the clarification (updating, changing) of their personal data.
4.3. Persons who have provided the Operator with false information about themselves or information about another subject of personal data without the consent of the latter, are liable in accordance with the legislation of the Russian Federation.
5. The Operator may process the following personal data of the User
5.1. Full Name.
5.2. Email address.
5.3. Phone numbers.
5.4. Details of an identity document.
5.5. Taxpayer identification number, date of registration, details of the certificate of registration with the tax authority.
5.6. The address of the actual place of residence and registration at the place of residence and (or) at the place of stay.
5.7. The site also collects and processes anonymous data about visitors (including cookies) using Internet statistics services (Yandex Metrika and Google Analytics and others).
5.8. The above data further in the text of the Policy are united by the general concept of Personal data.
5.9. Processing of special categories of personal data relating to race, nationality, political views, religious or philosophical beliefs, intimate life is not carried out by the Operator.
5.10. Processing of personal data permitted for distribution from among the special categories of personal data specified in Part 1 of Art. 10 of the Law on Personal Data is allowed if the prohibitions and conditions provided for in Art. 10.1 of the Personal Data Law.
5.11. The User's consent to the processing of personal data permitted for distribution is issued separately from other consents to the processing of his personal data. At the same time, the conditions provided for, in particular, Art. 10.1 of the Personal Data Law. Requirements for the content of such consent are established by the authorized body for the protection of the rights of subjects of personal data.
5.11.1 Consent to the processing of personal data permitted for distribution, the User provides the Operator directly.
5.11.2 The Operator is obliged, no later than three working days from the date of receipt of the specified consent of the User, to publish information on the conditions of processing, on the existence of prohibitions and conditions for the processing by an unlimited number of persons of personal data permitted for distribution.
5.11.3 The transfer (distribution, provision, access) of personal data authorized by the subject of personal data for distribution must be terminated at any time at the request of the subject of personal data. This requirement should include the last name, first name, patronymic (if any), contact information (telephone number, e-mail address or postal address) of the subject of personal data, as well as a list of personal data, the processing of which is subject to termination. The personal data specified in this request can be processed only by the Operator to whom it is sent.
5.11.4 Consent to the processing of personal data permitted for distribution terminates from the moment the Operator receives the request specified in clause 5.11.3 of this Policy regarding the processing of personal data.
6. Principles of personal data processing
6.1. The processing of personal data is carried out on a legal and fair basis.
6.2. The processing of personal data is limited to the achievement of specific, predetermined and legitimate purposes. It is not allowed to process personal data that is incompatible with the purposes of collecting personal data.
6.3. It is not allowed to combine databases containing personal data, the processing of which is carried out for purposes that are incompatible with each other.
6.4. Only personal data that meet the purposes of their processing are subject to processing.
6.5. The content and scope of the processed personal data correspond to the stated purposes of processing. The redundancy of the processed personal data in relation to the stated purposes of their processing is not allowed.
6.6. When processing personal data, the accuracy of personal data, their sufficiency, and, if necessary, relevance in relation to the purposes of processing personal data, is ensured. The operator takes the necessary measures and / or ensures their adoption to remove or clarify incomplete or inaccurate data.
6.7. The storage of personal data is carried out in a form that allows determining the subject of personal data, no longer than required by the purposes of processing personal data, if the period for storing personal data is not established by federal law, an agreement to which the subject of personal data is a party, beneficiary or guarantor. The processed personal data is destroyed or depersonalized upon reaching the goals of processing or in case of loss of the need to achieve these goals, unless otherwise provided by federal law.
7. Purposes of personal data processing
7.1. The purpose of processing the User's personal data:
– informing the User by sending emails and SMS notifications;
– conclusion, execution and termination of civil law contracts;
– providing the User with access to services, information and/or materials contained in the https://logid.app web application.
7.2. The Operator also has the right to send notifications to the User about new products and services, special offers and various events. The User can always opt out of receiving informational messages by sending an email to the Operator at support@logid.app with the note "Opt out of notifications about new products and services and special offers."
7.3. Impersonal data of Users collected using Internet statistics services are used to collect information about the actions of Users on the site, improve the quality of the site and its content.

8. Legal grounds for the processing of personal data
8.1. The legal grounds for the processing of personal data by the Operator are:
– Federal Law "On information, information technologies and information protection" dated July 27, 2006 N 149-FZ;
– statutory documents of the Operator;
– agreements concluded between the operator and the subject of personal data;
– federal laws, other regulatory legal acts in the field of personal data protection;
– Users' consent to the processing of their personal data, to the processing of personal data permitted for distribution.
8.2. The Operator processes the User's personal data only if they are filled in and / or sent by the User independently through special forms located in the https://logid.app web application or sent to the Operator by e-mail. By filling out the relevant forms and / or sending their personal data to the Operator, the User expresses his consent to this Policy.
8.3. The Operator processes anonymized data about the User if it is allowed in the User's browser settings (saving cookies and using JavaScript technology is enabled).
8.4. The subject of personal data independently decides on the provision of his personal data and gives consent freely, of his own free will and in his own interest.

9. Conditions for the processing of personal data
9.1. The processing of personal data is carried out with the consent of the subject of personal data to the processing of his personal data.
9.2. The processing of personal data is necessary to achieve the goals provided for by an international treaty of the Russian Federation or the law, in order to carry out the functions, powers and obligations assigned by the legislation of the Russian Federation to the operator.
9.3. The processing of personal data is necessary for the administration of justice, the execution of a judicial act, an act of another body or official subject to execution in accordance with the legislation of the Russian Federation on enforcement proceedings.
9.4. The processing of personal data is necessary for the performance of an agreement to which the personal data subject is a party or beneficiary or guarantor, as well as to conclude an agreement on the initiative of the personal data subject or an agreement under which the personal data subject will be the beneficiary or guarantor.
9.5. The processing of personal data is necessary to exercise the rights and legitimate interests of the operator or third parties, or to achieve socially significant goals, provided that the rights and freedoms of the subject of personal data are not violated.
9.6. The processing of personal data is carried out, access to an unlimited number of persons to which is provided by the subject of personal data or at his request.
9.7. Processing of personal data subject to publication or mandatory disclosure in accordance with federal law is carried out.
10. The procedure for collecting, storing, transferring and other types of processing of personal data
10.1 The security of personal data processed by the Operator is ensured through the implementation of legal, organizational and technical measures necessary to fully comply with the requirements of the current legislation in the field of personal data protection.
10.2. The User's personal data will never, if the subject has not consented to their distribution, under any circumstances be transferred to third parties, except in cases related to the implementation of applicable law or if the subject of personal data has given consent to the Operator for data transfer to a third party to fulfill obligations under a civil law contract.
10.3. In case of detection of inaccuracies in personal data, the User can update them independently or by sending a notification to the Operator to the Operator’s email address support@logid.app marked “Updating personal data”.
10.4. The term for the processing of personal data is determined by the achievement of the purposes for which the personal data were collected, unless a different period is provided by the contract or applicable law.The User may at any time withdraw his consent to the processing of personal data by sending the Operator a notification by e-mail to the Operator's email address support@logid.app marked "Withdrawal of consent to the processing of personal data".
10.5. All information that is collected by third-party services, including payment systems, means of communication and other service providers, is stored and processed by these persons (Operators) in accordance with their User Agreement and Privacy Policy. The subject of personal data and / or the User is obliged to independently familiarize themselves with the specified documents in a timely manner. The Operator is not responsible for the actions of third parties, including the service providers specified in this clause.
10.6. The prohibitions established by the subject of personal data on the transfer (except for granting access), as well as on the processing or processing conditions (except for obtaining access) of personal data permitted for distribution, do not apply in cases of processing personal data in state, public and other public interests determined by law RF.
10.7. The operator, when processing personal data, ensures the confidentiality of personal data.
10.8. The operator stores personal data in a form that allows to determine the subject of personal data, no longer than required by the purposes of processing personal data, if the period for storing personal data is not established by federal law, an agreement to which the subject of personal data is a party, beneficiary or guarantor.
10.9. The condition for terminating the processing of personal data may be the achievement of the purposes of processing personal data, the expiration of the consent of the subject of personal data or the withdrawal of consent by the subject of personal data, as well as the identification of unlawful processing of personal data.
11. List of actions performed by the Operator with the received personal data
11.1. The operator collects, records, systematizes, accumulates, stores, clarifies (updates, changes), extracts, uses, transfers (distributes, provides, accesses), depersonalizes, blocks, deletes and destroys personal data.
11.2. The operator carries out automated processing of personal data with the receipt and / or transmission of the received information via information and telecommunication networks or without it.
12. Cross-border transfer of personal data
12.1. Before the start of the cross-border transfer of personal data, the operator is obliged to make sure that the foreign state to whose territory the transfer of personal data is supposed to be carried out provides reliable protection of the rights of subjects of personal data.
12.2. Cross-border transfer of personal data on the territory of foreign states that do not meet the above requirements can be carried out only if there is a written consent of the subject of personal data to the cross-border transfer of his personal data and / or execution of an agreement to which the subject of personal data is a party.
13. Privacy of personal data
The operator and other persons who have gained access to personal data are obliged not to disclose to third parties and not to distribute personal data without the consent of the subject of personal data, unless otherwise provided by federal law.
14. Placement of data in the application
When a user publishes orders for transportation in the application, takes orders for work or makes offers on them, provides another user with his unique id to add a partner, publishes reviews or information in his profile, personal data as part of such information becomes available to an indefinite circle of persons. You disclose such data on your own without providing the Personal Data Operator with a separate consent. The operator does not distribute your personal data. We process such data in order to fulfill a contract with you entered into on your initiative. The purpose for which users place data in the application is to establish contact with a potential customer or carrier (client, contractor) who is interested in concluding a transaction on a transportation order. Users may not process other users' data for any other purpose. It means that:
you cannot call or send messages to users to offer your goods or services;
you may not copy user data to post it on other services;
you may not use the information of app users for scoring purposes.
15. Safety
Responsible attitude to personal data is the standard of the Operator's work.
To protect personal data, the Operator:
issued and published in the application a data processing policy. Approved local acts on the processing and protection of personal data.
is responsible for organizing the processing of personal data.
regularly checks processes and documents for their compliance with the law.
assesses the risks and harm that it can cause if it violates the law on personal data. Based on the assessment, selects appropriate measures to comply with the law.
applies legal, organizational and technical measures to ensure the security of personal data.
Taking measures to protect personal data, the operator is based on:
legal requirements;
the established level of protection of personal data;
actual threats defined by the threat model;
the basic set of protection measures established by regulatory legal acts for the corresponding level of protection;
risk-based approach when choosing the best measures;
priority of the legitimate interests of users.
16. Storage of personal data
The operator records, systematizes, accumulates, stores, clarifies (updates, changes), extracts your personal data using databases located on the territory of Russia.
For storage, the Operator uses data processing centers located on the territory of Moscow. The operator stores personal data in accordance with the terms of data processing necessary to achieve the purposes of processing.
17. Final provisions
17.1. The User can receive any clarifications on issues of interest regarding the processing of his personal data by contacting the Operator via e-mail support@logid.app.
17.2. This document will reflect any changes in the policy of processing personal data by the Operator. The policy is valid indefinitely until it is replaced by a new version.
17.3. The current version of the Policy and all its previous versions are freely available on the Internet at https://logid.app.
          `]
        })}</div>
      }
    </div>
  )
})

export default PrivacyPolicyRussia