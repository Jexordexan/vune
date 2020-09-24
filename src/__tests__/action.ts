import { action } from '../action';
import { createStore } from '../createStore';
import { ActionFunction } from '../util/types';
import { modulePath } from '../globals';
import { module } from '../module';

describe('action', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {},
      init() {
        const demo1 = action(() => {});
        const demo2 = action('explicit', () => {});

        const nested = module('nested', {
          state: {},
          init() {
            return {
              demo3: action(() => {}),
            };
          },
        });

        return {
          demo1,
          demo2,
          nested,
        };
      },
    });
  });

  describe('__action_key__', () => {
    test('default is empty string', () => {
      const _action: ActionFunction = action(() => {});
      expect(_action.__action_key__).toBe('');
    });
    test('implicit key', () => {
      expect(store.demo1.__action_key__).toBe('demo1');
    });
    test('explicit key', () => {
      expect(store.demo2.__action_key__).toBe('explicit');
    });
    test('nested key', () => {
      expect(store.nested.demo3.__action_key__).toBe('demo3');
    });
  });
});
