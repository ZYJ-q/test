<template>
  <div class="mymsg_wrapper">
    <div class="wrapper">
      <Menu
        :active-name="activename"
        :open-names="opennames"
        @on-open-change="sss"
        ref="test"
        :accordion="true"
      >
        <div class="title">{{ $t("uc.title") }}</div>
        <Submenu name="1">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{
              $t("uc.menuTitle.AccountManagement")
            }}</span>
          </template>
          <Menu-item name="1-1">
            <router-link to="/uc/safe">{{
              $t("uc.member.securitysetting")
            }}</router-link>
          </Menu-item>
          <Menu-item name="1-2">
            <router-link to="/uc/account">{{
              $t("uc.member.accountsetting")
            }}</router-link>
          </Menu-item>
          <Menu-item name="1-3">
            <router-link to="/uc/myextension">{{
              $t("uc.member.myextension")
            }}</router-link>
          </Menu-item>
          <!--                    <Menu-item name="1-4">-->
          <!--                        <router-link to="/uc/feeLevel">{{$t('uc.member.FeeGrade')}}</router-link>-->
          <!--                    </Menu-item>-->
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{
              $t("uc.menuTitle.moneyManagement")
            }}</span>
          </template>
          <Menu-item name="2-1">
            <router-link to="/uc/money">{{
              $t("uc.finance.personalassets")
            }}</router-link>
          </Menu-item>
          <Menu-item name="2-2">
            <router-link to="/uc/record">{{
              $t("uc.finance.billdetail")
            }}</router-link>
          </Menu-item>
          <Menu-item name="2-3">
            <router-link to="/uc/recharge">{{
              $t("uc.finance.charge")
            }}</router-link>
          </Menu-item>
          <Menu-item name="2-4">
            <router-link to="/uc/withdraw">{{
              $t("uc.finance.pickup")
            }}</router-link>
          </Menu-item>
          <!-- <Menu-item name="2-5">
                        <router-link to="/uc/trade">{{$t('uc.finance.tradetail')}}</router-link>
                    </Menu-item>
                    <Menu-item name="2-6">
                        <router-link to="/uc/invitingmining">{{$t('uc.finance.invitingmining')}}</router-link>
                    </Menu-item>
                    <Menu-item name="2-6">
                        <router-link to="/uc/paydividends">{{$t('uc.finance.paydividends')}}</router-link>
                    </Menu-item>
                    <Menu-item name="2-7">
                        <router-link to="/uc/blc">???????????????</router-link>
                    </Menu-item> -->
          <!--                    <Menu-item name="2-8">-->
          <!--                        <router-link to="/uc/bjc">{{$t('uc.finance.pointManagement')}}</router-link>-->
          <!--                    </Menu-item>-->
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{ $t("uc.menuTitle.bibiManagement") }}</span>
          </template>
          <Menu-item name="3-1">
            <router-link to="/uc/entrust/current">{{
              $t("exchange.curdelegation")
            }}</router-link>
          </Menu-item>
          <Menu-item name="3-2">
            <router-link to="/uc/entrust/history">{{
              $t("exchange.hisdelegation")
            }}</router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{ $t("uc.menuTitle.otcManagement") }}</span>
          </template>
          <Menu-item name="4-1">
            <router-link to="/uc/ad">{{ $t("otc.myad.title") }}</router-link>
          </Menu-item>
          <Menu-item name="4-2">
            <router-link to="/uc/order">{{ $t("otc.myorder") }}</router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{ $t("uc.menuTitle.contractMan") }}</span>
          </template>
          <Menu-item name="5-1">
            <router-link to="/uc/jyls">{{ $t("contract.hy3") }}</router-link>
          </Menu-item>
          <Menu-item name="5-2">
            <router-link to="/uc/wtls">{{ $t("contract.hy4") }}</router-link>
          </Menu-item>
        </Submenu>
        <!--				<Submenu name="10">-->
        <!--				    <template slot="title">-->
        <!--				        <span class="isclick"></span>-->
        <!--				        <span class="content">{{$t("uc.menuTitle.BBW")}}</span>-->
        <!--				    </template>-->
        <!--				    <Menu-item name="10-1">-->
        <!--				        <router-link to="/uc/jyls2">{{$t('bibenwei.jilu1')}}</router-link>-->
        <!--				    </Menu-item>-->
        <!--				    <Menu-item name="10-2">-->
        <!--				        <router-link to="/uc/wtls2">{{$t('bibenwei.jilu2')}}</router-link>-->
        <!--				    </Menu-item>-->
        <!--				</Submenu>-->
        <!--                <Submenu name="7">-->
        <!--                    <template slot="title">-->
        <!--                        <span class="isclick"></span>-->
        <!--                        <span class="content">{{$t('ieo.ieoM')}}</span>-->
        <!--                    </template>-->
        <!--                    <MenuItem name="7-1">-->
        <!--                        <router-link to="/uc/IEORecord">{{$t('ieo.ieoM2')}}</router-link>-->
        <!--                    </MenuItem>-->
        <!--                </Submenu>-->
        <!--                <Submenu name="8">-->
        <!--                    <template slot="title">-->
        <!--                        <span class="isclick"></span>-->
        <!--                        <span class="content">{{$t('syb.syb16')}}</span>-->
        <!--                    </template>-->
        <!--                    <MenuItem name="8-1">-->
        <!--                        <router-link to="/uc/IncomeTreasureRecord">{{$t('syb.syb17')}}</router-link>-->
        <!--                    </MenuItem>-->
        <!--                </Submenu>-->
        <!--                <Submenu name="9">-->
        <!--                    <template slot="title">-->
        <!--                        <span class="isclick"></span>-->
        <!--                        <span class="content">{{$t('licai.zt')}}</span>-->
        <!--                    </template>-->
        <!--                    <MenuItem name="9-1">-->
        <!--                        <router-link to="/uc/zhiyajiebi">{{$t('licai.title2')}}</router-link>-->
        <!--                    </MenuItem>-->
        <!--                </Submenu>-->
        <Submenu name="6">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{ $t("uc.menuTitle.apiManagement") }}</span>
          </template>
          <MenuItem name="6-1">
            <router-link to="/uc/apiManage">{{
              $t("uc.menuTitle.apiManagement")
            }}</router-link>
          </MenuItem>
        </Submenu>
      </Menu>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import { minHeightMinx } from "../../minxs/minxs.js"
