import { Day } from "./Day";
import { Stadium } from "./Stadium";

export interface Schedule {
    _id?: string,
    creator?: String,
    belongDay?: String,
    stadium?: {
        _id?: string,
        belongToSede?: string,
        code: string,
        type: number,
        length: number,
        width: number,
        roof: string,
        grass: string,
        punctuaction: number,
    },
    times: Array<number>
}