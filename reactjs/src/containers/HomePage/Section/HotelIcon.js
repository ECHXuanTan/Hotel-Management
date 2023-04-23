import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./HotelIcon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'

class HotelIcon extends Component {
    render() {
      return (
        <div className= "section-hotel-icon">
        <h2>Tại sao lại chọn chúng tôi?</h2>
              <div className = "hotel-icon">
              <div class="icon-icons">
                    <div class="icon-info">
                    <i class="item-icon"><FontAwesomeIcon size="6x" icon={faHeadset}></FontAwesomeIcon></i>
                        <h3>Hỗ trợ khách hàng 24/7, luôn có mặt mọi lúc</h3>
                        <span>Chat là có, gọi là nghe, không quản đêm hôm, ngày nghỉ và ngày lễ. Luôn cung cấp sự trợ giúp trực tiếp ở bất cứ lúc nào</span>
                    </div>
                </div>
                
                <div class="icon-icons">
                   
                    <div class="icon-info">
                    <i class="item-icon"><FontAwesomeIcon size="6x" icon={faHandHoldingDollar}></FontAwesomeIcon></i>
                        <h3>Giá tốt sát ngày đặt phòng dành cho bạn</h3>
                        <span>Cam kết giá tốt nhất khi đặt gần ngày cho chuyến đi. Khám phá ngay những ưu đãi tốt nhất dành cho bạn tại đây</span>
                    </div>
                </div>

                <div class="icon-icons">
                    
                    <div class="icon-info">
                    <i class="item-icon"><FontAwesomeIcon size="6x" icon={faHotel}></FontAwesomeIcon></i>
                        <h3>Hơn 8000+ khách sạn dọc Việt Nam</h3>
                        <span>Hàng nghìn khách sạn, đặc biệt là 4 sao và 5 sao, cho phép bạn thoải mái lựa chọn, giá cạnh tranh, phong phú.</span>
                    </div>
                </div>

                <div class="icon-icons">
                   
                    <div class="icon-info">
                    <i class="item-icon"><FontAwesomeIcon size="6x" icon={faMoneyCheckDollar}></FontAwesomeIcon></i>
                        <h3>Thanh toán dễ dàng, đa dạng trên mọi nền tảng</h3>
                        <span>Bao gồm thêm chuyển khoản ngân hàng, ví điện tử và tiền mặt tại cửa hàng. Thanh toán nhanh chóng và dễ dàng</span>
                    </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelIcon);
  