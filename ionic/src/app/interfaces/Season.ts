import { Category } from "./Category";

export interface Season {
    _id?:String,
    category?: Category,
    seasonName: string,
    seasonNotes:string,
    isSeasonOfficial: boolean,
    isSeasonActive: boolean,
    tournamentsPLaying?: Array<any>,
    usersPlaying?: Array<any>,
    teamsPlaying?: Array<any>
}