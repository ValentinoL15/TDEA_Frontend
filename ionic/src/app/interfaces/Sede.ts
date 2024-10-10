import { Stadium } from "./Stadium";

export interface Sede {
    _id?:string,
    belongToEmpresa?: string,
    name: string,
    alias: string,
    status: string,
    phone: number,
    celular: number,
    adress: string,
    barrio: string,
    socialRed: string,
    daysAttention: Array<{
        day: string;       // Día de la semana (Lunes, Martes, etc.)
        start: string;     // Hora de apertura
        end: string;       // Hora de cierre
    }>;
    images?: Array<string>,
    encargado: string,
    dueno: string,
    stadiums?: Stadium[],
}