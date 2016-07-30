import React from 'react';
import {connect} from 'react-redux';

const ResultsGraph = ({results, loading}) => {
  if (loading) {
    return (<div><i className={"fa fa-spinner fa-spin fa-fw"}></i> searching...</div>);
  }
  if (!results) {
    return null;
  }


  console.log(results["message:CompactData"]["ABS:DataSet"]);

  return (<div>{results.length}</div>);
};

const mapStateToProps = ({results, loading}) => ({results, loading});

const ResultsContainer = ({results, loading}) => (
  <div>
    <ResultsGraph results={results} loading={loading} />
  </div>
);

export default connect(mapStateToProps)(ResultsContainer);