import { getPlaneTicket } from "./plane.js";
import { getTrainTicket } from "./train.js";
import {config} from "dotenv"
config()
await Promise.all([getTrainTicket()])
