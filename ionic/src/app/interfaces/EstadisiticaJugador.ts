import { List } from "./List";
import { Player } from "./Player";
import { Tournament } from "./Tournament";

export interface EsatdisticaJugador {
    _id: string,
    torneo: Tournament,
    jugador: Player,
    equipo: List,
    goles: number,
    amarillas: number,
    rojas: number,
    motivo: string,
    ultimaTarjeta: string,
    jornada: number
}