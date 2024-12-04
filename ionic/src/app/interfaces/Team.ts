import { Deuda } from "./Deudas"
import { List } from "./List"
import { Player } from "./Player"

export interface Team {
    _id?: any,
    teamName: String,
    teamNotes: String,
    socialMedia: String,
    teamList?: List,
    teamImage?:String,
    players?: Player[],
    pictureAccept?: boolean,
    status?: string,
    active: boolean,
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
}