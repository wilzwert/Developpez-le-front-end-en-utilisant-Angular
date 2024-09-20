/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import { Participation } from "./Participation.interface";

export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}
