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
    shirtColor: String,
    alternativeShirtColor: String,
    belongToTournament?: any,
    players?: [{
        _id?: string,
        firstName: String,
        lastName: String,
        dni: number,
        shirtNumber: number,
        nacimiento: string,
        ownerList?: String,
        picturePlayer: string
    }],
    nameList: string,
    teamPicture: string

}