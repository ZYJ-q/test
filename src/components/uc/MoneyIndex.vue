<template>
  <div class="nav-rights" id="moneyindex">
    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
      <div class="bill_box rightarea padding-right-clear">
        <div class="bill_box rightarea padding-right-clear">
          <Tabs v-model="splitcomponentContent" @on-click="changeTab">
            <TabPane
              :label="$t('myAccount._BitcoinAccount')"
              name="COIN"
            ></TabPane>
            <TabPane
              :label="$t('myAccount._legaTenderAccount')"
              name="CURRENCY"
            ></TabPane>
            <TabPane :label="$t('contract.hy1')" name="CONTRACT"></TabPane>
          </Tabs>
          <!-- <keep-alive> -->
          <component :is="splitcomponent"></component>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coin from "../splitaccount/coin"
import currency from "../splitaccount/currency"
import lever from "../splitaccount/lever"
import contract from "../splitaccount/contractAccount"

export default {
  components: { coin, currency, lever, contract },
  data () {
    return {
      splitcomponent: coin,
      splitcomponentContent: "COIN",
      GCCMatchAmount: 0,
      matchAmount: 0,
      modal: false,
      loginmsg: this.$t("common.logintip"),
      loading: true,
      ordKeyword: "",
      tableMoney: [],
      canMatch: true,
      modal_msg: false,
      match_msg: "",

    }
  },
  methods: {
    changeTab (name) {
      this.splitcomponentContent = name
      name == "COIN" && (this.splitcomponent = coin)
      name == 'CURRENCY' && (this.splitcomponent = currency)
      name == "LEVER" && (this.splitcomponent = lever)
      name == "CONTRACT" && (this.splitcomponent = contract)
      name == "BIBENWEI" && (this.splitcomponent = bibenwei)
    },


    getGCCMatchAmount () {
      //获取
      this.$http
        .post(this.host + "/uc/asset/wallet/match-check")
        .then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.canMatch = true
            this.GCCMatchAmount = resp.data
          } else {
            this.canMatch = false
            this.match_msg = resp.message
            // this.$Message.error(this.loginmsg);
          }
          this.showMatchDailog()
        })
    },
    showMatchDailog () {
      if (this.canMatch) this.modal = true
      else this.modal_msg = true
    },
    matchGCC () {
      if (this.matchAmount <= 0) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr1"))
      } else if (this.matchAmount > this.GCCMatchAmount) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr2"))
      } else {
        //配对
        let params = {}
        params["amount"] = this.matchAmount
        this.$http
          .post(this.host + "/uc/asset/wallet/match", params)
          .then(response => {
            var resp = response.body
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.finance.money.matchsuccess"))
              this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount
            } else {
              this.$Message.error(resp.message)
            }
          })
      }
    },
    resetAddress (unit) {
      let params = {}
      params["unit"] = unit
      this.$http
        .post(this.host + "/uc/asset/wallet/reset-address", params)
        .then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.finance.money.resetsuccess"))
            setTimeout(function () {
              window.location.reload()
            }, 3000)
          } else {
            this.$Message.error(resp.message)
          }
        })
    }
  },
  created () {
    //this.getMoney();
    //this.getGCCMatchAmount();
  },
  computed: {
    tableColumnsMoney () {
      let self = this
      let columns = []
      columns.push({
        title: this.$t("uc.finance.money.cointype"),
        key: "coinType",
        width: 100,
        align: "center"
      })
      columns.push({
        title: this.$t("uc.finance.money.balance"),
        key: "balance",
        align: "center",
        render (h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.balance
              }
            },
            self.toFloor(params.row.balance || "0")
          )
        }
      })
      columns.push({
        title: this.$t("uc.finance.money.frozen"),
        key: "frozenBalance",
        align: "center",
        render (h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.frozenBalance
              }
            },
            self.toFloor(params.row.frozenBalance || "0")
          )
        }
      })
      columns.push({
        title: this.$t("uc.finance.money.needreleased"),
        align: "center",
        render (h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.toReleased
              }
            },
            self.toFloor(params.row.toReleased || "0")
          )
        }
      })
      columns.push({
        title: this.$t("uc.finance.money.operate"),
        key: "price1",
        align: "center",
        render: function (h, params) {
          var actions = []
          if (params.row.coin.canRecharge == 1) {
            if (params.row.address != null && params.row.address != "") {
              // 充币
              actions.push(
                h(
                  "Button",
                  {
                    // 充币;
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: function () {
                        self.$router.push(
                          "/uc/recharge?name=" + params.row.coin.unit
                        )
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.charge")
                )
              )
            } else {
              //   获取地址按钮;
              actions.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    on: {
                      click: function () {
                        self.resetAddress(params.row.coin.unit)
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.getaddress")
                )
              )
            }
          }
          if (params.row.coin.canWithdraw == 1) {
            // 提币;
            actions.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: function () {
                      self.$router.push(
                        "/uc/withdraw?name=" + params.row.coin.unit
                      )
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.pickup")
              )
            )
          }
          if (params.row.coin.unit.toUpperCase() == "GCC") {
            // 配对;
            actions.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: function () {
                      // self.showMatchDailog(params.row);
                      self.getGCCMatchAmount()
                      // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.match")
              )
            )
          }
          return h("p", actions)
        }
      })
      return columns
    }
  }
}
</script>
<style lang="scss">
.nav-right {
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #1ebb88 !important;
  }
  .rightarea.bill_box {
    .shaow {
      padding: 5px;
    }
    .ivu-table-body {
      td {
        // background: none;
        .ivu-table-cell {
          p .ivu-btn {
            // background: #fff;
            height: 25px;
            padding: 0 10px;
            span {
              display: inline-block;
              line-height: 25px;
              font-size: 14px;
            }
          }
          p .ivu-btn.ivu-btn-info {
            border: 1px solid #39f;
            border-radius: 20px;
            span {
              color: #39f;
            }
          }
          p .ivu-btn.ivu-btn-error {
            border: 1px solid #f15057;
            border-radius: 20px;
            span {
              color: #f15057;
            }
          }
          p .ivu-btn.ivu-btn-primary {
            border: 1px solid #00b275;
            border-radius: 20px;
            span {
              color: #00b275;
            }
          }
        }
      }
    }
  }
}
.hidden-assets {
  display: flex;
  justify-content: flex-end;
}
#moneyindex .ivu-table-row .ivu-table-cell p {
  float: right;
  margin-right: 85px;
}
#lever .ivu-table-row .ivu-table-cell p {
  margin: 0;
}
</style>

<style scoped lang="scss">
.nav-right {
  height: auto;
  overflow: hidden;
  padding: 0 0 0 15px;
  background: #fff;
  .rightarea.bill_box {
    padding-left: 15px;
    width: 100%;
    height: auto;
    overflow: hidden;
    .order-table {
      .ivu-table-wrapper {
        .ivu-table .ivu-table-header {
          tr th {
            background: none;
          }
        }
      }
    }
  }
}
</style>
