import { Day } from "./Day";

export interface Schedule {
    creator?: String,
    belongDay?: Day,
    stadium?: Array<any>,
    times: Array<number>
}