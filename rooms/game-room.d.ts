import { Client, Room } from "colyseus";
import { RoomState } from "../state";
export declare class GameRoom extends Room<RoomState> {
    onEntityUpdate(client: Client, updateData: any): void;
    onCreate(options: any): void | Promise<any>;
    onJoin(client: Client, options?: any, auth?: any): void | Promise<any>;
    onLeave(client: Client, consented?: boolean): void | Promise<any>;
    onDispose(): void | Promise<any>;
}
