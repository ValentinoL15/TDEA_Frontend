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
    players?: Array<any>,
    teamListNotes: String,
    isTeamListActive: Boolean,
    teamListStatus: String
    division: { 
        _id?: string,
        order:0
    },
    nameList: string

}