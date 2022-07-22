import {Client, Room} from "colyseus";
import {RoomState, NetworkedEntity} from "./state";
import {MapSchema} from "@colyseus/schema";

export class GameRoom extends Room<RoomState> {

    onEntityUpdate(client: Client, updateData: any) {
        updateData.networkId = client.id;
        updateData.target = {except: client};
        console.log(updateData);
        this.broadcast("onEntityUpdate", updateData, updateData.target == 0 ? {} : {except: client});
        // console.log("entity update ", client.id ," update data ", updateData)
    }

    onCreate(options: any): void | Promise<any> {
        console.log('Room created!')

        this.maxClients = 5;
        let roomState = new RoomState();
        roomState.networkedEntities = new MapSchema<NetworkedEntity>();
        this.setState(roomState);

        this.onMessage("entityUpdate", (client, entityUpdateArray) => {
            //if (this.state.networkedEntities.has(`${entityUpdateArray[0]}`) === false) return;

            this.onEntityUpdate(client, entityUpdateArray);
        });

    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        console.log('Client joined', client.sessionId);

        //every user is a network entity too, therefore create entity
        let newEntity = new NetworkedEntity();
        newEntity.id = client.id;
        newEntity.sessionId = client.sessionId;
        newEntity.xPos = 0;
        newEntity.yPos = 0;
        newEntity.zPos = 0;
        this.state.networkedEntities.set(client.id, newEntity);
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log('Client left', client.sessionId);
        this.state.networkedEntities.delete(client.id);
    }

    onDispose(): void | Promise<any> {
        console.log('Room disposed')
    }
}