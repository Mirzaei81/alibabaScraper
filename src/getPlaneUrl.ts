import { login } from "./login.js";
import { basketId, orderId } from "./types";
export const getPlaneUrl =async(proposalId:string,origin:string,dest:string)=>{
    const access_token = process.env.Access_token
    const dom_body = {
        "providerItemIds": [proposalId],
        "passengers": [{ "flightAgeType": "adult", "title": "MR", "name": process.env.name, "lastName": process.env.lastName, "id": 0, "birthdate": process.env.birthdate, "identification": { "id": 0, "type": "NationalNumber", "placeOfIssue": "IRN", "placeOfBirth": "IRN", "code": process.env.meli_code } }]
    }
    let attempt = 0
    const max_attempt = 5
    let data: basketId
    while(attempt<max_attempt){
        try{
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
        if (basketId_res.status == 401) throw new Error("Couldn't catch that");
        data = await basketId_res.json()
        break
        }catch{
            await login()
            attempt+=1
            
        }
    }
    //@ts-ignore
    if(data==undefined)throw new Error("Couldn't get basket_id Problam with login");
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
    const checkoutJ: orderId= await checkout.json()
    console.log(`https://www.alibaba.ir/flights/${origin}-${dest}/zjxkk2p/${checkoutJ.result.orderId}/confirm`)
}