import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import RouteWhenAuthorized from 'modules/RouteWhenAuthorized';

describe('utils/RouteWhenAuthorized', () => {
  it('should redirect for unauthenticated access', () => {
    const render = renderToString(
      <Router location="/private">
        <RouteWhenAuthorized
          exact
          pattern="/private"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated={false}
        />
      </Router>);

    expect(render).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const render = renderToString(
      <Router location="/private">
        <RouteWhenAuthorized
          exact
          pattern="/private"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated={true}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });
});
