import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'vendor/rxjs';

Enzyme.configure({ adapter: new Adapter() });

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

const consoleError = console.error;
console.error = jest.fn(message => {
  const skipMessages = [
    'redux-persist failed to create sync storage.',
  ];
  let shouldSkip = false;

  for (const s of skipMessages) {
    if (message.includes(s)) {
      shouldSkip = true;
    }
  }

  if (!shouldSkip) {
    consoleError(message);
  }
});

global.navigate = (options) => {
  const { pathname = location.pathname, search, hash } = options;
  let url = `${location.protocol}//${location.host}${pathname}`;

  if (search) {
    url += `?${search}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  jsdom.reconfigure({ url });
};
