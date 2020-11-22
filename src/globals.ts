import { ActionObject, Listener, MutationObject } from './types';

// Globals
let actionId = 0;
let currentMutation: MutationObject | null = null;
let currentActions: Map<number, ActionObject> = new Map();
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

export const getCurrentActions = () => currentActions;
export const setActionStarted = (action: ActionObject) => {
  const id = actionId++;
  currentActions.set(actionId, action);
  return () => {
    setActionStopped(id);
  };
};
export const setActionStopped = (actionId: number) => {
  currentActions.delete(actionId);
};

export const getCurrentMutation = () => currentMutation;
export const setCurrentMutation = (mutation: MutationObject | null) => {
  currentMutation = mutation;
};

export const getIsInitializing = () => isInitializing;
export const setIsInitializing = (val: boolean) => {
  isInitializing = val;
};
