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
    <!-- 还款表单 -->
    <Modal v-model="huankuan_show" title="还款" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">还款</span>
      </p>
      <p>
        <span>应还金额</span>
      </p>
      <div>
        <Input
          type="text"
          disabled
          v-model="num_"
          placeholder="数量"
          style="width: 300px"
        />
      </div>
      <div class="mt10">
        <p>
          <span>交易密码</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="请输入交易密码"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">取消</Button> -->
          <Button type="warning" @click="huan()">确定</Button>
        </div>
      </div>
    </Modal>
    <!-- 补仓表单 -->
    <Modal v-model="bucang_show" title="补仓" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">补仓</span>
      </p>
      <p>
        <span>补仓金额</span>
      </p>
      <div>
        <Input
          type="text"
          v-model="bucang_num"
          placeholder="请输入补仓金额"
          style="width: 300px"
        />
      </div>
      <div class="mt10">
        <p>
          <span>交易密码</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="请输入交易密码"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">取消</Button> -->
          <Button type="warning" @click="bucang()">确定</Button>
        </div>
      </div>
    </Modal>
    <!-- 撤单表单 -->
    <Modal v-model="chedan_show" title="撤单" width="630">
      <p slot="header" style="color: rgba(240, 185, 11, 1); text-align: center">
        <span style="padding-left: 5px">撤单</span>
      </p>
      <div class="mt10">
        <p>
          <span>交易密码</span>
        </p>
        <Input
          type="password"
          v-model="password_"
          placeholder="请输入交易密码"
          style="width: 300px"
        />
      </div>
      <div
        slot="footer"
        style="color: rgba(240, 185, 11, 1); text-align: right"
      >
        <div>
          <!-- <Button type="text">取消</Button> -->
          <Button type="warning" @click="chedan(chedan_type)">确定</Button>
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
    // 撤单
    chedan (type) {
      if (this.password_ == '') {
        this.$Message.error('请输入交易密码')
        return
      }
      if (type == '借入') {
        this.$http.post(this.host + "/exchange/borrowMoney/cancellations", {
          id: this.chedan_id,
          jyPassword: this.password_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.getHistoryOrder(2)
            this.$Message.success('撤单成功')
            this.password_ = ''
            this.chedan_show = false
          } else {
            this.$Message.error(res.data.message)
          }
        })
      } else if (type == '借出') {
        this.$http.post(this.host + "/exchange/loanMoney/cancellations", {
          id: this.chedan_id,
          jyPassword: this.password_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.getHistoryOrder(3)
            this.$Message.success('撤单成功')
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
    // 汇率
    gethuilv (coin, num) {
      this.$http.post(this.host + "/exchange/accessRecord/getCoinRate", {
        unit: coin.type == 1 ? coin.borrowMoney.pledgeCoin.name : coin.pledgeCoin.name
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.huilv_ = res.data.message
          this.bucang_num = Number(num) * 0.7 * Number(this.huilv_)
          //请求到汇率显示补仓弹框
          this.bucang_show = true
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 补仓
    bucang () {
      if (this.password_ == '') {
        this.$Message.error('请输入交易密码')
      } else {
        this.$http.post(this.host + "/exchange/accessRecord/variationCall", {
          jyPassword: this.password_,
          accessRecordId: this.bucang_id,
          money: this.bucang_num
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.$Message.success('补仓成功')
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
    // 还款
    huan () {
      if (this.password_ == '') {
        this.$Message.error('请输入交易密码')
      } else {
        this.$http.post(this.host + "/exchange/accessRecord/repayment", {
          jyPassword: this.password_,
          accessId: this.id_,
          money: this.num_
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.$Message.success('还款成功')
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
    // 借入借出单
    getHistoryOrder (type) {
      this.arr1 = []		//清空保存质押率的数据
      console.log(type)
      //0借入 1借出 2我发布的借入	3我发布的借出
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
                v.caozuo = '操作'
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
    // 我的借入记录
    columns () {
      const arr = []
      arr.push({
        title: this.$t('zhiya.jieru.dh'),
        key: "id",
        render: (h, params) => {
          // 单号
          return h('span', {}, params.row.id)
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.qx'),
        key: "period",
        render: (h, params) => {
          // 期限
          // type为1从borrowMoney中取值,type为0从loanMoney中取值
          return h('span', {}, params.row.type == 1 ? params.row.borrowMoney.period + '天' : params.row.loanMoney.period +
            '天')
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.yzy'),
        key: "pledgeMoney",
        render: (h, params) => {
          // 已质押
          // type为1从borrowMoney中取值,type为0从最外层中取值
          return h(
            "span", {}, params.row.type == 1 ? params.row.borrowMoney.pledgeMoney : params.row.pledgeMoney
          )
        }
      })
      arr.push({
        title: this.$t('zhiya.jieru.zyl'),
        key: "borrowMoney",
        render: (h, params) => {
          // 质押率
          // type为1从borrowMoney中取值,type为0从最外层中取值
          // 当前质押率 = 借入金额 / （质押金额 * 汇率）
          var zyl = ''
          if (params.row.type == 1) {
            zyl = Number(params.row.money / (params.row.borrowMoney.pledgeMoney * Number(this.arr1[params.index])) * 100)
              .toFixed(2)
          } else {
            zyl = Number(params.row.money / (params.row.pledgeMoney * Number(this.arr1[params.index])) * 100).toFixed(2)
          }
          console.log('汇率' + this.arr1[params.index])
          console.log('质押率' + this.zyl)
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
          // 到期利息
          // 从最外层中取值
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
          if (params.row.reminder == 1 && params.row.status != 3) { //显示补仓和还款
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
                    //显示还款弹框
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
                    //显示还款弹框
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
                      //显示还款弹框
                      this.password_ = ''
                      this.huankuan_show = true
                    }
                  }
                }, this.$t("bijiedai.huankuan"))
              ]
              )
            } else if (params.row.status == 1) {
              return h('span', {}, '逾期中')
            } else if (params.row.status == 2) {
              return h('span', {}, '已借入')
            } else if (params.row.status == 3) {
              return h('span', {}, '已完成')
            }
          }
        }
      })
      return arr
    },
    // 我的借出记录
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
          // 期限
          // type为1从borrowMoney中取值,type为0从loanMoney中取值
          return h('span', {}, params.row.type == 1 ? params.row.borrowMoney.period + '天' : params.row.loanMoney.period +
            '天')
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
            return h('span', {}, '已借出')
          } else if (params.row.status == 1) {
            return h('span', {}, '逾期中')
          } else if (params.row.status == 2) {
            return h('span', {}, '已借入')
          } else if (params.row.status == 3) {
            return h('span', {}, '已完成')
          }
        }
      })
      return arr
    },
    // 我发布的借入记录
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
          return h('span', {}, params.row.period + '天')
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
                    this.chedan_type = '借入'
                    this.chedan_show = true
                  }
                }
              }, '撤单')
            ]
            )
          } else if (params.row.status == 1) {
            return h('span', {}, '已完成')
          } else if (params.row.status == 2) {
            return h('span', {}, '已售空')
          } else if (params.row.status == 3) {
            return h('span', {}, '已撤单')
          }
        }
      })
      return arr
    },
    // 我发布的借出记录
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
          return h('span', {}, params.row.period + '天')
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
                    this.chedan_type = '借出'
                    this.chedan_show = true
                  }
                }
              }, '撤单')
            ]
            )
          } else if (params.row.status == 1) {
            return h('span', {}, '已完成')
          } else if (params.row.status == 2) {
            return h('span', {}, '已售空')
          } else if (params.row.status == 3) {
            return h('span', {}, '已撤单')
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
