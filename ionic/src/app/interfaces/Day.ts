import { Schedule } from "./Schedule";
import { Sede } from "./Sede";

export interface Day {
    _id?:string,
    creator?: String,
    belongTournament?: String,
    day: String,
    sede?: Sede,
    horarios: {
        _id?: string,
        creator?: String,
        belongDay?: String,
        stadium?: [{
            _id?: string,
            belongToSede?: string,
            code?: string,
            type?: number,
            length?: number,
            width?: number,
            roof?: string,
            grass?: string,
            punctuaction?: number,
        }],
        times: Array<number>
    }
}