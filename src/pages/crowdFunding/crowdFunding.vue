<template>
    <div class="content-wraps">
       <div class="ieo-banner wAll">
           <img src="../../assets/images/help.jpg" alt="" class="wAll">
       </div>
        <div class="bgWhite">
            <div class="ieo_main">
                <Spin size="large" class="loadingPub" v-show="showLoading"></Spin>
                <div class="ieo_tab">
                    <router-link to="/uc/IEORecord" class="jumpIeo" v-show="isLogin">{{$t('ieo.sg2')}} {{$t('ieo.ieo4')}}</router-link>
                    <Tabs active-key="key1" class="ieo_tab2">
                        <Tab-pane :label="$t('ieo.ieo1')" class="IEOIng" key="key1">
                            <div class="pubIeo flex flex-wrap" v-if="ieo.ieoIng.length>0">
                                <div  class="zcItem" v-for="(item,index) in ieo.ieoIng">
                                    <div class="zcimg">
                                        <img :src="item.pic?item.pic:'../../static/assets/images/zcImg.png'" alt="">
                                    </div>
                                    <div class="bottom">
                                        <div class="process_ieo">
                                            <div class="flex flex-pack-between flex-align-center">
                                                <span>{{item.ieoName}}</span>
                                                <span>{{$t('ieo.ieo5')}}{{item.ygm}}%</span>
                                            </div>
                                            <Progress :percent="item.ygm" hide-info></Progress>
                                        </div>
                                        <div class="ieo_content">
                                            <div class="flex flex-align-center">
                                                <div class="title">{{item.haveCoin}}{{$t('ieo.ieo6')}}</div>
                                                <div class="data">{{item.saleAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo7')}}</div>
                                                <div class="data">{{item.surplusAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo8')}}</div>
                                                <div class="data">1{{item.saleCoin}}={{item.ratio}}USDT</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo9')}}</div>
                                                <div class="data">{{item.limitAmount}}-{{item.haveAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo10')}}</div>
                                                <div class="data">{{item.startTime}}{{$t('ieo.ieo28')}}{{item.endTime}}</div>
                                            </div>
                                        </div>
                                        <div class="btn_ieo">
                                            <button @click="showIeoModal(item)">{{$t('ieo.ieo16')}}</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>暂无记录！</span>
                            </div>
                        </Tab-pane>
                        <Tab-pane :label="$t('ieo.ieo2')" class="IEONoStart" key="key2">
                            <div v-if="ieo.ieoStart.length>0" class="pubIeo flex flex-wrap">
                                <div class="zcItem" v-for="(item,index) in ieo.ieoStart">
                                    <div class="zcimg">
                                        <img :src="item.pic" alt="">
                                    </div>
                                    <div class="bottom">
                                        <div class="process_ieo">
                                            <div class="flex flex-pack-between flex-align-center">
                                                <span>{{item.ieoName}}</span>
                                                <span>{{$t('ieo.ieo5')}}{{item.ygm}}%</span>
                                            </div>
                                            <Progress :percent="item.ygm" hide-info></Progress>
                                        </div>
                                        <div class="ieo_content">
                                            <div class="flex flex-align-center">
                                                <div class="title">{{item.haveCoin}}{{$t('ieo.ieo6')}}</div>
                                                <div class="data">{{item.saleAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo7')}}</div>
                                                <div class="data">{{item.surplusAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo8')}}</div>
                                                <div class="data">1{{item.saleCoin}}={{item.ratio}}USDT</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo9')}}</div>
                                                <div class="data">{{item.limitAmount}}-{{item.haveAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo10')}}</div>
                                                <div class="data">{{item.startTime}}{{$t('ieo.ieo28')}}{{item.endTime}}</div>
                                            </div>
                                        </div>
                                        <div class="btn_ieo">
                                            <button @click="noOpen">{{$t('ieo.ieo2')}}</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>暂无记录！</span>
                            </div>
                        </Tab-pane>
                        <Tab-pane :label="$t('ieo.ieo3')" class="IEOFinish" key="key3">
                            <div class="pubIeo flex flex-wrap" v-if="ieo.ieoEnd.length>0">
                                <div class="zcItem" v-for="(item,index) in ieo.ieoEnd">
                                    <div class="zcimg">
                                        <img :src="item.pic" alt="">
                                    </div>
                                    <div class="bottom">
                                        <div class="process_ieo">
                                            <div class="flex flex-pack-between flex-align-center">
                                                <span>{{item.ieoName}}</span>
                                                <span>{{$t('ieo.ieo5')}}100%</span>
                                            </div>
                                            <Progress :percent="100" hide-info></Progress>
                                        </div>
                                        <div class="ieo_content">
                                            <div class="flex flex-align-center">
                                                <div class="title">{{item.ieoName}}{{$t('ieo.ieo6')}}</div>
                                                <div class="data">{{item.saleAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo7')}}</div>
                                                <div class="data">0</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo8')}}</div>
                                                <div class="data">1{{item.saleCoin}}={{item.ratio}}USDT</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo9')}}</div>
                                                <div class="data">{{item.limitAmount}}-{{item.haveAmount}}{{item.saleCoin}}</div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <div class="title">{{$t('ieo.ieo10')}}</div>
                                                <div class="data">{{item.startTime}}{{$t('ieo.ieo28')}}{{item.endTime}}</div>
                                            </div>
                                        </div>
                                        <div class="btn_ieo">
                                            <button @click="finish">{{$t('ieo.ieo16')}}</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div v-else class="wAll flex flex-align-center flex-pack-center noIeoTip" >
                                <span>暂无记录！</span>
                            </div>
                        </Tab-pane>
                    </Tabs>
                </div>
            </div>
        </div>

        <Modal
                class="ieo_Modal"
                :title="buyData.ieoName"
                v-model="showModal"
                :footer-hide="true"
                :mask-closable="false"
                class-name="vertical-center-modal">
                <div class="ieo_form">
                    <div class="ieo_item flex flex-pack-between flex-align-center">
                        <Poptip :visible.sync="visible" trigger="focus" :content="$t('ieo.ieo25')+buyData.limitAmount+$t('ieo.ieo26')+buyData.haveAmount" style="width: 100%;">
                        <input type="number" v-model="num"   :placeholder="$t('ieo.ieo12')">
                        </Poptip>
                        <label for="">{{buyData.saleCoin}}</label>
                    </div>
                    <div class="flex flex-align-center ieo_xe">
                        <span class="ieoColor">{{$t('ieo.ieo13')}}：</span>
                        <span>{{buyData.limitAmount}}-{{buyData.haveAmount}}{{buyData.saleCoin}}</span>
                    </div>
                    <div class="ieo_item flex flex-pack-between flex-align-center ieo_pwd">
                        <input type="password" v-model="pwd" :placeholder="$t('ieo.ieo14')" oninput="">
                    </div>
                    <div class="flex flex-pack-between flex-align-center ieo_fk">
                        <div class="ieoColor">{{$t('ieo.ieo15')}}</div>
                        <div class="bold">{{sfk}}USDT</div>
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
                .btn_ieo{

                    button{
                        background: #d0d0d0 !important;

                        background-size: 100% 100%;
                    }
                }
            }
            .pubIeo{
                padding-top: 20px;
                .btn_ieo{
                    margin-top: 10px;
                    button{
                        height: 40px;
                        width: 100%;
                        border:0;
                        border-radius: 5px;
                        background: linear-gradient(to right,#4BC3B3,#3F9388);
                        background-size: 100% 100%;
                        color: #fff;
                        &:focus{
                            outline: none;
                        }
                    }
                }

                .zcItem{
                    width: 380px;
                    margin-right: 30px;
                    background: #fff;
                    margin-bottom: 30px;
                    img{
                        width: 380px;
                    }
                    &:nth-child(3n){
                        margin-right:0;
                    }
                    .process_ieo{
                        div{
                            margin-top: 10px;
                            span:first-child{
                                font-size: 16px;
                                font-weight: bold;
                            }
                        }
                    }

                    .bottom{
                        padding:0 20px 20px 20px;
                        .ieo_content{
                            padding-top:10px;
                            .flex{
                                height: 28px;
                            }
                            .title{
                                color:#A0A5BB;
                                padding-right: 5px;
                            }
                        }

                    }
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
                this.sfk=val.mul(this.buyData.ratio);
                if(val<this.buyData.limitAmount||this.buyData.haveAmount>val){
                    this.visible=true;
                }else{
                    this.visible=false;
                }
            }
          },
        methods: {
            showIeoModal:function (data) {
                if(this.isLogin){
                    if(data.surplusAmount==0){
                        this.$Message.info('该币种已被抢购完')
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
               }else if(this.num<this.buyData.limitAmount||this.num>this.buyData.haveAmount){
                    this.$Message.error(this.$t('ieo.ieo25')+this.buyData.limitAmount+this.$t('ieo.ieo26')+this.buyData.haveAmount)
               }else if(this.pwd==''){
                   this.$Message.error(this.$t('ieo.ieo23'))
               }else{
                   this.showLoading=true;
                   this.showModal=false;
                   this.$http
                       .post(this.host + "/exchange/ieo/add-ieo",{
                           id:this.buyData.id,
                           number:this.num,
                           jyPassword:this.pwd
                       })
                       .then(res => {
                           let resp = res.body
                           if(resp.code==0){
                              this.$Message.success(this.$t('ieo.ieo24'))
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
                this.$http
                    .post(this.host + "/exchange/exchange-coin/ieo-emption")
                    .then(response => {
                        var resp = response.body;
                        if(resp.code==0){
                            var ieoIng=[];
                            var ieoStart=[];
                            var ieoEnd=[];
                             for(var i=0;i<resp.data.length;i++){
                                 resp.data[i].ygm=this.toFloor((resp.data[i].saleAmount-resp.data[i].surplusAmount).div(resp.data[i].saleAmount)*100,2)
                                 if(resp.data[i].status==0){
                                     ieoStart.push(resp.data[i])
                                 }else if(resp.data[i].status==1){
                                     ieoIng.push(resp.data[i])
                                 }else if(resp.data[i].status==2){
                                     ieoEnd.push(resp.data[i])
                                 }
                             }

                            this.ieo.ieoStart=ieoStart;
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
