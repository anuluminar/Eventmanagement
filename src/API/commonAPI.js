import axios from "axios"

export const commonAPI = async (method, url, body, header) => {
    const reqConfig = {
        method: method,
        url: url,
        data: body,
        headers: header ? header : {
            "Content-Type": "application/json"
        }
    }

    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}