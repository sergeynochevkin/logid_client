import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, AdressContext, FetcherContext, ManagementContext, NotificationContext, SettingContext, TranslateContext, UserContext } from '../..'
import MainBanner from '../banner/MainBanner'
import PageContainer from '../../components/ui/page/PageContainer'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../../http/notificationApi'
import './Main.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import MainSection from './MainSection'

import { useJsApiLoader } from '@react-google-maps/api'

import av1 from '../../assets/avatars/av1.jpg';
import av3 from '../../assets/avatars/av3.jpg';
import av5 from '../../assets/avatars/av5.jpg';
import av6 from '../../assets/avatars/av6.jpg';
import av8 from '../../assets/avatars/av8.jpg';
import av9 from '../../assets/avatars/av9.jpg';

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
import PageLoader from '../../components/ui/loader/PageLoader '
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


  const [libraries] = useState(['places']);


  // const { isLoaded } = useJsApiLoader({
  //   // id: "__googleMapsScriptId",
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: libraries,
  //   region: 'CA',
  //   language: 'en'
  // })

  let language = Adress.country.google_language
  let region = Adress.country.google_code

  // console.log(JSON.stringify(Adress.country));
  // console.log(language);
  // console.log(region);

  const { isLoaded } = Adress.country && Translate.language ? useJsApiLoader({
    // id: "__googleMapsScriptId",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: region,
    language: language
  }) : false


  useEffect(() => {
    fetcher.setMainCounters(true)
  }, [])

  useEffect(() => {
    Ad.setTransportOption('main')
    fetcher.setAdTransports(true)
    clearInterval()
    setInterval(() => {
      if (location.pathname === '/') {
        Ad.setTransportOption('main')
        fetcher.setAdTransports(true)
      }
    }, 10000)
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
    }
  }, [])


  let sections = [
    {
      id: 1, header: SetNativeTranslate(Translate.language, {
        russian: ['О нас'],
        english: ['About']
      }),
      header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Сервис для заказчиков, курьеров, перевозчиков, диспетчеров и логистов'],
        english: ['Service for customers, couriers, carriers, dispatchers and logisticians']
      }),
      description: SetNativeTranslate(Translate.language, {
        russian: ['Добро пожаловать в logid. Сервис заказчиков, курьеров, перевозчиков а также диспетчеров и логистов. С помощью нашего сервиса перевозчики могут отслеживать и обеспечивать необходимую загрузку в городе или стране для своего транспорта. Заказчики имеют возможность размещать заказы, управляя их доступностью для перевозчиков. Стоимость доставки может быть определена заказчиком или предложена перевозчиками, если заказчик выбрал тип заказа аукцион. Приоритет того или иного заказчика или перевозчика определяется рейтингом формируемым на основе взаимных оценок к завершенным или сорванным заказам. Обращаем ваше внимание, в настоящий момент сервис logid не ведет юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы с тем или иным заказчиком или перевозчиком, настоятельно рекомендуем вам всегда выстраивать договорные отношения, проверять документы и вести необходимый документооборот'],
        english: ['Welcome to logid. Service of customers, couriers, carriers as well as dispatchers and logisticians. Using our service, carriers can track and provide the necessary loading in a city or country for their vehicles. Customers have the ability to place orders, managing their availability for carriers. The shipping cost can be determined by the customer or offered by carriers if the customer has chosen the auction type of order. The priority of a particular customer or carrier is determined by a rating formed on the basis of mutual assessments of completed or disrupted orders. Please note that at the moment the logid service  the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a particular customer or carrier, we strongly recommend that you always build contractual relationships, check documents and maintain the necessary document flow']
      }),
      class: 'uneven',
      type: 'text',
      role: 'both'
    },
    {
      id: 2, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', 'для заказчиков'],
        english: ['Сapabilities', 'for customers']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service']
      }), description: '', class: 'even', type: 'options',
      role: 'customer'
    },
    {
      id: 3, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', 'для перевозчиков'],
        english: ['Сapabilities', 'for carriers']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service']
      }), description: '', class: 'even', type: 'options',
      role: 'carrier'
    },
    {
      id: 6, header: SetNativeTranslate(Translate.language, {
        russian: ['Отзывы пользователей'],
        english: ['User reviews']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы внимательно относимся к вашим отзывам и оценкам, учитываем ваши пожалания в разработках и улучшениях сервиса, свяжитесь с нами по  электронной почте support@logid.app'],
        english: [`We are attentive to your feedback and ratings, take into account your complaints in the development and improvement of the service, please contact us by e-mail support@logid.app`]
      }), description: '', class: 'uneven', type: 'reviews',
      role: 'both'
    },
    {
      id: 4, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', 'для перевозчика'],
        english: ['Tariff plans', 'for the carrier']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Регистрируйтесь сейчас, дарим год профессиональной подписки бесплатно! Предложение ограничено!' : 'В настоящий момент наш сервис в полностью бесплатный. Выберите любой подходящий вам тарифный план и пользуйтесь им бесплатно!'],
        english: [Adress.country.value === 'russia' ? 'Register now, get a year of professional subscription for free! The offer is limited!' : 'At the moment our service in ${SetNativeTranslate(Translate.language,{},Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!']
      }), description: '', class: 'even', type: 'self_content',
      role: 'carrier'
    },
    {
      id: 5, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', 'для заказчика'],
        english: ['Tariff plans', 'for the customer']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Регистрируйтесь сейчас, дарим год профессиональной подписки бесплатно! Предложение ограничено!' : 'В настоящий момент наш сервис в полностью бесплатный. Выберите любой подходящий вам тарифный план и пользуйтесь им бесплатно!'],
        english: [Adress.country.value === 'russia' ? 'Register now, get a year of professional subscription for free! The offer is limited!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!`]
      }), description: '', class: 'even', type: 'self_content',
      role: 'customer'
    },
  ]

  const items = [
    {
      id: 1, icon: Setting.app_theme === 'light' ? route : route_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['До 50 адресов'],
        english: ['Up to 50 points']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность составлять комбинированные маршруты для оптимальной логистики'],
        english: ['Ability to create combined routes for optimal logistics']
      }), section_id: 2, class: ''
    },
    {
      id: 2, icon: Setting.app_theme === 'light' ? flag : flag_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы по всей стране'],
        english: ['Orders across the country']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Управляйте радиусом поиска адресов для добавления в заказ'],
        english: ['Manage the search radius for addresses to add to an order']
      }), section_id: 2, class: ''
    },
    {
      id: 3, icon: Setting.app_theme === 'light' ? group_add : group_add_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Группы перевозчиков'],
        english: ['Carrier groups']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Группируйте перевозчиков по направлениям деятельности и ограничивайте доступность заказов по группам'],
        english: ['Group carriers by line of business and limit the availability of orders by group']
      }), section_id: 2, class: ''
    },
    {
      id: 4, icon: Setting.app_theme === 'light' ? like_up_down : like_up_down_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные перевозчики'],
        english: ['Favorite carriers']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добовляйте перевозчиков в избранное, блокируйте или назначайте заказы конкретному перевозчику'],
        english: ['Add carriers to favorites, block or assign orders to a specific carrier']
      }), section_id: 2, class: ''
    },
    {
      id: 5, icon: Setting.app_theme === 'light' ? route : route_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Визуализация маршрута'],
        english: ['Route visualization']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Ориентировочный маршрут, расстояние и длительность на карте при оформлении заказа'],
        english: ['Approximate route, distance and duration on the map when ordering']
      }), section_id: 2, class: ''
    },
    {
      id: 6, icon: Setting.app_theme === 'light' ? list : list_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Назначьте цену или рассмотрите предложения перевозчиков'],
        english: ['Set a price or consider carrier offers']
      }), section_id: 2, class: ''
    },
    {
      id: 7, icon: Setting.app_theme === 'light' ? point_status : point_status_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Статус точек заказа'],
        english: ['Order points status']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Отслеживайте статус точек заказа, перевозчик может проставлять его по вашему запросу'],
        english: ['Track the status of order points, the carrier can affix it at your request']
      }), section_id: 2, class: ''
    },
    {
      id: 8, icon: Setting.app_theme === 'light' ? alert : alert_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о поступлении предложений, изменении статуса точек и изменении статуса заказов'],
        english: ['Track the status of order points, the carrier can affix it at your request']
      }), section_id: 2, class: ''
    },
    {
      id: 9, icon: Setting.app_theme === 'light' ? on_map : on_map_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы на карте'],
        english: ['Orders on the map']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Точки подачи транспорта на карте, выбирайте ближайшие к вам заказы'],
        english: ['Transport arrival points on the map, choose the orders closest to you']
      }), section_id: 3, class: ''
    },
    {
      id: 10, icon: Setting.app_theme === 'light' ? filter : filter_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Фильтр заказов'],
        english: ['Order filter']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Сортируйте и фильтруйте заказы. Статус фильтра сохраняется, настройте и отслеживайте только инетересные вам заказы'],
        english: ['Sort and filter orders. The filter status is saved, set up and track only the orders you are interested in']
      }), section_id: 3, class: ''
    },
    {
      id: 11, icon: Setting.app_theme === 'light' ? like_up_down : like_up_down_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные заказчики'],
        english: ['Favorite customers']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добавляйте заказчиков в избранное, группируйте или блокируйте'],
        english: ['Add customers to favorites, group or block']
      }), section_id: 3, class: ''
    },
    {
      id: 12, icon: Setting.app_theme === 'light' ? alert : alert_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о новых заказах подходящих для вашего транспорта и о статусе интересных вам аукцимонов'],
        english: ['Notifications about new orders suitable for your transport and about the status of auctions you are interested in']
      }), section_id: 3, class: ''
    },
    {
      id: 13, icon: Setting.app_theme === 'light' ? list : list_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Берите в работу заказы с фиксированной ценой, или делайте предложения'],
        english: ['Take orders with a fixed price, or make offers']
      }), section_id: 3, class: ''
    },
    {
      id: 14, icon: Setting.app_theme === 'light' ? location_icon : location_icon_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Можно выбрать только межгород'],
        english: ['You can choose only intercity']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Включите показ только междугородних заказов, если не рассматриваете внутригородскую доставку'],
        english: ['Enable showing only intercity orders if you are not considering domestic delivery']
      }), section_id: 3, class: ''
    },
    {
      id: 15, icon: Setting.app_theme === 'light' ? city : city_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['До 10 городов'],
        english: ['Up to 10 cities']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность включить до 10 городов отслеживания заказов одновременно'],
        english: ['Ability to enable up to 10 order tracking cities at the same time']
      }), section_id: 3, class: ''
    },
    {
      id: 16, icon: Setting.app_theme === 'light' ? transport : transport_dark
      , name: SetNativeTranslate(Translate.language, {
        russian: ['Разный транспорт'],
        english: ['Different transport']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возите грузы, но готовы сделать и пеший заказ? Добавляйте разные типы транспорта'],
        english: ['Carry goods, but are you ready to fulfill a walking order? Add different transport types']
      }), section_id: 3, class: ''
    },

    {
      id: 17, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Игорь, 25, перевозчик, междугородние перевозки'],
        english: ['Igor, 25, carrier, intercity transportation']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Очень удобно отслеживать заказы в нескольких интересующих меня городах. Не надо заниматься мониторингом, прилетают уведомления о новых заказах на почту. Отличный фильтр заказов, который не надо настраивать каждый раз, спасибо!'],
        english: ['It is very convenient to track orders in several cities of interest to me. No need to monitor, notifications of new orders arrive by mail. An excellent order filter that does not need to be configured every time, thank you!']
      }), section_id: 6, class: 'user_review', av: av9
    },
    {
      id: 18, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Павел, 33, курьер на автомобиле'],
        english: ['Pavel, 33, сourier by car']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Беру попутные заказы, вижу заказы на карте, logid хороший сервис! Да, заказов пока не так много, но приходят письма о заказах, успешного развития!'],
        english: ['I take passing orders, I see orders on the map, logid is a good service! Yes, there are not so many orders yet, but letters about orders are coming, successful development!']
      }), section_id: 6, class: 'user_review', av: av5
    },
    {
      id: 19, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Людмила, 37, транспортный диспетчер'],
        english: ['Ludmila, 37, transport dispatcher']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добавила своих перевозчиков, поделила по группам. Могу дать заказ одному перевозчику могу группе или просто сделать аукцион достцупный для всех. Круто очень'],
        english: ['I added my carriers, divided them into groups. I can give an order to one carrier, I can group or just make the auction available to everyone. very cool']
      }), section_id: 6, class: 'user_review', av: av1
    },
    {
      id: 20, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Святослав, 46, владелец ресторана'],
        english: ['Svyatoslav, 46, restaurant owner']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Визуально понятный маршрут, можно совместить несколько заказов, удобно заказы курьерам раздавать. Жду от вас итеграции с R-Keeper'],
        english: ['A visually clear route, you can combine several orders, it is convenient to distribute orders to couriers. I look forward to your integration with R-Keeper']
      }), section_id: 6, class: 'user_review', av: av8
    },
    {
      id: 21, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Роман, 34, доставка для себя'],
        english: ['Roman, 34, delivery for personal use']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Бывает надо что то доставить из магазина или по работе, отправить документы, хорошее решение, при условии что проверил документы курьера'],
        english: ['Sometimes you need to deliver something from a store or at work, send documents, a good solution, provided that you have checked the documents of the courier']
      }), section_id: 6, class: 'user_review', av: av6
    },
    {
      id: 22, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Анна, 24, продажа косметики'],
        english: ['Anna, 24, sale of cosmetics']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Не знаю другого сервиса, гже можно заказать своего курьера в такое большое количество точек подряд, расписать ему комментарии, маршрут и видеть как он отмечает и комментирует каждую из них, когда выполнил. Я отбираю курьеров и даю заказы в logid только своей группе курьеров'],
        english: ['I don’t know any other service, where you can order your courier to such a large number of points in a row, write comments, a route for him, and see how he notes and comments on each of them when he completed it. I select couriers and give orders in logid only to my group of couriers']
      }), section_id: 6, class: 'user_review', av: av3
    },
  ]
  if (!isLoaded) { return <PageLoader /> }
  else {
    return (
      <>
        {user.user.role !== 'admin' && user.user.role !== 'manager' ?
          <>
            <PageContainer>
              <title>{`logid`}</title>
              <MainBanner callRequested={callRequested} setCallRequested={setCallRequested} />

              {Ad.transports.main.length > 0 && <AdTransportSection />}

              {Ad.carriers_count && Ad.customers_count && Ad.finished_orders_count ?
                <div className='adv_rate_section'>
                  <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.carriers_count} currentRate={Ad.carriers_count} comment={SetNativeTranslate(Translate.language,
                    {
                      russian: ['Активных перевозчиков'],
                      english: ['Active carriers']
                    }, '')} />
                  <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.customers_count} currentRate={Ad.customers_count} comment={SetNativeTranslate(Translate.language,
                    {
                      russian: ['Активных заказчиков'],
                      english: ['Active customers']
                    }, '')} />

                  <AdminConsoleItem type={'value'} influence={'positive'} plan={Ad.finished_orders_count} currentRate={Ad.finished_orders_count} comment={SetNativeTranslate(Translate.language,
                    {
                      russian: ['Завершенных заказов'],
                      english: ['Completed orders']
                    }, '')} />
                </div>
                : <></>}

              {sections.filter(el => (user.user.role && (el.role === 'both' || el.role === user.user.role)) || (!user.user.role && role ? (el.role === 'both' || el.role === role) : (el.role === 'both' || el.role === 'carrier' || el.role === 'customer'))).map(section =>
                <MainSection section={section} key={section.id} items={items.filter(el => el.section_id === section.id)} callRequested={callRequested} setCallRequested={setCallRequested} />
              )}
            </PageContainer>

            {/* {!cookies_accepted.main && loaded ?
              <ModalBottom modalActive={modalActive2} >
                <CookiesModalContent setModalActive={setModalActive2} cookies_accepted={cookies_accepted} />
              </ModalBottom>
              : <></>
            } */}

          </> : user.user.role === 'admin' ?
            <PageContainer>

              <div className={`admin_console_container ${Setting.app_theme}`}>

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


            </PageContainer> : <></>}

      </>
    )
  }
})

export default Main