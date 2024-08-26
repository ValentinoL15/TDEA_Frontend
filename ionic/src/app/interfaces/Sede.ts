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
    daysAttention: Array<string>,
    images?: Array<string>,
    encargado: string,
    dueno: string,
    stadiums?: Stadium
}