import { setEnvValue } from "./env.js";
import { config } from "dotenv";
import { Login } from "./types";
import { sleep } from "./sleep.js";
export const login=async()=>{
  let attempt = 0
  const max_attempts= 3
  while (attempt<max_attempts){
    try{
      const res = await fetch("https://ws.alibaba.ir/api/v3/account/token", {
        "headers": {
          "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.28.0",
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          "tracing-device": "N,Chrome,126.0.0.0,N,N,Windows",
          "tracing-sessionid": "1719934373664",
          "Referer": "https://www.alibaba.ir/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"emailOrPhone\":\"${process.env.user}\",\"password\":\"${process.env.pass}\"}`,
        "method": "POST"
      });
      console.log("login res: "+res.status)
      if (res.status == 429) {
        console.error(await res.text())
        throw new Error("Too many requests");
      } 
      const data: Login = await res.json()
      if (data.result.access_token) {
        setEnvValue("Access_token", data.result.access_token)
        setEnvValue("Refresh_token", data.result.refresh_token)
      }

      config()
      break
    } catch(e) {
      console.error(e)
      console.error("retring in 5 seconds")
      await sleep(5000)
      attempt += 1
    }
  }
}