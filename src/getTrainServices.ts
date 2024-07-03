import { Services } from "./types";

export const geTrainServices = async(PropsosalId:number)=>{
    const access_token = process.env.Access_token
    const  res = await fetch(`https://ws.alibaba.ir/api/v2/train/proposals/${PropsosalId}/services`, {
    "headers": {
      "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.29.0",
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": `Bearer ${access_token}`,
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
      "tracing-sessionid": "1720008509419",
      "Referer": "https://www.alibaba.ir/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const data:Services = await res.json()
  return data.result.data.map(obj=>({"serviceName":obj.serviceTypeName,"optionalServiceId":obj.optionalServiceId}))
}