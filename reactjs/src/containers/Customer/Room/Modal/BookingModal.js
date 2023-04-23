import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileRoom from "../ProfileRoom";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postCustomerBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      number: "",
      birthday: "",
      selectedGender: "",
      roomId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let roomId = this.props.dataTime.roomId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          roomId: roomId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd-DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd-MM/DD/YYYY");

      return `${date} - ${time}`;
    }
  };

  buildRoomName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.roomData.lastName} ${dataTime.roomData.firstName}`
          : `${dataTime.roomData.firstName} ${dataTime.roomData.lastName}`;
      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    this.setState({
      isShowLoading: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let roomName = this.buildRoomName(this.props.dataTime);
    let res = await postCustomerBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      number: this.state.number,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      roomId: this.state.roomId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      roomName: roomName,
    });
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new room successfully");
      this.props.closeBookingClose();
    } else {
      toast.error("Booking a new room failed");
    }
  };
  render() {
    let { isOpenModal, closeBookingClose, dataTime } = this.props;
    let roomId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      roomId = dataTime.roomId;
    }
    console.log("data", dataTime);
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="customer.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="room-infor">
                <ProfileRoom
                  roomId={roomId}
                  isShowDescriptionRoom={false}
                  dataTime={dataTime}
                  isShowLinkDetail={false}
                  isShowPrice={true}
                />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.fullName" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "fullName")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "address")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.number" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.number}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "number")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleOnchangeDatePicker}
                    value={this.state.birthday}
                  ></DatePicker>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="customer.booking-modal.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="customer.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingClose}
              >
                <FormattedMessage id="customer.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fire event
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
