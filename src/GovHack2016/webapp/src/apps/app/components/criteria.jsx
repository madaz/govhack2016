import React from 'react';

const WORK_IN = "work in";
const MOVE_TO = "move to";

const roles = [
  "Job Seeker",
  "School Leaver",
  "Re-Skiller",
];

const actions = [
  MOVE_TO,
  WORK_IN,
];

const industries = [
  "Mining",
];

const Criteria = React.createClass({
  getInitialState() {
    return {
      role: null,
      action: null,
      region: null,
      industry: null,
    };
  },

  handleChangeRole() {
    this.setState({
      role: this._role.value,
    });
  },

  handleChangeAction() {
    this.setState({
      action: this._action.value,
    });
  },

  handleChangeIndustry() {
    this.setState({
      industry: this._industry.value,
    });
  },

  handleChangeRegion() {
    this.setState({
      region: this._region.value,
    });
  },  

  handleSearchClick() {
    const { action, role, industry, region } = this.state;
    this.props.onSearchClick({
      role,
      action,
      region,
      industry,
    });
  },

  render() {
    const { regions } = this.props;
    const { action, role, industry, region } = this.state;

    const regionStyle = action === MOVE_TO ? {} : { display: 'none' };
    const industryStyle = action === WORK_IN ? {} : { display: 'none' };

    const searchEnabled = role && action && ((action === MOVE_TO && region) || (action === WORK_IN && industry))
      ? {} : {disabled: true};


    return (
      <form>
        <div className="form-group">
          <span>I am a</span>
          <select
            ref={e => this._role = e}
            onChange={this.handleChangeRole}
          >
            <option></option>
            {roles.map((role) => <option key={role}>{role}</option>)}
          </select>
          <span>and would like to</span>
          <select
            ref={e => this._action = e}
            onChange={this.handleChangeAction}
          >
            <option></option>
            {actions.map((action) => <option key={action}>{action}</option>)}
          </select>

          <select ref={e => this._region = e}
            style={regionStyle}
            onChange={this.handleChangeRegion}
          >
            <option></option>
            {regions.map((region) => <option key={region}>{region}</option>)}
          </select>

          <select
            ref={e => this._industry = e}
            style={industryStyle}
            onChange={this.handleChangeIndustry}
          >
            <option></option>
            {industries.map((industry) => <option key={industry}>{industry}</option>)}
          </select>          
        </div>

        <button type="button" className="btn btn-primary" {...searchEnabled} onClick={this.handleSearchClick}>Search</button>
      </form>
    );
  }
});

export default Criteria;
