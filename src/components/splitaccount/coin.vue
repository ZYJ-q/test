<template>
    <div class="shaow">
        <div class="flex flex-pack-between flex-align-center wAll">
            <div>
                <span class="zczh">{{$t('other.ot30')}}</span>
                <div>
                    <span class="btcZc">{{zhUSDT}}<span class="span1">USDT</span></span><span class="span2">≈￥{{totalZc}}</span></div>
            </div>
            <div>
                <span style="padding-right: 5px;">{{$t('contract.hy2')}}</span>
                <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
                    <span slot="open"></span>
                    <span slot="close"></span>
                </i-switch>
            </div>
        </div>
        <div class="order-table" style="margin-top: 15px;">
            <Table stripe class="pubTable table zcTable"  :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
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
            this.$http.post(this.host + "/uc/asset/wallet").then(response => {
                var resp = response.body;
                this.totalZc=0;
                if (resp.code == 0) {
                    this.tableMoney = resp.data;
                    this.showAccountData=this.tableMoney;
                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
                        this.tableMoney[i].cnyZh = this.tableMoney[i].balance.mul(this.tableMoney[i].coin.cnyRate);
                        this.tableMoney[i].djCnyZh = this.tableMoney[i].frozenBalance.mul(this.tableMoney[i].coin.cnyRate);
                        this.tableMoney[i].totalCny = this.tableMoney[i].cnyZh+this.tableMoney[i].djCnyZh;
                        this.totalZc+=this.tableMoney[i].totalCny;
                        if(this.tableMoney[i].coin.unit!='USDT'){
                            this.usdtTot+=this.tableMoney[i].totalCny;
                        }else if(this.tableMoney[i].coin.unit=='USDT'){
                            this.usdtNum=this.tableMoney[i].frozenBalance+this.tableMoney[i].balance;
                        }
                        if(this.tableMoney[i].balance != "0" || this.tableMoney[i].frozenBalance != "0" || this.tableMoney[i].releaseBalance != "0"){
                            this.hiddenAccountData.push(this.tableMoney[i]);
                        }
                    }
                    this.totalZc=this.totalZc.toFixed(8)
                    this.getCNYRate();
                    this.loading = false;
                } else {
                    this.$Message.error(this.loginmsg);
                }
            });
        },
        getCNYRate() {
            this.$http
                .post(this.host + "/market/exchange-rate/usd-cny")
                .then(response => {
                    let resp = response.body;
                    this.CNYRate = resp.data;
                    this.zhUSDT=this.usdtTot.div(this.CNYRate)+this.usdtNum;
                    this.zhUSDT=this.zhUSDT.toFixed(8);
                    console.log(this.zhUSDT)

                });
        },
        resetAddress(unit) {
            let params = {};
            if(unit=='USDT'){
                params["USDTType"] = 'ERC20';
            }else if(unit=='EOS'){
                params["USDTType"]=1
            }
            params["unit"]=unit;
            let that = this;
            this.$http.post(this.host + "/uc/asset/wallet/reset-address", params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(this.$t("uc.finance.money.resetsuccess"));
                    // this.getMoney();
                    setTimeout(function () {
                        that.getMoney();
                        // that.reload();
                        that.$router.push({path: '/uc/recharge', query: {name: unit }});
                        window.location.reload();
                    }, 3000);
                } else {
                    this.$Message.error(resp.message);
                }
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
                // 可用资产
                title: this.$t("uc.finance.money.balance"),
                key: "balance",
                align: "center",
                render(h, params) {
                    let showZh = params.row.balance>0?'block':'none'
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
                                self.toFloor('≈￥'+(params.row.cnyZh).toFixed(6) || "0"))

                        ]
                    );
                }
            });
            columns.push({
                // 冻结资产
                title: this.$t("uc.finance.money.frozen"),
                key: "frozenBalance",
                align: "center",
                render(h, params) {
                    let showZh = params.row.frozenBalance>0?'block':'none'
                    return h('div',[
                            h("div",
                                {
                                    attrs: {
                                        title: params.row.frozenBalance
                                    },
                                    style:{
                                        fontSize:'15px'
                                    }
                                },
                                self.toFloor(params.row.frozenBalance || "0")),
                            h( "div",
                                {
                                    style:{
                                        paddingLeft:'5px',
                                        display:showZh
                                    }
                                },
                                self.toFloor('≈￥'+(params.row.djCnyZh).toFixed(8) || "0"))

                        ]
                    );
                }

            });
            columns.push({
                title: this.$t("uc.finance.money.needreleased"),
                align: "center",
                render(h, params) {
                    return h(
                        "span",
                        {
                            attrs: {
                                title: params.row.toReleased
                            }
                        },
                        self.toFloor(params.row.toReleased || "0")
                    );
                }
            });
            columns.push({
                title: this.$t("uc.finance.money.operate"),
                key: "price1",
                width: 300,
                align: "center",
                render: (h, params)=> {
                    var actions = [];
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
                                                );
                                            }
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    },
                                    self.$t("uc.finance.money.charge")
                                )
                            );
                        } else {
                            //   获取地址按钮;
                            actions.push(
                                h("Button",
                                    {
                                        props: { type: "info", size: "small" },
                                        on: {
                                            click: function () {
                                                self.resetAddress(params.row.coin.unit);
                                                /*self.$router.push(
                                                    "/uc/recharge?name=" + params.row.coin.unit
                                                );*/
                                            }
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    },
                                    self.$t("uc.finance.money.getaddress")
                                )
                            );
                        }
                    }
                    if (params.row.coin.canWithdraw == 1) {
                        // 提币;
                        actions.push(
                            h("Button", {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                on: {
                                    click: function () {
                                        self.$router.push(
                                            "/uc/withdraw?name=" + params.row.coin.unit
                                        );
                                    }
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            },
                                self.$t("uc.finance.money.pickup")
                            )
                        );
                    }
                    const btn = h('Button', {
                        props: {
                            type: "info",
                        },
                        on: {
                            click: () => {
                                this.modal = true;
                            }
                        },
                        style: {
                            marginRight: "8px",
                        }
                    }, self.$t("myAccount._rollout"));
                    actions.push(btn);
                    return h("p", actions);
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
</style>
