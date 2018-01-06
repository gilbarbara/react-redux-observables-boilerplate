import { createReducer } from 'modules/helpers';

describe('helpers', () => {
  describe('createReducer', () => {
    it('should return a proper object', () => {
      expect(createReducer('REQUEST')).toMatchSnapshot();
    });
  });
});

