import { Player } from "./Player"

export interface Team {
    _id?: any,
    teamName: String,
    teamNotes: String,
    socialMedia: String,
    teamImage?:String,
    players?: Player[]
    active: boolean
}