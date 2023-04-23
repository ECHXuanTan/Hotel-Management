import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getProfileRoomById,
  getDetailInforRooms,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./ProfileRoom.scss";

class ProfileRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforRoom(this.props.roomId);
    this.setState({
      dataProfile: data,
    });
  }
  // async componentDidMount() {
  //   if (
  //     this.props.match &&
  //     this.props.match.params &&
  //     this.props.match.params.id
  //   ) {
  //     let id = this.props.match.params.id;
  //     this.setState({
  //       currentRoomId: id,
  //     });

  //     let res = await getDetailInforRooms(id);
  //     if (res && res.errCode === 0) {
  //       this.setState({
  //         detailRoom: res.data,
  //       });
  //     }
  //   }
  // }

  getInforRoom = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileRoomById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && _.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date = (language = LANGUAGES.VI
        ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
        : moment
            .unix(+dataTime.date / 1000)
            .locale("en")
            .format("dddd - MM/DD/YYYY"));
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="customer.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionRoom,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      roomId,
    } = this.props;

    console.log("check state dataProfile ", this.state);
    // console.log("check datatime", dataTime.timeTypeData);
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = ` ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = ` ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <div className="profile-room-container">
        <div className="intro-room">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionRoom === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-room">
            <Link to={`/detail-room/${roomId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="customer.booking-modal.price" />
            {dataProfile &&
              dataProfile.Room_Infor &&
              language === LANGUAGES.VI && (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Room_Infor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              )}
            {dataProfile &&
              dataProfile.Room_Infor &&
              language === LANGUAGES.EN && (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Room_Infor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" $"}
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fire event
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoom);
