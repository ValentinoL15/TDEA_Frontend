import { Player } from "./Player";
import { Team } from "./Team";

export interface Tribunales {
  _id?: string;
  player_id: Player; // puede ser el ID o el objeto populado
  name: string,
  lastName: string,
  equipo: string;
  tarjeta: string;
  fecha: number;
  versus: string | Team; // puede ser el ID o el objeto populado
  motivo: string;
  fechas_de_expulsion: number;
}