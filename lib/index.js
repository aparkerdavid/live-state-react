"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLiveState = void 0;
const valtio_1 = require("valtio");
function useLiveState(channel) {
    const stateProxy = channel.liveStateProxy || (0, valtio_1.proxy)({});
    channel.liveStateProxy = stateProxy;
    channel.on("state:change", (payload) => {
        Object.assign(stateProxy, payload.state);
    });
    const pushFn = (evt, payload) => channel.push(`lvs_evt:${evt}`, payload);
    const state = (0, valtio_1.useSnapshot)(stateProxy);
    return [pushFn, state];
}
exports.useLiveState = useLiveState;
