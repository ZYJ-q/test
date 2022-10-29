<template>
  <div class="page-view">
    <!--头部-->
    <header>
      <div
        class="page-content"
        :style="{
                  padding: $route.path==='/'? topPadding : '0 3%',
                }"
      >
        <div class="time_download">
          <div class="netLogo">
            <router-link to="/">
              <img  :src="webSite.logoUrl" alt="" />

            </router-link>
          </div>
          <div class="nav" :class="locale == 'en' ? 'en' : ''">
            <router-link to="/" exact>{{$t("header.index")}}</router-link>
            <router-link to="/exchange">{{$t("header.exchange")}}</router-link>
            <!-- OTC交易 -->
            <!-- <router-link to="/otc/trade/usdt">{{$t("header.otc")}}</router-link> -->
            <router-link to="/contract/BTC_USDT">{{$t("header.contract")}}</router-link>
            <!-- 申购 -->
			<!-- <router-link to="/crowdFunding">{{$t('ieo.sg')}}</router-link> -->
            <router-link to="/notice">{{$t("header.service")}}</router-link>

          </div>
          <div class="nav-header">
            <!--中英文切换-->
            <div class="changelanguage">
              <Dropdown @on-click="changelanguage">
                <a href="javascript:void(0)" style="font-size:14px;color:#fff;" class="lang-title">
                  <!-- {{languageValue}} -->
                  <span>{{languageValue}}</span>
                  <img class="lang-img" v-if="languageValue === '简体中文'" src="./assets/images/lang-zh.png" alt="">
                  <img class="lang-img" v-else src="./assets/images/lang-en.png" alt="">
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list" id="change_language_theme">
                  <DropdownItem v-if="languageValue=='简体中文'" name="en"><img src="./assets/images/lang-en.png">English</DropdownItem>
                  <DropdownItem v-else name="cn"><img src="./assets/images/lang-zh.png">简体中文</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <!-- 登录 -->
            <!--:style="isLogin?'width:12%':'width:6%'"-->
            <div class="isLoginWrapper">
              <div class="login_register isLogin" v-if="isLogin">
                <div class="mymsg">
                  <router-link to="/uc/safe">{{$t("uc.title")}}</router-link>
                </div>
                <Dropdown @on-click="goBi">
                  <a href="javascript:void(0)">
                    <span class="header-img">{{$t("uc.menuTitle.moneyManagement")}}</span>
                    <Icon type="md-arrow-dropdown" size="16" />
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="recharge">
                      <span>{{$t("exchange.recharge")}}</span>
                    </DropdownItem>
                    <DropdownItem name="pickup">
                      <span>{{$t("uc.finance.money.pickup")}}</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="md-person" class="header-icon" size="20" />
                    <span class="header-img">{{strpo(member.username)}}</span>
                    <Icon type="md-arrow-dropdown" size="16" />
                  </a>
                  <DropdownMenu slot="list">
                    <div @click="logout">
                      <DropdownItem>
                        <img src="./assets/images/logout1.png" />
                        {{$t("common.logout")}}
                      </DropdownItem>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <!-- 未登录 -->
              <div class="login_register" v-else>
                <router-link to="/login" id="login">{{$t("common.login")}}</router-link>
                <router-link to="/register" id="register">{{$t("common.register")}}</router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
    <!--内容-->
    <router-view v-if="isRouterAlive"></router-view>
    <!--底部-->
    <footer>
      <div class="footer">
        <div class="footer_content">
          <div class="footer-main">
            <div class="footer_left">
              <img :src="webSite.logoUrl" alt="" style="margin:0;width:130px;height:30px"></img>
              <div>
                <a :href="webSite.telegram||'javascript:;'"><img src="./assets/images/telegram.png" alt /></a>
                <a :href="webSite.linkedin||'javascript:;'"><img src="./assets/images/in.png" alt /></a>
                <a :href="webSite.twitter||'javascript:;'"><img src="./assets/images/twitter.png" alt /></a>
                <a :href="webSite.facebook||'javascript:;'"><img src="./assets/images/facebook.png" alt /></a>

              </div>
            </div>
            <div class="footer_right">
              <!--联系我们-->
              <ul style="margin-right: 60px" class="footer_info">
                <li class="footer_title">
                  <span>{{$t('footer.about1')}}</span>
                </li>
                <li>
