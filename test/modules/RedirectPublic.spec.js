import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import RedirectPublic from 'modules/RedirectPublic';

describe('utils/RedirectPublic', () => {
  it('should render the Login component for unauthenticated access', () => {
    const render = renderToString(
      <Router location="/login">
        <RedirectPublic
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
        <RedirectPublic
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
