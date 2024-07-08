import { DayType, jalaliToGregorian, MonthType } from "shamsi-date-converter"

export function shamsiToGeo(date:string){
        const dateL = date.split("-")
        let year= Number(dateL[0])
        let month=Number(dateL[1]) as MonthType
        let day = Number(dateL[2]) as DayType
        return jalaliToGregorian(year, month ,day).join("-")
}