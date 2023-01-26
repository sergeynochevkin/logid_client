import { $authHost, $host } from "./index";

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

export const sendCaptureFormMail = async (
    phone,
    section,
) => {
    const { data } = await $host.post('api/mail/send_capture_form_mail', {
        phone,
        section
    })
    return data
}



