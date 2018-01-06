import xhrMock from 'xhr-mock';

import { request } from 'modules/client';

describe('utils/api', () => {
  beforeEach(() => {
    xhrMock.setup();
  });

  it('should fail without param', () => {
    expect(() => request()).toThrow('Error! You must pass `url`');
  });

  it('should execute a GET successfully with json', done => {
    xhrMock.get('/token', (req, res) =>
      res
        .status(200)
        .header('Content-Type', 'application/json')
        .body({ hello: 'world' })
    );

    request({ url: '/token' })
      .then(ajax => {
        expect(ajax.response).toMatchSnapshot();
        done();
      });
  });

  it('should execute a POST successfully', done => {
    xhrMock.post('/token', (req, res) =>
      res
        .status(201)
        .body('ok')
    );

    request({ url: '/token', method: 'POST', payload: { a: 1 } })
      .then(data => {
        expect(data.response).toMatchSnapshot();
        done();
      });
  });

  it('should fail to a PUT without payload', () => {
    expect(() => request({ url: '/token', method: 'PUT' }))
      .toThrow('Error! You must pass `payload`');
  });

  it('should reject for a server error with JSON response', done => {
    xhrMock.get('token', (req, res) =>
      res
        .status(500)
        .header('Content-Type', 'application/json')
        .body({ error: 'FAILED' })
    );

    request({ url: '/token' })
      .catch(error => {
        expect({
          error: true,
          message: error.xhr.response,
          status: error.status,
        }).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a server error with no response', done => {
    xhrMock.get('token', (req, res) =>
      res.status(500)
    );

    request({ url: '/token' })
      .catch(error => {
        expect({
          error: true,
          status: error.status,
        }).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a not found error', done => {
    xhrMock.get('token', (req, res) =>
      res
        .status(404)
        .header('Content-Type', 'application/json')
        .body({ error: 'NOT FOUND' })
    );

    request({ url: '/token' })
      .catch(error => {
        expect({
          error: true,
          message: error.xhr.response,
          status: error.status,
        }).toMatchSnapshot();
        done();
      });
  });
});
