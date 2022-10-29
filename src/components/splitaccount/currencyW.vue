<template>
    <div class="shaow">
        <div class="flex flex-pack-between flex-align-center wAll">
            <div>
                <span class="zczh">{{$t('other.ot30')}}</span>
                <div>
                    <span class="btcZc">{{zhUSDT | format4}}<span class="span1">USDT</span></span><span class="span2">≈￥{{totalZc | format4}}</span></div>
            </div>
            <div>
                <span style="padding-right: 5px;">{{$t('myAccount._display')}}</span>
                <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
                    <span slot="open"></span>
                    <span slot="close"></span>
                </i-switch>
            </div>
        </div>
        <div class="order-table" style="margin-top: 15px;">
            <Table stripe class="pubTable table zcTable" :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
        </div>
        <transfermodal :modal="modal" @closetransferModal="closeModal" :getmoney="getMoney"></transfermodal>
    </div>
</template>
<script>
    import transfermodal from "../transfer/Index"
    export default {
        // props: ["modal"],
        components:{transfermodal},
        inject:['reload'],
        data() {
            return {
                modal:false,
                tableMoney: [],
                loading: true,
                googleSwitch:false,
                hiddenAccountData:[],
                showAccountData:[],
                totalZc:0,
                zhUSDT:0,
            CNYRate:0,
            usdtTot:0,
            usdtNum:0
            }
        },
        filters:{
            format4:function (val) {
                return val.toFixed(4)
            }
        },
        created() {
            this.modal = false;
            this.getMoney();
        },
        methods: {
            closeModal(){
                this.modal = false;
            },
            changeGoogleSwitch(){
                this.googleSwitch?this.tableMoney=this.hiddenAccountData:this.tableMoney=this.showAccountData;
            },
            getMoney() {
                this.getCNYRate()
                this.$http.post(this.host + "/uc/contract/get-coin-wallet").then(response => {
                    var resp = response.body;
					console.log(resp)
                    if (resp.code == 0) {
                        this.tableMoney = resp.data;
                        this.showAccountData=this.tableMoney;
                        for (let i = 0; i < this.tableMoney.length; i++) {
                           this.tableMoney[i]["coinType"] = this.tableMoney[i].coinId;
                            if(this.tableMoney[i].coin!=null){
                                if( this.tableMoney[i].coin.cnyRate != null && this.tableMoney[i].coin.cnyRate != '') {
                                     this.tableMoney[i].cnyZh = this.tableMoney[i].balance.mul(this.tableMoney[i].coin.cnyRate);
                                     this.tableMoney[i].djCnyZh = this.tableMoney[i].frozenBalance.mul(this.tableMoney[i].coin.cnyRate);
                                     this.tableMoney[i].totalCny = this.tableMoney[i].cnyZh+this.tableMoney[i].djCnyZh;
                                     this.totalZc+=this.tableMoney[i].totalCny;
                                }
                                if(this.tableMoney[i].coin.unit!='USDT'){
                                    this.usdtTot+=this.tableMoney[i].totalCny;
                                }else if(this.tableMoney[i].coin.unit=='USDT'){
                                    this.usdtNum=this.tableMoney[i].frozenBalance+this.tableMoney[i].balance;
                                }
                            }else{
                                this.tableMoney[i].cnyZh=0;
                            }
                            if(this.tableMoney[i].balance != "0" || this.tableMoney[i].frozenBalance != "0" || this.tableMoney[i].releaseBalance != "0"){
                                this.hiddenAccountData.push(this.tableMoney[i]);
                            }
                        }
                        this.zhUSDT=this.totalZc.div(this.CNYRate)
                        this.loading = false;
                    } else {
                        // this.$Message.error(this.loginmsg);
                        this.loading = false;
                    }

                });
                this.loading = false;
            },
            getCNYRate() {
                this.$http
                    .post(this.host + "/market/exchange-rate/usd-cny")
                    .then(response => {
                        let resp = response.body;
                        this.CNYRate = resp.data;
                    // this.zhUSDT=this.usdtTot.div(this.CNYRate)+this.usdtNum;
                    // this.zhUSDT=this.zhUSDT.toFixed(8)
                    
                    });
            }

        },
        computed: {
            tableColumnsMoney() {
                let self = this;
                let columns = [];
                columns.push({
                    title: this.$t("uc.finance.money.cointype"),
                    key: "coinType",
                    width: 100,
                    align: "center"
                });
                columns.push({
                    title: this.$t("uc.finance.money.balance"),
                    key: "balance",
                    align: "center",
                    render(h, params) {
                        let showZh = params.row.balance>0?'block':'none';
                        return h('div',[
                                h("div",
                                    {
                                        attrs: {
                                            title: params.row.balance
                                        },
                                        style:{
                                            fontSize:'15px',
                                            fontWeight:'bold',
                                            color:'#1ebb88'
                                        }
                                    },
                                    self.toFloor(params.row.balance || "0")),
                                h( "div",
                                    {
                                        style:{
                                            paddingLeft:'5px',
                                            display:showZh
                                        }
                                    },
                                        params.row.cnyZh==0?'':self.toFloor('≈￥'+(params.row.cnyZh).toFixed(2)||'0')
                                    
                                    )

                            ]
                        );
                    }
                });
                columns.push({
                    title: this.$t("uc.finance.money.frozen"),
                    key: "frozenBalance",
                    align: "center",
                    render(h, params) {
                        return h(
                            "span",
                            {
                                attrs: {
                                    title: params.row.frozenBalance
                                }
                            },
                            self.toFloor(params.row.frozenBalance || "0")
                        );
                    }
                });
                columns.push({
                    title: this.$t("uc.finance.money.operate"),
                    key: "price1",
                    // width: 400,
                    align: "center",
                    render: (h, params)=> {
                       return h('Button', {
                           props: {
                               type: "info",
                           },
                           on: {
                               click: () => {
                                   this.modal = true;
                               }
                           },
                           style: {
                               // marginRight: "8px",
                               background:'none',
                               borderRadius:'15px',
                               color:"#39f",
                               height:'25px',
                               lineHeight:'25px',
                               paddingTop:'0',
                               paddingBottom:'0'
                           }
                       }, '划转');
                    }
                });
                return columns;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .zczh{
        font-size: 24px;
    }
    .btcZc{
        font-size: 24px;
        color:#F78C25;
    }
    .span1{
        color:#333;
        padding:0 3px;
    }
    .span2{
        color:#888;
    }
    .table .ivu-table-cell{
        padding-left: 10px !important;
        padding-right: 10px !important;
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
