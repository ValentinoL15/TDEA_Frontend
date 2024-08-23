import { Schedule } from "./Schedule";

export interface Day {
    _id?:string,
    creator?: String,
    belongTournament?: String,
    day: String,
    horarios: Schedule
}