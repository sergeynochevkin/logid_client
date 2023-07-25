import { $authHost } from "./index";

export const uploadFiles = async (option, id, language, action, fileList
) => {
    const { data } = await $authHost.postForm('api/file', {
        option, id, language, action, 'files[]': fileList
    }

    )
    return data
}

export const fetchFile = async (id, type, name) => {
    const { data } = await $authHost.get('api/file', { params: { id, type, name }, responseType: 'blob' 
 })
    return data
}

