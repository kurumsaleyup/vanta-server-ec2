"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.NetworkedEntity = void 0;
const schema_1 = require("@colyseus/schema");
class NetworkedEntity extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.timestamp = -1;
    }
}
__decorate([
    schema_1.type("string")
], NetworkedEntity.prototype, "id", void 0);
__decorate([
    schema_1.type("string")
], NetworkedEntity.prototype, "sessionId", void 0);
__decorate([
    schema_1.type("number")
], NetworkedEntity.prototype, "xPos", void 0);
__decorate([
    schema_1.type("number")
], NetworkedEntity.prototype, "yPos", void 0);
__decorate([
    schema_1.type("number")
], NetworkedEntity.prototype, "zPos", void 0);
__decorate([
    schema_1.type("number")
], NetworkedEntity.prototype, "timestamp", void 0);
exports.NetworkedEntity = NetworkedEntity;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.networkedEntities = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type({ map: NetworkedEntity })
], RoomState.prototype, "networkedEntities", void 0);
exports.RoomState = RoomState;
// npx schema-codegen ./src/state.ts --csharp --output ../../  use this on terminal to generate classes in C#
