import React from 'react';
import Router from 'react-router/MemoryRouter';
import { renderToString } from 'react-dom/server';
import { MatchWhenAuthorized, RedirectWhenAuthorized } from 'utils/router';

describe('utils/MatchWhenAuthorized', () => {
  it('should redirect for unauthenticated access', () => {
    const render = renderToString(
      <Router intialEntries={[{ pathname: '/private' }]}>
        <MatchWhenAuthorized
          exactly={true}
          pattern="/private"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated={false}
        />
      </Router>);

    expect(render).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const render = renderToString(
      <Router intialEntries={[{ pathname: 'private' }]}>
        <MatchWhenAuthorized
          exactly={true}
          pattern="/private"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated={true}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });
});

describe('utils/RedirectWhenAuthorized', () => {
  it('should render the Login component for unauthenticated access', () => {
    const render = renderToString(
      <Router intialEntries={['/']}>
        <RedirectWhenAuthorized
          exactly={true}
          pattern="/login"
          component={() => (<div>LOGIN</div>)}
          isAuthenticated={false}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });

  it('should redirect to /private for authenticated access', () => {
    const render = renderToString(
      <Router intialEntries={['/']}>
        <RedirectWhenAuthorized
          exactly={true}
          pattern="/login"
          component={() => (<div>LOGIN</div>)}
          isAuthenticated={true}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });
});
