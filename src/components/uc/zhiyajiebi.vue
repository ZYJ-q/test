<template>
  <div class="entrustcurrent">
    <!--        <Form class="form" :model="formItem" label-width=60  inline>-->
    <!--            <FormItem :label-width="locale == 'en' ? 144 : 60 " :label="$t('historyAndCu.stEnTime')">-->
    <!--                <DatePicker type="datetime" :placeholder="$t('ieo.ieo17')" v-model="formItem.date1" style="width:180px;"></DatePicker>-->
    <!--                <DatePicker type="datetime" :placeholder="$t('ieo.ieo18')" v-model="formItem.date2" style="width:180px;"></DatePicker>-->
    <!--            </FormItem>-->
    <!--            <FormItem :label="$t('uc.finance.record.symbol')">-->
    <!--                <Select v-model="formItem.symbol" style="width:100px;" :placeholder="$t('header.choose')">-->
    <!--                    <Option v-for="(item,index) in symbol " :value="item.baseSymbol " :key="index">{{item.baseSymbol}}</Option>-->
    <!--                </Select>-->
    <!--            </FormItem>-->
    <!--            <FormItem>-->
    <!--                <Button type="primary" @click="handleSubmit">{{$t('historyAndCu.search')}}</Button>-->
    <!--                <Button-->
    <!--                        style="margin-left: 8px "-->
    <!--                        @click="handleClear "-->
    <!--                        class="clear_btn"-->
    <!--                >{{$t('historyAndCu.clear')}}</Button>-->
    <!--            </FormItem>-->
    <!--        </Form>-->

    <div class="table">
      <Tabs active-key="key1" @on-click="handleTab">
        <Tab-pane :label="$t('zhiya.jieru.myborrow')" class="IEOIng" key="key1">
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns"
            :data="list"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage1"
            ></Page>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('zhiya.jiechu.mylend')" class="IEOIng" key="key2">
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns2"
            :data="list"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage2"
            ></Page>
          </div>
        </Tab-pane>
        <Tab-pane
          :label="$t('zhiya.fabujieru.fabuborrow')"
          class="IEOIng"
          key="key3"
        >
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns3"
            :data="list"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage3"
            ></Page>
          </div>
        </Tab-pane>
        <Tab-pane
          :label="$t('zhiya.fabujiechu.fabulend')"
          class="IEOIng"
          key="key4"
        >
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns4"
            :data="list"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage4"
            ></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
    <!-- ???????????? -->
    <Modal v-model="huankuan_show" title="??????" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">??????</span>
      </p>
      <p>
        <span>????????????</span>
      </p>
      <div>
        <Input
          type="text"
          disabled
          v-model="num_"
          placeholder="??????"
          style="width: 300px"
        />
      </div>
      <div class="mt10">
        <p>
          <span>????????????</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="?????????????????????"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">??????</Button> -->
          <Button type="warning" @click="huan()">??????</Button>
        </div>
      </div>
    </Modal>
    <!-- ???????????? -->
    <Modal v-model="bucang_show" title="??????" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">??????</span>
      </p>
      <p>
        <span>????????????</span>
      </p>
      <div>
        <Input
          type="text"
          v-model="bucang_num"
          placeholder="?????????????????????"
          style="width: 300px"
        />
      </div>
      <div class="mt10">
        <p>
          <span>????????????</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="?????????????????????"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">??????</Button> -->
          <Button type="warning" @click="bucang()">??????</Button>
        </div>
      </div>
    </Modal>
    <!-- ???????????? -->
    <Modal v-model="chedan_show" title="??????" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">??????</span>
      </p>
      <div class="mt10">
        <p>
          <span>????????????</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="?????????????????????"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">??????</Button> -->
          <Button type="warning" @click="chedan(chedan_type)">??????</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
var moment = require("moment")
import expandRow from "@components/exchange/expand.vue"


