import { config } from "dotenv";
import {Flights,Available, basketId, orderId} from "./types"
import {getEnvValue } from "./env.js";
import {writeFileSync} from "fs"
import { login } from "./login.js";
import { getPlaneUrl } from "./getPlaneUrl.js";
config()
export const getPlaneTicket=async()=>{
    if (getEnvValue("Access_token") == undefined) {
        await login()
    }
    const today = new Date()
    const dd = String(today.getDay()).padStart(2, "0")
    const MM = String(today.getMonth() + 1).padStart(2, "0")// odd behavior that we are one month behind 
    const yyyy = String(today.getFullYear())
    const body = { "origin": process.env.origin, "destination": process.env.destination, "departureDate": yyyy + "-" + MM + "-" + dd, "adult": 1, "child": 0, "infant": 0 }
    const access_token = process.env.Access_token
    const available = await fetch("https://ws.alibaba.ir/api/v1/flights/domestic/available", {
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
            "tracing-sessionid": "1719985608893",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify(body),
        "method": "POST"
    });
    console.warn(available.status+":40\tplane.ts")
    const availableJSON: Available = await available.json()
    const requestId = availableJSON.result.requestId
    const flight = await fetch(`https://ws.alibaba.ir/api/v1/flights/domestic/available/${requestId}`, {
        "headers": {
            "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.28.0",
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
            "tracing-sessionid": "1719985608893",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    const flighJ: Flights = await flight.json()
    for(const url of flighJ.result.departing){
        if(url.proposalId){
            getPlaneUrl(url.proposalId,process.env.origin!,process.env.destination!)
        }
    }
}