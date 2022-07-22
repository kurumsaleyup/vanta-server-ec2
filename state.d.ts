import { Schema, MapSchema } from "@colyseus/schema";
export declare class NetworkedEntity extends Schema {
    id: string;
    sessionId: string;
    xPos: number;
    yPos: number;
    zPos: number;
    timestamp: number;
}
export declare class RoomState extends Schema {
    networkedEntities: MapSchema<NetworkedEntity, string>;
}
