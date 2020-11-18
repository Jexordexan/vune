import { subscriptions, actionSubscriptions } from './globals';
import { MutationObject, SubscribeOptions, Listener } from './types';

export const subscriber = <T extends object>(state: T) => (
  listener: (mutation: MutationObject, state: T) => void
): (() => void) => {
  if (subscriptions.has(state)) {
    subscriptions.get(state)!.push(listener);
  } else {
    subscriptions.set(state, [listener]);
  }
  return function unsubscribe() {
    if (subscriptions.has(state)) {
      const list = subscriptions.get(state)!.filter((l: Function) => l !== listener);
      subscriptions.set(state, list);
    }
  };
};

export const actionSubscriber = <T extends object>(state: T) => <T extends object>(
  listener: SubscribeOptions<T>
): (() => void) => {
  if (!listener) return () => {};

  let subscriptionSet = {
    before: [] as Listener<any>[],
    after: [] as Listener<any>[],
  };

  if (actionSubscriptions.has(state)) {
    subscriptionSet = actionSubscriptions.get(state)!;
  } else {
    actionSubscriptions.set(state, subscriptionSet);
  }

  if (typeof listener === 'object') {
    if (listener.before) subscriptionSet.before.push(listener.before);
    if (listener.after) subscriptionSet.after.push(listener.after);

    return () => {
      subscriptionSet.before = subscriptionSet.before.filter((fn) => fn !== listener.before);
      subscriptionSet.after = subscriptionSet.after.filter((fn) => fn !== listener.after);
    };
  }

  subscriptionSet.before.push(listener);
  return () => {
    subscriptionSet.before = subscriptionSet.before.filter((fn) => fn !== listener);
  };
};
