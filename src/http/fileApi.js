import { $authHost } from "./index";

export const uploadImages = async (filesFormData
) => {
    const { data } = await $authHost.post('api/file', {
        filesFormData
    },
        // function (req, res, next) {
        //     console.log(req.body, req.files);
        // },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept":"*/*",                
                // "Accept-Encoding":"gzip, deflate, br",
                // "Accept":"*/*"
            },
        }
    )
    return data
}