<!--                  <router-link to="/helpdetail?id=1">{{$t("footer.about2")}}</router-link>-->
                  <router-link to="/helpdetail?id=1">{{webSite.name}}</router-link>
                </li>
                <li>
                  <router-link to="/helpdetail?id=2">{{$t("footer.about3")}}</router-link>
                </li>
                <li>
                  <router-link to="/helpdetail?id=3">{{$t("footer.about4")}}</router-link>
                </li>
                <li>
                  <router-link to="/helpdetail?id=5">{{$t("footer.about5")}}</router-link>
                </li>
              </ul>
              <!--客户服务-->
              <ul style="margin-right: 60px" class="footer_info">
                <li class="footer_title">
                  <a>{{$t("footer.about11")}}</a>
                </li>
                <li>
                  <router-link to="/notice">{{$t("footer.about6")}}</router-link>
                </li>
                <li>
                  <router-link to="/helpdetail?id=6">{{$t("footer.about7")}}</router-link>
                </li>
                <li>
                  <router-link to="/helpdetail?id=7">{{$t("footer.about8")}}</router-link>
                </li>
                <li>
                  <a target="_blank" href="mailto:service@TSP.com">{{$t("footer.about9")}}</a>
                </li>
                <li>
                  <router-link to="/helpdetail?id=16">{{$t("footer.about12")}}</router-link>
                </li>
              </ul>
              <!--下载支持-->
              <ul class="footer_info" style="margin-right: 60px">
                <li class="footer_title">
                  <span>{{$t("footer.download")}}</span>
                </li>
                <li >
                  <a href="https://lanzous.com/ic4bpkh">{{$t("footer.appDownload")}}</a>
                </li>
                <li @click="tip(1)">
                  <a>{{$t("footer.about10")}}</a>
                </li>
              </ul>
              <!--联系我们-->
              <ul class="footer_info">
                <li class="footer_title">
                  <span>{{$t("footer.concatUs")}}</span>
                </li>
                <li>
                  <a>{{$t("footer.email")}}:{{webSite.mail||'--'}}</a>
                </li>
                <li style="margin-top: 10px;">
                  <div class="flex">
                    <p>{{$t('footer.wechat')}}：</p>
                    <img  style="width: 80px;height: 80px;" :src="webSite.qrCoreUrl" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="foot-title">©2022. All Rights Reserved</div>
        </div>
        <!-- <div class="info">
          <div class="footer-info">
            <div class="info-title">{{$t('footer.friendLinks')}}:</div>
            <div class="info-img">
              <a href="http://www.jinse.com" target="_blank">
                <img src="./assets/images/footer/3.png" alt />
              </a>
              <a href="http://www.bishijie.com" target="_blank">
                <img src="./assets/images/footer/4.png" alt />
              </a>
              <a href="http://www.feixiaohao.com" target="_blank">
                <img src="./assets/images/footer/6.png" alt />
              </a>
              <a href="http://www.btc123.com">
                <img src="./assets/images/footer/7.png" alt />
              </a>
              <a href="http://www.huoxing24.com" target="_blank">
                <img src="./assets/images/footer/10.png" alt />
              </a>
              <a href="http://www.xnqb.com" target="_blank">
                <img src="./assets/images/footer/16.png" alt />
              </a>
              <a href="http://www.block360.pro" target="_blank">
                <img src="./assets/images/footer/12.png" alt />
              </a>
              <a href="http://www.shenliancaijing.com" target="_blank">
                <img src="./assets/images/footer/13.png" alt />
              </a>
            </div>
          </div>©2020. All Rights Reserved
        </div> -->
      </div>
    </footer>
  </div>
