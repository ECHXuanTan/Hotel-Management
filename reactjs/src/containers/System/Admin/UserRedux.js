import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions/index";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import CommonUtils from "../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "",
      roleId: "",
      phoneNumber: "",
      position: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didUpdate
    // hiện tại (this) là component đang render và quá khứ (prevProps, prevState) là component đã render trước đó
    // snapshot là giá trị trả về của render()
    //[] [3]
    //[3] [3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    //update state
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        phoneNumber:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        position: "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state;
    //Create user action
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux action
      this.props.createdNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    //Edit user action
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux action
      this.props.createdNewUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "PASSWORD",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(`${arrCheck[i]} is required`);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
      position,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Quản lý Admin</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isGetGenders === true ? "Loading genders" : " "}
              </div>
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => this.onChangeInput(event, "email")}
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={password}
                      onChange={(event) =>
                        this.onChangeInput(event, "password")
                      }
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputFirstName">
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputFirstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputLastName">
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputLastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, "lastName")
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div class="form-group col-md-4">
                    <label for="inputPhoneNumber">
                      <FormattedMessage id="manage-user.phoneNumber" />
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPhoneNumber"
                      placeholder="0123456789"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.onChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div class="form-group col-md-8">
                    <label for="inputAddress">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      value={address}
                      onChange={(event) => this.onChangeInput(event, "address")}
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label for="inputGender">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      id="inputGender"
                      class="form-control"
                      value={gender}
                      onChange={(event) => {
                        this.onChangeInput(event, "gender");
                      }}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {" "}
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputGender">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="inputPosition"
                      class="form-control"
                      value={position}
                      onChange={(event) => {
                        this.onChangeInput(event, "position");
                      }}
                    >
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputGender">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      id="inputRole"
                      class="form-control"
                      value={role}
                      onChange={(event) => {
                        this.onChangeInput(event, "role");
                      }}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputImage">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div className="preview-img-container">
                      <input
                        id="previewImg"
                        type="file"
                        hidden
                        onChange={(event) => this.handleOnchangeImage(event)}
                      />
                      <label className="label-upload" htmlFor="previewImg">
                        <FormattedMessage id="manage-user.imageUpload" />
                        <i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-image"
                        style={{
                          backgroundImage: `url(${this.state.previewImgURL})`,
                        }}
                        onClick={() => this.openPreviewImage()}
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    type="submit"
                    class={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 mb-5">
          <TableManageUser
            handleEditUserFromParentKey={this.handleEditUserFromParent}
            action={this.state.action}
          />
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fire event
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createdNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
