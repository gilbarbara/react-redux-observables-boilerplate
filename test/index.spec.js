import 'index';
import { ActionTypes, XHR } from 'constants/index';

describe('Constants:ActionTypes', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
  });
});

describe('Constants:XHR', () => {
  it('should match the snapshot', () => {
    expect(XHR).toMatchSnapshot();
  });
});
