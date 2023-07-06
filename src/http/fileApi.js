import { $authHost } from "./index";

export const uploadImages = async (option, id, language, files
) => {
    const { data } = await $authHost.post('api/file', {
        option, id, language, files
    },
        // function (req, res, next) {
        //     console.log(req.body, req.files);
        // },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Accept": "*/*",
                // "Accept-Encoding": "gzip, deflate, br",
                // "Accept":"*/*"
            },    
            // redirect: 'follow',
        }
    )
    return data
}
