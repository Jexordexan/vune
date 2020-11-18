jest.mock('../src/util/logger');

import { reactive } from 'vue';
import { guard } from '../src/state';
import logger from '../src/util/logger';
import setNodeEnv from './util/setNodeEnv';

describe('state', () => {
  setNodeEnv('development');
  it('creates a reactive state', () => {
    const state = reactive({ text: 'hello' });
    guard(state);
    state.text = 'goodbye';
    expect(logger.log).toBeCalled();
  });

  it('responds to add mutation', () => {
    const state = reactive({ greetings: ['hello'] });
    guard(state);
    state.greetings.push('hi');
    expect(logger.log).toBeCalled();
  });
});
