import { Alineacion } from "./Alineacion"
import { Player } from "./Player"
import { Tournament } from "./Tournament"

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
    alineacion?: {
        _id?: string,
    teamList?: string,
    arquero?: Player,
    defensor1?: Player,
    defensor2?: Player,
    defensor3?: Player,
    defensor4?: Player,
    mediocampista1?: Player,
    mediocampista2?: Player,
    mediocampista3?: Player,
    delantero1?: Player,
    delantero2?: Player,
    delantero3?: Player
    },
    formacion?: string,
    suplente?: [{
        _id?: string,
        firstName?: string
    }],
    titular?: [{
        _id?: string,
        firstName?: string
    }]
    typeAlineacion: number,
    shirtColor?: string | null;
    alternativeShirtColor?: string | null;
    belongToTournament?: any,
    players?: Player[]
    nameList: string,
    pictureAccept?: boolean,
    status?: string,
    teamPicture: string,
    deudas?: Array<{
        _id?: string;
        belongTournament?: {
        _id?: string;
        nameFantasy?: string;
        };
        belongToList: {
        _id?: string;
        nameList?: string;
        };
        amount: number;
      }> | []; // Permitir que sea undefine
    hasShirtTitular?: boolean,
    hasShirtSuplente?: boolean,
    monto?: number,
    tournamentRegistration?: Tournament,
    pagoFinal?: number
    listActive?: boolean,
    preferences?: number[][]

}