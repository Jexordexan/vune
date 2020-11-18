import { Listener, MutationObject } from './types';

// Globals
let currentMutation: MutationObject | null = null;
let isInitializing = false;
export const stateStack: any[] = [];
export const modulePath: string[] = [];
export const states = new WeakSet();
export const subscriptions = new WeakMap<Object, Listener<any>[]>();
export const actionSubscriptions = new WeakMap<
  Object,
  {
    before: Listener<any>[];
    after: Listener<any>[];
  }
>();

export const getCurrentState = () => stateStack[stateStack.length - 1];
export const getRootState = () => stateStack[0];

export const getCurrentMutation = () => currentMutation;
export const setCurrentMutation = (mutation: MutationObject | null) => {
  currentMutation = mutation;
};

export const getIsInitializing = () => isInitializing;
export const setIsInitializing = (val: boolean) => {
  isInitializing = val;
};
