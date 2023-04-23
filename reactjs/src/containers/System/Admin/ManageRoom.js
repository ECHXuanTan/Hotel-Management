import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions/index";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageRoom.scss";
import Select from "react-select";
import { CRUD_ACTIONS } from "../../../utils";
import { getDetailInforRooms } from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listRooms: [],
      hasOldData: false,

      //save to room_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listHotel: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedHotel: "",
      selectedSpecialty: "",

      nameHotel: "",
      addressHotel: "",
      note: "",
      hotelId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllRooms();
    this.props.getAllRequiredRoomInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if ((type = "HOTEL")) {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allRooms !== this.props.allRooms) {
      let dataSelect = this.buildDataInputSelect(this.props.allRooms, "USERS");
      this.setState({
        listRooms: dataSelect,
      });
    }

    if (prevProps.allRequiredRoomInfor !== this.props.allRequiredRoomInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resHotel } =
        this.props.allRequiredRoomInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectHotel = this.buildDataInputSelect(resHotel, "HOTEL");

      console.log(
        "check data new",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince,
        dataSelectSpecialty
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allRooms, "USERS");
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredRoomInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listRooms: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailRoom({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      roomId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameHotel: this.state.nameHotel,
      addressHotel: this.state.addressHotel,
      note: this.state.note,
      hotelId:
        this.state.selectedHotel && this.state.selectedHotel.value
          ? this.state.selectedHotel.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listHotel } =
      this.state;
    let res = await getDetailInforRooms(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressHotel = "",
        nameHotel = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        hotelId = "",
        //----------
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedHotel = "";

      if (res.data.Room_Infor) {
        addressHotel = res.data.Room_Infor.addressHotel;
        nameHotel = res.data.Room_Infor.nameHotel;
        note = res.data.Room_Infor.note;
        paymentId = res.data.Room_Infor.paymentId;
        priceId = res.data.Room_Infor.priceId;
        provinceId = res.data.Room_Infor.provinceId;
        specialtyId = res.data.Room_Infor.specialtyId;
        hotelId = res.data.Room_Infor.hotelId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedHotel = listHotel.find((item) => {
          return item && item.value === hotelId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressHotel: addressHotel,
        nameHotel: nameHotel,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedHotel: selectedHotel,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressHotel: "",
        nameHotel: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedHotel: "",
      });
    }
  };

  handleChangeSelectRoomInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-room-container">
        <div className="manage-room-title ">
          <FormattedMessage id="admin.manage-room.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-room.select-room" />{" "}
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listRooms}
              placeholder={
                <FormattedMessage id="admin.manage-room.select-room" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-room.intro" />{" "}
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.choose-price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectRoomInfor}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id="admin.manage-room.choose-price" />
              }
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectRoomInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="admin.manage-room.payment" />}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectRoomInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-room.province" />}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.nameHotel" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameHotel")}
              value={this.state.nameHotel}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.addressHotel" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressHotel")
              }
              value={this.state.addressHotel}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.specialty" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              options={this.state.listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-room.specialty" />
              }
              onChange={this.handleChangeSelectRoomInfor}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-room.select-hotel" />
            </label>
            <Select
              value={this.state.selectedHotel}
              options={this.state.listHotel}
              placeholder={
                <FormattedMessage id="admin.manage-room.select-hotel" />
              }
              onChange={this.handleChangeSelectRoomInfor}
              name="selectedHotel"
            />
          </div>
        </div>
        <div className="manage-room-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true ? "save-content-room" : "create-content-room"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-room.save" />
            </span>
          ) : (
            <soan>
              <FormattedMessage id="admin.manage-room.add" />
            </soan>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allRooms: state.admin.allRooms,
    allRequiredRoomInfor: state.admin.allRequiredRoomInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fire event
    fetchAllRooms: () => dispatch(actions.fetchAllRooms()),
    saveDetailRoom: (data) => dispatch(actions.saveDetailRoom(data)),
    getAllRequiredRoomInfor: () => dispatch(actions.getRequiredRoomInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom);
