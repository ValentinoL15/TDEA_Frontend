import { Day } from "./Day";

export interface Schedule {
    creator?: String,
    belongDay?: Day,
    hour: number,
    minute: number
}