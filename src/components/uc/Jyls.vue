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
.selectHy {
  margin-bottom: 20px;

  .namehys {
    line-height: 32px;
    margin-right: 10px;
    color: #f0a70a;
    font-weight: bold;
  }
}

.entrustcurrent .ivu-table th,
.entrustcurrent .ivu-table td {
  text-align: center;
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
          v-model="model1"
          style="width: 200px"
          :placeholder="$t('common.select')"
        >
          <i-option v-for="(item, i) in hyList" :value="item.symbol" :key="i"
            >{{ item.contractCoin.coinSymbol
            }}{{ item.symbol == "all" ? "" : "/USDT" }}
          </i-option>
        </i-select>
      </div>
    </div>
    <div class="table wtTable">
      <Table
        stripe
        :no-data-text="$t('common.nodata')"
        :columns="wtColumn"
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
import expandRow from "@components/exchange/contractpand.vue"

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
      hyList: [],
      wtColumn: [
        {
          type: "expand",
          width: 30,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                skin: params.row.skin,
                rows: params.row.detail
              }
            })
          }
        },
        {
          title: self.$t('uc.hy.hy1'),
          key: 'baseSymbol',
          width: '100',
          render: function (h, params) {
            return h('span', {}, params.row.coinSymbol + '/' + params.row.baseSymbol)
          }
        },
        {
          title: self.$t('uc.hy.hy2'),
          key: 'direction',
          render: (h, params) => {
            let font = params.row.direction == 'BUY' ? this.$t('uc.hy.hy3') : this.$t('uc.hy.hy4')
            let color = params.row.direction == 'BUY' ? '#1EBB88' : 'red'
            return h('span', {
              style: {
                color: color
              }
            }, font)
          }
        },
        {
          title: self.$t('uc.hy.hy5'),
          key: 'positionFlag',
          render: (h, params) => {
            let font = params.row.positionFlag == 'designate' ? self.$t('uc.hy.hy6') : self.$t('uc.hy.hy7')
            return h('span', {}, font)
          }
        },
        {
          title: self.$t('uc.hy.hy13'),
          key: 'tradeNowp'
        },
        {
          title: self.$t('uc.hy.hy8'),
          key: 'price'
        },
        {
          title: self.$t('uc.hy.hy20'),
          key: 'yingKui',
          render: (h, params) => {

            let color = params.row.yingKui > 0 ? '#1EBB88' : 'red'
            return h('span', {
              style: {
                color: color
              }
            }, params.row.yingKui)

          },
        },
        {
          title: self.$t('uc.hy.hy9'),
          key: 'type',
          render: (h, params) => {
            var font
            if (params.row.type == 'LIMIT_PRICE') {
              font = this.$t('contract.zyzst.wt15')
            } else if (params.row.type == 'MARKET_PRICE') {
              font = this.$t('contract.ycj.wt14')
            } else if (params.row.type == 'PLAN_PRICE') {
              font = this.$t('contract.jhwt')
            } else if (params.row.type == 'CHECK_FULL_STOP') {
              font = this.$t('contract.ZYZS')
            }

            return h('div', { domProps: { innerHTML: `<span>${font}</span>` } })
          }
        },
        {
          title: self.$t('uc.hy.hy12'),
          width: '180',
          key: 'listtime'
        }],
      orders: []
    }
  },
  watch: {
    "$i18n.locale": {
      handler (newVal) {
        this.locale = newVal
        this.updateTitle()
      },
      immediate: true
    },
    'model1': {
      handler (newVal) {
        this.getHistoryOrder(newVal)
      },
      immediate: true
    }
  },
  created () {
    this.getHistoryOrder('all')
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
      console.log(data)
      this.pageNo = data
      this.getHistoryOrder(this.model1)
    },
    searchCoin: function (val) {
      this.getHistoryOrder(val)
    },
    getHistoryOrder (symbol) {
      //查询历史委托
      let that = this
      this.loading = true
      this.orders = []
      this.$http
        .post(this.host + "/contract-api/contract-order/personal/history", {
          symbol: symbol == 'all' ? '' : symbol,
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          status: 2
        })
        .then(response => {
          let resp = response.body
          let rows = []
          if (resp.content.length > 0) {
            this.total = resp.totalElements
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i]
              row.listtime = that.dateFormat(row.listTime)
              rows.push(row)
            }
            this.orders = rows
          }
          this.loading = false
        })
    },
    getSymbol () {
      this.$http.post(this.host + this.api.contract.thumb, {}).then(response => {
        let resp = response.body
        this.hyList = resp
        this.hyList.unshift({ contractCoin: { coinSymbol: '全部' }, symbol: 'all' })
      })
    },
    updateTitle: function () {
      this.wtColumn[1].title = this.$t('uc.hy.hy1')
      this.wtColumn[2].title = this.$t('uc.hy.hy2')
      this.wtColumn[3].title = this.$t('uc.hy.hy5')
      this.wtColumn[4].title = this.$t('uc.hy.hy13')
      this.wtColumn[5].title = this.$t('uc.hy.hy8')
      this.wtColumn[6].title = this.$t('uc.hy.hy20')
      this.wtColumn[7].title = this.$t('uc.hy.hy9')
      this.wtColumn[8].title = this.$t('uc.hy.hy12')
    }
  },
  computed: {}
};
</script>

