import { List } from "./List";

export interface Player {
    _id?: String,
    firstName: string,
    lastName?: string,
    dni?: number,
    shirtNumber?: number,
    nacimiento?: string,
    ownerList?: List,
    picturePlayer?: string
    pictureAccept?: boolean,
    status?: string,
    goles?: number,
    amarillas?: number,
    rojas?: number,
}