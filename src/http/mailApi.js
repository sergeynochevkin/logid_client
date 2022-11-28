import { $authHost } from "./index";

export const sendMail = async (
    role,
    orderId,
    mailFunction,
    option,
    noPartnerId,
    orderGroup
) => {
    const { data } = await $authHost.post('api/mail/send_mail', {
        role,
        orderId,
        mailFunction,
        option,
        noPartnerId,
        orderGroup
    })
    return data
}



