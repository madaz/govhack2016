import * as React from 'react';
import {connect} from 'react-redux';

import {searchAsync} from '../store';
import {Criteria} from '../components';  


const mapStateToProps = ({regions, industries}) =>
    ({
      regions,
      industries
    });

const mapDispatchToProps =
  (dispatch) =>
    ({
      search(criteria) {
        dispatch(searchAsync(criteria));
      },
    });

const App = ({
  regions,
  search,
  industries,
}) => (
  <div className="container">
    <Criteria
      regions={regions}
      industries={industries}
      onSearchClick={search}
    />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);