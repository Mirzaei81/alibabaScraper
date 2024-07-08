
import fs from "fs"
import os from "os"
import { TrainStored, TrainStoredList } from "./types";

const TrainFilePath = process.env.train_path || "./train.json"
// read .env file & convert to array
export const readTrainVars:()=>TrainStoredList = () => JSON.parse(fs.readFileSync(TrainFilePath, "utf-8"));
export const setTrainVars = (trains:TrainStoredList) => {
  fs.writeFileSync(TrainFilePath, JSON.stringify(trains));
};
export const  delTrainVars = (proposalId:string)=>{
  const planes = readTrainVars()
  const targetPlaneIdx =planes.data.findIndex(line=>line.proposalId==proposalId)
  if (targetPlaneIdx>-1){
    planes.data.splice(targetPlaneIdx,1)
  }
  fs.writeFileSync(TrainFilePath,JSON.stringify(planes))

}