export default {
  //   components: {},
  // mixins: [minHeightMinx],
  data () {
    return {
      activename: "1-1",
      opennames: ["1"],
      routeArr: {
        "/uc/safe": "1-1",
        "/uc/account": "1-2",
        "/uc/myextension": "1-3",
        // "/uc/feeLevel": "1-4",
        "/uc/money": "2-1",
        "/uc/record": "2-2",
        "/uc/recharge": "2-3",
        "/uc/withdraw": "2-4",
        "/uc/trade": "2-5",
        "/uc/paydividends": "2-6",
        "/uc/blc": "2-7",
        "/uc/bjc": "2-8",
        "/uc/entrust/current": "3-1",
        "/uc/entrust/history": "3-2",
        "/uc/ad": "4-1",
        "/uc/order": "4-2",
        "/uc/withdraw/address": "2-4",
        "/uc/ad/create": "4-1",
        "/uc/jyls": "5-1",
        "/uc/wtls": "5-2",
        "/uc/zjjl": "5-3",
        "/uc/apiManage": "6-1",
        "/uc/IEORecord": '7-1',
        "/uc/IncomeTreasureRecord": '8-1',
        "/uc/zhiyajiebi": '9-1',
        "/uc/jyls2": '10-1',
        "/uc/wtls2": '10-2',
      }
    }
  },
  created: function () {
    this.init()
    const path = this.$route.path
    this.heightLightMenu(path)
  },
  methods: {
    init () {
      // this.$store.commit("navigate", "nav-uc");
      this.$store.state.HeaderActiveName = "1-6"
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
        this.$Message.success(this.$t("common.logintip"))
        this.$router.push("/login")
      }
    },
    sss (name) {
      let index = 1
      if (name.length >= 1) {
        index = name[name.length - 1]
        this.opennames = [index]
        this.activename = index + "-1"
        this.link(this.activename)
      } else {
        return
      }
      // let index = 1;
      // if (name.length >= 1 && name[0]!=5) {
      //     index = name[name.length - 1];
      //     this.opennames = [index];
      //     this.activename = index + "-1";
      //     this.link(this.activename);
      // }else if(name[0]==5){
      //     this.$Message.info('?????????????????????')
      //     return;
      // }else {
      //     return;
      // }
    },
    link (code) {
      switch (code) {
        case "1-1":
          this.$router.push("/uc/safe")
          break
        case "2-1":
          this.$router.push("/uc/money")
          break
        case "3-1":
          this.$router.push("/uc/entrust/current")
          break
        case "4-1":
          this.$router.push("/uc/ad")
          break
        case "5-1":
          this.$router.push("/uc/jyls")
          break
        case "6-1":
          this.$router.push("/uc/apiManage")
          break
        case "7-1":
          this.$router.push("/uc/IEORecord")
          break
        case "8-1":
          this.$router.push("/uc/IncomeTreasureRecord")
          break
        case "9-1":
          this.$router.push("/uc/zhiyajiebi")
          break
        case "10-1":
          this.$router.push("/uc/jyls2")
          break
        default:
          this.$router.push("/uc/safe")
          break
      }
    },
    heightLightMenu (path) {
      let acName = this.routeArr[path] || "1-1",
        opName = acName.split("-")[0]
      this.opennames = [opName]
      this.activename = acName
      this.$nextTick(function () {
        this.$refs.test.updateOpened()
        this.$refs.test.updateActiveName()
      })
    }
  },
  watch: {
    $route (to, form) {
      this.heightLightMenu(to.path)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$refs.test.updateOpened()
      this.$refs.test.updateActiveName()
    })
    const doc = document.body
    const sreenHeight = doc.offsetHeight
    const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight
    const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight
    const contentHeight = doc.getElementsByClassName("mymsg_wrapper")[0]
    const bodyHeight = sreenHeight - headerHeight - footerHeight
    contentHeight.style.minHeight = bodyHeight + "px"
  }
};
</script>

