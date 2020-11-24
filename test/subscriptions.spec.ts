import { module, action, mutation, createStore } from '../src';

describe('subscribe', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {},
      init() {
        const mutation1 = mutation(() => {});
        const mutation2 = mutation('explicit', () => {});

        const nested = module('nested', {
          state: {},
          init() {
            return {
              mutation3: mutation(() => {}),
            };
          },
        });

        return {
          mutation1,
          mutation2,
          nested,
        };
      },
    });
  });

  describe('synchronous mutation', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
    });

    it('triggers the spy', () => {
      store.$subscribe(spy);
      store.mutation1();
      expect(spy).toBeCalled();
    });
  });

  describe('unsubscribe', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
    });

    it('successfully unsubscribes the spy', () => {
      const unsubscribe = store.$subscribe(spy);
      store.mutation1();
      expect(spy).toBeCalled();
      spy.mockClear();
      unsubscribe();
      store.mutation1();
      expect(spy).not.toBeCalled();
    });
  });
});

describe('subscribeAction', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {},
      init() {
        const demo1 = action(() => {});
        const demo2 = action('explicit', () => {});
        const asyncDemo = action('async', () => Promise.resolve());

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
          asyncDemo,
          nested,
        };
      },
    });
  });

  describe('synchronous action', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
    });

    it('triggers the spy with demo1', () => {
      store.$subscribeAction(spy);
      store.demo1();
      expect(spy).toBeCalledWith(
        {
          type: 'demo1',
          path: '',
          payload: undefined,
        },
        store.$state
      );
    });

    it('triggers the spy with demo2', () => {
      store.$subscribeAction(spy);
      store.demo2('payload');
      expect(spy).toBeCalledWith(
        {
          type: 'explicit',
          path: '',
          payload: 'payload',
        },
        store.$state
      );
    });

    it('triggers the spy with demo3', () => {
      store.$subscribeAction(spy);
      store.nested.demo3('payload');
      expect(spy).toBeCalledWith(
        {
          type: 'demo3',
          path: 'nested',
          payload: 'payload',
        },
        store.$state.nested
      );
    });
  });

  describe('asynchronous action', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
    });

    test('with before hook', () => {
      store.$subscribeAction(spy);
      store.asyncDemo();
      expect(spy).toBeCalledWith(
        {
          type: 'async',
          path: '',
          payload: undefined,
        },
        store.$state
      );
    });

    test('with before and after hook', async () => {
      const afterSpy = jest.fn();
      store.$subscribeAction({ before: spy, after: afterSpy });
      await store.asyncDemo(1);
      expect(spy).toBeCalledWith(
        {
          type: 'async',
          path: '',
          payload: 1,
        },
        store.$state
      );
      expect(afterSpy).toBeCalledWith(
        {
          type: 'async',
          path: '',
          payload: 1,
        },
        store.$state
      );
    });
  });

  describe('unsubscribe', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
    });

    test('successfully unsubscribes', async () => {
      const afterSpy = jest.fn();
      const unsubscribe = store.$subscribeAction({ before: spy, after: afterSpy });
      await store.asyncDemo(1);
      expect(spy).toBeCalled();
      expect(afterSpy).toBeCalled();

      unsubscribe();
      await store.asyncDemo(2);
      spy.mockClear();
      afterSpy.mockClear();
      expect(spy).not.toBeCalled();
      expect(afterSpy).not.toBeCalled();
    });
  });
});
