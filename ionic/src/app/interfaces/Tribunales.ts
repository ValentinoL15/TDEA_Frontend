import { List } from "./List";
import { Player } from "./Player";
import { Team } from "./Team";

export interface Tribunales {
  _id: string;
  player_id: Player; // puede ser el ID o el objeto populado
  name: string,
  lastName: string,
  equipo: string;
  tarjeta: string;
  fecha: number;
  versus: List; // puede ser el ID o el objeto populado
  local: string,
  visitante: string;
  motivo: string;
  fechas_de_expulsion: number;
}