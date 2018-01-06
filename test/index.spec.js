import { init } from 'index';
import { ActionTypes, XHR } from 'constants/index';

describe('index/init', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should initiate the app', () => {
    init.run().then(environment => {
      expect(environment).toBe('production');
    });
  });
});

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
