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
    border-color: #1ebb88;
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
    <Form class="form" :model="formItem" label-width="60" inline>
      <FormItem
        :label-width="locale == 'en' ? 60 : 60"
        :label="$t('ieo.ieo29')"
      >
        <DatePicker
          type="datetime"
          :placeholder="$t('ieo.ieo17')"
          v-model="formItem.date1"
          style="width: 180px"
        ></DatePicker>
        <DatePicker
          type="datetime"
          :placeholder="$t('ieo.ieo18')"
          v-model="formItem.date2"
          style="width: 180px"
        ></DatePicker>
      </FormItem>
      <FormItem :label="$t('ieo.ieo30')">
        <Select
          v-model="formItem.symbol"
          style="width: 100px"
          :placeholder="$t('header.choose')"
        >
          <Option
            v-for="(item, index) in symbol"
            :value="item.coinSymbol"
            :key="index"
            >{{ item.coinSymbol }}</Option
          >
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">{{
          $t("historyAndCu.search")
        }}</Button>
        <Button
          style="margin-left: 8px"
          @click="handleClear"
          class="clear_btn"
          >{{ $t("historyAndCu.clear") }}</Button
        >
      </FormItem>
    </Form>
    <div class="table">
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
    this.getHistoryOrder()
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
    getSymbol () {
      this.$http.post(this.host + "/contract-api/contract-coin/base-symbol", {}).then(response => {
        var resp = response.body

        if (resp.data.length > 0) {
          this.symbol = resp.data
        }
      })
    },
    getHistoryOrder () {
      //查询历史委托
      // this.loading = true;
      var that = this
      const symbol = that.formItem.symbol
      const startTime = new Date(that.formItem.date1).getTime() || ""
      const endTime = new Date(that.formItem.date2).getTime() || ""
      let params = {}
      if (symbol) params.saleCoin = symbol
      if (startTime) params.startTime = startTime
      if (endTime) params.endTime = endTime
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      this.orders = []
      this.$http
        .post(this.host + "/exchange/ieo/order-ieo", params)
        .then(response => {
          var resp = response.body
          let rows = []
          this.orders = resp.data.content
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
        key: "saleCoin"
      })
      arr.push({
        title: this.$t("exchange.num"),
        key: "receiveAmount",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.receiveAmount
              }
            },
            params.row.receiveAmount.toFixed(4)
          )
        }
      })
      arr.push({
        title: this.$t("exchange.price"),
        key: "ratio",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.ratio
              }
            },
            params.row.ratio.toFixed(4)
          )
        }
      })
      arr.push({
        title: this.$t('ieo.zj') + '(USDT)',
        key: "receiveAmount",
        render: (h, params) => {
          return h(
            "span",
            {
            },
            this.toFloor(params.row.receiveAmount.mul(params.row.ratio).toFixed(4))
          )
        }
      })
      arr.push({
        title: this.$t('uc.finance.record.status'),
        key: "status",
        render: (h, params) => {
          return h(
            "span",
            {},
            this.$t('exchange.finished')
          )
        }
      })
      arr.push({
        title: this.$t("otc.myad.created"),
        key: "createTime",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.createTime
              }
            },
            params.row.createTime
          )
        }
      })
      return arr
    }
  }
};
</script>

