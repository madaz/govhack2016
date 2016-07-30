import * as React from 'react';
import {connect} from 'react-redux';

import {searchAsync} from '../store';
import {Criteria} from '../components';  


const mapStateToProps = ({regions}) =>
    ({
      regions
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
  search
}) => (
  <div className="container">
    <Criteria
      regions={regions}
      onSearchClick={search}
    />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);