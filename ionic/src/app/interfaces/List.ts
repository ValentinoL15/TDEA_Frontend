export interface List {
    _id?: any,
    creatorUser?: String,
    shirtColor: String,
    alternativeShirtColor: String,
    belongToTournament?: any,
    players?: Array<any>,
    teamListNotes: String,
    isTeamListActive: Boolean,
    teamListStatus: String
    division: String,
    nameList: string

}