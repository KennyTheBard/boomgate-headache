import { Zone } from "./Zone";


export type RealEvent = {
    plate: string;
    gateEvents: RealGateEvent[];
}

export type RealGateEvent = {
    from: Zone;
    to: Zone;
    at: Date;
}