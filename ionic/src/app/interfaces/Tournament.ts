import { Campeonato } from "./Campeonato";
import { Category } from "./Category";
import { Day } from "./Day";
import { Edad } from "./Edad";
import { Format } from "./Format";
import { Stadium } from "./Stadium";

export interface Tournament {
    _id?: any,
    nameFantasy: String,
    ano: number,
    campeonato: Campeonato,
    edad: Edad,
    rangeAgeSince: number,
    rangeAgeUntil: number,
    category: Category,
    format: Format,
    teamSubscribed?: Array<{
        _id?: string,
        nameList?: string,
        monto?: number,
        pagoFinal?: number
    }>,
    activeStadiums?: Array<any>,
    ageDescripcion: string,
    daysTournament?: Array <{
    _id?:string,
    creator?: String,
    belongTournament?: String,
    day: String,
    sede?:Array <{
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
    }>
    }>,
    tournamentDate: Date,
    tournamentNotes: String,
    isTournamentMasculine: Boolean,
    isTournamentActive: Boolean,
    tarifaInscripcion: number,
    tarifaPartido: number,
    cupos: number,
    pagos?: Array <{
        _id?: string,
        monto?: number,
        teamListId?: {
            _id?: string,
            nameList?: string,
        }
    }>
}