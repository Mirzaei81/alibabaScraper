import { getEnvValue } from "./env.js";
import { login } from "./login.js";
import { basketId, flightStored, flightStoredList, orderId } from "./types";
export const getPlaneUrl =async(personalData:flightStored)=>{
    const access_token = getEnvValue("Access_token")
    const dom_body = {
        "providerItemIds": [personalData.proposalId],
        "passengers": []
    }
    for(let i=0;i<personalData.personals.length;i++){
        //@ts-ignore
        dom_body.passengers.push({ "flightAgeType": personalData.personals[i].flightAgeType, "title": "MR", "name": personalData.personals[i].name, "lastName": personalData.personals[i].lastName, "id": i, "birthdate": personalData.personals[i].birthdate, "identification": { "id": i, "type": "NationalNumber", "placeOfIssue": "IRN", "placeOfBirth": "IRN", "code": personalData.personals[i].code} })
    }
    console.log(JSON.stringify(dom_body))
    const basketId_res = await fetch("https://ws.alibaba.ir/api/v1/coordinator/basket/items/domestic-flights", {
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
            "tracing-sessionid": "1719990117568",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify(dom_body),
        "method": "PUT"
    });
    if (Math.floor(basketId_res.status / 100) == 4||Math.floor(basketId_res.status / 100) == 5)
         return await basketId_res.text();
    let data: basketId= await basketId_res.json()
    //@ts-ignore
    let basekt_id = data.result.basketId
    const checkout = await fetch(`https://ws.alibaba.ir/api/v2/coordinator/basket/${basekt_id}/checkout`, {
        "headers": {
            "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.28.0",
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
            "tracing-sessionid": "1719990117568",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"notificationCellphoneNumber\":\"\",\"notificationEmail\":\"\"}",
        "method": "POST"
    });
    const checkoutJ: orderId = await checkout.json()
    return `https://www.alibaba.ir/flights/${personalData.origin}-${personalData.dest}/zjxkk2p/${checkoutJ.result.orderId}/confirm`
}