import { Schema, type, MapSchema } from "@colyseus/schema";

export class NetworkedEntity extends Schema {
    @type("string") id: string;
    @type("string") sessionId: string;
    @type("number") xPos: number = 0;
    @type("number") yPos: number = 0;
    @type("number") zPos: number = 0;
    @type("number") timestamp: number = -1;
}

export class RoomState extends Schema {
    @type({ map: NetworkedEntity }) networkedEntities = new MapSchema<NetworkedEntity>();
}

// npx schema-codegen ./src/state.ts --csharp --output ../../  use this on terminal to generate classes in C#