</template>
<script>
import QRCode from "qrcode2"
import Vue from "vue"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "app",
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      locale: "",
      isRouterAlive: true,
      // container_test:"container_test",
      webSiteInfo: '',
      pageView: "page-view",
      utc: null,
      time: null,
      content: " ",
      wechat: this.$t("footer.wechat"),
      styleTop: 30,
      topPadding: "0 5%",
      topBackgroundColor: "rgba(29, 123, 107)",
      webSite: {
        name: '',
        keyWord: '',
        title: '',
        description: '',
        logoUrl: '',
        mail: '',
        qrCoreUrl: '',
        telegram: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        infoUrl: '',
      }
    }
  },
  watch: {
    activeNav: function () {
      switch (this.activeNav) {
        case "nav-exchange":
          break
        default:
          break
      }
    },
    "$i18n.locale" (newVal) {
      this.locale = newVal
      console.log(newVal)
    },
    $route (to, from) {
      if (to.path === "/") {
        this.pageView = "page-view"
      } else {
        if (to.path.indexOf("exchange") > 0 && this.exchangeSkin == "night") {
          this.pageView = "page-view"
        } else {
          this.pageView = "page-view2"
        }
      }
    },
    exchangeSkin () {
      if (this.exchangeSkin === "day") {
        this.pageView = "page-view2"
      } else {
        this.pageView = "page-view"
      }
    }
  },
  computed: {
    activeNav: function () {
      return this.$store.state.activeNav
    },
    isLogin: function () {
      return this.$store.getters.isLogin
    },
    member: function () {
      return this.$store.getters.member
    },
    languageValue: function () {
      var curlang = this.$store.getters.lang
      if (curlang == "English") this.$i18n.locale = "en"
      return curlang
    },
    lang () {
      return this.$store.state.lang
    },
    exchangeSkin () {
      return this.$store.state.exchangeSkin
    }
  },
  created: function () {
    this.initialize()
    this.getSEO()
    if (this.$route.path === "/") {
      this.pageView = "page-view"
    } else {
      this.pageView = "page-view2"
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    getSEO () {
      this.$http.post(this.host + '/market/findSite').then(res => {
        if (res.data.code == 0) {
          var data = res.data.data[0]
          this.webSite.name = data.name
          this.webSite.keyWord = data.keyWord
          this.webSite.title = data.title
          this.webSite.description = data.description
          this.webSite.logoUrl = data.logoUrl
          this.webSite.mail = data.mail
          this.webSite.qrCoreUrl = data.qrCoreUrl
          this.webSite.telegram = data.telegram
          this.webSite.linkedin = data.linkedin
          this.webSite.twitter = data.twitter
          this.webSite.facebook = data.facebook
          this.webSite.infoUrl = data.infoUrl
        }
      })
    },
    goBi (name) {
      if (name == "recharge") {
        this.$router.push("/uc/recharge")
      }
      if (name == "pickup") {
        this.$router.push("/uc/withdraw")
      }
    },
    tip: function (i) {
      if (i == 1) {
        this.$Message.info(this.$t('other.ot1'))
      } else if (i == 2) {
        this.$Message.info(this.$t('other.ot2'))
      }
    },
    handleScroll () {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 0) {
        this.styleTop = 0
        this.topPadding = "0 6%"
      } else {
        this.styleTop = 30
        this.topPadding = "0 3%"
        // this.topBackgroundColor = 'rgba(0,0,0,.5)'
      }
    },
    strpo (str) {
      if (str.length > 4) {
        str = str.slice(0, 4) + "···"
      } else {
        str = str
      }
      return str
    },
    initialize () {
      this.$store.commit("navigate", "nav-index")
      this.$store.commit("recoveryMember")
      this.$store.commit("initLang")
      this.checkLogin()
    },
    logout () {
      this.$http.post(this.host + "/uc/loginout", {}).then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.$Message.success(resp.message)
          this.$store.commit("setMember", null)
          setTimeout(() => {
            location.href = "/"
          }, 1500)
        } else {
          this.$Message.error(resp.message)
        }
      })
    },
    checkLogin () {
      this.$http.post(this.host + "/uc/check/login", {}).then(response => {
        var result = response.body
        if (result.code == 0 && result.data == false) {
          this.$store.commit("setMember", null)
        }
      })
    },
    changelanguage: function (name) {
      if (name == "en") {
        this.$store.commit("setlang", "English")
        this.$i18n.locale = "en"
      }
      if (name == "cn") {
        this.$store.commit("setlang", "简体中文")
        this.$i18n.locale = "zh"
      }
    }
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleScroll)
  }
};
</script>
<style lang="scss" scoped>
%flex {
  align-items: center;
}

