import { getEnvValue } from "./env.js";
import { login } from "./login.js";
import { basketId, orderId, TrainStored } from "./types";
export const getTrainUrl = async (trainData: TrainStored) => {
    const basket_body = { "providerItemIds": [trainData.proposalId], "passengers": [], "isExclusiveCompartment": [false] }
    for (let i = 0; i < trainData.personals.length; i++) {
        //@ts-ignore
        basket_body.passengers.push({ "tariffType": trainData.personals[i]?.groupType, "gender": trainData.personals[i]?.gender, "optionalServiceIds": [trainData.personals[i].serviceId, ""], "namePersian": trainData.personals[i].namePersian, "lastNamePersian": trainData.personals[i].lastNamePersian, "id": i, "birthdate": trainData.personals[i].birthdate, "identification": { "id": i, "type": "NationalNumber", "placeOfIssue": "IRN", "placeOfBirth": "IRN", "code": trainData.personals[i].meli_code } })
    }
    const access_token = getEnvValue("Access_token")
    const basket_id = await fetch("https://ws.alibaba.ir/api/v1/coordinator/basket/items/train", {
        "headers": {
            "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.29.0",
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${access_token}`,
            "content-type": "application/json",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1",
            "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
            "tracing-sessionid": "1720021041760",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify(basket_body),
        "method": "PUT"
    })
    console.log("basket_id res:"+basket_id.status)
    if (Math.floor(basket_id.status / 100) == 4||Math.floor(basket_id.status / 100) == 5) return basket_id.status + await basket_id.text();
    const basket_res: basketId = await basket_id.json()
    const orderId = await fetch(`https://ws.alibaba.ir/api/v2/coordinator/basket/${basket_res.result.basketId}/checkout`, {
        "headers": {
            "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.29.0",
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${access_token}`,
            "content-type": "application/json",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1",
            "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
            "tracing-sessionid": "1720026874647",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"notificationCellphoneNumber\":\"\",\"notificationEmail\":\"\"}",
        "method": "POST"
    });
    console.log("orderId res:"+orderId.status)
    if (Math.floor(orderId.status / 100) == 4 || Math.floor(orderId.status / 100) == 5) return orderId.status +await orderId.text();
    const orderIdJ: orderId = await orderId.json()
    return `https://www.alibaba.ir/train/${trainData.origin}-${trainData.dest}/ragtir/${orderIdJ.result.orderId}/confirm`
}