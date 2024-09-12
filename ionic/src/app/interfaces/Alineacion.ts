import { Player } from "./Player";

export interface Alineacion {
    _id?: string,
    teamList?: string,
    arquero?: Player,
    defensor1?: Player,
    defensor2?: Player,
    defensor3?: Player,
    defesnor4?: Player,
    mediocampista1?: Player,
    mediocampista2?: Player,
    mediocampista3?: Player,
    mediocampista4?: Player,
    delantero1?: Player,
    delantero2?: Player,
}