<style lang="scss" scoped>
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #f0ac19;
}
.mymsg_wrapper {
  width: 1200px;
  padding-top: 100px;
  margin: 0 auto 100px;

  .wrapper {
    width: 100%;
    // border: 1px solid #f5f5f5;
    padding: 30px 30px 30px 0;
    background: #192330;
    overflow: hidden;
    ul.ivu-menu.ivu-menu-light.ivu-menu-vertical {
      padding: 0 10px;
      width: 18% !important;
      float: left;
      background: none;
      min-height: 662px;
      border-right: 1px solid #27313e;
      color: #fff;
      .title {
        text-align: center;
        font-size: 20px;
        line-height: 40px;
        color: #fff;
      }
      li.ivu-menu-submenu {
        .ivu-menu-submenu-title {
          height: 50px;
          padding: 10px;
          border-radius: 5px;
          &:hover {
            background-color: #3c4553;
            .isclick {
              background-color: #fff;
            }
            .content,
            .ivu-icon {
              color: #fff;
            }
          }
          .isclick {
            width: 6px;
            height: 6px;
            background-color: #f0ac19;
            display: inline-block;
            border-radius: 50%;
            margin-top: 16px;
            line-height: 50px;
          }
          .content {
            padding-left: 5px;
            color: #fff;
          }
          .ivu-icon {
            top: 27px;
          }
        }
        .ivu-menu {
          li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
            color: #f0ac19;
            a {
              color: #f0ac19;
            }
          }
          li.ivu-menu-item {
            color: #fff;
            background: #27313e;
            padding: 0;
            text-align: left;
            a {
              color: #fff;
              display: block;
              height: 100%;
              padding: 14px 24px;
              font-size: 14px;
            }
          }
        }
      }
      li.ivu-menu-submenu.ivu-menu-opened {
        background-color: #3c4553;
        .ivu-menu-submenu-title {
          .isclick {
            background-color: #fff;
          }
          .content,
          .ivu-icon {
            color: #fff;
          }
        }
      }
    }
    ul.ivu-menu.ivu-menu-light {
      &:after {
        background-color: #fff;
      }
    }
    .nav-rights {
      width: 82%;
      float: left;
      min-height: 600px;
    }
  }
}
/*.mymsg_wrapper {
        .wrapper {
            ul.ivu-menu.ivu-menu-light.ivu-menu-vertical {
                li.ivu-menu-submenu {
                    .ivu-menu-submenu-title {
                        height: 50px;
                        padding: 10px;
                        border-radius: 5px;
                        &:hover {
                            background-color: #fff;
                            .isclick {
                                background-color: #3399ff;
                            }
                            .content,
                            .ivu-icon {
                                color: #666;
                            }
                        }
                        .isclick {
                            width: 6px;
                            height: 6px;
                            background-color: #3399ff;
                            display: inline-block;
                            border-radius: 50%;
                            margin-top: 16px;
                            line-height: 50px;
                        }
                        .content {
                            padding-left: 5px;
                        }
                        .ivu-icon {
                            top: 27px;
                        }
                    }
                    .ivu-menu {
                        li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
                            color: #3399ff;
                            a {
                                color: #3399ff;
                            }
                        }
                        li.ivu-menu-item {
                            color: #666;
                            background: #edf8ff;
                            padding: 0;
                            text-align: left;
                            a {
                                color: #666;
                                display: block;
                                height: 100%;
                                padding: 14px 24px;
                                font-size: 14px;
                            }
                        }
                    }
                }
                li.ivu-menu-submenu.ivu-menu-opened{
                    background-color: #3399ff;
                    .ivu-menu-submenu-title {
                        .isclick {
                            background-color: #fff;
                        }
                        .content,.ivu-icon {
                            color: #fff;
                        }
                    }
                }
            }

        }
    }*/
</style>

