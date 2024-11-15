import { Campeonato } from "./Campeonato";
import { Category } from "./Category";
import { Day } from "./Day";
import { Edad } from "./Edad";
import { Format } from "./Format";
import { List } from "./List";
import { Sede } from "./Sede";
import { Stadium } from "./Stadium";

export interface Tournament {
    _id?: any,
    nameFantasy: String,
    ano: number,
    campeonato: Campeonato,
    edad: {
        _id?: string,
        type: string
    },
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
    daysTournament?: [{
        _id?: string,
        day?: {
            _id?: string,
            type: string
        },
        sede?: 
            Sede
        
        stadium?: 
            Stadium
        ,
        time?: {
            _id?: string,
            type: string[]
        }
    }],
    tournamentDate: Date,
    tournamentNotes: String,
    activos?: List,
    reservados?: Array<{
        _id?: string,
    }>,
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