.page-view {
  /*background: #003f3c;*/
  header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: fixed;
    z-index: 999;
    // background-color: #1e7c6c;
    background-color: #172636 !important;
    transition: all 0.5s;
    .page-content {
      transition: all 0.5s;
      .time_download {
        align-items: center;
        overflow: hidden;
        min-width: 1050px;
        .netLogo {
          width: 126px;
          float: left;
          img {
            width: 114px;
            height: 30px;
            vertical-align: middle;
          }
        }
      }
      .nav.en a {
        margin-right: 20px;
      }
      .nav {
        float: left;
        margin-left: 30px;
        a {
          font-size: 14px;
          color: #fff;
          display: inline-block;
          margin-right: 40px;
          text-align: center;
          // &:nth-child(5) {
          //     padding-right: 19px;
          // }
        }
        // a.router-link-exact-active.router-link-active {
        //     color: #2d8cf0;
        // }
        // 5.15修改
        a.router-link-active {
          color: #f0a70a;
        }
      }
      .nav-header {
        float: right;
        .isLoginWrapper {
          float: right;
          .login_register {
            display: flex;
            a {
              color: #fff;
              margin: 0 20px 0 10px;
              .header-icon {
                margin-left: 15px;
              }
              .header-img {
                margin-left: 10px;
              }
            }
          }
        }
        .rightwrapper {
          float: right;
          .appdownload {
            float: left;
            padding-right: 30px;
            .ivu-poptip-rel {
              a {
                color: #828ea1;
              }
              i.ivu-icon.ivu-icon-arrow-down-b {
                margin-left: 5px;
              }
            }
          }
          .ios,
          .andrio {
            float: left;
            text-align: center;
            img {
              width: 106px;
              height: 106px;
              margin: 0 auto;
              border-radius: 3px;
            }
            .tips {
              height: 30px;
              img {
                width: 14px;
                height: 14px;
                margin-top: 5px;
              }
              span {
                font-size: 14px;
              }
            }
          }
          .andrio {
            float: right;
          }
          .ivu-dropdown-rel a {
            color: #fff;
          }
          .ivu-select-dropdown {
            z-index: 901;
            #change_language_theme {
              li {
                background: #fff;
                color: #333;
              }
            }
          }
        }
        .changelanguage {
          float: right;
          /*width: 7%;*/
          justify-content: flex-end;
          .lang-img {
            height: 20px;
            margin-bottom: -5px;
            margin-right: 5px;
          }
          #change_language_theme .ivu-dropdown-item {
            color: #000;
          }
        }
      }
    }
  }
}
.wechatclick .api2 {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    img {
      width: 100px;
    }
    span {
      display: block;
      color: #333;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.footer .footer_content .footer-main .footer_right .footer_info li {
  color: rgba(255, 255, 255, 0.8) !important;
}
ul,
li {
  list-style-type: none;
}
.container_test {
  padding-top: 60px;
}
/* 多选框 */
.exchange .ivu-checkbox-checked .ivu-checkbox-inner {
  background-color: #f0a70a;
  border-color: #f0a70a;
}
/* modal */
.ivu-modal-confirm-head {
  text-align: center;
  margin-bottom: 15px;
}
.ivu-modal-body {
  // border-top: 4px solid #3399ff;
  line-height: 25px;
  border-radius: 5px;
  .ivu-modal-confirm {
    .ivu-modal-confirm-body.ivu-modal-confirm-body-render {
      .ivu-input-number {
        &:hover {
          border-color: #f0a70a;
        }
        &:focus {
          border-color: #f0a70a;
          -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
          -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
          box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        }
      }
      .ivu-input-number.ivu-input-number-focused {
        border-color: #f0a70a;
        -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
      }
    }
    .ivu-modal-confirm-body {
      font-size: 14px;
    }
  }
}

.ivu-table-tip {
  height: 180px;
  line-height: 180px;
}

.ivu-modal-confirm-footer .ivu-btn-primary {
  background-color: #f0a70a;
  border-color: #f0a70a;
}
.ivu-modal-confirm-footer .ivu-btn-text {
  &:hover {
    color: #f0a70a;
  }
}
.ivu-modal-confirm-footer {
  .ivu-btn {
    &:focus {
      -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
      -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
      box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    }
  }
}
/*.ivu-table-wrapper {
    -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
}*/
.ivu-table-wrapper {
  background-color: #192330;
  .ivu-table {
    // box-shadow: 0px 0px 4px #27313e;
    background-color: #192330;
    color: #ccc;
    &:before {
      background: transparent;
    }
    &:after {
      background: #192330;
    }
    .ivu-table-header {
      th {
        background-color: #27313e;
        border: none;
        color: #ccc;
      }
    }
  }
}
.ivu-table-wrapper {
  .ivu-table {
    &:before {
      background: transparent;
    }
    &:after {
      background: #192330;
    }
    .ivu-table-header {
      th {
        background-color: #27313e;
        border: none;
        color: #ccc;
      }
    }
  }
}
#page2 {
  .ivu-table-wrapper {
    .ivu-table {
      .ivu-table-row {
        &:nth-of-type(odd) {
          /*background: #18193c;*/
          td {
            /*background: #18193c;*/
          }
        }

        &:nth-of-type(even) {
          td {
            /*background: #18193c;*/
          }
          /*background: #18193c;*/
        }
      }
      /*.ivu-table-row td {*/
      /*    border-color: #eee;*/
      /*}*/
    }
  }
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: none;
  &:after {
    background: none;
  }
}
.ivu-select-dropdown .ivu-select-item {
  color: #ccc;
  padding: 6px 16px;
  &:hover {
    background: #fff;
    color: #f0a70a;
  }
}
.ivu-select-dropdown
  li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
  background: #fff;
  color: #f0a70a;
}
.page-view {
  .page-content {
    .layout {
      .layout-ceiling {
        // background: #172636;
        // box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
        .layout-ceiling-main {
          .header_nav {
            .ivu-menu-vertical.ivu-menu-light {
              .ivu-menu-submenu-title {
                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                  // position: absolute !important;
                  // top: 26px !important;
                  // right: -28px !important;
                  // transform: translateY(-50%) !important;
                  &:before {
                    content: "";
                  }
                }
              }
            }
          }
          .rr {
            .login_register .ivu-menu-submenu-title .ivu-icon {
              &:before {
                content: "";
              }
            }
          }
        }
      }
    }
  }
}
.page-view2 {
  .page-content {
    .layout {
      .layout-ceiling {
        .layout-ceiling-main {
          .header_nav {
            .ivu-menu-vertical.ivu-menu-light {
              .ivu-menu-submenu-title {
                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                  &:before {
                    content: "";
                  }
                }
              }
            }
          }
          .rr {
            .login_register .ivu-menu-submenu-title .ivu-icon {
              &:before {
                content: "";
              }
            }
          }
        }
      }
    }
  }
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  background: #0b1520 !important;
  color: #fff;
}

