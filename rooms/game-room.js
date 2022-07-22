"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const state_1 = require("../state");
const schema_1 = require("@colyseus/schema");
class GameRoom extends colyseus_1.Room {
    onEntityUpdate(client, updateData) {
        updateData.networkId = client.id;
        updateData.target = { except: client };
        // console.log(updateData);
        this.broadcast("onEntityUpdate", updateData, updateData.target == 0 ? {} : { except: client });
        // console.log("entity update ", client.id ," update data ", updateData)
    }
    onCreate(options) {
        console.log('Room created!');
        this.maxClients = 5;
        let roomState = new state_1.RoomState();
        roomState.networkedEntities = new schema_1.MapSchema();
        this.setState(roomState);
        this.onMessage("entityUpdate", (client, entityUpdateArray) => {
            //if (this.state.networkedEntities.has(`${entityUpdateArray[0]}`) === false) return;
            this.onEntityUpdate(client, entityUpdateArray);
        });
    }
    onJoin(client, options, auth) {
        console.log('Client joined', client.sessionId);
        //every user is a network entity too, therefore create entity
        let newEntity = new state_1.NetworkedEntity();
        newEntity.id = client.id;
        newEntity.sessionId = client.sessionId;
        newEntity.xPos = 0;
        newEntity.yPos = 0;
        newEntity.zPos = 0;
        this.state.networkedEntities.set(client.id, newEntity);
    }
    onLeave(client, consented) {
        console.log('Client left', client.sessionId);
        this.state.networkedEntities.delete(client.id);
    }
    onDispose() {
        console.log('Room disposed');
    }
}
exports.GameRoom = GameRoom;
