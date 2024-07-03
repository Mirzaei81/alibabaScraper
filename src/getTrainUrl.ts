import { login } from "./login.js";
import { basketId, orderId } from "./types";
export const getTrainUrl =async(proposalId:number,serviceId:number,origin:string,dest:string)=>{
    const basket_body = {"providerItemIds":[proposalId.toString()],"passengers":[{"tariffType":"Adult","gender":"Male","optionalServiceIds":[serviceId,""],"namePersian":process.env.name,"lastNamePersian":process.env.lastNamePersian,"id":0,"birthdate":process.env.birthdate,"identification":{"id":0,"type":"NationalNumber","placeOfIssue":"IRN","placeOfBirth":"IRN","code":process.env.meli_code}}],"isExclusiveCompartment":[false]}
    const access_token = process.env.Access_token
    let attempt = 0
    const max_attempt = 5
    while(attempt<max_attempt){
        try {
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
            const basket_res:basketId = await basket_id.json()
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
            const orderIdJ:orderId = await orderId.json()
            console.log(`https://www.alibaba.ir/train/${origin}-${dest}/ragtir/${orderIdJ.result.orderId}/confirm`)
            break 
        }
        catch {
            await login()
            attempt += 1
        }
    }
}