export interface Picture {
    _id?: string,
    belongToTeam?: string,
    img: string
    playerPicture?: boolean,
    teamPicture?: boolean,
    listPicture?: boolean,
    userPicture?: boolean,
    selected?: boolean; // Añadí un campo "selected" para manejar la selección
}