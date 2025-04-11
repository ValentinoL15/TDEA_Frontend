export interface Player {
    _id?: String,
    firstName: string,
    lastName?: string,
    dni?: number,
    shirtNumber?: number,
    nacimiento?: string,
    ownerList?: String,
    picturePlayer?: string
    pictureAccept?: boolean,
    status?: string,
    goles?: number,
    amarillas?: number,
    rojas?: number,
}