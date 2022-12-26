import { $authHost } from "./index";

export const sendMail = async (
    language,
    role,
    orderId,
    mailFunction,
    option,
    noPartnerId,
    orderGroup
) => {
    const { data } = await $authHost.post('api/mail/send_mail', {
        language,
        role,
        orderId,
        mailFunction,
        option,
        noPartnerId,
        orderGroup
    })
    return data
}



