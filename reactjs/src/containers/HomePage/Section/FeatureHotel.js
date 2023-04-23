import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//Room not Hotel
class FeatureHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRooms: [],
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topRoomsRedux !== this.props.topRoomsRedux) {
      this.setState({
        arrRooms: this.props.topRoomsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopRooms();
  }

  handleViewDetailRoom = (room) => {
    if (this.props.history) {
      this.props.history.push(`/detail-room/${room.id}`);
    }
  };

  render() {
    let arrRooms = this.state.arrRooms;
    let { language } = this.props;
    console.log("arrRooms", arrRooms);
    return (
      <div className="section-share section-feature-hotel">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homeheader.top-room" />
            </span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrRooms &&
                arrRooms.length > 0 &&
                arrRooms.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.lastName} ${item.firstName}`;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailRoom(item)}
                    >
                      {/* <Link to={`/detail-room?/${arrRooms.id}`}> */}
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-feature-hotel"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}{" "}
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topRoomsRedux: state.admin.topRooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopRooms: () => dispatch(actions.fetchTopRooms()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeatureHotel)
);
