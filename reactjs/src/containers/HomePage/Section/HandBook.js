import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HankBook.scss";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <span className="title-section">Chi nhánh</span>
        <div class="my-2 p-relative bg-white shadow-1 blue-hover">
          <img
            src="https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb"
            alt="Man with backpack"
            class="d-block w-full"
          />
          <div class="px-2 py-2">
            <p class="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
              Travel
            </p>

            <h1 class="ff-serif font-weight-normal text-black card-heading mt-0 mb-1">
              Planning your final summer trip
            </h1>

            <p class="mb-1">
              Summer is coming to a close just around the corner. But it's not
              too late to squeeze in another weekend tripaaaaaaad ada Lorem
              asdad a da da dad ad ad adasda d dadad dasdsa shadowd a dssa sd a
              d ada d adasdad add adasdada ad sda a sd ada d a daasd ad ada d
              adasdadaads dasdsada dadadad
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Summer is
              coming to a close just around the corner. But it's not too late to
              squeeze in another weekend tripaaaaaaad ada Lorem asdad a da da
              dad ad ad adasda d dadad dasdsa shadowd a dssa sd a d ada d
              adasdad add adasdada ad sda a sd ada d a daasd ad ada d
              adasdadaads dasdsada dadadad
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Summer is
              coming to a close just around the corner. But it's not too late to
              squeeze in another weekend tripaaaaaaad ada Lorem asdad a da da
              dad ad ad adasda d dadad dasdsa shadowd a dssa sd a d ada d
              adasdad add adasdada ad sda a sd ada d a daasd ad ada d
              adasdadaads dasdsada dadadad
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a &hellip;
            </p>
          </div>

          <a
            href="#0"
            class="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link"
          >
            Read More
          </a>
        </div>

        <div class="w-full bg-white py-1 px-2 clearfix"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