export default {
  components: {
    expandRow
  },
  data () {
    const self = this
    return {
      arr1: [],
      chedan_id: '',
      chedan_show: false,
      chedan_type: '',
      huilv_1: '',
      huilv_: '',
      bucang_id: '',
      bucang_num: '',
      id_: '',
      num_: '',
      password_: '',
      bucang_show: false,
      huankuan_show: false,
      list: [],
      locale: '',
      loading: false,
      pageSize: 10,
      pageNo: 1,
      status: '',
      total: 10,
      symbol: [],
      formItem: {
        symbol: "",
        type: "",
        date1: "",
        date2: "",
      },
      orders: [],
      page: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  watch: {
    "$i18n.locale": {
      handler (newVal) {
        this.locale = newVal
      },
      immediate: true
    }
  },
  mounted () {
    this.getHistoryOrder(0)
    // this.gethuilv1()
  },
  created () {
    this.getSymbol()
  },
  methods: {
    // ??????
    chedan (type) {
      if (this.password_ == '') {
        this.$Message.error('?????????????????????')
        return
      }
      if (type == '??????') {
        this.$http.post(this.host + "/exchange/borrowMoney/cancellations", {
          id: this.chedan_id,
          jyPassword: this.password_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.getHistoryOrder(2)
            this.$Message.success('????????????')
            this.password_ = ''
            this.chedan_show = false
          } else {
            this.$Message.error(res.data.message)
          }
        })
      } else if (type == '??????') {
        this.$http.post(this.host + "/exchange/loanMoney/cancellations", {
          id: this.chedan_id,
          jyPassword: this.password_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.getHistoryOrder(3)
            this.$Message.success('????????????')
            this.password_ = ''
            this.chedan_show = false
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    gethuilv1 (coin) {
      let name = ''
      if (coin.type == 1) {
        name = coin.borrowMoney.pledgeCoin.name
      } else {
        name = coin.pledgeCoin.name
      }
      this.$http.post(this.host + "/exchange/accessRecord/getCoinRate", {
        unit: name
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          console.log(this.list.length, this.arr1.length)
          if (this.list.length != this.arr1.length) {
            this.arr1.push(res.data.message)
          }
          // return res.data.message
          // this.huilv_1 = res.data.message
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // ??????
    gethuilv (coin, num) {
      this.$http.post(this.host + "/exchange/accessRecord/getCoinRate", {
        unit: coin.type == 1 ? coin.borrowMoney.pledgeCoin.name : coin.pledgeCoin.name
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.huilv_ = res.data.message
          this.bucang_num = Number(num) * 0.7 * Number(this.huilv_)
          //?????????????????????????????????
          this.bucang_show = true
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // ??????
    bucang () {
      if (this.password_ == '') {
        this.$Message.error('?????????????????????')
      } else {
        this.$http.post(this.host + "/exchange/accessRecord/variationCall", {
          jyPassword: this.password_,
          accessRecordId: this.bucang_id,
          money: this.bucang_num
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.$Message.success('????????????')
            this.bucang_show = false
            this.password_ = ''
            this.bucang_num = ''
            this.bucang_id = ''
            this.getHistoryOrder(0)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    // ??????
    huan () {
      if (this.password_ == '') {
        this.$Message.error('?????????????????????')
      } else {
        this.$http.post(this.host + "/exchange/accessRecord/repayment", {
          jyPassword: this.password_,
          accessId: this.id_,
          money: this.num_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.$Message.success('????????????')
            this.huankuan_show = false
            this.password_ = ''
            this.num_ = ''
            this.id_ = ''
            this.getHistoryOrder(0)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    dateFormat: function (tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss")
    },
    timeFormat: function (tick) {
      return moment(tick).format("HH:mm:ss")
    },
    loadDataPage1 (data) {
      this.pageNo = data
      this.getHistoryOrder(0)
    },
    loadDataPage2 (data) {
      this.pageNo = data
      this.getHistoryOrder(1)
    },
    loadDataPage3 (data) {
      this.pageNo = data
      this.getHistoryOrder(2)
    },
    loadDataPage4 (data) {
      this.pageNo = data
      this.getHistoryOrder(3)
    },
    handleSubmit () {
      this.pageNo = 1
      this.getHistoryOrder()
    },
    handleClear () {
      this.formItem = {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      }
    },
    handleTab (name) {
      this.getHistoryOrder(name)
    },
    getSymbol () {
      this.$http.post(this.host + "/contract-api/contract-coin/base-symbol", {}).then(response => {
        var resp = response.body

        if (resp.data.length > 0) {
          this.symbol = resp.data
        }
      })
    },
    // ???????????????
    getHistoryOrder (type) {
      this.arr1 = []		//??????????????????????????????
      console.log(type)
      //0?????? 1?????? 2??????????????????	3??????????????????
      if (type == 0) {
        this.list = []
        this.$http
          .post(this.host + "/exchange/accessRecord/getMyAccessRecord", {
            type: 0,
            status: this.status,
            pageSize: this.pageSize,
            pageNum: this.pageNo,
          })
          .then(response => {
            var resp = response.body
            console.log(resp.data.content)
            let rows = []
            if (resp.data.content.length > 0) {
              this.list = resp.data.content
              this.list.forEach((v, i) => {
                this.gethuilv1(v)
              })
            }
            this.loading = false
          })
      } else if (type == 1) {
        this.list = []
        this.$http
          .post(this.host + "/exchange/accessRecord/getMyAccessRecord", {
            type: 1,
            status: this.status,
            pageSize: this.pageSize,
            pageNum: this.pageNo,
          })
          .then(response => {
            var resp = response.body
            console.log(resp.data.content)
            let rows = []
            if (resp.data.content.length > 0) {
              this.list = resp.data.content
            }
            this.loading = false
          })
      } else if (type == 2) {
        this.list = []
        this.$http
          .post(this.host + "/exchange/borrowMoney/getBorrowMoneyList", {
            pageSize: this.pageSize,
            pageNum: this.pageNo,
            memberId: JSON.parse(localStorage.getItem('MEMBER')).id
          })
          .then(res => {
            if (res.data.code == 0) {
              this.list = res.data.data.content
              console.log(this.list)
              this.list.forEach((v, i) => {
                v.zhiyalv = '70%'
                v.caozuo = '??????'
              })
            }
            console.log(res)
          })
      } else if (type == 3) {
        this.list = []
        this.$http
          .post(this.host + "/exchange/loanMoney/getLoanMoneyList", {
            pageSize: this.pageSize,
            pageNum: this.pageNo,
            memberId: JSON.parse(localStorage.getItem('MEMBER')).id
          })
          .then(res => {
            if (res.data.code == 0) {
              this.list = res.data.data.content
              console.log(this.list)
            }
            console.log(res)
          })
      }
    },
    cancel (orderId) {
      this.$Modal.confirm({
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.exchange.orderCancel + "/" + orderId, {})
            .then(response => {
              var resp = response.body
              if (resp.code == 0) {
                this.getHistoryOrder()
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message
                })
              }
            })
        }
      })
    }
  },
  computed: {
    jisuanhuilv () {
      return this.huilv_1
    },
    // ??????????????????
    columns () {
      const arr = []
      arr.push({
        title: this.$t('zhiya.jieru.dh'),
        key: "id",
        render: (h, params) => {
          // ??????
          return h('span', {}, params.row.id)
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.qx'),
        key: "period",
        render: (h, params) => {
          // ??????
          // type???1???borrowMoney?????????,type???0???loanMoney?????????
          return h('span', {}, params.row.type == 1 ? params.row.borrowMoney.period + '???' : params.row.loanMoney.period +
            '???')
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.yzy'),
        key: "pledgeMoney",
        render: (h, params) => {
          // ?????????
          // type???1???borrowMoney?????????,type???0?????????????????????
          return h(
            "span", {}, params.row.type == 1 ? params.row.borrowMoney.pledgeMoney : params.row.pledgeMoney
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.zyl'),
        key: "borrowMoney",
        render: (h, params) => {
          // ?????????
          // type???1???borrowMoney?????????,type???0?????????????????????
          // ??????????????? = ???????????? / ??????????????? * ?????????
          var zyl = ''
          if (params.row.type == 1) {
            zyl = Number(params.row.money / (params.row.borrowMoney.pledgeMoney * Number(this.arr1[params.index])) * 100)
              .toFixed(2)
          } else {
            zyl = Number(params.row.money / (params.row.pledgeMoney * Number(this.arr1[params.index])) * 100).toFixed(2)
          }
          console.log('??????' + this.arr1[params.index])
          console.log('?????????' + this.zyl)
          return h('span', {}, zyl + '%')
        }
      })
      // arr.push({
      // 	title: this.$t('zhiya.jieru.pcjg'),
      // 	key: "buyDate",
      // 	render: (h, params) => {
      // 		return h(
      // 			"span", {
      // 				attrs: {
      // 					title: params.row.buyDate
      // 				}
      // 			},
      // 			params.row.buyDate
      // 		);
      // 	}
      // });
      arr.push({
        title: this.$t('zhiya.jieru.jrrx'),
        key: "interest",
        render: (h, params) => {
          // ????????????
          // ?????????????????????
          return h(
            "span", {},
            params.row.type == 1 ? params.row.borrowMoney.interestDue : params.row.interest
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.jrzg'),
        key: "money",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.money
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.cz'),
        key: "buyDate",
        render: (h, params) => {
          if (params.row.reminder == 1 && params.row.status != 3) { //?????????????????????
            return h(
              "div", [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.gethuilv(params.row, params.row.money)
                    this.bucang_id = params.row.id
                    //??????????????????
                  }
                }
              }, this.$t("bijiedai.bucang")), params.row.status == 0 || params.row.status == 2 ? h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let lixi = params.row.type == 1 ? params.row.borrowMoney.interestDue : params.row.interest
                    this.num_ = Number(params.row.money) + Number(lixi)
                    this.id_ = params.row.id
                    //??????????????????
                    this.password_ = ''
                    this.huankuan_show = true
                  }
                }
              }, this.$t("bijiedai.huankuan")) : ''
            ]
            )
          } else {
            if (params.row.status == 0 || params.row.status == 2) {
              return h(
                "div", [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let lixi = params.row.type == 1 ? params.row.borrowMoney.interestDue : params.row.interest
                      this.num_ = Number(params.row.money) + Number(lixi)
                      this.id_ = params.row.id
                      //??????????????????
                      this.password_ = ''
                      this.huankuan_show = true
                    }
                  }
                }, this.$t("bijiedai.huankuan"))
              ]
              )
            } else if (params.row.status == 1) {
              return h('span', {}, '?????????')
            } else if (params.row.status == 2) {
              return h('span', {}, '?????????')
            } else if (params.row.status == 3) {
              return h('span', {}, '?????????')
            }
          }
        }
      })
      return arr
    },
    // ??????????????????
    columns2 () {
      const arr = []
      arr.push({
        title: this.$t('zhiya.jiechu.dh'),
        key: "id",
        render: (h, params) => {
          return h('span', {}, params.row.id)
        }
      })
      arr.push({
        title: this.$t('zhiya.jiechu.qx'),
        key: "period",
        render: (h, params) => {
          // ??????
          // type???1???borrowMoney?????????,type???0???loanMoney?????????
          return h('span', {}, params.row.type == 1 ? params.row.borrowMoney.period + '???' : params.row.loanMoney.period +
            '???')
        }
      })
      arr.push({
        title: this.$t('zhiya.jiechu.jcrx'),
        key: "interest",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.interest
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jiechu.jczg'),
        key: "money",
        render: (h, params) => {
          return h('span', {}, params.row.money)
        }
      })
      arr.push({
        title: this.$t('zhiya.jiechu.yqsy'),
        key: "interest",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.interest
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jiechu.cz'),
        key: "buyDate",
        render: (h, params) => {
          if (params.row.status == 0) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 1) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 2) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 3) {
            return h('span', {}, '?????????')
          }
        }
      })
      return arr
    },
    // ????????????????????????
    columns3 () {
      const arr = []
      arr.push({
        title: this.$t('zhiya.fabujieru.dh'),
        key: "id",
        render: (h, params) => {
          return h('span', {}, params.row.id)
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujieru.qx'),
        key: "period",
        render: (h, params) => {
          return h('span', {}, params.row.period + '???')
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujieru.ydy'),
        key: "pledgeMoney",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.pledgeMoney
          )
        }
      })
      // arr.push({
      // 	title: this.$t('zhiya.fabujieru.zyl'),
      // 	key: "zhiyalv",
      // 	render: (h, params) => {
      // 		return h('span', {}, params.row.zhiyalv)
      // 	}
      // });
      arr.push({
        title: this.$t('zhiya.fabujieru.zfrx'),
        key: "interestDue",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.interestDue
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujieru.jrzg'),
        key: "borrowAmount",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.borrowAmount
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujieru.yjd'),
        key: "hasBorrowAmount",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.hasBorrowAmount
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujieru.cz'),
        key: "caozuo",
        render: (h, params) => {
          if (params.row.status == 0) {
            return h(
              "div", [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.chedan_id = params.row.id
                    this.chedan_type = '??????'
                    this.chedan_show = true
                  }
                }
              }, '??????')
            ]
            )
          } else if (params.row.status == 1) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 2) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 3) {
            return h('span', {}, '?????????')
          }
        }
      })
      return arr
    },
    // ????????????????????????
    columns4 () {
      const arr = []
      arr.push({
        title: this.$t('zhiya.fabujiechu.dh'),
        key: "id",
        render: (h, params) => {
          return h('span', {}, params.row.id)
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujiechu.qx'),
        key: "period",
        render: (h, params) => {
          return h('span', {}, params.row.period + '???')
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujiechu.syrx'),
        key: "maturityYield",
        render: (h, params) => {
          return h(
            "span", {

          },
            params.row.maturityYield
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujiechu.jczg'),
        key: "loanAmount",
        render: (h, params) => {
          return h('span', {}, params.row.loanAmount)
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujiechu.yjc'),
        key: "hasLoanAmount",
        render: (h, params) => {
          return h(
            "span", {},
            params.row.hasLoanAmount == null ? '0' : params.row.hasLoanAmount
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.fabujiechu.cz'),
        key: "caozuo",
        render: (h, params) => {
          if (params.row.status == 0) {
            return h(
              "div", [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.chedan_id = params.row.id
                    this.chedan_type = '??????'
                    this.chedan_show = true
                  }
                }
              }, '??????')
            ]
            )
          } else if (params.row.status == 1) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 2) {
            return h('span', {}, '?????????')
          } else if (params.row.status == 3) {
            return h('span', {}, '?????????')
          }
        }
      })
      return arr
    },
  }
};
</script>


<style lang="scss" scoped>
.entrustcurrent {
  float: left;
  width: 82%;
  padding-left: 30px;
  padding-top: 10px;
}

.page {
  text-align: right;
  margin-top: 20px;
}

.table {
  border-radius: 6px;
}

.table .ivu-table-wrapper {
  position: relative;
  /* border: 1px solid #dddee1; */
  border-bottom: 0;
  border-right: 0;
  box-shadow: 0 0 2px #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.form.ivu-form-inline .ivu-form-item {
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #f0b90b !important;
}

.ivu-tabs-tab:hover {
  color: #f0b90b !important;
}

.ivu-tabs-ink-bar {
  background-color: #f0b90b !important;
}

.entrustcurrent .ivu-table th,
.entrustcurrent .ivu-table td {
  text-align: center;
}

.table .ivu-table-cell-expand {
  color: #f0b90b;
}

.form .clear_btn {
  &:hover {
    color: #f0b90b;
    border-color: #f0b90b;
  }

  &:focus {
    // background-color: #fff;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    color: #f0b90b;
    border-color: #f0b90b;
  }
}
</style>
