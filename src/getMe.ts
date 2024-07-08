import { getEnvValue } from "./env.js";
import { login } from "./login.js";
import { refresh } from "./refresh.js";
import { sleep } from "./sleep.js";

export const getMe=async()=>{
    const res = await fetch("https://ws.alibaba.ir/api/v1/account/self", {
        "headers": {
          "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.31.1",
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.5",
          "authorization": `Bearer ${getEnvValue("Access_token")}`,
          "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
          "tracing-sessionid": "1720341052859",
          "Referer": "https://www.alibaba.ir/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      console.log("getMe status: "+res.status)
      if(!res.ok){
          await sleep(5000)
          await refresh()
      } 
    
}