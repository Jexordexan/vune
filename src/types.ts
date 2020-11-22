// import { UnwrapNestedRefs } from 'vue';

import { App, InjectionKey } from 'vue';

export interface StoreOptions<State, R> {
  state: State;
  init(state: State): R;
}

export interface ModuleOptions<State, R> extends StoreOptions<State, R> {
  name?: string;
}

export type MutationFunction = {
  (payload: any): any;
  __mutation_key__?: string;
};

export type ActionFunction = {
  (...args: any[]): any;
  __action_key__?: string;
};

export type StoreModule<R> = R & {
  __module_key__?: string;
};

export type Listener<T> = (action: ActionObject, state: T) => void;
export type SubscribeOptions<T> = Listener<T> | { before: Listener<T>; after: Listener<T> };

export type Store<T, R> = R & {
  state: Readonly<T>;
  $subscribe: (cb: Listener<any>) => () => void;
  $subscribeAction: (cb: SubscribeOptions<any>) => () => void;
  $injectKey: InjectionKey<R>;
  install(app: App): void;
};

export interface MutationObject {
  type: string;
  path: string;
  payload: any;
}

export interface ActionObject extends MutationObject {}
