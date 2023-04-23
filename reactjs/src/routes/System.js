import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageRoom from "../containers/System/Admin/ManageRoom";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageHotel from "../containers/System/Hotel/ManageHotel";
import ManageSchedule from "../containers/System/Room/ManageSchedule";
import ManageCustomer from "../containers/System/Room/ManageCustomer";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-room" component={ManageRoom} />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-hotel" component={ManageHotel} />
              <Route path="/room/manage-schedule" component={ManageSchedule} />
              <Route path="/room/manage-customer" component={ManageCustomer} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
