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

          const mod2 = module('mod2', {
            state: {
              foo: 2,
            },
            async init(state) {
              await Promise.resolve();
              return {
                state,
                async: true,
              };
            },
          });

          return {
            mod1,
            mod2,
          };
        },
      });
    });

    it('should add state to top level sate', () => {
      expect(store.$state.foo).toBe(1);
      expect(store.$state.mod1.foo).toBe(2);
    });

    it('should create an async module', async () => {
      expect(store.$state.mod2.foo).toBe(2);
      const mod2 = await store.mod2;
      expect(mod2.state.foo).toBe(2);
      expect(mod2.async).toBe(true);
    });
  });

  describe('nested async modules', () => {
    it('should not throw an error if module registered before await', async () => {
      const store = createStore({
        state: {},
        async init() {
          expect(() => {
            module('mod3', {
              state: {},
              init() {
                return {};
              },
            });
          }).not.toThrowError();
          await Promise.resolve();
          return {};
        },
      });

      await store;
    });

    it('should throw an error if module registered after await', async () => {
      const store = createStore({
        state: {},
        async init() {
          await Promise.resolve();
          expect(() => {
            module('mod3', {
              state: {},
              init() {
                return {};
              },
            });
          }).toThrowError();
          return {};
        },
      });

      await store;
    });
  });
});
