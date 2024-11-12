import { List } from "./List";
import { Tournament } from "./Tournament";

export interface Deuda {
    _id: string,
    belongTournament?: Tournament,
    belongToList?: List,
    amount: number,
    paid: number
}