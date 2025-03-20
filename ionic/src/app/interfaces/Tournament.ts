import { Point } from "leaflet";
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
    formatImage?: string,
    torneoImage?: string,
    awardsImage?: string,
    reglamentation?: string,
    campeonato: Campeonato,
    edad: {
        _id?: string,
        type: string
    },
    rangeAgeSince: number,
    rangeAgeUntil: number,
    category: Category,
    format: Format,
    teamSubscribed: Array<{
        _id: string,
        nameList?: string,
        monto?: number,
        pagoFinal?: number,
        ownerUser?: {
            _id?: string,
            firstName?: string,
            lastName?: string
        }
        preferences: number[][]
    }>,
    activeStadiums?: Array<any>,
    ageDescripcion: string,
    daysTournament: [{
        _id?: string,
        day: {
            _id?: string,
            type: string
        },
        sede: {
            _id?: string,
            name?: string,
            alias?: string,
            status?: string,
            phone?: number,
            celular?: number,
            adress?: string,
            barrio?: string,
            socialRed?: string,
            latitude?: number,
            altitude?: number,
            daysAttention?: {
                day: string;
                start: string;
                end: string;
            }[];
            images: Array<string>,
            encargado?: string,
            dueno?: string,
            stadiums?: Stadium[],
        }
        
        stadium?: Stadium
        ,
        time?: string[]
    }],
    tournamentDate: Date,
    tournamentNotes: String,
    activos?: List,
    reservados?: Array<{
        _id?: string,
    }>,
    order?: number,
    isTournamentMasculine: Boolean,
    isTournamentActive: Boolean,
    tarifaInscripcion: number,
    tarifaPartido: number,
    deposito?: number,
    cupos: number,
    fixture: [{
        _id?: string,
        jornada: number,
        partidos: [{
            team1: {
                _id?: string,
                nameList?: string,
            },
            team2: {
                _id?: string,
                nameList?: string,
            },
            resultado: {
               
                    team1: number,
                    team2: number
                
            }
        }]
    }]
    aAnotar?: number,
    pagos?: Array <{
        _id?: string,
        monto?: number,
        teamListId?: {
            _id?: string,
            nameList?: string,
        }
    }>,
}