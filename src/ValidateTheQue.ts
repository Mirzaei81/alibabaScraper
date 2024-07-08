import { readPlaneVars,delPlaneValue} from "./FlightQue.js";
import { getPlaneUrl } from "./getPlaneUrl.js";
import { getTrainTicket } from "./train.js";
import {readTrainVars,delTrainVars} from "./TrainQue.js";
//plane disc conatin prop_id : origin  : dist
readPlaneVars().data.forEach(async(plane_desc)=>{
    if (new Date(plane_desc.departureDate + " GMT") < new Date(Date.now())) {
        delTrainVars(plane_desc.proposalId!)
        return
    }
    const res =await  getPlaneUrl(plane_desc)
    if (typeof(res) == "string") {
        if(res.startsWith("https://www.alibaba.ir/flights")){
            delTrainVars(plane_desc.proposalId!)
        }
    } 
})
readTrainVars().data.forEach(async(trains_desc)=>{
    if (new Date(trains_desc.departureDate + " GMT") < new Date(Date.now())) {
        delTrainVars(trains_desc.proposalId!)
        return
    }
    const res = await getTrainTicket(trains_desc,false)
    if (typeof(res) == "string") {
        if(res.startsWith("https://www.alibaba.ir/train")){
            delTrainVars(trains_desc.proposalId!)
        }
    }
})