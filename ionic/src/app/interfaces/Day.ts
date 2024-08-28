import { Schedule } from "./Schedule";

export interface Day {
    _id?:string,
    creator?: String,
    belongTournament?: String,
    day: String,
    horarios: {
        _id?: string,
        creator?: String,
        belongDay?: Day,
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
}