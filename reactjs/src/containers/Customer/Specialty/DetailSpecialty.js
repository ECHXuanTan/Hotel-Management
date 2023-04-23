import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import RoomSchedule from "../Room/RoomSchedule";
import RoomExtraInfor from "../Room/RoomExtraInfor";
import ProfileRoom from "../Room/ProfileRoom";
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRoomId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrRoomId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.roomSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrRoomId.push(item.roomId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "All",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrRoomId: arrRoomId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  handleOnChangeSelected = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrRoomId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.roomSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrRoomId.push(item.roomId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrRoomId: arrRoomId,
        });
      }
    }
  };

  render() {
    let { arrRoomId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    console.log("arrRoomId", arrRoomId);
    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailSpecialty.descriptionHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="search-sp-room">
              <select onChange={(event) => this.handleOnChangeSelected(event)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
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
            {arrRoomId &&
              arrRoomId.length > 0 &&
              arrRoomId.map((item, index) => {
                return (
                  <div className="each-room" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-room">
                        <ProfileRoom
                          roomId={item}
                          isShowDescriptionRoom={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="room-schedule">
                        <RoomSchedule roomIdFromParent={item} />
                      </div>
                      <div className="room-extra-infor">
                        <RoomExtraInfor roomIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fire event
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
