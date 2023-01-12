import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, NotificationContext, SettingContext, TranslateContext, UserContext } from '../..'
import MainBanner from '../banner/MainBanner'
import PageContainer from '../../components/ui/page/PageContainer'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../../http/notificationApi'
import './Main.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import MainSection from './MainSection'
import Modal from '../../components/ui/modal/Modal'

const Main = observer(() => {
  const { Notification } = useContext(NotificationContext)
  const { Translate } = useContext(TranslateContext)
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get("uuid")
  const { user } = useContext(UserContext)
  const { Adress } = useContext(AdressContext)
  

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
        russian: ['Сервис для заказчиков, перевозчиков, диспетчеров и логистов'],
        english: ['Service for customers, carriers, dispatchers and logisticians']
      }),
      description: SetNativeTranslate(Translate.language, {
        russian: ['Добро пожаловать в logid. Сервис заказчиков, перевозчиков а также диспетчеров и логистов. С помощью нашего сервиса перевозчики могут отслеживать и обеспечивать необходимую загрузку в городе или стране для своего транспорта. Заказчики имеют возможность размещать заказы, управляя их доступностью для перевозчиков. Стоимость доставки может быть определена заказчиком или предложена переозчиками, если заказчик выбрал тип заказа аукцион. Приоритет того или иного заказчика или перевозчика определяется рейтингом формируемым на основе взаимных оценок к завершенным или сорванным заказам. Обращаем ваше внимание, в настоящий момент сервис logid не ведет юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы с тем или иным заказчиком или перевозчиком, настоятельно рекомендуем вам всегда выстраивать договорные отношения, проверять документы и вести необходимый документооборот'],
        english: ['Welcome to logid. Service of customers, carriers as well as dispatchers and logisticians. Using our service, carriers can track and provide the necessary loading in a city or country for their vehicles. Customers have the ability to place orders, managing their availability for carriers. The shipping cost can be determined by the customer or offered by carriers if the customer has chosen the auction type of order. The priority of a particular customer or carrier is determined by a rating formed on the basis of mutual assessments of completed or disrupted orders. Please note that at the moment the logid service  the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a particular customer or carrier, we strongly recommend that you always build contractual relationships, check documents and maintain the necessary document flow']
      }),
      class: 'uneven',
      type: 'text',
      role: 'both'
    },
    {
      id: 2, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', !user.isAuth ? 'для заказчиков' : ''],
        english: ['Сapabilities', !user.isAuth ? 'for customers' : '']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service']
      }), description: '', class: 'even', type: 'items',
      role: 'customer'
    },
    {
      id: 3, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности', !user.isAuth ? 'для перевозчиков' : ''],
        english: ['Сapabilities', !user.isAuth ? 'for carriers' : '']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: ['Мы предаставляем все опции для любого уровня подписки. Уровни подписки настроены для разных типов пользователей нашего сервиса'],
        english: ['We provide all options for any subscription level. Subscription levels are configured for different types of users of our service']
      }), description: '', class: 'even', type: 'items',
      role: 'carrier'
    },
    {
      id: 4, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', !user.isAuth ? 'для перевозчика' : ''],
        english: ['Tariff plans', !user.isAuth ? 'for the carrier' : '']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Начните пользоваться нашим сервисом до 28.02.2023, выберите любой подходящий вам тарифный план и пользуйтесь им до окончания срока действия бесплатно!' : 'В настоящий момент нащ сервис в полностью бесплатный. Выберите любой подходящий вам тарифный план и пользуйтесь им бесплатно!'],
        english: [Adress.country.value === 'russia' ? 'Start using our service before 02/28/2022, choose any tariff plan that suits you and use it until the expiration date for free!' : 'At the moment our service in ${SetNativeTranslate(Translate.language,{},Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!']
      }), description: '', class: 'uneven', type: 'self_content',
      role: 'carrier'
    },
    {
      id: 5, header: SetNativeTranslate(Translate.language, {
        russian: ['Тарифные планы', !user.isAuth ? 'для заказчика' : ''],
        english: ['Tariff plans', !user.isAuth ? 'for the customer' : '']
      }), header_comment: SetNativeTranslate(Translate.language, {
        russian: [Adress.country.value === 'russia' ? 'Начните пользоваться нашим сервисом до 28.02.2023, выберите любой подходящий вам тарифный план и пользуйтесь им до окончания срока действия бесплатно!' : 'В настоящий момент нащ сервис в полностью бесплатный. Выберите любой подходящий вам тарифный план и пользуйтесь им бесплатно!'],
        english: [Adress.country.value === 'russia' ? 'Start using our service before 02/28/2022, choose any tariff plan that suits you and use it until the expiration date for free!' : `At the moment our service in ${SetNativeTranslate(Translate.language, {}, Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!`]
      }), description: '', class: 'uneven', type: 'self_content',
      role: 'customer'
    },
  ]

  let icon = `<span className='material-symbols-outlined'>
  settings
  </span>`

  const items = [
    {
      id: 1, icon: <><span className="material-symbols-outlined">
        route
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['До 50 адресов'],
        english: ['Up to 50 points']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность составлять комбинированные маршруты для оптимальной логистики'],
        english: ['Ability to create combined routes for optimal logistics']
      }), section_id: 2, class: ''
    },
    {
      id: 2, icon: <><span className="material-symbols-outlined">
        flag
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы по всей стране'],
        english: ['Orders across the country']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Управляйте радиусом поиска адресов для добавления в заказ'],
        english: ['Manage the search radius for addresses to add to an order']
      }), section_id: 2, class: ''
    },
    {
      id: 3, icon: <><span className="material-symbols-outlined">
        group_add
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Группы перевозчиков'],
        english: ['Carrier groups']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Группируйте перевозчиков по направлениям деятельности и ограничивайте доступность заказов по группам'],
        english: ['Group carriers by line of business and limit the availability of orders by group']
      }), section_id: 2, class: ''
    },
    {
      id: 4, icon: <><span className="material-symbols-outlined">
        thumbs_up_down
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные перевозчики'],
        english: ['Favorite carriers']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добовляйте перевозчиков в избранное, блокируйте или назначайте заказы конкретному перевозчику'],
        english: ['Add carriers to favorites, block or assign orders to a specific carrier']
      }), section_id: 2, class: ''
    },
    {
      id: 5, icon: <><span className="material-symbols-outlined">
        route
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Визуализация маршрута'],
        english: ['Route visualization']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Ориентировочный маршрут, расстояние и длительность на карте при оформлении заказа'],
        english: ['Approximate route, distance and duration on the map when ordering']
      }), section_id: 2, class: ''
    },
    {
      id: 6, icon: <><span className="material-symbols-outlined">
        list_alt
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Назначьте цену или рассмотрите предложения перевозчиков'],
        english: ['Set a price or consider carrier offers']
      }), section_id: 2, class: ''
    },
    {
      id: 7, icon: <><span className="material-symbols-outlined">
        location_searching
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Статус точек заказа'],
        english: ['Order points status']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Отслеживайте статус точек заказа, перевозчик может проставлять его по вашему запросу'],
        english: ['Track the status of order points, the carrier can affix it at your request']
      }), section_id: 2, class: ''
    },
    {
      id: 8, icon: <><span className="material-symbols-outlined">
        notifications
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о поступлении предложений, изменении статуса точек и изменении статуса заказов'],
        english: ['Track the status of order points, the carrier can affix it at your request']
      }), section_id: 2, class: ''
    },
    {
      id: 9, icon: <><span className="material-symbols-outlined">
        travel_explore
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Заказы на карте'],
        english: ['Orders on the map']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Точки подачи транспорта на карте, выбирайте ближайшие к вам заказы'],
        english: ['Transport arrival points on the map, choose the orders closest to you']
      }), section_id: 3, class: ''
    },
    {
      id: 10, icon: <><span className="material-symbols-outlined">
        filter_alt
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Фильтр заказов'],
        english: ['Order filter']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Сортируйте и фильтруйте заказы. Статус фильтра сохраняется, настройте и отслеживайте только инетересные вам заказы'],
        english: ['Sort and filter orders. The filter status is saved, set up and track only the orders you are interested in']
      }), section_id: 3, class: ''
    },
    {
      id: 11, icon: <><span className="material-symbols-outlined">
        thumbs_up_down
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Избранные заказчики'],
        english: ['Favorite customers']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Добавляйте заказчиков в избранное, группируйте или блокируйте'],
        english: ['Add customers to favorites, group or block']
      }), section_id: 3, class: ''
    },
    {
      id: 12, icon: <><span className="material-symbols-outlined">
        notifications
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления'],
        english: ['Notifications']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Уведомления о новых заказах подходящих для вашего транспорта и о статусе интересных вам аукцимонов'],
        english: ['Notifications about new orders suitable for your transport and about the status of auctions you are interested in']
      }), section_id: 3, class: ''
    },
    {
      id: 13, icon: <><span className="material-symbols-outlined">
        list_alt
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Заказ или аукцион'],
        english: ['Order or auction']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Берите в работу заказы с фиксированной ценой, или делайте предложения'],
        english: ['Take orders with a fixed price, or make offers']
      }), section_id: 3, class: ''
    },
    {
      id: 14, icon: <><span className="material-symbols-outlined">
        location_on
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Можно выбрать только межгород'],
        english: ['You can choose only intercity']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Включите показ только междугородних заказов, если не рассматриваете внутригородскую доставку'],
        english: ['Enable showing only intercity orders if you are not considering domestic delivery']
      }), section_id: 3, class: ''
    },
    {
      id: 15, icon: <><span className="material-symbols-outlined">
        location_city
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['До 10 городов'],
        english: ['Up to 10 cities']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возможность включить до 10 городов отслеживания заказов одновременно'],
        english: ['Ability to enable up to 10 order tracking cities at the same time']
      }), section_id: 3, class: ''
    },
    {
      id: 16, icon: <><span className="material-symbols-outlined">
        transportation
      </span></>, name: SetNativeTranslate(Translate.language, {
        russian: ['Разный транспорт'],
        english: ['Different transport']
      }), description: SetNativeTranslate(Translate.language, {
        russian: ['Возите грузы, но готовы сделать и пеший заказ? Добавляйте разные типы транспорта'],
        english: ['Carry goods, but are you ready to fulfill a walking order? Add different transport types']
      }), section_id: 3, class: ''
    },
  ]

  return (
    <PageContainer>
      <title>logid</title>
      <MainBanner />

      {sections.filter(el => (user.user.role && (el.role === 'both' || el.role === user.user.role)) || (!user.user.role && (el.role === 'both' || el.role === 'carrier' || el.role === 'customer'))).map(section =>
        <MainSection section={section} key={section.id} items={items.filter(el => el.section_id === section.id)} />
      )}
         
    </PageContainer>
  )
})

export default Main