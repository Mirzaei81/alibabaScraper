import fs from "fs"
import os from "os"
import { flightStoredList } from "./types";

const PlaneFilePath = process.env.flight_path || "./flight.json"
// read .env file & convert to array
export const readPlaneVars:()=>flightStoredList = () => JSON.parse(fs.readFileSync(PlaneFilePath, "utf-8"));
export const setPlaneValue = (Flight: flightStoredList) => {
  fs.writeFileSync(PlaneFilePath, JSON.stringify(Flight));
};
export const delPlaneValue = (proposalId:string) => {
  const planes = readPlaneVars()
  const targetPlaneIdx = planes.data.findIndex(line => line.proposalId == proposalId)
  if (targetPlaneIdx > -1) {
    planes.data.splice(targetPlaneIdx, 1)
  }
  fs.writeFileSync(PlaneFilePath, JSON.stringify(planes))

}