import 'vendor/rxjs';

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'http://localhost:3000/',
});

Object.defineProperty(window.location, 'pathname', {
  writable: true,
  value: '/',
});

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

const consoleError = console.error;
console.error = jest.fn(message => {
  const skipMessages = [
    'Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.',
    'React.createClass is deprecated',
    'Shallow renderer has been moved',
    'ReactTestUtils has been moved to react-dom/test-utils',
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

window.matchMedia = () =>
  ({
    matches: false,
    addListener: () => {
    },
    removeListener: () => {
    },
  });
