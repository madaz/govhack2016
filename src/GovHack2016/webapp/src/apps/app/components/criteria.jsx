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
    let { action, role, industry, region } = this.state;

    if (action === MOVE_TO) {
      industry = "";
    } else {
      region = "";
    }

    this.props.onSearchClick({
      role,
      action,
      region,
      industry,
    });
  },

  render() {
    const { regions, industries } = this.props;
    const { action, role, industry, region } = this.state;

    const regionStyle = action === MOVE_TO ? {} : { display: 'none' };
    const industryStyle = action === WORK_IN ? {} : { display: 'none' };

    const searchEnabled = role && action && ((action === MOVE_TO && region) || (action === WORK_IN && industry))
      ? {} : {disabled: true};

    return (
      <form className={"form-criteria m-b-1"}>
        <fieldset className="form-group">
          <legend>Question?</legend>
          <div>
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
              {regions.Codes.filter(x => x.value.length > 4).map((region) => <option key={region.value} value={region.value}>{region.description}</option>)}
            </select>

            <select
              ref={e => this._industry = e}
              style={industryStyle}
              onChange={this.handleChangeIndustry}
            >
              <option></option>
              {industries.Codes.map((industry) => <option key={industry.value} value={industry.value}>{industry.description}</option>)}
            </select>  
          </div>        
        </fieldset>

        <button type="button" className="btn btn-primary" {...searchEnabled} onClick={this.handleSearchClick}>Search</button>
      </form>
    );
  }
});

export default Criteria;
