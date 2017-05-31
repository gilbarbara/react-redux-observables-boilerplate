import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import RedirectProtected from 'modules/RedirectProtected';

describe('utils/RedirectProtected', () => {
  it('should redirect for unauthenticated access', () => {
    const render = renderToString(
      <Router location="/private">
        <RedirectProtected
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
        <RedirectProtected
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
