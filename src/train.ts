import { getEnvValue } from "./env.js";
import { login } from "./login.js";
import { Available, Trains, TrainStored } from "./types.js";
import {geTrainServices} from "./getTrainServices.js"
import { getTrainUrl } from "./getTrainUrl.js";
import { readTrainVars, setTrainVars } from "./TrainQue.js";
import { config } from "dotenv";
import { sleep } from "./sleep.js";
import { getMe } from "./getMe.js";
import {writeFileSync}from"fs"
config()

export const getTrainTicket = async (trainData: TrainStored, getService: boolean) => {
    if (getEnvValue("Access_token") == undefined || getEnvValue("Access_token") == null) {
        await login()
    }
    await getMe()
    const body = { "departureDate": trainData.departureDate, "origin": trainData.origin, "destination": trainData.dest, "passengerCount": trainData.personals.length, "isExclusiveCompartment": false, "ticketType": "Family" }
    let req_idJ: Available;
    let access_token = getEnvValue("Access_token")
    const requestId = await fetch("https://ws.alibaba.ir/api/v2/train/available", {
        "headers": {
            "ab-channel": "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,126.0.0.0,N,N,Windows,10,3.30.0",
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
            "tracing-sessionid": "1720255128860",
            "Referer": "https://www.alibaba.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify(body),
        "method": "POST"
    });
    console.log("req id  response :"+requestId.status)
    if(!requestId.ok){
        const err = await requestId.text()
        console.error(err)
        console.error(err.length)
        return err;
    } 
    req_idJ = await requestId.json()
    const res = await fetch(`https://ws.alibaba.ir/api/v2/train/available/${req_idJ.result.requestId}`, {
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
    console.log("tickes list res:"+res.status)
    if (!res.ok) {
        return await res.text();
    }
    const tickes: Trains = await res.json()
    let unavailables: TrainStored[]=[] ; 
    let unavailables_services = []
    writeFileSync("trains_listed.json",JSON.stringify(tickes))
    //filtering non avilable seats
    for (const ticket of tickes.result.departing) {
        if (ticket.companyName.includes(trainData.companyName)) {
            if (getService) {
                if(ticket.seat>trainData.personals.length){
                    const Services = await geTrainServices(ticket.proposalId)
                    return Services
                }
                else{
                    unavailables_services.push(await geTrainServices(ticket.proposalId))
                }
            }
            else{
                if (ticket.seat > trainData.personals.length) {
                    console.log("ticket available now checking it out")
                    trainData.proposalId = ticket.proposalId.toString()
                    return await getTrainUrl(trainData)
                }
                else {
                    console.log("saving ...")
                    trainData.proposalId = ticket.proposalId.toString()
                    unavailables.push(trainData)
                }
            }
        }
    }
    if(getService){
        return unavailables_services[0]
    }
    const trainVars = readTrainVars().data
    //@ts-ignore
    for(const ticket of unavailables){
        if(ticket.proposalId){
            trainVars.push(unavailables[0])
            setTrainVars({ data: trainVars })
            //@ts-ignore
            return `قطار به شماره ${unavailables[0].proposalId} از ${unavailables[0].origin} به ${unavailables[0].dest}ذخیره شد`
        }
    }
}