import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { ActionTypes } from 'constants/index';
import { fetchPopularRepos } from 'actions';

import Loader from 'components/Loader';

export class Private extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

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
      html: (<div className="app__cancel">
        <a
          href="#cancel"
          className="btn btn-primary btn-sm btn-icon btn-icon--lg"
          onClick={this.handleClickCancel}
        >
          <i className="i-times-circle" />
          <span>Cancel</span>
        </a>
      </div>),
      loader: (<Loader />),
    };

    if (popularRepos.isReady && !popularRepos.isLoading) {
      output.loader = undefined;

      output.html = (
        <div className="app__private__repos">
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
      <div key="Private" className="app__private app__route">
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

export default connect(mapStateToProps)(Private);
