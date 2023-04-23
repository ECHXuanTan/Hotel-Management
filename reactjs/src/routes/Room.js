import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Room/ManageSchedule";
import Header from "../containers/Header/Header";
import ManageCustomer from "../containers/System/Room/ManageCustomer";
class Room extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-list">
          <Switch>
            <Route path="/room/manage-schedule" component={ManageSchedule} />
            <Route path="/room/manage-customer" component={ManageCustomer} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
