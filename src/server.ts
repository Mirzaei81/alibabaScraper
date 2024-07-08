import express,{Request} from "express"
import { Ticket,Service, TrainStored, flightStored, personals, trainPersonal } from "./types"
import { getPlaneTicket } from "./plane.js"
import { getTrainTicket } from "./train.js"
import { shamsiToGeo } from "./shamsiToGeo.js"
const app = express()
const port =3000
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/index.html")
})
app.post("/services",async(req:Request<{},{},Service>,res)=>{
    let dep_date = shamsiToGeo(req.body.date)
    let personals =[]
    for(let i=0;i<Number(req.body.adaults_count);i++){
        personals.push(null)
    }
    const train_data:TrainStored=  {
        departureDate:dep_date,
        origin:req.body.origin,
        dest:req.body.dest,
        companyName:req.body.companyName,
        personals:personals,
        proposalId:null
    }
    try{
        let resJ = await getTrainTicket(train_data,true)
        if(typeof(resJ)=="string"){
            res.status(400).send(resJ)
            return
        }
        if(resJ){
            res.json(resJ);
        }
        else{
            res.send(undefined)
        }
    }
    catch(e){
        console.error(e)
        //@ts-ignore
        res.status(400).send(e)
    }
})
app.post("/buy",async(req:Request<{},{},Ticket>,res)=>{
    console.log(`buying  a ticket for ${req.body.type} from ${req.body.from} to ${req.body.to}`)
    if (typeof (req.body.firstname)=== "string") {
        if (req.body.type == "train") {
            const personals: trainPersonal[] = []
            personals.push({
                serviceId: Number(req.body.service),
                //@ts-ignore
                namePersian: req.body.firstname,
                //@ts-ignore
                lastNamePersian: req.body.lastname,
                birthdate: shamsiToGeo([req.body.year, req.body.month, req.body.day].join("-")),
                //@ts-ignore
                meli_code: req.body.meli,
                //@ts-ignore
                gender: req.body.gender,
                //@ts-ignore
                groupType:req.body.groupType,
                adult: req.body.adult//adult-child infent
            })
            const train_data: TrainStored = {
                departureDate: shamsiToGeo(req.body.departing),
                origin: req.body.from,
                dest: req.body.to,
                companyName: req.body.providers,
                personals: personals,
                proposalId: null
            }
            const resp = await getTrainTicket(train_data, false)
            //@ts-ignore
            res.send(resp)
        }
        else {
            const personals: personals[] = []
            personals.push({
                //@ts-ignore
                name: req.body.firstname,
                //@ts-ignore
                lastName: req.body.lastname,
                birthdate: shamsiToGeo([req.body.year, req.body.month, req.body.day].join("-")),
                //@ts-ignore
                code: req.body.meli,
                flightAgeType: req.body.adult//adult-child infent
            })
            const plane_data: flightStored = {
                proposalId: "",
                origin: req.body.from,
                dest: req.body.to,
                departureDate: shamsiToGeo(req.body.departing),
                personals: personals
            }
            res.status(200).json(await getPlaneTicket(plane_data))
        }
    }
    else {
        if (req.body.type == "train") {
            const personals: trainPersonal[] = []
            for (let i = 0; i < req.body.firstname.length; i++) {
                personals.push({
                    serviceId: Number(req.body.service?req.body.service[i]:null),
                    namePersian: req.body.firstname[i],
                    lastNamePersian: req.body.lastname[i],
                    birthdate: shamsiToGeo([req.body.year[i], req.body.month[i], req.body.day[i]].join("-")),
                    meli_code: req.body.meli[i],
                    gender: req.body.gender[i],
                    groupType: req.body.groupType[i],//adult-child infent
                    adult:req.body.adult
                })
            }
            const train_data: TrainStored = {
                departureDate: shamsiToGeo(req.body.departing),
                origin: req.body.from,
                dest: req.body.to,
                companyName: req.body.providers,
                personals: personals,
                proposalId: null
            }
            const resp = await getTrainTicket(train_data, false)
            //@ts-ignore
            res.send(resp)
            
        }
        else {
            const personals: personals[] = []
            for (let i = 0; i < req.body.firstname.length; i++) {
                personals.push({
                    name: req.body.firstname[i],
                    lastName: req.body.lastname[i],
                    birthdate: shamsiToGeo([req.body.year[i], req.body.month[i], req.body.day[i]].join("-")),
                    code: req.body.meli[i],
                    flightAgeType: req.body.groupType[i]//adult-child infent
                })
            }
            const plane_data: flightStored = {
                proposalId: "",
                origin: req.body.from,
                dest: req.body.to,
                departureDate: shamsiToGeo(req.body.departing),
                personals: personals
            }
            res.status(200).json(await getPlaneTicket(plane_data))
        }
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})