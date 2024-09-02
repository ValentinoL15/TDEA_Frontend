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
    isTeamListActive: Boolean,
    nameList: string

}