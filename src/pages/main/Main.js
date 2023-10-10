import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, AdressContext, FetcherContext, ManagementContext, NotificationContext, SettingContext, TranslateContext, UserContext } from '../..'
import MainBanner from '../banner/MainBanner'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../../http/notificationApi'
import './Main.css'
import '../../App.css'
import '../board/Board.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import MainSection from './MainSection'


import av1 from '../../assets/avatars/av1.webp';
import av3 from '../../assets/avatars/av3.webp';
import av5 from '../../assets/avatars/av5.webp';
import av6 from '../../assets/avatars/av6.webp';
import av8 from '../../assets/avatars/av8.webp';
import av9 from '../../assets/avatars/av9.webp';
import av12 from '../../assets/avatars/av12.webp';
import av13 from '../../assets/avatars/av13.webp';

import alert from '../../assets/icons/alert.png';
import alert_dark from '../../assets/icons/alert_dark.png';
import city from '../../assets/icons/city.png';
import city_dark from '../../assets/icons/city_dark.png';
import filter from '../../assets/icons/filter.png';
import filter_dark from '../../assets/icons/filter_dark.png';
import flag from '../../assets/icons/flag.png';
import flag_dark from '../../assets/icons/flag_dark.png';
import group_add from '../../assets/icons/group_add.png';
import group_add_dark from '../../assets/icons/group_add_dark.png';
import like_up_down from '../../assets/icons/like_up_down.png';
import like_up_down_dark from '../../assets/icons/like_up_down_dark.png';
import list from '../../assets/icons/list.png';
import list_dark from '../../assets/icons/list_dark.png';
import location_icon from '../../assets/icons/location.png';
import location_icon_dark from '../../assets/icons/location_dark.png';
import on_map from '../../assets/icons/on_map.png';
import on_map_dark from '../../assets/icons/on_map_dark.png';
import point_status from '../../assets/icons/point_status.png';
import point_status_dark from '../../assets/icons/point_status_dark.png';
import route from '../../assets/icons/route.png';
import route_dark from '../../assets/icons/route_dark.png';
import transport from '../../assets/icons/transport.png';
import transport_dark from '../../assets/icons/transport_dark.png';
import AdminConsoleItem from './AdminConsoleItem'
import AdTransportSection from './AdTransportSection'
import { useLocation } from 'react-router-dom'


