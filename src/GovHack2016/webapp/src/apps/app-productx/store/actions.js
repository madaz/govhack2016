export const ACTIONS = {
  UPDATE_FOO: 'UPDATE_FOO',
  UPDATE_VALUES: 'UPDATE_VALUES',
};

export const updateFoo = (foo) => ({
  type: ACTIONS.UPDATE_FOO,
  payload: foo,
});

export const updateFooAsync = (foo) =>
  (dispatch, getState, data) => {
    dispatch(updateFoo({name: `updating...`}));
    return data.api.getFoo(foo)
      .then((foo) => {
        dispatch(updateFoo(foo));
        return foo;
      });
  };

export const updateValues = (values) => ({
  type: ACTIONS.UPDATE_VALUES,
  values,
});

export const getValuesAsync = () =>
  (dispatch, getState, data) => {
    return data.api.getValues()
      .then((values) => {
        dispatch(updateValues(values));
        return values;
      });
  };