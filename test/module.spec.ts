import { createStore, module } from '../src';

describe('module', () => {
  it('should throw error if outside of initialization', () => {
    expect(() => {
      module('test', {
        state: {
          foo: 1,
        },
        init: (state) => state,
      });
    }).toThrowError();
  });

  it('should throw an error if the state is already used', () => {
    expect(() => {
      createStore({
        state: {
          foo: 1,
        },
        init() {
          const mod = module('foo', {
            state: {},
            init: (s) => s,
          });
          return {
            mod,
          };
        },
      });
    }).toThrowError();
  });

  describe('with store', () => {
    let store: any;

    beforeEach(() => {
      store = createStore({
        state: {
          foo: 1,
        },
        init() {
          const mod1 = module('mod1', {
            state: {
              foo: 2,
            },
            init() {
              return {};
            },
          });

          return {
            mod1,
          };
        },
      });
    });

    it('should add state to top level sate', () => {
      expect(store.state.foo).toBe(1);
      expect(store.state.mod1.foo).toBe(2);
    });
  });
});
