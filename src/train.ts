import { getEnvValue } from "./env.js";
import { login } from "./login.js";
import {writeFileSync} from "fs"
import { Trains } from "./types.js";
import {geTrainServices} from "./getTrainServices.js"
import { getPlaneTicket } from "./plane.js";
import { getTrainUrl } from "./getTrainUrl.js";

export const getTrainTicket = async () => {
    if (getEnvValue("Access_token") == undefined) {
        await login()
    }
    const availabe_trains = []
    const access_token = process.env.Access_token
    const meta_data ={"From":191,"To":161,"DepartureDate":`${process.env.date}T00:00:00`,"TicketType":1,"IsExclusiveCompartment":false,"PassengerCount":1,"ReturnDate":null,"ServiceType":null,"Channel":1,"AvailableTargetType":null,"Requester":null,"UserId":508643453,"OnlyWithHotel":false,"ForceUpdate":null} 
    let  train_meta =  Buffer.from(JSON.stringify(meta_data)).toString("base64")
    const res = await fetch(`https://ws.alibaba.ir/api/v2/train/available/${train_meta}`,{
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
    const tickes:Trains = await res.json()
    //filtering non avilable seats
    for(const ticket of tickes.result.departing){
        if(ticket.seat>0){
            const Service=await geTrainServices(ticket.proposalId)
            availabe_trains.push({"ProposalId":ticket.proposalId,"componyName":ticket.companyName,"Service":Service})
        }
    }
    for(const ticket of availabe_trains)
    getTrainUrl(ticket.ProposalId,ticket.Service[0].optionalServiceId,process.env.origin!,process.env.destination!)
}