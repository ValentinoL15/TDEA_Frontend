import { Category } from "./Category";
import { Format } from "./Format";

export interface Tournament {
    _id?: any,
    nameFantasy: String,
    category: Category,
    format: Format,
    teamSubscribed?: Array<any>,
    activeStadiums?: Array<any>,
    daysTournament?: Array<any>,
    tournamentDate: Date,
    tournamentNotes: String,
    isTournamentMasculine: Boolean,
    isTournamentActive: Boolean
}