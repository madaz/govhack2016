import * as React from 'react';
import {connect} from 'react-redux';

import {updateFoo, updateFooAsync, getValuesAsync} from '../store';
import {Foo} from '../components';  


const mapStateToProps = ({foo, values}) =>
    ({
      foo,
      values
    });

const mapDispatchToProps =
  (dispatch) =>
    ({
      changeName() {
        dispatch(updateFoo({name: 'xyz'}));
      },
      changeNameAsync() {
        dispatch(updateFooAsync({name: 'Mr Async (Thunk)'}));
      },
      getValues() {
        dispatch(getValuesAsync());
      },
    });

const App = ({
  foo,
  values,
  changeName,
  changeNameAsync,
  getValues
}) => (
  <div>
    <Foo name={foo.name} />
    <button
      type="button"
      onClick={changeName}
    >Update Name</button>
    <button
      type="button"
      onClick={changeNameAsync}
    >Update Name Async</button>
    <button
      type="button"
      onClick={getValues}
    >Get Values</button>
    <ul>
      {values.map((value) => 
        (<span key={value}>{value}</span>)
      )}
    </ul>
   
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);