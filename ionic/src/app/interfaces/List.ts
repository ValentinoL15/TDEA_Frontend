import { Player } from "./Player"

export interface List {
    _id?: any,
    ownerUser?: {
        _id?: string,
        firstName?: string,
        lastName?: string
    },
    ownerTeam?: {
        _id?: any,
    },
    alineacion: number,
    shirtColor: String,
    alternativeShirtColor: String,
    belongToTournament?: any,
    players?: Player[]
    nameList: string,
    teamPicture: string

}