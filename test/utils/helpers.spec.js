import * as helpers from 'utils/helpers';

describe('helpers/createRequestTypes', () => {
  it('should return a proper object', () => {
    expect(helpers.createRequestTypes('REQUEST')).toMatchSnapshot();
  });
});

describe('helpers/datasetToObject', () => {
  const el = document.createElement('div');
  el.setAttribute('data-rule', 'yes');
  el.setAttribute('data-minute-maid', 'no');

  it('should convert DOMElement data to object', () => {
    expect(helpers.datasetToObject(el)).toMatchSnapshot();
  });
});
