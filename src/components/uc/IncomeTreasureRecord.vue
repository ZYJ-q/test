<style lang="scss" scoped>
.entrustcurrent {
  float: left;
  width: 82%;
  padding-left: 30px;
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
<style lang="scss">
.entrustcurrent .ivu-table th,
.entrustcurrent .ivu-table td {
  text-align: center;
}
.table .ivu-table-cell-expand {
  color: #f0a70a;
}

.form .clear_btn {
  &:hover {
    color: #f0a70a;
    border-color: #141e2c;
  }
  &:focus {
    // background-color: #fff;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    color: #f0a70a;
    border-color: #141e2c;
  }
}
</style>

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
        <Tab-pane :label="$t('syb.syb18')" class="IEOIng" key="key1">
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns"
            :data="orders"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage"
            ></Page>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('syb.syb19')" class="IEOIng" key="key2">
          <Table
            class="pubTable tableBorder"
            :no-data-text="$t('common.nodata')"
            :columns="columns2"
            :data="orders"
            :loading="loading"
          ></Table>
          <div class="page">
            <Page
              :total="total"
              :pageSize="pageSize"
              :current="pageNo"
              @on-change="loadDataPage"
            ></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>
<script>
var moment = require("moment")
import expandRow from "@components/exchange/expand.vue"


export default {
  components: { expandRow },
  data () {
    const self = this
    return {
      locale: '',
      loading: false,
      pageSize: 10,
      pageNo: 1,
      total: 10,
      symbol: [],
      formItem: {
        symbol: "",
        type: "",
        date1: "",
        date2: "",
      },
      orders: []
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
  created () {
    this.getHistoryOrder(0)
    this.getSymbol()
  },
  methods: {
    dateFormat: function (tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss")
    },
    timeFormat: function (tick) {
      return moment(tick).format("HH:mm:ss")
    },
    loadDataPage (data) {
      this.pageNo = data
      this.getHistoryOrder()
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
    getHistoryOrder (status) {
      //查询历史委托
      let params = {}
      params.status = status
      this.orders = []
      this.$http
        .post(this.host + "/exchange/earningsTreasure/getMyEarningsTreasure", params)
        .then(response => {
          var resp = response.body
          let rows = []
          if (resp.data.content.length > 0) {
            this.orders = resp.data.content
          }
          this.loading = false
        })
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
    columns () {
      const arr = []
      arr.push({
        title: this.$t('uc.finance.record.symbol'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.coin)
        }
      })
      arr.push({
        title: this.$t('syb.syb21'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.raisePlatform)
        }
      })
      arr.push({
        title: this.$t("exchange.num"),
        key: "buyAmount",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.buyAmount
              }
            },
            params.row.buyAmount.toFixed(4)
          )
        }
      })
      arr.push({
        title: this.$t('syb.syb20'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.period + '(天)')
        }
      })
      arr.push({
        title: this.$t("otc.myad.created"),
        key: "buyDate",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.buyDate
              }
            },
            params.row.buyDate
          )
        }
      })
      return arr
    },
    columns2 () {
      const arr = []
      arr.push({
        title: this.$t('uc.finance.record.symbol'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.coin)
        }
      })
      arr.push({
        title: this.$t('syb.syb21'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.raisePlatform)
        }
      })
      arr.push({
        title: this.$t("exchange.num"),
        key: "buyAmount",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.buyAmount
              }
            },
            params.row.buyAmount.toFixed(4)
          )
        }
      })
      arr.push({
        title: this.$t('syb.syb20'),
        key: "earnings",
        render: (h, params) => {
          return h('span', {}, params.row.earnings.period + '(' + this.$t('syb.syb22') + ')')
        }
      })
      arr.push({
        title: this.$t("otc.myad.created"),
        key: "buyDate",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.buyDate
              }
            },
            params.row.buyDate
          )
        }
      })
      return arr
    }
  }
};
</script>

