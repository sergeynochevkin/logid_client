import React, { useContext } from 'react'
import './Share.css'
import {
    TelegramIcon,
    TelegramShareButton,
    VKIcon,
    VKShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import { observer } from 'mobx-react-lite';
import { TranslateContext, UserInfoContext } from '../..';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';


const ShareModalContent = observer(({ setModalActive, parent, thisOrder, shareName, itemId }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { Translate } = useContext(TranslateContext)

    let title = SetNativeTranslate(Translate.language, {
        russian: [parent === 'account_uuid' ? `Ccылка для добавления партнера ${shareName} в сервисе logid` : parent === 'order_item' ? `Ссылка на заказ ${thisOrder.id} в сервисе logid. Заказ будет доступен для просмотра после авторизации в logid, при условии, что вы работаете в том же регионе, имеетe подходящий способ доставки и не заблокированы заказчиком` : parent === 'nav_board' ? 'Ссылка на предложения перевозчиков в сервисе logid' : parent === 'board_item' ? `Cсылка на предложение перевозчика ${shareName} в сервисе logid` : 'Ссылка на logid - сервис для заказчиков,перевозчиков, курьеров, диспетчеров и логистов'],
        english: [parent === 'account_uuid' ? `Link to add a ${shareName} partner in the logid service` : parent === 'order_item' ? `Link to orfder ${thisOrder.id} in logid service. The order will be available for viewing after authorization in logid, provided that you work in the same region, have a suitable delivery method and are not blocked by the customer` : parent === 'nav_board' ? 'Link to carrier offers in the logid service' : parent === 'board_item' ? `Link to the carrier's ${shareName} offer in the logid service` : 'Link to logid - service for customers, carriers, couriers, dispatchers and logisticians'],

        spanish: [parent === 'account_uuid' ? `Enlace para agregar un socio ${shareName} en el servicio logid` : parent === 'order_item' ? `Enlace al pedido ${thisOrder.id} en el servicio logid. El pedido estará disponible para su visualización después de la autorización en logid, siempre que trabaje en la misma región, tenga un método de entrega adecuado y no esté bloqueado por el cliente` : parent === 'nav_board' ? 'Link to carrier offers in the logid service' : parent === 'board_item' ? `Enlace a la oferta ${shareName} del operador en el servicio logid` : 'Enlace a logid: servicio para clientes, transportistas, mensajeros, despachadores y logísticos'],

        turkish: [parent === 'account_uuid' ? `Logid hizmetine ${shareName} iş ortağı ekleme bağlantısı` : parent === 'order_item' ? `Logid hizmetindeki ${thisOrder.id} siparişine bağlantı. Sipariş, aynı bölgede çalışmanız, uygun teslimat yöntemine sahip olmanız ve müşteri tarafından bloke edilmemeniz koşuluyla logid'de yetkilendirme sonrasında görüntülenebilecektir` : parent === 'nav_board' ? 'Link to carrier offers in the logid service' : parent === 'board_item' ? `Logid hizmetindeki operatörün ${shareName} teklifinin bağlantısı` : 'Logid bağlantısı - müşteriler, taşıyıcılar, kuryeler, dağıtım görevlileri ve lojistikçiler için hizmet'],

        сhinese: [parent === 'account_uuid' ? `在 logid 服务中添加合作伙伴 ${shareName} 的链接` : parent === 'order_item' ? `链接到 logid 服务中的订单 ${thisOrder.id}。 订单在logid授权后即可查看，前提是您在同一地区工作、有合适的配送方式且未被客户屏蔽` : parent === 'nav_board' ? 'Logid 服务中运营商报价的链接' : parent === 'board_item' ? `logid 服务中运营商报价 ${shareName} 的链接` : '链接至 logid - 为客户、承运人、快递员、调度员和物流员提供的服务'],

        hindi: [parent === 'account_uuid' ? `लॉग सेवा में भागीदार ${shareName} जोड़ने के लिए लिंक` : parent === 'order_item' ? `लॉग सेवा में ${thisOrder.id} ऑर्डर करने के लिए लिंक। ऑर्डर लॉगइन में प्राधिकरण के बाद देखने के लिए उपलब्ध होगा, बशर्ते कि आप उसी क्षेत्र में काम करते हों, आपके पास उपयुक्त डिलीवरी विधि हो और ग्राहक द्वारा अवरुद्ध न किया गया हो।` : parent === 'nav_board' ? 'लॉग सेवा में वाहक ऑफ़र से लिंक करें' : parent === 'board_item' ? `लॉग सेवा में वाहक ऑफर ${shareName} से लिंक करें` : 'लॉगिड से लिंक - ग्राहकों, वाहक, कूरियर, डिस्पैचर और लॉजिस्टिक के लिए सेवा'],
    })

    let url = parent === 'account_uuid' ? `https://logid.app?referal_id=${UserInfo.userInfo.uuid}&&action=add_partner` : parent === 'order_item' ? `https://logid.app?o_i=${thisOrder.id}&&o_s=${thisOrder.order_status}` : parent === 'board_item' ? `https://logid.app/board/item/${itemId}` : parent === 'nav_board' ? 'https://logid.app/board' : 'https://logid.app/'

    return (
        <div className='share_modal_container'>
            <div className='share_modal_icons_container'>
                <div className='modal_social_share'
                    onClick={() => {
                        setModalActive(false)
                    }}>
                    <WhatsappShareButton url={url} title={title}>
                        <WhatsappIcon size={32} ></WhatsappIcon>
                    </WhatsappShareButton>
                    <TelegramShareButton url={url} title={title}>
                        <TelegramIcon size={32} ></TelegramIcon>
                    </TelegramShareButton>
                    <VKShareButton url={url} title={title}>
                        <VKIcon size={32} ></VKIcon>
                    </VKShareButton>
                </div>
            </div>
            {parent === 'order_item' && <div className='share_modal_disclaimer'>{SetNativeTranslate(Translate.language, {
                russian: ['Вы делитесь ссылкой на заказ, обратите внимание, что заказ будет доступен получателю для просмотра только после авторизации в logid и при условии, что получатель работает в том же регионе, имеет подходящий способ доставки и не заблокирован заказчиком. Заказ в работе доступен для просмотра только заказчику и выполняющему его перевозчику'],
                english: ['You share a link to an order, please note that the order will be available to the recipient for viewing only after authorization in logid and provided that the recipient works in the same region, has a suitable delivery method and is not blocked by the customer. The order in progress is available for viewing only to the customer and the carrier executing it'],
                spanish: ['Usted comparte un enlace al pedido, tenga en cuenta que el pedido estará disponible para que el destinatario lo vea solo después de la autorización en logid y siempre que el destinatario trabaje en la misma región, tenga un método de entrega adecuado y no esté bloqueado por el cliente. Un pedido en curso está disponible para que lo vean únicamente el cliente y el transportista que lo realiza'],
                turkish: ['Siparişin bağlantısını paylaştığınızda, alıcının aynı bölgede çalışması, uygun bir teslimat yöntemine sahip olması ve müşteri tarafından bloke edilmemesi koşuluyla, siparişin yalnızca logid`de yetkilendirme sonrasında alıcı tarafından görüntülenebileceğini lütfen unutmayın. Devam eden bir sipariş yalnızca müşteri ve siparişi gerçekleştiren nakliyeci tarafından görüntülenebilir'],
                сhinese: ['您共享订单链接，请注意，只有在 logid 中授权后，且收件人在同一地区工作、有合适的配送方式且未被客户屏蔽的情况下，订单才可供收件人查看。 正在进行的订单只能由客户和执行该订单的承运人查看。'],
                hindi: ['आप ऑर्डर के लिए एक लिंक साझा करते हैं, कृपया ध्यान दें कि ऑर्डर लॉग इन में प्राधिकरण के बाद ही प्राप्तकर्ता द्वारा देखने के लिए उपलब्ध होगा और बशर्ते कि प्राप्तकर्ता उसी क्षेत्र में काम करता हो, उसके पास उपयुक्त डिलीवरी विधि हो और ग्राहक द्वारा अवरुद्ध न किया गया हो। प्रगति में कोई ऑर्डर केवल ग्राहक और उसे पूरा करने वाले वाहक द्वारा देखने के लिए उपलब्ध है।'],
            })}</div>}
        </div>
    )
})

export default ShareModalContent