/*自定义滚动条样式*/

::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #39557a;
  border-radius: 25px;
}

.ivu-carousel-dots li button {
  width: 40px;
  height: 3px;
  border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: #18202a;
}

#checkbox {
  width: 10px;
}

// .login_right {
//   position: absolute;
//   background: #fff;
//   width: 350px;
//   height: 510px;
//   top: 35px;
//   right: 50px;
// }

.login_title {
  color: #000;
  text-align: center;
  height: 80px;
  font-size: 25px;
}
.login_right .ivu-select-dropdown {
  background: #fff;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}

.layout {
  position: absolute;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-ceiling-main {
  height: 50px;
  line-height: 50px;
  margin-left: 128px;
}

.layout-ceiling-main .rr {
  float: right;
}

// .layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
// .ivu-menu-vertical .ivu-menu-submenu-title {
//      padding: 0;
// }

.layout-ceiling-main .ivu-menu-item {
  font-size: 14px;
}

.layout-ceiling-main a {
  color: #fff;
  display: inline-block;
  line-height: 40px;
  height: 40px;
  text-align: center;
  margin-left: 38px;
  /*padding: 0 15px;*/
}

.header_nav {
  float: left;
}

.ivu-dropdown-rel a {
  width: 100%;
}

.ivu-dropdown-menu {
  width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
  background: #27313e;
  margin-left: 25px;
  .ivu-dropdown-item {
    color: #f0ac19;
  }
}

.ivu-select-dropdown a {
  width: 100%;
  text-align: left;
  margin: 0;
}

.ivu-dropdown-item:hover {
  background-color: #27313e;
  color: #f0ac19;
}

.ivu-dropdown-item img {
  width: 14px;
  vertical-align: middle;
}

.ivu-radio-inner:after {
  background: #18202a;
}

/*安全中心*/

.user_center {
  height: 900px;
}

.ivu-menu-item {
  text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 0 !important;
  padding-right: 0;
  color: rgba(130, 142, 161, 1);
  font-size: 14px;
  border-right: 0 !important;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  background: #1855fd !important;
}

.rr .ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

.layout_menu_right {
  margin-left: 3%;
  background: #18202a;
  color: #fff;
  padding-bottom: 130px;
}

.menu_right_title {
  font-size: 16px;
  line-height: 45px;
  margin: 0 10px;
  padding-left: 20px;
  border-bottom: 1px solid #263142;
}

.category .ivu-radio-group.ivu-radio-group-button {
  width: 100%;
}

.category .ivu-radio-group label {
  font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
  background: #28313e;
  color: #979797;
  border: 0;
  padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #fff;
  background: #2f3d52;
  box-shadow: none;
}

.category .ivu-radio-wrapper span {
  padding-left: 0;
}

.purse_address_left {
  float: left;
  width: 86%;
}

.purse_address p {
  font-size: 10px;
  line-height: 25px;
  color: #979797;
}

.purse_address_left_icon {
  line-height: 40px;
  height: 40px;
  width: 100%;
}

.purse_address_left_icon img {
  vertical-align: middle;
  margin-right: 10px;
}

.purse_address span {
  font-size: 14px;
  float: left;
  color: #fff;
  padding: 0 20px;
  background: #28313e;
  width: 21%;
}

.purse_address_left_icon label {
  float: left;
  width: 72%;
  height: 40px;
  border: 2px solid #28313e;
  padding-left: 20px;
}

#qrcode canvas {
  width: 120px;
}

#qrcode img {
  width: 100%;
}

