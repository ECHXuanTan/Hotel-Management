import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="650"
              height="420"
              src="https://www.youtube.com/embed/bSFdtZDAGQ4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              <FormattedMessage id="homepage.title1"></FormattedMessage>
            </p>
            <p>
              <FormattedMessage id="homepage.title2"></FormattedMessage>
            </p>
            <p></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
