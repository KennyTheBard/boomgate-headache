import { Zone } from "./Zone";


export type EntryEvent = {
    id: string;
    carPlate: string;
    at: Date;
    fromZone: Zone;
}