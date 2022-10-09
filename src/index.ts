import { proxy, useSnapshot } from "valtio";

export function useLiveState(channel: Object) {
  const stateProxy = channel.liveStateProxy || proxy({});
  channel.liveStateProxy = stateProxy;

  channel.on("state:change", (payload: { state: Object }) => {
    Object.assign(stateProxy, payload.state);
  });

  const pushFn = (evt: String, payload: Object) =>
    channel.push(`lvs_evt:${evt}`, payload);

  const state = useSnapshot(stateProxy);
  return [pushFn, state];
}
