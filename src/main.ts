import { readPlaneVars } from "./FlightQue";
import { getPlaneUrl } from "./getPlaneUrl";
import { getTrainUrl } from "./getTrainUrl";
import {readTrainVars} from "./TrainQue";

for(const ticket of readPlaneVars()){
    const data = ticket.split(":")
    await getPlaneUrl(data[0],data[1],data[2])
}
for(const ticket of readTrainVars()){
    const data = ticket.split(":")
    await getTrainUrl(Number(data[0]),data[1],data[2],Number(data[3]))
}