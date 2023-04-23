import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailHotel.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import RoomSchedule from "../Room/RoomSchedule";
import RoomExtraInfor from "../Room/RoomExtraInfor";
import ProfileRoom from "../Room/ProfileRoom";
import {
  getAllDetailHotelById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRoomId: [],
      dataDetailHotel: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailHotelById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrRoomId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.roomHotel;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrRoomId.push(item.roomId);
            });
          }
        }
        this.setState({
          arrRoomId: arrRoomId,
          dataDetailHotel: res.data,
        });
      }
    }
  }

  render() {
    let { arrRoomId, dataDetailHotel } = this.state;
    let { language } = this.props;
    console.log("dataDetailHotel", dataDetailHotel);
    console.log("arrRoomId", arrRoomId);
    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataDetailHotel && !_.isEmpty(dataDetailHotel) && (
                <>
                  <div>{dataDetailHotel.name}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailHotel.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHotel);
