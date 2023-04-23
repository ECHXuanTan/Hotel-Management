import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";

class Footer extends Component {
  render() {
    return (
      <footer class="footer">
        <div class="grid footer_top">
          <div class="grid_row">
            <div class="grid_column-2-4">
              <h3 class="footer_heading">Liên lạc với chúng tôi</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fa-solid fa-location-dot"></i>{" "}
                    117-119 Lý Chính Thắng, P. 7, Q. 3, TPHCM
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fa-solid fa-phone"></i> 0589 457
                    896
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fa-solid fa-envelope"></i>
                    Beta@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div class="grid_column-2-4">
              <h3 class="footer_heading">Chăm sóc khách hàng</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Trung tâm hỗ trợ
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Cách đặt chỗ
                  </a>
                </li>
              </ul>
            </div>
            <div class="grid_column-2-4">
              <h3 class="footer_heading">Sản phẩm</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Khách sạn
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Biệt thự
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Căn hộ
                  </a>
                </li>
              </ul>
            </div>
            <div class="grid_column-2-4">
              <h3 class="footer_heading">Theo dõi chúng tôi trên</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fab fa-facebook"></i>Facebook
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fab fa-instagram"></i>Instagram
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    <i class="footer_item-icon fab fa-twitter"></i>Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div class="grid_column-2-4">
              <h3 class="footer_heading">Giới thiệu</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Về chúng tôi
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Chính sách quyền riêng tư
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Điều khoản & Điều kiện
                  </a>
                </li>
                <li class="footer_item">
                  <a href="" class="footer_item-link">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer_bottom">
          <div class="grid">
            <p class="footer_text">Copyright by BetaTeam © 2022</p>
          </div>
        </div>
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
