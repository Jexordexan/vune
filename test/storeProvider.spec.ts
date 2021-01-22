import { inject, provide } from 'vue';
import { createStore, module } from '../src';
import { storeProvider } from '../src/storeProvider';

jest.mock('vue', () => {
  return {
    ...jest.requireActual('vue'),
    inject: jest.fn(),
    provide: jest.fn(),
  };
});

describe('storeProvider', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {},
      init() {
        return {};
      },
    });
  });
  it('should call inject', () => {
    const ret = storeProvider(store);
    ret.useStore();
    expect(inject).toHaveBeenCalledWith(store.$injectKey);
  });
  it('should return an object with different functions', () => {
    const ret = storeProvider(store);
    ret.provideStore();
    expect(provide).toHaveBeenCalledWith(store.$injectKey, store);
  });
});
