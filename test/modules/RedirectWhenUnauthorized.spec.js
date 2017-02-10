import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import RedirectWhenUnauthorized from 'modules/RedirectWhenUnauthorized';

describe('utils/RedirectWhenUnauthorized', () => {
  it('should render the Login component for unauthenticated access', () => {
    const render = renderToString(
      <Router location="/login">
        <RedirectWhenUnauthorized
          exact
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
      <Router location="/login">
        <RedirectWhenUnauthorized
          exact
          pattern="/login"
          component={() => (<div>LOGIN</div>)}
          isAuthenticated={true}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });
});