const Main = observer(() => {
  const { fetcher } = useContext(FetcherContext)
  const { Notification } = useContext(NotificationContext)
  const { Ad } = useContext(AdContext)
  const { Translate } = useContext(TranslateContext)
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get("uuid")
  const role = queryParams.get("role")
  const { user } = useContext(UserContext)
  const { Adress } = useContext(AdressContext)
  const [modalActive2, setModalActive2] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [callRequested, setCallRequested] = useState(false)
  const { Setting } = useContext(SettingContext)
  const { Management } = useContext(ManagementContext)

  let location = useLocation()


  let cookies_accepted = JSON.parse(localStorage.getItem('cookies_accepted'))


  useEffect(() => {
    fetcher.setMainCounters(true)
  }, [])

  useEffect(() => {
    Ad.setTransportOption('main')
    Ad.setUsers([], 'main')
    Ad.setTransports([], 'main')
    Ad.setTransportImages([], 'main')
    fetcher.setAdTransports(true)
    // clearInterval()
    // setInterval(() => {
    //   if (location.pathname === '/') {
    //     Ad.setTransportOption('main')
    //     fetcher.setAdTransports(true)
    //   }
    // }, 10000)
  }, [])


  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 100)
    if (!cookies_accepted.total) {
      localStorage.setItem('cookies_accepted', JSON.stringify({ total: false, auth: false, main: false }))
      setModalActive2(true)
    }
  }, [])

  useEffect(() => {
    async function handleUrlNotification() {
      let notification = await fetchNotification(uuid)
      Notification.addNotification([{ id: v4(), type: notification.type, message: notification.message }])
      await deleteNotification(notification.id)
    }
    if (uuid) {
      handleUrlNotification()
      fetcher.setUserInfo(true)
    }
  }, [])


  let sections = [
    {
      id: 1, header: SetNativeTranslate(Translate.language, {
        russian: ['О нас'],
        english: ['About'],
        spanish: ['Sobre nosotros'],
        turkish: ['Hakkımızda'],
        сhinese: ['关于我们'],
        hindi: ['हमारे बारे में'],
      }),
      header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Сервис для заказчиков, курьеров, перевозчиков, диспетчеров и логистов'],
        english: ['Service for customers, couriers, carriers, dispatchers and logisticians'],
        spanish: ['Servicio para clientes, mensajeros, transportistas, despachadores y logísticos'],
        turkish: ['Müşterilere, kuryelere, nakliyecilere, dağıtım görevlilerine ve lojistikçilere yönelik hizmet'],
        сhinese: ['为客户、快递员、承运人、调度员和物流员提供服务'],
        hindi: ['ग्राहकों, कूरियर, वाहक, डिस्पैचर और लॉजिस्टिक के लिए सेवा'],
      }),
      description: SetNativeTranslate(Translate.language, {
        russian: ['Добро пожаловать в logid. Сервис заказчиков, курьеров, перевозчиков а также диспетчеров и логистов. С помощью нашего сервиса перевозчики могут отслеживать и обеспечивать необходимую загрузку в городе или стране для своего транспорта. Заказчики имеют возможность размещать заказы, управляя их доступностью для перевозчиков. Стоимость доставки может быть определена заказчиком или предложена перевозчиками, если заказчик выбрал тип заказа аукцион. Приоритет того или иного заказчика или перевозчика определяется рейтингом формируемым на основе взаимных оценок к завершенным или сорванным заказам'],
        english: ['Welcome to logid. Service of customers, couriers, carriers as well as dispatchers and logisticians. Using our service, carriers can track and provide the necessary loading in a city or country for their vehicles. Customers have the ability to place orders, managing their availability for carriers. The shipping cost can be determined by the customer or offered by carriers if the customer has chosen the auction type of order. The priority of a particular customer or carrier is determined by a rating formed on the basis of mutual assessments of completed or disrupted orders'],
        spanish: ['Bienvenido a logid. Servicio de clientes, mensajeros, transportistas, así como despachadores y logísticos. Utilizando nuestro servicio, los transportistas pueden rastrear y proporcionar la carga necesaria en una ciudad o país para sus vehículos. Los clientes tienen la posibilidad de realizar pedidos, gestionando su disponibilidad para los transportistas. El costo de envío puede ser determinado por el cliente u ofrecido por los transportistas si el cliente ha elegido el tipo de pedido de subasta. La prioridad de un cliente o transportista en particular está determinada por una calificación formada sobre la base de evaluaciones mutuas de pedidos completados o interrumpidos'],
        turkish: ['Logid`e hoş geldiniz. Müşterilere, kuryelere, nakliyecilere, sevk görevlilerine ve lojistikçilere hizmet. Taşımacılar hizmetimizi kullanarak araçlarının bir şehir veya ülkede gerekli yüklemelerini takip edebilir ve sağlayabilirler. Müşteriler, taşıyıcılar için uygunluk durumunu yöneterek sipariş verme olanağına sahiptir. Kargo ücreti müşteri tarafından belirlenebileceği gibi, müşterinin açık artırma sipariş türünü seçmesi durumunda kargo şirketleri tarafından da teklif edilebilir. Belirli bir müşterinin veya nakliyecinin önceliği, tamamlanan veya kesintiye uğrayan siparişlerin karşılıklı değerlendirilmesi esas alınarak oluşturulan bir derecelendirmeyle belirlenir'],
        сhinese: ['欢迎来到“logid”。 为客户、快递员、承运人以及调度员和物流员提供服务。 使用我们的服务，承运人可以跟踪并确保其车辆在一个城市或国家/地区所需的负载。 客户能够下订单，同时管理其对运营商的可用性。 如果客户选择了拍卖订单类型，则交付费用可以由客户确定或由承运商提供。 特定客户或承运商的优先级是根据对已完成或失败订单的相互评估而形成的评级确定的'],
        hindi: ['लॉगिड में आपका स्वागत है। ग्राहकों, कूरियर, कैरियर के साथ-साथ डिस्पैचर और लॉजिस्टिक के लिए सेवा। हमारी सेवा का उपयोग करके, वाहक अपने वाहनों के लिए किसी शहर या देश में आवश्यक लोड को ट्रैक और सुनिश्चित कर सकते हैं। ग्राहकों के पास वाहकों के लिए अपनी उपलब्धता का प्रबंधन करते हुए ऑर्डर देने की क्षमता होती है। डिलीवरी की लागत ग्राहक द्वारा निर्धारित की जा सकती है या वाहक द्वारा प्रस्तावित की जा सकती है यदि ग्राहक ने नीलामी ऑर्डर प्रकार चुना है। किसी विशेष ग्राहक या वाहक की प्राथमिकता पूर्ण या विफल आदेशों के पारस्परिक मूल्यांकन के आधार पर बनाई गई रेटिंग द्वारा निर्धारित की जाती है'],
      }),
      class: 'uneven',
      type: 'text',
      role: 'both'
    },
    {
      id: 2, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', 'для заказчиков'],
        english: ['Сapabilities', 'for customers'],
        spanish: ['Oportunidades para los clientes'],
        turkish: ['Müşteriler için fırsatlar'],
        сhinese: ['客户的机会'],
        hindi: ['ग्राहकों के लिए अवसर'],
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service'],
        spanish: ['Ofrecemos todas las opciones para cualquier nivel de suscripción. Los niveles de suscripción están personalizados para diferentes tipos de usuarios de nuestro servicio'],
        turkish: ['Her abonelik düzeyi için tüm seçenekleri sunuyoruz. Abonelik seviyeleri, hizmetimizin farklı kullanıcı türleri için özelleştirilmiştir'],
        сhinese: ['我们为任何订阅级别提供所有选项。 订阅级别是针对我们服务的不同类型的用户定制的'],
        hindi: ['हम किसी भी सदस्यता स्तर के लिए सभी विकल्प प्रदान करते हैं। हमारी सेवा के विभिन्न प्रकार के उपयोगकर्ताओं के लिए सदस्यता स्तर अनुकूलित किए गए हैं'],
      }), description: '', class: 'even', type: 'options',
      role: 'customer'
    },
    {
      id: 3, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', 'для перевозчиков'],
        english: ['Сapabilities', 'for carriers'],
        spanish: ['Oportunidades para los transportistas'],
        turkish: ['Taşıyıcılar için fırsatlar'],
        сhinese: ['运营商的机会'],
        hindi: ['वाहकों के लिए अवसर'],
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service'],
        spanish: ['Ofrecemos todas las opciones para cualquier nivel de suscripción. Los niveles de suscripción están configurados para diferentes tipos de usuarios de nuestro servicio'],
        сhinese: ['我们为任何订阅级别提供所有选项。 订阅级别是针对我们服务的不同类型的用户定制的'],
        hindi: ['हम किसी भी सदस्यता स्तर के लिए सभी विकल्प प्रदान करते हैं। हमारी सेवा के विभिन्न प्रकार के उपयोगकर्ताओं के लिए सदस्यता स्तर अनुकूलित किए गए हैं'],
        turkish: ['Her abonelik düzeyi için tüm seçenekleri sunuyoruz. Abonelik seviyeleri, hizmetimizin farklı kullanıcı türleri için yapılandırılmıştır'],
      }), description: '', class: 'even', type: 'options',
      role: 'carrier'
    },
    {
      id: 6, header: SetNativeTranslate(Translate.language, {
        russian: ['Отзывы пользователей'],
        english: ['User reviews'],
        spanish: ['Opiniones de los usuarios'],
        turkish: ['Kullanıcı yorumları'],
        сhinese: ['用户评论'],
        hindi: ['उपयोगकर्ता समीक्षा'],
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы внимательно относимся к вашим отзывам и оценкам, учитываем ваши пожалания в разработках и улучшениях сервиса, свяжитесь с нами по  электронной почте support@logid.app'],
        english: [`We are attentive to your feedback and ratings, take into account your complaints in the development and improvement of the service, please contact us by e-mail support@logid.app`],
        spanish: [`Prestamos atención a sus comentarios y calificaciones, tomamos en cuenta sus quejas en los desarrollos y mejoras del servicio, contáctenos por correo electrónico support@logid.app`],
        turkish: [`Geri bildirimlerinize ve derecelendirmelerinize dikkat ediyoruz, hizmetteki geliştirme ve iyileştirmelerde şikayetlerinizi dikkate alıyoruz, support@logid.app adresine e-posta göndererek bizimle iletişime geçin`],
        сhinese: ['我们关注您的反馈和评分，在开发和改进服务时考虑您的投诉，请通过电子邮件与我们联系 support@logid.app'],
        hindi: ['हम आपकी प्रतिक्रिया और रेटिंग पर ध्यान देते हैं, सेवा के विकास और सुधार में आपकी शिकायतों को ध्यान में रखते हैं, हमें ईमेल support@logid.app पर संपर्क करें।'],
      }), description: '', class: 'uneven', type: 'reviews',
      role: 'both'
    },
    {
      id: 4, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', 'для перевозчика'],
        english: ['Tariff plans', 'for the carrier'],
        spanish: ['Planes tarifarios para transportistas'],
        turkish: ['Taşıyıcılar için tarife planları'],
        сhinese: ['承运人的资费计划'],
        hindi: ['वाहक के लिए टैरिफ योजनाएँ'],
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Регистрируйтесь сейчас, дарим год профессиональной подписки бесплатно! Предложение ограничено!' : 'В настоящий момент наш сервис в полностью бесплатный!'],
        english: [Adress.country.value === 'russia' ? 'Register now, get a year of professional subscription for free! The offer is limited!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free!`],
        spanish: [Adress.country.value === 'russia' ? '¡Regístrese ahora y obtenga un año de suscripción profesional gratis! ¡La oferta es limitada!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free!`],
        turkish: [Adress.country.value === 'russia' ? 'Şimdi kaydolun, bir yıllık profesyonel aboneliği ücretsiz kazanın! Teklif sınırlıdır!' : `¡Por el momento nuestro servicio en ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} es absolutamente gratuito!`],
        сhinese: [Adress.country.value === 'russia' ? '立即注册，免费获得一年的专业订阅！ 优惠有限！' : `目前我们的服务在 ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} 是完全免费的！`],
        hindi: [Adress.country.value === 'russia' ? 'अभी पंजीकरण करें, एक वर्ष की व्यावसायिक सदस्यता निःशुल्क प्राप्त करें! ऑफर सीमित है!' : `फिलहाल हमारी सेवा ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} बिल्कुल मुफ़्त है!`],
      }), description: '', class: 'even', type: 'self_content',
      role: 'carrier'
    },
    {
      id: 5, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', 'для заказчика'],
        english: ['Tariff plans', 'for the customer'],
        spanish: ['Planes tarifarios para el cliente'],
        turkish: ['Müşteri için tarife planları'],
        сhinese: ['客户的资费计划'],
        hindi: ['ग्राहक के लिए टैरिफ योजनाएँ'],
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Регистрируйтесь сейчас, дарим год профессиональной подписки бесплатно! Предложение ограничено!' : 'В настоящий момент наш сервис в полностью бесплатный!'],
        english: [Adress.country.value === 'russia' ? 'Register now, get a year of professional subscription for free! The offer is limited!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free!`],
        spanish: [Adress.country.value === 'russia' ? '¡Regístrese ahora y obtenga un año de suscripción profesional gratis! ¡La oferta es limitada!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free!`],
        turkish: [Adress.country.value === 'russia' ? 'Şimdi kaydolun, bir yıllık profesyonel aboneliği ücretsiz kazanın! Teklif sınırlıdır!' : `¡Por el momento nuestro servicio en ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} es absolutamente gratuito!`],
        сhinese: [Adress.country.value === 'russia' ? '立即注册，免费获得一年的专业订阅！ 优惠有限！' : `目前我们的服务在 ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} 是完全免费的！`],
        hindi: [Adress.country.value === 'russia' ? 'अभी पंजीकरण करें, एक वर्ष की व्यावसायिक सदस्यता निःशुल्क प्राप्त करें! ऑफर सीमित है!' : `फिलहाल हमारी सेवा ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} बिल्कुल मुफ़्त है!`],
      }), description: '', class: 'even', type: 'self_content',
      role: 'customer'
    },
  ]

  const items = [
    {
      id: 1, icon: Setting.app_theme === 'light' ? route : route_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['До 50 адресов'],
        english: ['Up to 50 points'],
        spanish: ['Hasta 50 puntos'],
        turkish: ['50 puana kadar'],
        сhinese: ['最多 50 个地址'],
        hindi: ['50 पते तक'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность составлять комбинированные маршруты для оптимальной логистики'],
        english: ['Ability to create combined routes for optimal logistics'],
        spanish: ['Posibilidad de crear rutas combinadas para una logística óptima'],
        turkish: ['Optimum lojistik için birleşik rotalar oluşturma imkanı'],
        сhinese: ['可以创建组合路线以实现最佳物流'],
        hindi: ['इष्टतम रसद के लिए संयुक्त मार्ग बनाने की संभावना'],

      }), section_id: 2, class: ''
    },
    {
      id: 2, icon: Setting.app_theme === 'light' ? flag : flag_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы по всей стране'],
        english: ['Orders across the country'],
        spanish: ['Pedidos a todo el pais'],
        turkish: ['Ülkenin her yerine siparişler'],
        сhinese: ['全国各地订单'],
        hindi: ['पूरे देश में ऑर्डर'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Управляйте радиусом поиска адресов для добавления в заказ'],
        english: ['Manage the search radius for addresses to add to an order'],
        spanish: ['Administrar el radio de búsqueda de direcciones para agregar a un pedido'],
        turkish: ['Siparişe eklenecek adreslerin arama yarıçapını yönetin'],
        сhinese: ['管理要添加到订单中的地址的搜索半径'],
        hindi: ['अपने ऑर्डर में जोड़ने के लिए पतों की खोज का दायरा प्रबंधित करें'],
      }), section_id: 2, class: ''
    },
    {
      id: 3, icon: Setting.app_theme === 'light' ? group_add : group_add_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Группы перевозчиков'],
        english: ['Carrier groups'],
        spanish: ['Grupos de transportistas'],
        turkish: ['Taşıyıcı grupları'],
        сhinese: ['运营商群体'],
        hindi: ['वाहक समूह'],

      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Группируйте перевозчиков по направлениям деятельности и ограничивайте доступность заказов по группам'],
        english: ['Group carriers by line of business and limit the availability of orders by group'],
        spanish: ['Agrupar transportistas por línea de negocio y limitar la disponibilidad de pedidos por grupo'],
        turkish: ['Taşıyıcıları iş kollarına göre gruplandırın ve siparişlerin kullanılabilirliğini gruba göre sınırlayın'],
        сhinese: ['按业务线对承运商进行分组并按组限制订单的可用性'],
        hindi: ['व्यावसायिक क्षेत्रों के आधार पर वाहकों का समूह बनाएं और समूह के अनुसार ऑर्डर की उपलब्धता सीमित करें'],
      }), section_id: 2, class: ''
    },
    {
      id: 4, icon: Setting.app_theme === 'light' ? like_up_down : like_up_down_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные перевозчики'],
        english: ['Favorite carriers'],
        spanish: ['Transportistas favoritos'],
        turkish: ['Favori operatörler'],
        сhinese: ['特色运营商'],
        hindi: ['विशेष रुप से प्रदर्शित वाहक'],

      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добовляйте перевозчиков в избранное, блокируйте или назначайте заказы конкретному перевозчику'],
        english: ['Add carriers to favorites, block or assign orders to a specific carrier'],
        spanish: ['Agregue transportistas a favoritos, bloquee o asigne pedidos a un transportista específico'],
        turkish: ['Operatörleri favorilere ekleyin, siparişleri engelleyin veya belirli bir operatöre atayın'],
        сhinese: ['将承运商添加到您的收藏夹、阻止订单或将订单分配给特定承运商'],
        hindi: ['अपने पसंदीदा में वाहक जोड़ें, किसी विशिष्ट वाहक को ऑर्डर ब्लॉक करें या असाइन करें'],
      }), section_id: 2, class: ''
    },
    {
      id: 5, icon: Setting.app_theme === 'light' ? route : route_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Визуализация маршрута'],
        english: ['Route visualization'],
        spanish: ['Visualización de ruta'],
        turkish: ['Rota görselleştirme'],
        сhinese: ['路线可视化'],
        hindi: ['मार्ग दृश्य'],

      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Ориентировочный маршрут, расстояние и длительность на карте при оформлении заказа'],
        english: ['Approximate route, distance and duration on the map when ordering'],
        spanish: ['Ruta aproximada, distancia y duración en el mapa al realizar el pedido.'],
        turkish: ['Sipariş verirken harita üzerinde yaklaşık rota, mesafe ve süre'],
        сhinese: ['下单时地图上显示的大概路线、距离和时长'],
        hindi: ['ऑर्डर देते समय मानचित्र पर अनुमानित मार्ग, दूरी और अवधि'],
      }), section_id: 2, class: ''
    },
    {
      id: 6, icon: Setting.app_theme === 'light' ? list : list_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction'],
        spanish: ['Orden o subasta'],
        turkish: ['Sipariş veya açık artırm'],
        сhinese: ['订购或拍卖'],
        hindi: ['आदेश या नीलामी'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Назначьте цену или рассмотрите предложения перевозчиков'],
        english: ['Set a price or consider carrier offers'],
        spanish: ['Establezca un precio o considere las ofertas de los operadores'],
        turkish: ['Bir fiyat belirleyin veya operatörün tekliflerini değerlendirin'],
        сhinese: ['设定价格或考虑运营商报价'],
        hindi: ['एक मूल्य निर्धारित करें या वाहक प्रस्तावों पर विचार करें'],
      }), section_id: 2, class: ''
    },
    {
      id: 7, icon: Setting.app_theme === 'light' ? point_status : point_status_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Статус точек заказа'],
        english: ['Order points status'],
        spanish: ['Up to 50 points'],
        turkish: ['Up to 50 points'],
        сhinese: ['订单点状态'],
        hindi: ['आदेश बिंदु स्थिति'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Отслеживайте статус точек заказа, перевозчик может проставлять его по вашему запросу'],
        english: ['Track the status of order points, the carrier can affix it at your request'],
        spanish: ['Estado del punto de pedido'],
        turkish: ['Sipariş noktası durumu'],
        сhinese: ['跟踪您的订单点的状态，承运商可以根据您的要求提供'],
        hindi: ['अपने ऑर्डर बिंदुओं की स्थिति को ट्रैक करें, वाहक आपके अनुरोध पर इसकी आपूर्ति कर सकता है'],
      }), section_id: 2, class: ''
    },
    {
      id: 8, icon: Setting.app_theme === 'light' ? alert : alert_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications'],
        spanish: ['Notificaciones'],
        turkish: ['Bildirimler'],
        сhinese: ['通知'],
        hindi: ['सूचनाएं'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о поступлении предложений, изменении статуса точек и изменении статуса заказов'],
        english: ['Notifications about receipt of offers, changes in the status of points and changes in the status of orders'],
        spanish: ['Notificaciones sobre recepción de ofertas, cambios en el estado de los puntos y cambios en el estado de los pedidos'],
        turkish: ['Tekliflerin alınmasına, puan durumlarındaki değişikliklere ve sipariş durumlarındaki değişikliklere ilişkin bildirimler'],
        сhinese: ['有关收到优惠、积分状态变更和订单状态变更的通知'],
        hindi: ['प्रस्तावों की प्राप्ति, अंकों की स्थिति में परिवर्तन और आदेशों की स्थिति में परिवर्तन के बारे में सूचनाएं'],
      }), section_id: 2, class: ''
    },
    {
      id: 9, icon: Setting.app_theme === 'light' ? on_map : on_map_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы на карте'],
        english: ['Orders on the map'],
        spanish: ['Pedidos en el mapa'],
        turkish: ['Haritadaki siparişler'],
        сhinese: ['地图上的订单'],
        hindi: ['मानचित्र पर आदेश'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Точки подачи транспорта на карте, выбирайте ближайшие к вам заказы'],
        english: ['Transport arrival points on the map, choose the orders closest to you'],
        spanish: ['Puntos de llegada de transporte en el mapa, elige los pedidos más cercanos a ti'],
        turkish: ['Haritadaki varış noktalarını taşıyın, size en yakın siparişleri seçin'],
        сhinese: ['地图上的运输到达点，选择距离您最近的订单'],
        hindi: ['मानचित्र पर परिवहन आगमन बिंदु, अपने निकटतम ऑर्डर चुनें'],
      }), section_id: 3, class: ''
    },
    {
      id: 10, icon: Setting.app_theme === 'light' ? filter : filter_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Фильтр заказов'],
        english: ['Orders filter'],
        spanish: ['Filtro de orden'],
        turkish: ['Sipariş filtresi'],
        сhinese: ['订单过滤器'],
        hindi: ['ऑर्डर फ़िल्टर'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Сортируйте и фильтруйте заказы. Статус фильтра сохраняется, настройте и отслеживайте только инетересные вам заказы'],
        english: ['Sort and filter orders. The filter status is saved, set up and track only the orders you are interested in'],
        spanish: ['Ordenar y filtrar pedidos. El estado del filtro se guarda, configura y rastrea solo los pedidos que le interesan'],
        turkish: ['Siparişleri sıralayın ve filtreleyin. Filtre durumu kaydedilir, yalnızca ilgilendiğiniz siparişleri ayarlar ve takip eder'],
        сhinese: ['对订单进行排序和过滤。 过滤器状态已保存，仅配置和跟踪您感兴趣的订单'],
        hindi: ['आदेशों को क्रमबद्ध और फ़िल्टर करें। फ़िल्टर स्थिति सहेजी गई है, केवल वही ऑर्डर कॉन्फ़िगर करें और ट्रैक करें जो आपके लिए दिलचस्प हैं'],
      }), section_id: 3, class: ''
    },
    {
      id: 11, icon: Setting.app_theme === 'light' ? like_up_down : like_up_down_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные заказчики'],
        english: ['Favorite customers'],
        spanish: ['Clientes favoritos'],
        turkish: ['Favori müşteriler'],
        сhinese: ['特色客户'],
        hindi: ['विशेष रुप से प्रदर्शित ग्राहक'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добавляйте заказчиков в избранное, группируйте или блокируйте'],
        english: ['Add customers to favorites, group or block'],
        spanish: ['Agregar clientes a favoritos, grupo o bloque'],
        turkish: ['Müşterileri favorilere, gruba veya bloğa ekleyin'],
        сhinese: ['将客户添加到收藏夹、群组或阻止'],
        hindi: ['ग्राहकों को पसंदीदा, समूह या ब्लॉक में जोड़ें'],
      }), section_id: 3, class: ''
    },
    {
      id: 12, icon: Setting.app_theme === 'light' ? alert : alert_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications'],
        spanish: ['Notificaciones'],
        turkish: ['Bildirimler'],
        сhinese: ['通知'],
        hindi: ['सूचनाएं'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о новых заказах подходящих для вашего транспорта и о статусе интересных вам аукцимонов'],
        english: ['Notifications about new orders suitable for your transport and about the status of auctions you are interested in'],
        spanish: ['Notificaciones sobre nuevos pedidos adecuados para su transporte y sobre el estado de las subastas que le interesan'],
        turkish: ['Taşımanıza uygun yeni siparişler ve ilgilendiğiniz açık artırmaların durumu hakkında bildirimler'],
        сhinese: ['有关适合您车辆的新订单以及您感兴趣的拍卖状态的通知'],
        hindi: ['आपके वाहन के लिए उपयुक्त नए ऑर्डर और आपकी रुचि वाली नीलामी की स्थिति के बारे में सूचनाएं'],
      }), section_id: 3, class: ''
    },
    {
      id: 13, icon: Setting.app_theme === 'light' ? list : list_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction'],
        spanish: ['Orden o subasta'],
        turkish: ['Sipariş veya açık artırm'],
        сhinese: ['订购或拍卖'],
        hindi: ['आदेश या नीलामी'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Берите в работу заказы с фиксированной ценой, или делайте предложения'],
        english: ['Take orders with a fixed price, or make offers'],
        spanish: ['Tomar pedidos con precio fijo o hacer ofertas'],
        turkish: ['Sabit fiyatlı sipariş alın veya teklif verin'],
        сhinese: ['以固定价格接受订单，或提出报价'],
        hindi: ['एक निश्चित मूल्य पर ऑर्डर लें, या ऑफ़र दें'],
      }), section_id: 3, class: ''
    },
    {
      id: 14, icon: Setting.app_theme === 'light' ? location_icon : location_icon_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Можно выбрать только межгород'],
        english: ['You can choose only intercity'],
        spanish: ['Puedes elegir solo interurban'],
        сhinese: [''],
        hindi: [''],
        turkish: ['Sadece şehirlerarası seçebilirsiniz'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Включите показ только междугородних заказов, если не рассматриваете внутригородскую доставку'],
        english: ['Enable showing only intercity orders if you are not considering domestic delivery'],
        spanish: ['Habilite mostrar solo pedidos interurbanos si no está considerando la entrega nacional'],
        turkish: ['Yurt içi teslimatı düşünmüyorsanız yalnızca şehirlerarası siparişlerin gösterilmesini etkinleştirin'],
        сhinese: ['只能选择城际'],
        hindi: ['आप केवल इंटरसिटी का चयन कर सकते हैं'],
      }), section_id: 3, class: ''
    },
    {
      id: 15, icon: Setting.app_theme === 'light' ? city : city_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['До 10 городов'],
        english: ['Up to 10 cities'],
        spanish: ['Hasta 10 ciudades'],
        turkish: ['10 şehre kadar'],
        сhinese: ['最多10个城市'],
        hindi: ['10 शहरों तक'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность включить до 10 городов отслеживания заказов одновременно'],
        english: ['Ability to enable up to 10 order tracking cities at the same time'],
        spanish: ['Capacidad para habilitar hasta 10 ciudades de seguimiento de pedidos al mismo tiempo'],
        turkish: ['Aynı anda 10`a kadar sipariş takibi şehrini etkinleştirebilme'],
        сhinese: ['能够同时启用最多 10 个订单跟踪城市'],
        hindi: ['एक साथ 10 ऑर्डर ट्रैकिंग शहरों को सक्षम करने की क्षमता'],
      }), section_id: 3, class: ''
    },
    {
      id: 16, icon: Setting.app_theme === 'light' ? transport : transport_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Разный транспорт'],
        english: ['Different transport'],
        spanish: ['Transporte diferente'],
        turkish: ['Farklı ulaşım'],
        сhinese: ['不同的运输方式'],
        hindi: ['अलग परिवहन'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возите грузы, но готовы сделать и пеший заказ? Добавляйте разные типы транспорта'],
        english: ['Carry goods, but are you ready to fulfill a walking order? Add different transport types'],
        spanish: ['Lleva mercancías, pero ¿estás listo para cumplir con un pedido ambulante? Añadir diferentes tipos de transporte'],
        turkish: ['Mal taşıyın ama yürüme emrini yerine getirmeye hazır mısınız? Farklı taşıma türleri ekleyin'],
        сhinese: ['您运输货物，但您准备好步行下订单了吗？ 添加不同类型的交通工具'],
        hindi: ['क्या आप माल परिवहन करते हैं, लेकिन क्या आप पैदल ऑर्डर देने के लिए तैयार हैं? विभिन्न प्रकार के परिवहन जोड़ें'],
      }), section_id: 3, class: ''
    },

    {
      id: 17, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Игорь, 25, перевозчик, междугородние перевозки'],
        english: ['Igor, 25, carrier, intercity transportation'],
        spanish: ['Igor, 25 años, transportista, transporte interurbano.'],
        turkish: ['Igor, 25, taşıyıcı, şehirlerarası ulaşım'],
        сhinese: ['Igor，25 岁​​，承运人，城际运输'],
        hindi: ['इगोर, 25, वाहक, इंटरसिटी परिवहन'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Очень удобно отслеживать заказы в нескольких интересующих меня городах. Не надо заниматься мониторингом, прилетают уведомления о новых заказах на почту. Отличный фильтр заказов, который не надо настраивать каждый раз, спасибо!'],
        english: ['It is very convenient to track orders in several cities of interest to me. No need to monitor, notifications of new orders arrive by mail. An excellent order filter that does not need to be configured every time, thank you!'],
        spanish: ['Es muy conveniente realizar un seguimiento de los pedidos en varias ciudades que me interesan. No es necesario monitorear, las notificaciones de nuevos pedidos llegan por correo. Un excelente filtro de pedidos que no necesita configurarse cada vez, ¡gracias!'],
        turkish: ['İlgimi çeken çeşitli şehirlerdeki siparişleri takip etmek çok uygun. İzlemeye gerek yok, yeni siparişlerin bildirimleri posta yoluyla geliyor. Her seferinde yapılandırılması gerekmeyen mükemmel bir sipariş filtresi, teşekkürler!'],
        сhinese: ['可以很方便的追踪我感兴趣的几个城市的订单。 无需监控，有关新订单的通知将通过电子邮件发送。 一个优秀的订单过滤器，您不必每次都配置，谢谢！'],
        hindi: ['कई शहरों में ऑर्डर ट्रैक करना बहुत सुविधाजनक है जिनमें मेरी रुचि है। निगरानी करने की कोई आवश्यकता नहीं है, नए ऑर्डर के बारे में सूचनाएं ईमेल द्वारा आती हैं। एक उत्कृष्ट ऑर्डर फ़िल्टर जिसे आपको हर बार कॉन्फ़िगर करने की आवश्यकता नहीं है, धन्यवाद!'],
      }), section_id: 6, class: 'user_review', av: av9
    },
    {
      id: 18, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Павел, 33, курьер на автомобиле'],
        english: ['Pavel, 33, сourier by car'],
        spanish: ['Pavel, 33 años, mensajero en coche'],
        turkish: ['Pavel, 33, arabayla kurye'],
        сhinese: ['Pavel，33 岁，开车快递员'],
        hindi: ['पावेल, 33, कार से कूरियर'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Беру попутные заказы, вижу заказы на карте, logid хороший сервис! Да, заказов пока не так много, но приходят письма о заказах, успешного развития!'],
        english: ['I take passing orders, I see orders on the map, logid is a good service! Yes, there are not so many orders yet, but letters about orders are coming, successful development!'],
        spanish: ['Acepto órdenes de paso, veo órdenes en el mapa, ¡logid es un buen servicio! Sí, todavía no hay tantos pedidos, pero llegan cartas sobre pedidos, ¡desarrollo exitoso!'],
        turkish: ['Geçerek sipariş alıyorum, haritada siparişleri görüyorum, logid iyi bir hizmet! Evet, henüz çok fazla sipariş yok ama siparişlerle ilgili mektuplar geliyor, başarılı bir gelişme!'],
        сhinese: ['我接的是路过的订单，看订单在地图上，服务不错！ 是的，订单还不是很多，但是订单信来了，开发成功！'],
        hindi: ['मैं पासिंग ऑर्डर लेता हूं, मैप पर ऑर्डर देखता हूं, अच्छी सेवा दर्ज करता हूं! हां, अभी ज्यादा ऑर्डर नहीं हैं, लेकिन ऑर्डर के बारे में पत्र आ रहे हैं, सफल विकास!'],
      }), section_id: 6, class: 'user_review', av: av12
    },
    {
      id: 19, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Людмила, 37, транспортный диспетчер'],
        english: ['Ludmila, 37, transport dispatcher'],
        spanish: ['Ludmila, 37, despachadora de transporte'],
        turkish: ['Ludmila, 37, nakliye memuru'],
        сhinese: ['Ludmila，37 岁，运输调度员'],
        hindi: ['ल्यूडमिला, 37, ट्रांसपोर्ट डिस्पैचर'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добавила своих перевозчиков, поделила по группам. Могу дать заказ одному перевозчику могу группе или просто сделать аукцион доступный для всех. Круто очень'],
        english: ['I added my carriers, divided them into groups. I can give an order to one carrier, I can group or just make the auction available to everyone. very cool'],
        spanish: ['Agregué mis transportistas, los dividí en grupos. Puedo dar un pedido a un transportista, puedo agruparlo o simplemente hacer que la subasta esté disponible para todos. muy genial'],
        turkish: ['Taşıyıcılarımı ekledim, gruplara ayırdım. Tek bir taşıyıcıya sipariş verebilirim, gruplandırabilirim veya açık artırmayı herkesin kullanımına sunabilirim. çok havalı'],
        сhinese: ['我添加了我的运营商并将它们分组。 我可以向一个承运人下达订单，可以将其下达给一组，或者我可以简单地让每个人都可以参加拍卖。 很酷'],
        hindi: ['मैंने अपने कैरियर जोड़े और उन्हें समूहों में विभाजित किया। मैं एक वाहक को ऑर्डर दे सकता हूं, मैं इसे एक समूह को दे सकता हूं, या मैं नीलामी को सभी के लिए सुलभ बना सकता हूं। बहुत ही शांत'],
      }), section_id: 6, class: 'user_review', av: av1
    },
    {
      id: 20, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Святослав, 46, владелец ресторана'],
        english: ['Svyatoslav, 46, restaurant owner'],
        spanish: ['Sviatoslav, 46 años, dueño de un restaurante'],
        turkish: ['Svyatoslav, 46, restoran sahibi'],
        сhinese: ['Svyatoslav，46 岁，餐馆老板'],
        hindi: ['शिवतोस्लाव, 46, रेस्तरां मालिक'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Визуально понятный маршрут, можно совместить несколько заказов, удобно заказы курьерам раздавать. Жду от вас итеграции с R-Keeper'],
        english: ['A visually clear route, you can combine several orders, it is convenient to distribute orders to couriers. I look forward to your integration with R-Keeper'],
        spanish: ['Una ruta visualmente clara, puede combinar varios pedidos, es conveniente distribuir los pedidos a los mensajeros. Espero su integración con R-Keeper'],
        turkish: ['Görsel olarak net bir rota, birkaç siparişi birleştirebilirsiniz, siparişleri kuryelere dağıtmak uygundur. R-Keeper ile entegrasyonunuzu sabırsızlıkla bekliyorum'],
        сhinese: ['路线直观清晰，可以合并多个订单，方便将订单分发给快递员。 我期待您与 R-Keeper 的集成'],
        hindi: ['एक स्पष्ट रूप से स्पष्ट मार्ग, आप कई ऑर्डर जोड़ सकते हैं, और कोरियर को ऑर्डर वितरित करना सुविधाजनक है। मैं आपसे आर-कीपर के साथ एकीकरण की आशा करता हूं'],
      }), section_id: 6, class: 'user_review', av: av13
    },
    {
      id: 21, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Роман, 34, доставка для себя'],
        english: ['Roman, 34, delivery for personal use'],
        spanish: ['Roman, 34 años, entrega para ti'],
        turkish: ['Roman, 34, kendinize teslimat'],
        сhinese: ['罗曼，34 岁，自己送货'],
        hindi: ['रोमन, 34, आपके लिए डिलीवरी'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Бывает надо что то доставить из магазина или по работе, отправить документы, хорошее решение, при условии что проверил документы курьера'],
        english: ['Sometimes you need to deliver something from a store or at work, send documents, a good solution, provided that you have checked the documents of the courier'],
        spanish: ['A veces necesitas entregar algo de una tienda o por trabajo, enviar documentos, una buena solución, siempre que hayas verificado los documentos del mensajero'],
        turkish: ['Bazen bir mağazadan veya iş için bir şey teslim etmeniz, belge göndermeniz gerekir; kuryenin belgelerini kontrol etmeniz koşuluyla iyi bir çözümdür.'],
        сhinese: ['有时您需要从商店或工作中运送一些东西，发送文件，一个很好的解决方案，前提是您已经检查过快递员的文件'],
        hindi: ['कभी-कभी आपको किसी स्टोर से या काम के लिए कुछ डिलीवर करना होता है, दस्तावेज़ भेजना होता है, यह एक अच्छा समाधान है, बशर्ते कि आपने कूरियर के दस्तावेज़ों की जाँच कर ली हो'],
      }), section_id: 6, class: 'user_review', av: av6
    },
    {
      id: 22, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Анна, 24, продажа косметики'],
        english: ['Anna, 24, sale of cosmetics'],
        spanish: ['Anna, 24 años, venta de cosméticos.'],
        turkish: ['Anna, 24, kozmetik satışı'],
        сhinese: ['安娜，24岁，卖化妆品'],
        hindi: ['24 साल की अन्ना सौंदर्य प्रसाधन बेच रही हैं'],
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Не знаю другого сервиса, где можно заказать своего курьера в такое большое количество точек подряд, расписать ему комментарии, маршрут и видеть как он отмечает и комментирует каждую из них, когда выполнил. Я отбираю курьеров и даю заказы в logid только своей группе курьеров'],
        english: ['I don’t know any other service, where you can order your courier to such a large number of points in a row, write comments, a route for him, and see how he notes and comments on each of them when he completed it. I select couriers and give orders in logid only to my group of couriers'],
        spanish: ['No conozco ningún otro servicio donde puedas ordenar a tu mensajero un número tan grande de puntos seguidos, escribir comentarios, una ruta para él y ver cómo anota y comenta cada uno de ellos cuando lo completa. Selecciono mensajeros y doy pedidos en logid solo a mi grupo de mensajeros'],
        turkish: ['Kuryenizi bu kadar çok noktaya art arda sipariş edebileceğiniz, ona yorum, rota yazabileceğiniz, tamamladığında her birine nasıl not aldığını, yorum yaptığını görebileceğiniz başka bir hizmet bilmiyorum. Kuryeleri seçiyorum ve sadece kendi kurye grubuma logid üzerinden sipariş veriyorum'],
        сhinese: ['我不知道有什么其他服务可以让你连续订购你的快递员到如此多的地点，为他写下评论，一条路线，然后看看他在完成后如何对每个点进行标记和评论它。 我选择快递员并仅以 logid 方式向我的快递员组下订单'],
        hindi: ['मैं किसी अन्य सेवा के बारे में नहीं जानता जहां आप अपने कूरियर को एक पंक्ति में इतनी बड़ी संख्या में बिंदुओं पर ऑर्डर कर सकें, उसके लिए टिप्पणियां लिख सकें, एक मार्ग, और देख सकें कि जब वह पूरा कर लेता है तो वह उनमें से प्रत्येक पर कैसे निशान लगाता है और टिप्पणी करता है यह। मैं कोरियर का चयन करता हूं और केवल अपने कोरियर समूह को लॉगिड में ऑर्डर देता हूं'],
      }), section_id: 6, class: 'user_review', av: av3
    },
  ]

  return (
    <>
      {user.user.role !== 'admin' && user.user.role !== 'manager' ?
        <>
          <div className={`page_container ${Setting.app_theme}`}>
            <title>logid - биржа грузоперевозок и курьерских заказов, доска объявлений перевозчиков и курьеров, инструмент управления доставкой для автопарков и курьерских служб</title>
            <MainBanner callRequested={callRequested} setCallRequested={setCallRequested} />


            {Ad.carriers_count && Ad.customers_count && Ad.finished_orders_count ?
              <div className='adv_rate_section'>
                <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.carriers_count} currentRate={Ad.carriers_count} comment={SetNativeTranslate(Translate.language,
                  {
                    russian: ['Активных перевозчиков'],
                    english: ['Active carriers'],
                    spanish: ['Portadores activos'],
                    turkish: ['Aktif taşıyıcılar'],
                    сhinese: ['活跃运营商'],
                    hindi: ['सक्रिय वाहक'],
                  }, '')} />
                <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.customers_count} currentRate={Ad.customers_count} comment={SetNativeTranslate(Translate.language,
                  {
                    russian: ['Активных заказчиков'],
                    english: ['Active customers'],
                    spanish: ['Clientes activos'],
                    turkish: ['Aktif müşteriler'],
                    сhinese: ['活跃客户'],
                    hindi: ['सक्रिय ग्राहक'],
                  }, '')} />

                <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.finished_orders_count} currentRate={Ad.finished_orders_count} comment={SetNativeTranslate(Translate.language,
                  {
                    russian: ['Завершенных заказов'],
                    english: ['Completed orders'],
                    spanish: ['Orden completada'],
                    turkish: ['Sipariş tamamlandı'],
                    сhinese: ['已完成订单'],
                    hindi: ['पूर्ण आदेश'],
                  }, '')} />
              </div>
              : <></>}

            {Ad.transports.main.length > 0 && <AdTransportSection />}


            {Adress.country.value === 'russia' && user?.user?.role !== 'driver' ?
              sections.filter(el => (user.user.role && (el.role === 'both' || el.role === user.user.role)) || (!user.user.role && role ? (el.role === 'both' || el.role === role) : (el.role === 'both' || el.role === 'carrier' || el.role === 'customer'))).map(section =>
                <MainSection section={section} key={section.id} items={items.filter(el => el.section_id === section.id)} callRequested={callRequested} setCallRequested={setCallRequested} />
              ) :
              sections.filter(el => el.id !== 4 && el.id !== 5).filter(el => (user.user.role && (el.role === 'both' || el.role === user.user.role)) || (!user.user.role && role ? (el.role === 'both' || el.role === role) : (el.role === 'both' || el.role === 'carrier' || el.role === 'customer'))).map(section =>
                <MainSection section={section} key={section.id} items={items.filter(el => el.section_id === section.id)} callRequested={callRequested} setCallRequested={setCallRequested} />
              )
            }

          </div>

          {/* {!cookies_accepted.main && loaded ?
              <ModalBottom modalActive={modalActive2} >
                <CookiesModalContent setModalActive={setModalActive2} cookies_accepted={cookies_accepted} />
              </ModalBottom>
              : <></>
            } */}

        </> : user.user.role === 'admin' ?
          <div className={`page_container ${Setting.app_theme}`}>

            <div className={`admin_console_container ${Setting.app_theme}`}>

              {Management.visits.month > 0 ?
                <>
                  <AdminConsoleItem plan={70} currentRate={Management.visits.toDay} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Визиты сегодня'],
                        english: ['Today visits']
                      }, '')} />
                  <AdminConsoleItem plan={490} currentRate={Management.visits.week} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Визиты за неделю'],
                        english: ['Visits per week']
                      }, '')
                  } />
                  <AdminConsoleItem plan={2170} currentRate={Management.visits.month} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Визиты за месяц'],
                        english: ['Visits per month']
                      }, '')
                  } />
                </> : <></>
              }

              {Management.registrations.month > 0 ?
                <>
                  <AdminConsoleItem plan={5} currentRate={Management.registrations.toDay} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Регистрации сегодня'],
                        english: ['Today registrationss']
                      }, '')} />
                  <AdminConsoleItem plan={35} currentRate={Management.registrations.week} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Регистрации за неделю'],
                        english: ['Registrationss per week']
                      }, '')
                  } />
                  <AdminConsoleItem plan={150} currentRate={Management.registrations.month} comment={
                    SetNativeTranslate(Translate.language,
                      {
                        russian: ['Регистрации за месяц'],
                        english: ['Registrationss per month']
                      }, '')
                  } />
                </> : <></>}


              <AdminConsoleItem plan={510} currentRate={Management.users.length} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Пользователи'],
                    english: ['Users']
                  }, '')} />
              <AdminConsoleItem plan={500} currentRate={Management.users.filter(el => el.role === 'carrier').length} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Перевозчики'],
                    english: ['Carriers']
                  }, '')
              } />
              <AdminConsoleItem plan={10} currentRate={Management.users.filter(el => el.role === 'customer').length} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Заказчики'],
                    english: ['Customers']
                  }, '')
              } />
              <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.transports.length} currentRate={Management.transports.length} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Транспорт'],
                    english: ['Transports']
                  }, '')
              } />
              <AdminConsoleItem type={'value'} influence={'negative'} plan={Management.users.length} currentRate={Management.users.filter(el => Object.keys(el.user_info).length === 0).length} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Пользователи без профиля'],
                    english: ['Users without info']
                  }, '')
              } />
              <AdminConsoleItem type={'value'} influence={'negative'} plan={Management.users.filter(el => el.role === 'carrier').length} currentRate={Management.users.filter(el => el.role === 'carrier' && el.transports.length === 0).length} comment={SetNativeTranslate(Translate.language,
                {
                  russian: ['Перевозчики без транспорта'],
                  english: ['Carriers without transport']
                }, '')} />
              <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'new').length} currentRate={Management.orders.filter(el => el.order_status === 'new').length} comment={SetNativeTranslate(Translate.language,
                {
                  russian: ['Новые заказы'],
                  english: ['New orders']
                }, '')} />
              <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'inWork').length} currentRate={Management.orders.filter(el => el.order_status === 'inWork').length} comment={SetNativeTranslate(Translate.language,
                {
                  russian: ['Заказы в работе'],
                  english: ['In work orders']
                }, '')} />
              <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'completed').length} currentRate={Management.orders.filter(el => el.order_status === 'completed').length} comment={SetNativeTranslate(Translate.language,
                {
                  russian: ['Завершенные заказы'],
                  english: ['Completed orders']
                }, '')} />
            </div>


          </div> : <></>}

    </>
  )

})

export default Main