import React from 'react';
import { renderToString } from 'react-dom/server';
import { MatchWhenAuthorized, RedirectWhenAuthorized } from 'utils/router';

describe('utils/MatchWhenAuthorized', () => {
  it('should prevent navigation for unauthenticated access', () => {
    const render = renderToString(<MatchWhenAuthorized
      exactly={true}
      pattern="/private"
      location={{ pathname: '/private' }}
      component={() => (<div className="private" />)}
      isAuthenticated={false} />);

    expect(render).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const render = renderToString(<MatchWhenAuthorized
      exactly={true}
      pattern="/private"
      location={{ pathname: '/private' }}
      component={() => (<div className="private" />)}
      isAuthenticated={true} />);

    expect(render).toMatchSnapshot();
  });
});

describe('utils/RedirectWhenAuthorized', () => {
  it('should render the Login component for unauthenticated access', () => {
    const render = renderToString(<RedirectWhenAuthorized
      exactly={true}
      pattern="/login"
      location={{ pathname: '/login' }}
      component={() => (<div className="login" />)}
      isAuthenticated={false} />);

    expect(render).toMatchSnapshot();
  });

  it('should redirect to /private for authenticated access', () => {
    const render = renderToString(<RedirectWhenAuthorized
      exactly={true}
      pattern="/login"
      location={{ pathname: '/login' }}
      component={() => (<div className="login" />)}
      isAuthenticated={true} />);

    expect(render).toMatchSnapshot();
  });
});