.ivu-select-item:hover {
  background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background: #aaa;
}

.chart_container #chart_updated_time {
  float: left;
}

// 粘住底部布局
// .page-content {
//     min-height: 100%;
//     padding-bottom: 200px;
// }
footer {
  background-color: #172636;
}
.footer {
  min-width: 1260px;
  height: 300px;
  overflow: hidden;
  color: #53575c;
  background: #172636;
  .foot-title {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .footer_content {
    color: #53575c;
    width: 1200px;
    margin: 60px auto 30px;
    // padding: 40px 0;
    .footer-main {
      height: 150px;
      .footer_left {
        float: left;
        font-size: 14px;
        img {
          margin: 15px 0;
        }
        p {
          margin: 10px 0;
          color: #828ea1;
        }
      }
      .footer_right {
        float: right;
        text-align: left;
        ul {
          float: left;
          margin: 0 15px;
        }
        .footer_info {
          .footer_title {
            font-size: 15px;
            height: 35px;
          }
          li {
            color: #828ea1;
            &:first-child {
              span {
                font-size: 16px;
                display: block;
              }
            }

            a {
              color: #828ea1;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
  .info {
    text-align: center;
    width: 100%;
    border-top: 1px solid #8790a1;
    line-height: 60px;
    font-size: 15px;
    color: #8790a1;
    .footer-info {
      width: 1200px;
      margin: 20px auto 0;
      display: flex;
      .info-title {
        flex: 1;
        margin-right: 20px;
        text-align: left;
        line-height: 45px;
        color: #8790a1;
      }
      .info-img {
        text-align: left;
        flex: 15;
        a {
          width: 125px;
          height: 40px;
          display: inline-block;
          float: left;
          margin-right: 12px;
          &:nth-child(8),
          &:last-child {
            margin-right: 0;
          }
          img {
            width: 85%;
          }
        }
      }
    }
  }
}

.ivu-select-selected-value {
  color: #bbbec4;
}

/*法币交易*/

.ivu-col {
  text-align: center;
}

.page-view {
  .page-content {
    .layout {
      .layout-ceiling {
        .rr {
          .login_register {
            .ivu-menu-light.ivu-menu-vertical
              .ivu-menu-item-active:not(.ivu-menu-submenu) {
              color: #fff;
            }
          }
          .isLogin {
            .ivu-dropdown {
              display: inline-block;
              .ivu-select-dropdown {
                padding: 0;
                margin: 0;
                .ivu-dropdown-menu {
                  .ivu-dropdown-item {
                    // background: #fff;
                    // color: #000;
                    border-radius: 5px;
                    // &:hover {
                    //   background: #fff;
                    //   color: #000;
                    // }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.changelanguage {
  .ivu-dropdown {
    .ivu-select-dropdown {
      z-index: 901;
    }
  }
}
// 重置分页器颜色
.ivu-page-next,
.ivu-page-prev {
  background-color: #192330;
}

.ivu-page-item {
  background-color: #192330;
  border-color: #27313e;
}

.ivu-page-item-jump-next,
.ivu-page-item-jump-prev,
.ivu-page-next,
.ivu-page-prev {
  border-color: #27313e;
}
.ivu-page-item-active {
  font-weight: bold;
}
.ivu-page-next:hover,
.ivu-page-prev:hover {
  border-color: #f0ac19;
}
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
  color: #f0ac19;
}

.ivu-page-item-jump-prev a,
.ivu-page-item-jump-next a {
  color: #666;
}
.ivu-page-item-jump-prev a:hover,
.ivu-page-item-jump-next a:hover {
  color: #f0ac19;
}
.ivu-page-item:hover {
  border-color: #f0ac19;
}
.ivu-page-item:hover a {
  color: #f0ac19;
}
.ivu-page-item.ivu-page-item-active a {
  color: #f0ac19;
}
.ivu-page-disabled {
  a {
    cursor: not-allowed;
    .ivu-icon {
      cursor: not-allowed;
    }
  }
}
/*input框样式重置*/
.ivu-input {
  &:hover {
    border-color: #27313e;
  }
  &:focus {
    border-color: #27313e;
    box-shadow: none;
    // -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    // -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    // box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
  }
}
/*下拉框样式重置*/
.ivu-select-selection {
  background-color: #192330;
  color: #fff;
  border: 1px solid #27313e;
}

.ivu-select-selection:hover {
  border-color: #27313e;
}
.ivu-select-visible .ivu-select-selection {
  border-color: #27313e;
  box-shadow: none;
  // -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
  // -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
  // box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
}
.ivu-select-selected-value {
  color: #fff;
}
.ivu-select-selection-focused {
  border-color: #27313e;
}
/*table组件样式重置*/
.ivu-table-wrapper {
  border: none;
}
.ivu-table-wrapper > .ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-color: #fff;
}

.ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-color: #fff;
}
/*加载样式重置*/
.ivu-spin-dot {
  background: #f0ac19;
}
.ivu-tabs-bar {
  border-color: #f5f5f5;
}
/*日期组件样式重置*/
.ivu-picker-panel-icon-btn {
  &:hover {
    color: #f0ac19;
  }
}
.ivu-date-picker-cells-focused em {
  box-shadow: none;
  color: #f0ac19;
  // -moz-box-shadow: 0 0 0 1px #3399ff inset;
  // -webkit-box-shadow: 0 0 0 1px #3399ff inset;
  // box-shadow: 0 0 0 1px #3399ff inset;
  &:after {
    // background: #3399ff;
  }
}
.ivu-date-picker-cells-cell-selected em,
.ivu-date-picker-cells-cell-selected:hover em {
  background: #27313e;
  color: #f0ac19;
}
.ivu-date-picker-cells-cell-today em:after {
  background: #27313e;
}
.ivu-date-picker-cells-cell-range:before {
  background: rgba(240, 167, 10, 0.2);
}
.ivu-date-picker-cells-cell:hover em {
  background: #27313e;
  color: #f0ac19;
}
/*按钮样式重置*/
.ivu-btn-primary:hover {
  // background: #3399ff;
  // border-color: #3399ff;
  background: #f0ac19;
  border-color: #f0ac19;
}

/*radio样式重置*/
.ivu-radio-checked .ivu-radio-inner {
  border-color: #f0ac19;
}
.ivu-radio-checked:hover {
  .ivu-radio-inner {
    border-color: #f0ac19;
  }
}
.ivu-radio-inner:after {
  background: #f0ac19;
}
.ivu-switch-checked {
  border-color: #f0ac19;
  background-color: #f0ac19;
}
.ivu-switch:focus {
  box-shadow: none;
}
.ivu-radio-focus {
  box-shadow: none;
}

/*下拉框*/
.ivu-select-item-selected {
  background-color: #192330;
  color: #ccc;
}
.ivu-select-item-focus {
  background-color: #192330;
}

.ivu-select-item:hover {
  background-color: #27313e;
  // color:#ccc;
  color: #f0ac19;
}
// primary按钮
.ivu-btn-text {
  color: #ccc;
  border: 1px solid #27313e;
}
.ivu-btn-primary {
  background-color: #f0ac19;
  border-color: #f0ac19;
}
.ivu-btn-text:hover {
  background-color: transparent;
  color: #f0ac19;
}
// .ivu-btn:hover{
//     color: #3399ff;
//     background-color: #fff;
//     border-color: #3399ff;
// }

/*排序小箭头样式重置*/
.ivu-table-sort i.on {
  color: #f0ac19;
}
.ivu-table-sort i:hover {
  color: #f0ac19;
}
//修改iview样式
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: not specified;
}
.ivu-menu-opened > * > .ivu-menu-submenu-title-icon {
  color: #fff;
}
.ivu-notice,
.ivu-message {
  top: 20% !important;
}
</style>
