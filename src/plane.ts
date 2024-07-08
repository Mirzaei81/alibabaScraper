import { config } from "dotenv";
import {Flights,Available, TrainStored, flightStoredList, flightStored, } from "./types"
import {getEnvValue } from "./env.js";
import {writeFileSync} from "fs"
import { login } from "./login.js";
import { getPlaneUrl } from "./getPlaneUrl.js";
import {readPlaneVars,setPlaneValue} from "./FlightQue.js";
import os from "os"
import { getMe } from "./getMe.js";
import { sleep } from "./sleep.js";

export const getPlaneTicket=async(personalData:flightStored)=>{
    if (getEnvValue("Access_token") == undefined) {
        await login()
    }
    await getMe()
    const body = {
        "origin": personalData.origin,
        "destination": personalData.dest,
        "departureDate": personalData.departureDate,
        "adult": personalData.personals.length,
        "child": 0,
        "infant": 0
    }
    const access_token = getEnvValue("Access_token")
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
    if (Math.floor(available.status / 100) == 4||Math.floor(available.status / 100) == 5) {
        return await available.text()
    }
    await sleep(5000)
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
    const unset: flightStored[] = []
    for (const url of flighJ.result.departing) {
        if (url.seat >=personalData.personals.length) {
            if (url.proposalId) {
                personalData.proposalId = url.proposalId
                const res = await getPlaneUrl(personalData)
                return res
            }
        }
        else {
            if (url.status == "C") {//تکمیل ظرفیت
                if (url.proposalId) {
                    let personIdCopy = structuredClone(personalData);
                    personIdCopy.proposalId = url.proposalId
                    unset.push(personIdCopy)
                }
            }
        }
    }
    const flightsInQue = readPlaneVars()
    for(const ticket of unset){
        if(ticket.proposalId){
            flightsInQue.data.push(ticket)
            setPlaneValue(flightsInQue)
            return `پرواز داخلی به شماره ${ticket.proposalId} از ${ticket.origin} به ${ticket.dest}ذخیره شد`
        }
    }
}