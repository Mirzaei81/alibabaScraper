import { getEnvValue, setEnvValue } from "./env.js";
import { config } from "dotenv";

export const refresh =async()=>{
    const body= {"refreshToken":getEnvValue("Refresh_token")}
    const res=  await fetch("https://ws.alibaba.ir/api/v3/account/refresh", {
    "headers": {
      "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.31.2",
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.5",
      "content-type": "application/json",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
      "tracing-sessionid": "1720363216869",
      "Referer": "https://www.alibaba.ir/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body":JSON.stringify(body) ,
    "method": "POST"
  });
  console.log("refresh res: "+res.status)
  if(!res.ok){
    console.log(await res.text())
  }
  const data = await res.json()
    if (data.result.access_token) {
        setEnvValue("Access_token", data.result.access_token)
        setEnvValue("Refresh_token", data.result.refresh_token)
    }
    config()
}