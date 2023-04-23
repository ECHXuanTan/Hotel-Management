import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HotelBranch.scss";
import Slider from "react-slick";
import { getAllHotel } from "../../../services/userService";
import { withRouter } from "react-router";

class HotelBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHotel: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHotel();
    if (res && res.errCode === 0) {
      this.setState({
        dataHotel: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHotel = (hotel) => {
    if (this.props.history) {
      this.props.history.push(`/detail-hotel/${hotel.id}`);
    }
  };

  render() {
    let { dataHotel } = this.state;
    return (
      <div className="section-share section-hotel-branch">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chi nhánh</span>
          </div>
          <div className="slide">
            <Slider {...this.props.settings}>
              {dataHotel &&
                dataHotel.length > 0 &&
                dataHotel.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleViewDetailHotel(item)}
                      className="my-2 mx-auto p-relative bg-white shadow-1 blue-hover"
                      key={index}
                      style={{ width: "360px", overflow: "hidden" }}
                    >
                      <img
                        src={item.image}
                        alt="Hotel"
                        class="d-block w-full"
                      />
                      <div class="px-2 py-2">
                        <p class="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
                          Travel
                        </p>

                        <h1 class="ff-serif font-weight-normal text-black card-heading mt-0 mb-1">
                          {item.name}
                        </h1>

                        <p class="mb-1">
                          Summer is coming to a close just around the corner.
                          But it's not too late to squeeze in another weekend
                          trip &hellip;
                        </p>
                      </div>
                      <div
                        onClick={() => this.handleViewDetailHotel(item)}
                        class="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link"
                      >
                        <FormattedMessage id="homepage.more-infor" />
                      </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HotelBranch)
);
