import { Format } from "@formkit/tempo";
import { Campeonato } from "./Campeonato";
import { Edad } from "./Edad";

export interface Table {
    _id?:string,
    name: string,
    lastName: string,
    phone: string,
    ano: number,
    campeonato: Campeonato[],
    teamSubscribed: [],
    daysTournament: [],
    format: Format[],
    edad: Edad[],
    cupos: []
}