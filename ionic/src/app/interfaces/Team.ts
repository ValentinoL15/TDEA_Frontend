import { Deuda } from "./Deudas"
import { List } from "./List"
import { Player } from "./Player"

export interface Team {
    _id?: any,
    teamName: String,
    teamNotes: String,
    socialMedia: String,
    teamList?: List,
    teamImage?:String,
    players?: Player[]
    active: boolean,
    deudas?: [{
        _id?: string,
        amount: Number,
}]
}