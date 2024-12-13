export interface PassMarket {
    _id: "",
    nombre?: string,
    apellido?: string,
    phone?: string,
    email?: string,
    instagram?: string,
    playerImage?: string,
    nacimiento?: string,
    horarios?: [{
        dia?: string,
        hora?: string,
    }],
    position?: string,
    pieHabil?: string,
    peso?: number,
    altura?: string,
    trayectoria?: string,
    zona?: string,
    searchTeam?: boolean,
    searchPlayers?: boolean
}