import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./HotelBranch.scss";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    console.log(dataSpecialty);
    return (
      <div className="section-share section-hotel-branch">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty-poplular" />
            </span>
          </div>
          <div className="slide">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
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
                          Specialty
                        </p>

                        <h1 class="ff-serif font-weight-normal text-black card-heading mt-0 mb-1">
                          {item.name}
                        </h1>
                        <div
                          onClick={() => this.handleViewDetailSpecialty(item)}
                          class="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link"
                        >
                          Xem thêm..
                        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
