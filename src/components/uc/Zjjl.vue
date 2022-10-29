<style lang="scss" scoped>
.entrustcurrent {
  float: left;
  width: 82%;
  padding-left: 30px;
}
.table .ivu-table-cell {
  padding-left: 10px !important;
  padding-right: 10px !important;
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
.selectHy {
  margin-bottom: 20px;
  .namehys {
    line-height: 32px;
    margin-right: 10px;
    color: #1ebb88;
    font-weight: bold;
  }
}
.table .ivu-table-cell-expand {
  color: #3399ff;
}
.form .clear_btn {
  &:hover {
    color: #3399ff;
    border-color: #3399ff;
  }
  &:focus {
    // background-color: #fff;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    color: #3399ff;
    border-color: #3399ff;
  }
}
</style>

<template>
  <div class="entrustcurrent">
    <div class="flex flex-pack-end selectHy">
      <div class="flex flex-aglin-center flex-pack-center">
        <span class="namehys">{{ $t("contract.hy6") }}</span>
        <i-select
          :model.sync="model1"
          style="width: 200px"
          :placeholder="$t('common.select')"
        >
          <i-option v-for="item in hyList" :value="item.id" :key="item">{{
            item.value
          }}</i-option>
        </i-select>
      </div>
    </div>
    <div class="table wtTable">
      <Table
        stripe
        :no-data-text="$t('common.nodata')"
        :columns="wtColumn"
        :data="orders1"
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
      model1: '',
      hyList: [
        { id: 1, value: 'BTC/USDT' },
        { id: 2, value: 'ETH/USDT' },
        { id: 3, value: 'EOS/USDT' },
        { id: 4, value: 'BTC/USDT' },
        { id: 5, value: 'BTC/USDT' },
        { id: 6, value: 'BTC/USDT' },
      ],
      coinLs: [
        {
          name: "BTC",
          val: 0
        }, {
          name: "ETH",
          val: 1
        }, {
          name: "USD",
          val: 2
        }
      ],
      typeCash: [
        {
          val: 0,
          name1: '全部',
          name2: ''
        }, {
          val: 1,
          name1: '提现',
          name2: ''
        }, {
          val: 2,
          name1: '退款',
          name2: ''
        }, {
          val: 3,
          name1: '充值',
          name2: ''
        }, {
          val: 4,
          name1: '当日已结盈亏',
          name2: ''
        }, {
          val: 5,
          name1: '佣金',
          name2: ''
        }],
      formItem: {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      },
      wtColumn: [
        {
          title: self.$t('uc.hy.hy17'),
          key: 'hy1'
        }, {
          title: self.$t('uc.hy.hy18'),
          key: 'hy2'
        }, {
          title: self.$t('uc.hy.hy19'),
          key: 'hy3'
        }
      ],
      orders: [],
      orders1: [
        { hy1: '2020-03-13', hy2: 196.93, hy3: 0 }, { hy1: '2020-03-12', hy2: 400, hy3: 0 }]
    }
  },



  watch: {
    "$i18n.locale": {
      handler (newVal) {
        this.locale = newVal
        this.updateTitle()
      },
      immediate: true
    }
  },
  created () {
    // this.getHistoryOrder();
    // this.getSymbol();
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
    getHistoryOrder () {
      //查询历史委托
      this.loading = true
      const { symbol, type, direction, date: rangeDate } = this.formItem,
        startTime = new Date(rangeDate[0]).getTime() || "",
        endTime = new Date(rangeDate[1]).getTime() || ""
      let params = {}
      if (symbol) params.symbol = symbol
      if (direction) params.direction = direction
      if (type) params.type = type
      if (startTime) params.startTime = startTime
      if (endTime) params.endTime = endTime
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      var that = this
      this.orders = []
      this.$http
        .post(this.host + "/exchange/order/personal/current", params)
        .then(response => {
          var resp = response.body
          let rows = []
          if (resp.content.length > 0) {
            this.total = resp.totalElements
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i]
              row.price =
                row.type == "MARKET_PRICE"
                  ? that.$t("exchange.marketprice")
                  : row.price
              rows.push(row)
            }
            this.orders = rows
          }
          this.loading = false
        })
    },
    // getSymbol() {
    //     this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
    //         var resp = response.body;
    //         if (resp.length > 0) {
    //             this.symbol = resp;
    //         }
    //     });
    // },
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
    },
    updateTitle: function () {
      this.wtColumn[0].title = this.$t('uc.hy.hy17')
      this.wtColumn[1].title = this.$t('uc.hy.hy18')
      this.wtColumn[2].title = this.$t('uc.hy.hy19')
    }
  },
  computed: {

  }
};
</script>

