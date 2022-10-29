<template>
    <div class="content-wraps">
        <div class="ieo-banner wAll">
            <img src="../../assets/images/sybBanner.png" alt="" class="wAll">
        </div>
        <div class="bgWhite">
            <div class="ieo_main">
                <Spin size="large" class="loadingPub" v-show="showLoading"></Spin>
                <div class="ieo_tab">
                    <router-link to="/uc/IncomeTreasureRecord" class="jumpIeo" v-show="isLogin">{{$t('syb.syb23')}}</router-link>
                    <Tabs active-key="key1" class="ieo_tab2" animated="false">
                        <Tab-pane :label="$t('ieo.ieo1')" class="IEOIng" key="key1">
                            <div class="sybBox" v-if="ieo.ieoIng.length>0">
                                <div class="sybItem flex flex-align-center" v-for="(item,index) in ieo.ieoIng" :key="index">
                                    <div class="yearRate">
                                        <div class="tCenter">{{item.interestRate}}%</div>
                                        <div class="tCenter uMainGray">{{$t('syb.syb1')}}</div>
                                    </div>
                                    <div class="sybZq">
                                        <div class="flex flex-align-center flex-pack-center row1">
                                            <img :src="item.coin.logo" alt="">
                                            <span>{{item.coin.name}}</span>
                                        </div>
                                        <div class="zqSquare">
                                            <div class="flex flex-align-center flex-pack-center">
                                                <span class="uMainGray">{{$t('syb.syb2')}}</span>
                                                <span>{{item.period}}{{$t('syb.syb10')}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="lcInfo l1">
                                        <div>
                                            <p class="uMainGray">{{item.title}}</p>
                                            <p>{{item.coin.name}}{{$t('syb.syb3')}}</p>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb4')}}</p>
                                            <p>{{item.raisePlatform}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l2">
                                    <div>
                                        <p class="uMainGray">{{$t('syb.syb5')}}</p>
                                        <p>{{item.startTime}} ~{{item.endTime}}</p>
                                    </div>
                                    <div>
                                        <p class="uMainGray">{{$t('syb.syb6')}}</p>
                                        <p>{{item.minBuyAomunt}}-{{item.maxBuyAomunt}}</p>
                                    </div>
                                </div>
                                    <div class="lcInfo l3">
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb7')}} {{item.rate}}%</p>
                                            <Progress :percent="item.rate" hide-info></Progress>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb8')}}</p>
                                            <p>{{item.syNumber}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l4 flex flex-align-center">
                                        <button @click="showIeoModal(item)">{{$t('syb.syb9')}}</button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>{{$t('common.nodata')}}</span>
                            </div>
                        </Tab-pane>
                        <Tab-pane :label="$t('ieo.ieo2')" class="IEONoStart" key="key2">
                            <div class="sybBox" v-if="ieo.ieoStart.length>0">
                                <div class="sybItem flex flex-align-center" v-for="(item,index) in ieo.ieoStart" :key="index">
                                    <div class="yearRate">
                                        <div class="tCenter">{{item.interestRate}}%</div>
                                        <div class="tCenter uMainGray">{{$t('syb.syb1')}}</div>
                                    </div>
                                    <div class="sybZq">
                                        <div class="flex flex-align-center flex-pack-center row1">
                                            <img :src="item.coin.logo" alt="">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="zqSquare">
                                            <div class="flex flex-align-center flex-pack-center">
                                                <span class="uMainGray">{{$t('syb.syb2')}}</span>
                                                <span>{{item.period}}{{$t('syb.syb10')}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="lcInfo l1">
                                        <div>
                                            <p class="uMainGray">{{item.title}}</p>
                                            <p>{{item.coin.name}}{{$t('syb.syb3')}}</p>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb4')}}</p>
                                            <p>{{item.raisePlatform}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l2">
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb5')}}</p>
                                            <p>{{item.startTime}} ~{{item.endTime}}</p>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb6')}}</p>
                                            <p>{{item.minBuyAomunt}}-{{item.maxBuyAomunt}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l3">
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb7')}} {{item.rate}}%</p>
                                            <Progress :percent="item.rate" hide-info></Progress>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb8')}}</p>
                                            <p>{{item.syNumber}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l4 flex flex-align-center">
                                        <button @click="noOpen">{{$t('syb.syb14')}}</button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>{{$t('common.nodata')}}</span>
                            </div>
                        </Tab-pane>
                        <Tab-pane :label="$t('ieo.ieo3')" class="IEOFinish" key="key3">
                            <div class="sybBox" v-if="ieo.ieoEnd.length>0">
                                <div class="sybItem flex flex-align-center" v-for="(item,index) in ieo.ieoEnd" :key="index">
                                    <div class="yearRate">
                                        <div class="tCenter">{{item.interestRate}}%</div>
                                        <div class="tCenter uMainGray">{{$t('syb.syb1')}}</div>
                                    </div>
                                    <div class="sybZq">
                                        <div class="flex flex-align-center flex-pack-center row1">
                                            <img :src="item.coin.logo" alt="">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="zqSquare">
                                            <div class="flex flex-align-center flex-pack-center">
                                                <span class="uMainGray">{{$t('syb.syb2')}}</span>
                                                <span>{{item.period}}{{$t('syb.syb10')}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="lcInfo l1">
                                        <div>
                                            <p class="uMainGray">{{item.title}}</p>
                                            <p>{{item.name}}{{$t('syb.syb3')}}</p>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb4')}}</p>
                                            <p>{{item.raisePlatform}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l2">
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb5')}}</p>
                                            <p>{{item.startTime}} ~{{item.endTime}}</p>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb6')}}</p>
                                            <p>{{item.minBuyAomunt}}-{{item.maxBuyAomunt}}</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l3">
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb7')}} 100%</p>
                                            <Progress percent="100" hide-info></Progress>
                                        </div>
                                        <div>
                                            <p class="uMainGray">{{$t('syb.syb8')}}</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div class="lcInfo l4 flex flex-align-center">
                                        <button class="endBtn" @click="finish">{{$t('syb.syb13')}}</button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>{{$t('common.nodata')}}</span>
                            </div>
                        </Tab-pane>
                    </Tabs>
                </div>
            </div>
        </div>

        <Modal
                class="ieo_Modal"
                :title="buyData.title"
                v-model="showModal"
                :footer-hide="true"
                :mask-closable="false"
                class-name="vertical-center-modal">
            <div class="ieo_form">
                <div class="ieo_item flex flex-pack-between flex-align-center">
                    <Poptip :visible.sync="visible" trigger="focus" :content="$t('syb.syb2')+buyData.minBuyAomunt+$t('syb.syb3')+buyData.maxBuyAomunt" style="width: 100%;">
                        <input type="number" v-model="num"   :placeholder="$t('syb.syb1')">
                    </Poptip>
                    <label for="">{{buyData.name}}</label>
                </div>
                <div class="flex flex-align-center ieo_xe">
                    <span class="ieoColor">{{$t('ieo.ieo13')}}：</span>
                    <span>{{buyData.minBuyAomunt}}-{{buyData.maxBuyAomunt}}{{buyData.name}}</span>
                </div>
                <div class="ieo_item flex flex-pack-between flex-align-center ieo_pwd">
                    <input type="password" v-model="pwd" :placeholder="$t('ieo.ieo14')" oninput="">
                </div>
                <div class="flex flex-pack-between flex-align-center ieo_fk">
                    <div class="ieoColor">{{$t('ieo.ieo15')}}</div>
                    <div class="bold">{{sfk}}{{buyData.name}}</div>
                </div>
                <div class="flex flex-pack-between flex-align-center">
                    <div class="ieoSubmit">
                        <button @click="buy" >{{$t('ieo.ieo16')}}</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style scoped lang="scss">
    .content-wraps{
        .noIeoTip{
            height: 300px;
            background: #fff;
            span{
                color: #999;
                font-size: 18px;
            }
        }
        background: #F6F6F6;

        .ieo-banner{
            padding-top: 60px;
            img{
                min-height: 220px;
            }
        }
        .ieo_main{
            /*width: 1200px;*/
            margin: 0 auto;
        }
        .ieo_more{
            position: absolute;
            z-index: 10;
            right: 0;
        }
        .ieo_tab{
            padding-bottom: 100px;
            position: relative;
            .IEONoStart{
                .btn_ieo{

                    button{
                        background: linear-gradient(to right,#fb9d3b,#fd644f) !important;
                        background-size: 100% 100%;
                    }
                }
            }
            .IEOFinish{
                .endBtn{
                    background: #9e9e9e;
                }
            }

        }
        .sybBox{
            margin-top: 40px;
        }
        .sybItem{
            background: #fff;
            border-radius: 4px;
            padding: 20px 50px;
            margin-bottom: 30px;
            .yearRate{
                width: 154px;
                div:first-child{
                    color:#ee3115;
                    font-size: 36px;
                }
                padding-right:30px;
                border-right: 1px solid #EAEAEA;
            }
            .uMainGray{
                color:#8d8faf;
            }
            .sybZq{
                padding-left: 25px;
                div.row1{
                    img{
                      height: 36px;
                        width: 36px;
                    }
                    span{
                        margin-left: 10px;
                        font-size: 30px;
                    }
                }
                .zqSquare{
                    background: #F1F1F5;
                    padding:6px 0;
                    margin-top: 8px;
                    div span:last-child{
                        font-size: 18px;
                        padding-left: 3px;
                    }
                }
            }
            .lcInfo{
                margin-left: 20px;
                div:last-child{
                    margin-top: 15px;
                }
                &.l1{
                    margin-left: 50px;
                    width: 160px;
                }
                &.l2{
                    width: 290px;
                }
                &.l3{
                    width: 140px;
                }
                &.l4{
                    margin-left: 40px;
                }
                button{
                    width: 100px;
                    height: 40px;
                    background: #3F9388;
                    border:0;
                    border-radius: 4px;
                    color:#fff;
                }
            }

        }

    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
<script>
    export default {
        data() {
            return {
                coins: [],
                activeMenuName: "coin-1",
                showModal:false,
                showLoading:false,
                buyData:{},
                sfk:0,
                num:'',
                pwd:'',
                visible:false,
                ieo:{
                    ieoIng:[],
                    ieoStart:[],
                    ieoEnd:[]
                }
            };
        },
        computed: {
            isLogin: function() {
                return this.$store.getters.isLogin;
            }
        },
        watch: {
            num: function(val) {
                if(val){
                    this.sfk=val;
                }else{
                    this.sfk=0;
                }
            }
        },
        methods: {
            showIeoModal:function (data) {
                if(this.isLogin){
                    if(data.surplusAmount==0){
                        this.$Message.info(this.$t('syb.syb11'))
                    }else{
                        this.showModal=true;
                        this.buyData=data;
                    }

                }else{
                    this.$Message.info(this.$t('ieo.ieo19'))
                }

            },
            noOpen:function () {
                this.$Message.info(this.$t('ieo.ieo20'))
            },
            finish:function () {
                this.$Message.info(this.$t('ieo.ieo21'))
            },
            buy:function(){
                if(this.num=='') {
                    this.$Message.error(this.$t('ieo.ieo22'))
                }else if(this.num<this.buyData.minBuyAomunt||this.num>this.buyData.maxBuyAomunt){
                    this.$Message.error(this.$t('ieo.ieo25')+this.buyData.minBuyAomunt+this.$t('ieo.ieo26')+this.buyData.maxBuyAomunt)
                }else if(this.pwd==''){
                    this.$Message.error(this.$t('ieo.ieo23'))
                }else{
                    this.showLoading=true;
                    this.showModal=false;
                    this.$http
                        .post( this.host+"/exchange/earningsTreasure/buyEarningsTreasure",{
                            earningTreasureId:this.buyData.id,
                            aomunt:this.num,
                            jyPassword:this.pwd
                        })
                        .then(res => {
                            let resp = res.body
                            if(resp.code==0){
                                this.$Message.success(this.$t('syb.syb12'))
                            }else{
                                this.$Message.error(resp.message)
                            }
                            this.num="";
                            this.pwd="";
                            this.showLoading=false;
                        })
                }
            },
            getIeoList() {
                //查询历史委托
                this.showLoading=true;
                // this.host +
                this.$http
                    .post( this.host+"/exchange/earningsTreasure/getEarningsTreasureList")
                    .then(response => {
                        var resp = response.body;
                        if(resp.code==0){
                            var ieoIng=[];
                            var ieoStart=[];
                            var ieoEnd=[];
                            console.log(resp);
                            for(var i=0;i<resp.data.length;i++){
                                if(resp.data[i].status==2){
                                    ieoStart.push(resp.data[i])
                                }else if(resp.data[i].status==1){
                                    ieoIng.push(resp.data[i])
                                }else if(resp.data[i].status==0){
                                    ieoEnd.push(resp.data[i])
                                }
                                resp.data[i].syNumber=resp.data[i].totalAomunt-resp.data[i].soldAomunt;
                                resp.data[i].rate=resp.data[i].soldAomunt.div(resp.data[i].totalAomunt).mul(100)
                            }

                            this.ieo.ieoStart=ieoStart;
                            console.log(this.ieo.ieoStart);
                            this.ieo.ieoIng=ieoIng;
                            this.ieo.ieoEnd=ieoEnd;

                        }

                        this.showLoading=false;
                    });

            },
        },
        created: function() {
            this.getIeoList()
        }
    };
</script>
