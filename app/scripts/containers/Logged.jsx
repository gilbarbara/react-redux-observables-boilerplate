import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';

import { ActionTypes } from 'constants/index';
import { fetchPopularRepos } from 'actions';

import Loader from 'components/Loader';

export class Logged extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    github: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchPopularRepos());
  }

  @autobind
  handleClickCancel(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch({ type: ActionTypes.CANCEL_FETCH });
  }

  render() {
    const { github: { popularRepos } } = this.props;
    const output = {
      html: (<a href="#cancel" className="btn btn-primary" onClick={this.handleClickCancel}>Cancel</a>),
      loader: (<Loader />)
    };

    if (popularRepos.isReady && !popularRepos.isLoading) {
      output.loader = undefined;

      output.html = (
        <div className="app__logged__repos">
          {popularRepos.data.map(d =>
            (<div key={d.name}>
              <a href={d.html_url} target="_blank">{`${d.owner.login}/${d.name}`}</a>
              <div>{d.description}</div>
            </div>)
          )}
        </div>
      );
    }

    return (
      <div key="Logged" className="app__logged app__route">
        <div className="app__container">
          <h2>Popular Repos</h2>
          {output.loader}
          {output.html}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { github: state.github };
}

export default connect(mapStateToProps)(Logged);
