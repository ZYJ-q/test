<template>
	<div class="content">
		<img class="jd_img" src="../../assets/images/sybBanner.png" alt="">
		<div class="BuyandSell">
			<div style="width: 100%;background: #FFFFFF;" class="flex items_center column">
				<!-- 借入市场和借出市场切换 -->
				<Menu mode="horizontal" class='Menu1' :theme="theme1" active-key="1">
					<!-- <div style="width: 1380px;"> -->
					<Menu-item key="1" :class='show_borrow?"lend":"li1"'>
						<span style="padding: 20px 0;" @click="isBorrow">{{$t('currencyLending').jrsc}}</span>
					</Menu-item>
					<Menu-item key="2" :class='!show_borrow?"lend":"li1"'>
						<span @click="isLend">{{$t('currencyLending').jcsc}}</span>
					</Menu-item>
					<!-- </div> -->
				</Menu>
			</div>
			<div class="cengji">
				<!-- 发布借入单和发布借出单 -->
				<div>
					<!-- 开启 -->
					<span class="mr20 yellow_hover pointer" @click="releaseBorrow">{{$t('currencyLending').fbjrd}}</span>
					<span class="yellow_hover pointer" @click="releaseLend">{{$t('currencyLending').fbjcd}}</span>
					<!-- 暂未开放 -->
					<!-- <span class="mr20 yellow_hover pointer" @click="Twarning('暂未开放')">发布借入单</span>
					<span class="yellow_hover pointer" @click="Twarning('暂未开放')">发布借出单</span> -->
				</div>
				<div>
					<!-- 筛选 -->
					<span>{{$t('currencyLending').sx}}：</span>
					<Select v-model="model2" @on-change='paixu_' size="large" style="width:100px">
						<Option v-for="(item,i) in moneysort" :key='i' :value="item.value">{{ item.label }}</Option>
					</Select>
					<Select v-model="model3" @on-change='zhouqi_' size="large" style="width:100px">
						<Option v-for="(item,i) in cycle" :key='i' :value="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
			<!-- 借出市场 -->
			<div v-if="!show_borrow">
				<div class="BuyandSell_center" v-for="(v,i) in borrow" :key='i'>
					<div class="list_">
						<div class="flex items_center">
							<p class="heads_img">{{v.username|slice_1}}</p>
							<span class="font18 bold block ml16">{{v.username}}</span>
						</div>
						<div class="flex items_center">
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').kjrje}}&nbsp;&nbsp;({{$t('currencyLending').zs}}￥{{v.minAmount}})</p>
								<p class="bold font18 block">￥{{v.money}}</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').dqlx}}</p>
								<p class="bold font18 block">￥{{v.interestDue}}</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').nhl}}</p>
								<p class="bold font18 block">{{v.yearRate}}%</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').jkzq}}</p>
								<p class="bold font18 block">{{v.period}}{{$t('currencyLending').t}}</p>
							</div>
							<i-button v-if='v.status==0' type="warning" @click='jiechu_tianxie.show(v.id,v.money,v.member.id,v.member.username,v.dayRate,v.period,v.yearRate)'>{{$t('currencyLending').jc}}</i-button>
							<i-button v-if='v.status==1' disabled type="warning">{{$t('currencyLending').ywc}}</i-button>
							<i-button v-if='v.status==2' disabled type="warning" >{{$t('currencyLending').ysw}}</i-button>
							<!-- <div style='height: 40px;background: #f5c125;'>
								<i-button type="warning">警告按钮</i-button>
							</div> -->
						</div>
					</div>
				</div>
				<div v-if="borrow.length<=0" style="width: 100%;height: 200px;" class="wAll flex flex-align-center flex-pack-center noIeoTip" >
				     <span>{{$t('currencyLending').zwjl}}！</span>
				</div>
				<div style="padding: 20px 0; text-align: right;">
					<Page :total="NumAll" :page-size='page.size' :current="page.pageNum" @on-change="changePage2"></Page>
				</div>
			</div>
			<!-- 借入市场 -->
			<div v-else>
				<div class="BuyandSell_center" v-for="(v,i) in lend" :key='i'>
					<div class="list_">
						<div class="flex items_center">
							<p class="heads_img">{{v.username|slice_1}}</p>
							<span class="font18 bold block ml16">{{v.username}}</span>
						</div>
						<div class="flex items_center">
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').kjcje}}&nbsp;&nbsp;({{$t('currencyLending').zs}}￥{{v.minAmount}})</p>
								<p class="bold font18 block">￥{{v.money}}</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').dqlx}}</p>
								<p class="bold font18 block">￥{{v.maturityYield}}</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').nhl}}</p>
								<p class="bold font18 block">{{v.yearRate}}%</p>
							</div>
							<div class="flex cloumn">
								<p class="gray font14">{{$t('currencyLending').jkzq}}</p>
								<p class="bold font18 block">{{v.period}}{{$t('currencyLending').t}}</p>
							</div>
							<!-- 暂未开放 -->
							<!-- <i-button type="warning" @click='Twarning("暂未开放")' v-if='v.status==0'>借入</i-button> -->
							<!-- 开启 -->
							<i-button v-if='v.status==0' type="warning" @click='jieru_tianxie.show(v.id,v.money,v.member.id,v.member.username,v.dayRate,v.period,v.yearRate)'>{{$t('currencyLending').jr}}</i-button>
							<i-button v-if='v.status==1' type="warning" disabled>{{$t('currencyLending').ywc}}</i-button>
							<i-button v-if='v.status==2' type="warning" disabled>{{$t('currencyLending').ysw}}</i-button>
							<!-- <div style='height: 40px;background: #f5c125;'>
								<i-button type="warning">警告按钮</i-button>
							</div> -->
						</div>
					</div>
				</div>
				<div v-if="lend.length<=0" style="width: 100%;height: 200px;" class="wAll flex flex-align-center flex-pack-center noIeoTip" >
				     <span>{{$t('currencyLending').zwjl}}！</span>
				</div>
				<div style="padding: 20px 0; text-align: right;">
					<Page :total="NumAll" :page-size='page.size' :current="page.pageNum" @on-change="changePage1"></Page>
				</div>
			</div>
		</div>
		<!-- 借入表单 -->
		<div class="zhezhao_" v-if="showModal_">
			<div class="modal_">
				<p class="flex between items_center">
					<span class="font20 block ml8">{{$t('currencyLending').txjrd}}</span>
					<span @click="close" class="font30 mr8 pointer">×</span>
				</p>
				<div class="kuang_">
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').jr}}：</div>
						<div class="yellow font16">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').dybz}}：</div>
						<i-select :model.sync="borrowForm.choose_coin" @on-change='borrowForm.coinHS' :placeholder='borrowForm.choose_coin'
						 style="width:200px">
							<i-option v-for="(item,i) in borrowForm.coin" :key='i' :value="item.value">{{ item.label }}</i-option>
						</i-select>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').jrje}}：</div>
						<Input-number style='width: 310px;' :max="100000" :min="1" @on-change='borrowForm.moneyHS' @on-blur='borrowForm.moneyBlur'
						 :value="borrowForm.money"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').yjdy}}：</div>
						<div class="yellow font16">{{borrowForm_yujidiya}}</div>
						<div class="qianhui pd_lr6">{{borrowForm.choose_coin}}</div>
					</div>
					<!-- <div class="flex lineH40">
						<div class="w165 txt_right">可用余额：</div>
						<div>{{borrowForm.keyongyue}}</div>
						<div class="qianhui pd_lr6">USDT</div>
					</div> -->
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').jkzq}}：</div>
						<i-select :model.sync="borrowForm.day" @on-change='borrowForm.zhouqiHS' :placeholder='borrowForm.day' style="width:200px">
							<i-option v-for="(item,i) in borrowForm.zhouqi" :key='i' :value="item.label">{{ item.label }}</i-option>
						</i-select>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').rll}}%：</div>
						<Input-number style='width: 310px;' :max="0.1" :step="0.001" :min="0.01" @on-change='borrowForm.rililvHS' :value="borrowForm.rililv"></Input-number>
						<div class="qianhui pd_lr6">{{$t('currencyLending').zhnh}}：{{borrowForm_zhehenianhua}}%</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').dqlx}}：</div>
						<div class="yellow font16">{{borrowForm_daoqilixi}}</div>
						<div class="qianhui pd_lr6 font14">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').dbzxjkje}}：</div>
						<Input-number style='width: 310px;' :max="10000" :min="1000" @on-change='borrowForm.small_numHS' :value="borrowForm.small_num"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').dbzdjkje}}：</div>
						<Input-number style='width: 310px;' :max="10000" :min="1000" @on-change='borrowForm.max_numHS' :value="borrowForm.max_num"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').sxf}}：</div>
						<div class="yellow font16">{{borrowForm_shouxufei}}</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').jymm}}：</div>
						<i-input v-model="jy_password" type='password' :placeholder="$t('currencyLending').qsrjymm" style='width: 310px;'></i-input>
					</div>
					<div class="flex jst_center mt30 lineH40">
						<i-button type="warning" :disabled='disabled_' style='margin-right: 26px;width: 165px;' @click='tijiao(1)'>{{$t('currencyLending').tj}}</i-button>
						<!-- <Checkbox :checked.sync="single">我已阅读并同意<span style="margin-left: 4px;">《QKL法币借贷协议》</span></Checkbox> -->
						<i-button class="gray" style='width: 165px;' @click='close()'>{{$t('currencyLending').gb}}</i-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 借出表单 -->
		<div class="zhezhao_" v-if="LendModal_">
			<div class="modal_" style="height: 530px;">
				<p class="flex between items_center">
					<span class="font20 block ml8">{{$t('currencyLending').txjcd}}</span>
					<span @click="close" class="font30 mr8 pointer">×</span>
				</p>
				<div class="kuang_">
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').jc}}：</div>
						<div class="yellow font16">USDT</div>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').jcje}}：</div>
						<Input-number style='width: 310px;' :max="1000000" :step="100" :min="1000" @on-change='LendForm.moneyHS' :value="LendForm.money"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').jkzq}}：</div>
						<i-select :model.sync="LendForm.day" @on-change='LendForm.zhouqiHS' :placeholder='LendForm.day' style="width:200px">
							<i-option v-for="(item,i) in LendForm.zhouqi" :key='i' :value="item.label">{{ item.label }}</i-option>
						</i-select>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').rll}}%：</div>
						<Input-number style='width: 310px;' :max="0.1" :step="0.001" :min="0.01" @on-change='LendForm.rililvHS' :value="LendForm.rililv"></Input-number>
						<div class="qianhui pd_lr6">{{$t('currencyLending').zhnh}}：{{lendForm_zhehenianhua}}%</div>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').dqsy}}：</div>
						<div class="yellow font16">{{lendForm_daoqilixi}}</div>
						<div class="qianhui pd_lr6 font14">USDT</div>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').dbzxjkje}}：</div>
						<Input-number style='width: 310px;' :max="10000" :min="1000" @on-change='LendForm.small_numHS' :value="LendForm.small_num"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH50">
						<div class="w165 txt_right">{{$t('currencyLending').dbzdjkje}}：</div>
						<Input-number style='width: 310px;' :max="10000" :min="1000" @on-change='LendForm.max_numHS' :value="LendForm.max_num"></Input-number>
						<div class="qianhui pd_lr6">USDT</div>
					</div>
					<div class="flex lineH40">
						<div class="w165 txt_right">{{$t('currencyLending').jymm}}：</div>
						<i-input type='password' v-model="jy_password" :placeholder="$t('currencyLending').qsrjymm" style='width: 310px;'></i-input>
					</div>
					<!-- <div class="flex lineH40">
						<div class="w165 txt_right">手续费：</div>
						<div class="yellow font16">免费</div>
					</div> -->
					<div class="flex jst_center mt30 lineH40">
						<i-button type="warning" :disabled='disabled_' style='margin-right: 26px;width: 165px;' @click='tijiao(2)'>{{$t('currencyLending').tj}}</i-button>
						<!-- <Checkbox :checked.sync="single">我已阅读并同意<span style="margin-left: 4px;">《QKL法币借贷协议》</span></Checkbox> -->
						<i-button  style='width: 165px;' class="gray" @click='close()'>{{$t('currencyLending').gb}}</i-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 点击借入 -->
		<Modal v-model="dianjijieru" title="借入" width="630">

			<p slot="header" style="color:rgba(240, 185, 11, 1);text-align:center">
				<span style="padding-left: 5px;">{{$t('currencyLending').x}}{{jieru_tianxie.name}}{{$t('currencyLending').jr}}USDT</span>
			</p>
			<p>
				<span>{{$t('currencyLending').qsrjrje}}</span>
			</p>
			<div>
				<Input-number style='width: 310px;' :max="10000" :step="100" :min="100" @on-change='jieru_tianxie.moneyHS' :value="jieru_tianxie.money"></Input-number>
			</div>
			<p class="mt10">
				<span>{{$t('currencyLending').dybz}}</span>
			</p>
			<div>
				<Select v-model="jieru_tianxie.diya_currency.diya" :placeholder='jieru_tianxie.diya_currency.diya' @on-change='jieru_tianxie.chooseType' style="width:200px">
					<Option v-for="(v,i) in jieru_tianxie.diya_currency.coin_type" :value="v.name" :key="i">{{ v.name }}</Option>
				</Select>
			</div>
			<div class="four_bu">
				<p class="flex column">
					<span>{{$t('currencyLending').dqlx}}</span>
					<span class="bold font16">￥{{jieru_tianxie_lixi}}</span>
				</p>
				<p class="flex column">
					<span>{{$t('currencyLending').cknh}}</span>
					<span class="bold font16">￥{{jieru_tianxie.year}}</span>
				</p>
				<p class="flex column">
					<span>{{$t('currencyLending').zyje}}</span>
					<span class="bold font16">{{jieru_tianxie_zhiya}}</span>
				</p>
				<p class="flex column">
					<span>{{$t('currencyLending').jkzq}}</span>
					<span class="bold font16">{{jieru_tianxie.day}}{{$t('currencyLending').t}}</span>
				</p>
			</div>
			<div class="flex">
				<p>
					<span class="font16">{{$t('currencyLending').jrje}}:</span>
					<span class="bold font20">￥{{jieru_tianxie.money}}</span>
				</p>
				<p class="ml40">
					<span class="font16">{{$t('currencyLending').sxf}}:</span>
					<span style="color: rgba(240, 185, 11, 1);" class="bold font20">{{jieru_tianxie_fee}}</span>
				</p>
			</div>
			<div class="mt10">
				<Input type='password' v-model="jieru_tianxie.password" :placeholder="$t('currencyLending').qsrjymm" style="width: 300px" />
			</div>
			<div slot="footer" style="color:rgba(240, 185, 11, 1);text-align:right">
				<div>
					<Button type="text" @click="jieru_tianxie.quxiao">{{$t('currencyLending').qx}}</Button>
					<Button type="warning" @click="jieru_tianxie.queding">{{$t('currencyLending').qd}}</Button>
				</div>
			</div>
		</Modal>
		<!-- 点击借出 -->
		<Modal v-model="dianjijiechu" title="借出" width="630">
			<p slot="header" style="color:rgba(240, 185, 11, 1);text-align:center">
				<span style="padding-left: 5px;">{{$t('currencyLending').jc}}USDT{{$t('currencyLending').g}}{{jiechu_tianxie.name}}</span>
			</p>
			<p>
				<span>{{$t('currencyLending').qsrjcje}}</span>
			</p>
			<div>
				<Input-number style='width: 310px;' :max="10000" :step="100" :min="100" @on-change='jiechu_tianxie.moneyHS' :value="jiechu_tianxie.money"></Input-number>
			</div>
			<div class="four_bu">
				<p class="flex column">
					<span>{{$t('currencyLending').dqsy}}</span>
					<span class="bold font16">￥{{jiechu_tianxie_lixi}}</span>
				</p>
				<p class="flex column">
					<span>{{$t('currencyLending').cknh}}</span>
					<span class="bold font16">{{jiechu_tianxie.year}}%</span>
				</p>
				<p class="flex column">
					<span>{{$t('currencyLending').jkzq}}</span>
					<span class="bold font16">{{jiechu_tianxie.day}}{{$t('currencyLending').t}}</span>
				</p>
			</div>
			<div class="flex">
				<p>
					<span class="font16">{{$t('currencyLending').jcje}}:</span>
					<span class="bold font20">￥{{jiechu_tianxie.money}}</span>
				</p>
			</div>
			<div class="mt10">
				<Input type='password' v-model="jiechu_tianxie.password" :placeholder="$t('currencyLending').qsrjymm" style="width: 300px" />
			</div>
			<div slot="footer" style="color:rgba(240, 185, 11, 1);text-align:right">
				<div>
					<Button type="text" @click="jiechu_tianxie.quxiao">{{$t('currencyLending').qx}}</Button>
					<Button class="gray" @click="jiechu_tianxie.queding">{{$t('currencyLending').qd}}</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				disabled_:false,
				// 点击借出显示借出填写表单
				dianjijiechu: false,
				// 点击借入显示借入填写表单
				dianjijieru: false,
				// 借入填写
				jieru_tianxie:{
					show:(id,money,myID,username,rililv,day,year)=>{	//显示
						if(JSON.parse(localStorage.getItem('MEMBER')).id==myID){
							this.$Message.error('不能操作自己发布的订单')
							return
						}
						this.jieru_tianxie.password = ''
						this.jy_password = ''
						this.getCoinRate(this.jieru_tianxie.diya_currency.diya)	//获取选择币种的汇率
						this.jieru_tianxie.id = id
						this.jieru_tianxie.money = money
						this.jieru_tianxie.name = username
						this.jieru_tianxie.rililv = rililv
						this.jieru_tianxie.day = day
						this.jieru_tianxie.year = year
						this.dianjijieru = true
					},
					rililv:'',
					id:'',
					name:'',
					day:14,
					year:'0',
					fee:1,
					lixi:'140.00',
					money:10000,
					num:100,
					password:'',
					moneyHS: (v) => {
						this.jieru_tianxie.money = v
					},
					chooseType: (v) => {
						this.getCoinRate(this.jieru_tianxie.diya_currency.diya)
						console.log(v)
					},
					// 抵押币种
					diya_currency:{
						diya:'',
						coin_type:[
							{
								name:'ETH'
							},
							{
								name:'BTC'
							}
						]
					},
					IS:true,
					queding:()=>{
						console.log(this.jieru_tianxie.diya_currency.diya)
						// 提交订单
						if(this.jieru_tianxie.IS == true){
							this.jieru_tianxie.IS = false
							this.buyOrder()
						}else{
							this.$Message.error(this.$t('currencyLending').qwcfdj)		//请勿重复点击
						}
					},
					quxiao:()=>{
						this.dianjijieru = false
						this.jieru_tianxie.password = ''
					}
				},
				// 借出填写
				jiechu_tianxie:{
					show:(id,money,myID,username,rililv,day,year)=>{	//显示
						if(JSON.parse(localStorage.getItem('MEMBER')).id==myID){
							this.$Message.error('不能操作自己发布的订单')
							return
						}
						this.jiechu_tianxie.password = ''
						this.jy_password = ''
						this.jiechu_tianxie.id = id
						this.jiechu_tianxie.money = money
						this.jiechu_tianxie.name = username
						this.jiechu_tianxie.rililv = rililv
						this.jiechu_tianxie.day = day
						this.jiechu_tianxie.year = year
						this.dianjijiechu = true
					},
					id:'',
					name:'',
					rililv:'0',
					day:0,
					year:'0',
					fee:1,
					lixi:'140.00',
					money:10000,
					num:100,
					password:'',
					moneyHS: (v) => {
						this.jiechu_tianxie.money = v
					},
					IS:true,
					queding:()=>{
						// 提交订单
						if(this.jiechu_tianxie.IS == true){
							this.sellOrder()
						}else{
							this.$Message.error(this.$t('currencyLending').qwcfdj)	//请勿重复点击
						}
					},
					quxiao:()=>{
						this.dianjijiechu = false
						this.jiechu_tianxie.password = ''
					}
				},
				// 交易密码
				jy_password: '',
				// 点击列表借入
				rate: 0, //汇率
				coin_fee: 0, //手续费百分比
				// 借入表单
				borrowForm: {
					choose_coin: 'BTC',
					coinHS: (v) => {
						this.borrowForm.choose_coin = v
						this.getCoinRate(this.borrowForm.choose_coin)
					},
					coin: [{
							value: 'BTC',
							label: 'BTC'
						},
						{
							value: 'ETH',
							label: 'ETH'
						}
					],
					money: 10000,
					moneyHS: (v) => {
						this.borrowForm.money = v
					},
					moneyBlur: () => {
						console.log(this.borrowForm.money)
						if (this.borrowForm.money == null) {
							this.$Notice.error({
								title: this.$t('currencyLending').jrjebnwk,
								desc: ''
							});
						}
					},
					keyongyue: '--',
					day: '7天',
					zhouqiHS: (v) => {
						console.log(v)
						this.borrowForm.day = v
					},
					zhouqi: [{
							value: '7',
							label: '7天'
						},
						{
							value: '15',
							label: '15天'
						},
						{
							value: '30',
							label: '30天'
						},
						{
							value: '60',
							label: '60天'
						},
						{
							value: '90',
							label: '90天'
						}
					],
					rililvHS: (v) => {
						this.borrowForm.rililv = v
					},
					rililv: 0.018,
					small_numHS: (v) => {
						this.borrowForm.small_num = v
					},
					small_num: 1000,
					max_numHS: (v) => {
						this.borrowForm.max_num = v
					},
					max_num: 10000
				},
				LendForm: {
					choose_coin: 'USDT',
					coinHS: (v) => {
						this.LendForm.choose_coin = v
					},
					coin: [{
							value: 'USDT',
							label: 'USDT'
						},
						{
							value: 'BTC',
							label: 'BTC'
						},
						{
							value: 'ETH',
							label: 'ETH'
						},
						{
							value: 'EOS',
							label: 'EOS'
						}
					],
					money: 10000,
					moneyHS: (v) => {
						this.LendForm.money = v
					},
					keyongyue: '--',
					day: '7天',
					zhouqiHS: (v) => {
						console.log(v)
						this.LendForm.day = v
					},
					zhouqi: [{
							value: '7',
							label: '7天'
						},
						{
							value: '15',
							label: '15天'
						},
						{
							value: '30',
							label: '30天'
						},
						{
							value: '60',
							label: '60天'
						},
						{
							value: '90',
							label: '90天'
						}
					],
					rililvHS: (v) => {
						this.LendForm.rililv = v
					},
					rililv: 0.018,
					small_numHS: (v) => {
						this.LendForm.small_num = v
					},
					small_num: 1000,
					max_numHS: (v) => {
						this.LendForm.max_num = v
					},
					max_num: 10000
				},
				NumAll: '', //借入和借出列表的总数
				page: {
					pageNum: '1',
					pageSize: '10',
					sort:'DESC',//DESC降序，ASC升序
					period:''
				},
				showModal_: false, //发布借入单表单
				LendModal_: false, //发布借出单表单
				single: false,
				moneysort: [ //金额排序
					{
						value: 'DESC',
						label: this.$t('currencyLending').jejx
					},
					{
						value: 'ASC',
						label: this.$t('currencyLending').jesx
					}
				],
				cycle: [ //周期
					{
						value: '',
						label: this.$t('currencyLending').qb
					},
					{
						value: '7',
						label: '7天'
					},
					{
						value: '15',
						label: '15天'
					},
					{
						value: '30',
						label: '30天'
					},
					{
						value: '60',
						label: '60天'
					}
				],
				cityList1: [{
						value: 'beijing',
						label: 'USDT'
					},
					{
						value: 'shanghai',
						label: 'BTC'
					},
					{
						value: 'shenzhen',
						label: 'ETH'
					},
					{
						value: 'hangzhou',
						label: 'EOS'
					}
				],
				cityList2: [{
						value: '7',
						label: '7天'
					},
					{
						value: '15',
						label: '15天'
					},
					{
						value: '30',
						label: '30天'
					},
					{
						value: '60',
						label: '60天'
					},
					{
						value: '90',
						label: '90天'
					}
				],
				model1: '',
				zhouqi: '',
				model2: '',
				model3: '',
				formItem: {
					input: '',
					select: '',
					radio: 'male',
					checkbox: [],
					switch: true,
					date: '',
					time: '',
					slider: [20, 50],
					textarea: ''
				},
				show_borrow: true,
				theme1: 'light',
				borrow: [		//借出市场数据
					// {
					// 	username: 'QKL借贷',
					// 	minAmount: '100',
					// 	money: '200,000',
					// 	interestDue:12,
					// 	day: 208,
					// 	year: '7.3',
					// 	qi: '7'
					// },
					// {
					// 	username: 'QKL借贷',
					// 	minAmount: '100',
					// 	money: '200,000',
					// 	interestDue:12,
					// 	day: 208,
					// 	year: '7.3',
					// 	qi: '7'
					// },
					// {
					// 	username: 'QKL借贷',
					// 	minAmount: '100',
					// 	money: '200,000',
					// 	interestDue:12,
					// 	maturityYield: 208,
					// 	period: '7.3',
					// 	yearRate: '7',
					// 	status: '0'
					// }
				],
				//借入市场数据
				lend: [
					// {
					// 	username: 'QKL借贷',
					// 	minAmount: '100',
					// 	money: '200,000',
					// 	maturityYield: 12,
					// 	period: '7.3',
					// 	yearRate: '7',
					// 	status: '0',
					// 	id:1
					// },
					// {
					// 	username: 'QKL借贷',
					// 	minAmount: '100',
					// 	money: '200,000',
					// 	maturityYield: 12,
					// 	period: '7.3',
					// 	yearRate: '7',
					// 	status: '0',
					// 	id:2
					// },

				]
			}
		},
		computed: {
			// 借出填写的利息
			jiechu_tianxie_lixi(){
				return Number(Number(this.jiechu_tianxie.money) * Number(Number(this.jiechu_tianxie.rililv)/100) * Number(this.jiechu_tianxie.day)).toFixed(8)
			},
			// 借入填写的利息
			jieru_tianxie_lixi(){
				// 利息 = 借入金额 * 日利率 * 周期
				return Number(Number(this.jieru_tianxie.money) * Number(Number(this.jieru_tianxie.rililv)/100) * Number(this.jieru_tianxie.day)).toFixed(8)
			},
			// 借入填写的手续费
			jieru_tianxie_fee(){
				return Number(Number(this.jieru_tianxie.money) * this.coin_fee).toFixed(8)
			},
			// 借入填写的质押金额
			jieru_tianxie_zhiya(){
				return Number(Number(this.jieru_tianxie.money) / 0.7 / this.rate).toFixed(8)
			},
			// 发布借入表单预计抵押
			borrowForm_yujidiya() {
				return Number(Number(this.borrowForm.money) / 0.7 / this.rate).toFixed(8)
			},
			// 发布借入表单到期利息
			borrowForm_daoqilixi() {
				let day = this.borrowForm.day.slice(0, this.borrowForm.day.indexOf('天'))
				return Number(Number(this.borrowForm.money) * Number(Number(this.borrowForm.rililv)/100) * day).toFixed(8)
			},
			// 发布借入表单手续费
			borrowForm_shouxufei() {
				return Number(Number(this.borrowForm.money) * this.coin_fee).toFixed(8)
			},
			// 发布借入表单折合年化
			borrowForm_zhehenianhua() {
				return Number(Number(Number(this.borrowForm.rililv)/100) * 365).toFixed(8)
			},
			// 发布借出表单到期利息
			lendForm_daoqilixi() {
				let day = this.LendForm.day.slice(0, this.LendForm.day.indexOf('天'))
				return Number(Number(this.LendForm.money) * Number(Number(this.LendForm.rililv)/100) * day).toFixed(8)
			},
			// 发布借出表单折合年化
			lendForm_zhehenianhua() {
				return Number(Number(Number(this.LendForm.rililv)/100) * 365).toFixed(8)
			}
		},
		methods: {
			Twarning(str){
				this.$Message.warning(str)
			},
			// 提交购买别人的借出表单
			sellOrder(){
				let params = {
					jyPassword:this.jiechu_tianxie.password,	//交易密码
					type:1,	//类型0借入，1借出
					// pledgeCoinUnit:this.jieru_tianxie.diya_currency.diya,	//质押币种
					// pledgeMoney:this.jieru_tianxie_zhiya,	//质押金额
					moneyId:this.jiechu_tianxie.id,	//单子id
					money:this.jiechu_tianxie.money,	//填写金额
					interest:this.jiechu_tianxie_lixi	//利息,到期收益
					// serviceCharge:'0'	//手续费
				}
				this.$http.post(this.host + '/exchange/accessRecord/access', params).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						this.$Message.success('借出成功')
						this.getBorrowList()
						this.jiechu_tianxie.password = ''	//借入成功清除交易密码
						this.dianjijiechu = false		//借入成功关闭表单
					} else {
						this.$Message.error(res.data.message)
					}
					this.jiechu_tianxie.IS = true
				}).catch(err=>{
					this.jiechu_tianxie.IS = true
				})
			},
			// 提交购买别人的借入表单
			buyOrder(){
				let params = {
					jyPassword:this.jieru_tianxie.password,	//交易密码
					type:0,	//类型0借入，1借出
					pledgeCoinUnit:this.jieru_tianxie.diya_currency.diya,	//质押币种
					pledgeMoney:this.jieru_tianxie_zhiya,	//质押金额
					moneyId:this.jieru_tianxie.id,	//单子id
					money:this.jieru_tianxie.money,	//填写金额
					interest:this.jieru_tianxie_lixi,	//利息
					serviceCharge:this.jieru_tianxie_fee	//手续费
				}
				this.$http.post(this.host + '/exchange/accessRecord/access', params).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						this.$Message.success('借入成功')
						this.getLendList()
						this.jieru_tianxie.password = ''	//借入成功清除交易密码
						this.dianjijieru = false		//借入成功关闭表单
					} else {
						this.$Message.error(res.data.message)
					}
					this.jieru_tianxie.IS = true
				}).catch(err=>{
					this.jieru_tianxie.IS = true
				})
			},
			// 获取币种汇率
			getCoinRate(coin) {
				this.$http.post(this.host + '/exchange/accessRecord/getCoinRate', {
					unit: coin
				}).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						// 质押金额 = 借入金额 / 质押率 / 汇率
						this.rate = Number(res.data.message)
					} else {
						this.$Message.error(res.data.message)
					}
				})
			},
			// 获取借入币种和币种手续费
			getCoinFee() {
				this.$http.post(this.host + '/exchange/accessRecord/getCoinServiceChange', {
					unit: 'USDT'
				}).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						this.coin_fee = Number(res.data.data.serviceChange) / 100
					} else {
						this.$Message.error(res.data.message)
					}
				})
			},
			// 借入市场放借出列表，借出市场放借入列表
			// 获取借入列表,借出市场数据
			getBorrowList() {
				this.$http.post(this.host + '/exchange/borrowMoney/getBorrowMoneyList', this.page)
					.then(res => {
						console.log(res)
						if (res.data.code == 0) {
							this.borrow = res.data.data.content
							this.NumAll = res.data.data.totalElements
							this.borrow.forEach((v, i) => {
								v.money = v.borrowAmount - v.hasBorrowAmount //剩余借出数量
								v.username = v.member.username
							})
						}
					})
			},
			// 获取借出列表,借入市场数据
			getLendList() {
				this.$http.post(this.host + '/exchange/loanMoney/getLoanMoneyList', this.page)
					.then(res => {
						if (res.data.code == 0) {
							this.lend = res.data.data.content
							this.NumAll = res.data.data.totalElements
							this.lend.forEach((v, i) => {
								v.money = v.loanAmount - v.hasLoanAmount //剩余借出数量
								v.username = v.member.username
							})
						}
					})
			},
			// 显示借入单
			releaseBorrow() {
				this.jy_password = ''
				this.borrowForm.money = 1000
				this.showModal_ = true
			},
			// 显示借出单
			releaseLend() {
				this.jy_password = ''
				this.LendForm.money = 1000
				this.LendModal_ = true
			},
			// 选择器一
			choose1(v) {
				console.log(v)
			},
			isBorrow() {
				this.show_borrow = true
			},
			isLend() {
				console.log(2)
				this.show_borrow = false
				this.getBorrowList()
			},
			// 提交借入借出表单
			tijiao(num) {
				if (num == 1) {	//借入
					this.borrow_()
				} else if (num == 2) {	//借出
					this.lend_()
				}
			},
			// 关闭填写借出和借入表单
			close() {
				this.showModal_ = false
				this.LendModal_ = false
			},
			borrow_() {
				console.log(this.borrowForm.money, this.borrowForm.small_num, this.borrowForm.max_num, this.jy_password)
				if (this.borrowForm.money == '' || this.borrowForm.small_num == '' || this.borrowForm.max_num == '' || this.jy_password ==
					'') {
					this.$Message.error('请完善信息')
					return
				}else if(this.borrowForm.money == 0){
					this.$Message.error('请完善信息')
					return
				}
				// else if(Number(this.borrowForm.money)<1000){
				// 	this.$Message.error('不得小于1000')
				// 	return
				// }
				else if(Number(this.borrowForm.money)<Number(this.borrowForm.small_num)){
					this.$Message.error('最小借款金额不能超过借入金额')
					return
				}
				this.disabled_ = true			//禁止重复提交
				let day = this.borrowForm.day.slice(0, this.borrowForm.day.indexOf('天'))
				let borrow = {
					jyPassword: this.jy_password, //交易密码
					pledgeCoinUnit: this.borrowForm.choose_coin, //质押币种
					pledgeMoney: this.borrowForm_yujidiya, //质押金额
					borrowAmount: this.borrowForm.money, //借入金额
					period: day, //周期
					dayRate: this.borrowForm.rililv, //日利率
					yearRate: this.borrowForm_zhehenianhua, //年利率
					interestDue: this.borrowForm_daoqilixi, //到期利息
					minAmount: this.borrowForm.small_num, //单笔最小借款
					maxAmount: this.borrowForm.max_num, //单笔最大借款
					serviceCharge: this.borrowForm_shouxufei //手续费
				}
				this.$http.post(this.host + '/exchange/borrowMoney/issueBorrow', borrow)
					.then(res => {
						console.log(res)
						if (res.data.code == 0) {
							this.disabled_ = false		//取消禁止按钮
							this.jy_password = ''
							this.$Message.success('发布成功')
							this.showModal_ = false
							this.LendModal_ = false
						} else {
							this.$Message.error(res.data.message)
							this.disabled_ = false		//取消禁止按钮
						}
					})
				console.log(this.borrowForm)
			},
			lend_() {
				if (this.LendForm.money == '' || this.LendForm.small_num == '' || this.LendForm.max_num == '' || this.jy_password ==
					'') {
					this.$Message.error('请完善信息')
					return
				}
				// else if(Number(this.LendForm.money)<1000){
				// 	this.$Message.error('不得小于1000')
				// 	return
				// }
				else if(Number(this.LendForm.money)<Number(this.LendForm.small_num)){
					this.$Message.error('最小借款金额不能超过借出金额')
					return
				}
				this.disabled_ = true			//禁止重复提交
				let day = this.LendForm.day.slice(0, this.LendForm.day.indexOf('天'))
				let lend = {
					jyPassword: this.jy_password, //交易密码
					loanAmount: this.LendForm.money, //借出金额
					period: day, //周期
					dayRate: this.LendForm.rililv, //日利率
					yearRate: this.lendForm_zhehenianhua, //年利率
					maturityYield: this.lendForm_daoqilixi, //到期利息
					minAmount: this.LendForm.small_num, //最小借款金额
					maxAmount: this.LendForm.max_num //最大借款金额
				}
				this.$http.post(this.host + '/exchange/loanMoney/issueLoan', lend)
					.then(res => {
						console.log(res)
						if (res.data.code == 0) {
							this.disabled_ = false		//取消禁止按钮
							this.jy_password = ''
							this.$Message.success('发布成功')
							this.getLendList()	//刷新列表
							this.showModal_ = false
							this.LendModal_ = false
						} else {
							this.disabled_ = false		//取消禁止按钮
							this.$Message.error(res.data.message)
						}
					})
			},
			// 分页
			changePage1(num){
				this.page.pageNum = num
				this.getLendList()
			},
			changePage2(num){
				this.page.pageNum = num
				this.getBorrowList()
			},
			// 金额排序筛选
			paixu_(v){
				console.log(v)
				this.page.sort = v
				if(this.show_borrow==true){
					this.getLendList()
				}else{
					this.getBorrowList()
				}
			},
			// 周期筛选
			zhouqi_(v){
				console.log(v)
				this.page.period = v
				if(this.show_borrow==true){
					this.getLendList()
				}else{
					this.getBorrowList()
				}
			}
		},
		mounted() {
			this.getLendList()		//列表
			this.getCoinFee()
			this.getCoinRate(this.borrowForm.choose_coin)
		},
		created() {
			// 默认抵押币种为选择币种中的第一个
			this.jieru_tianxie.diya_currency.diya = this.jieru_tianxie.diya_currency.coin_type[0].name
		},
		filters: {
			slice_1(v) {
				return v.slice(0, 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.four_bu{
		display: flex;
		justify-content: space-around;
		p{
			width: 20%;
			// background: #f5c125;
			padding: 20px 0;
		}
	}
	.ivu-btn-warning {
		padding: 10px 50px;
		background: #1ebb88;
		border: none;
	}
	.ivu-btn-primary {
		padding: 10px 50px;
		border: none;
	}
	.heads_img {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #1ebb88;
		font-size: 18px;
		font-weight: bold;
		color: #fff;
		text-align: center;
		line-height: 28px;
	}

	.w165 {
		width: 165px;
	}

	.pointer {
		cursor: pointer;
	}

	.qianhui {
		color: #888;
	}

	.yellow {
		color: #1ebb88;
	}

	.w330 {
		width: 330px;
	}

	.txt_left {
		text-align: left;
	}

	.txt_right {
		text-align: right;
	}

	.txt_center {
		text-align: center;
	}

	.flex {
		display: flex;
	}

	.between {
		justify-content: space-between;
	}

	.jst_center {
		justify-content: center;
	}

	.jst_around {
		justify-content: space-around;
	}

	.cloumn {
		flex-direction: column;
	}

	.items_center {
		align-items: center;
	}

	.font18 {
		font-size: 18px;
	}

	.font20 {
		font-size: 20px;
	}

	.font30 {
		font-size: 30px;
	}

	.font16 {
		font-size: 16px;
	}

	.font14 {
		font-size: 14px;
	}

	.pd_lr6 {
		padding: 0 6px;
	}

	.mt30 {
		margin-top: 30px;
	}

	.yellow_hover:hover {
		color: #3F9388;
	}

	.mr8 {
		margin-right: 8px;
	}

	.ml8 {
		margin-left: 8px;
	}

	.ml16 {
		margin-left: 16px;
	}

	.lineH40 {
		line-height: 40px;
	}

	.lineH50 {
		line-height: 50px;
	}

	.gray {
		color: gray;
	}

	.block {
		color: #000;
	}

	.white {
		color: #fff;
	}

	.bold {
		font-weight: bold;
	}

	.mr10 {
		margin-right: 10px;
	}

	.mr20 {
		margin-right: 20px;
	}

	.cengji {
		display: flex;
		justify-content: space-between;
		width: 1380px;
		padding: 20px 0;
	}

	.zhezhao_ {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 900;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal_ {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -325px;
		margin-left: -340px;
		display: flex;
		flex-direction: column;
		// align-items: center;
		width: 680px;
		height: 650px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.98);
	}

	.kuang_ {
		display: flex;
		flex-direction: column;
		font-weight: bold;
		// align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		background: #f6f6f6;
		width: 100%;
		padding: 40px 0;
		.jd_img {
			width: 100%;
		}

		.BuyandSell {
			width: 100%;
			background: #f6f6f6;
			display: flex;
			flex-direction: column;
			align-items: center;

			.Menu1 {
				width: 1380px;
				border: none;

				.li1 {
					margin: 0 40px 0 0;
				}

				.lend {
					margin: 0 40px 0 0;
					color: #3F9388;
					border-bottom: 2px solid #3F9388;
				}

				.borrow {
					margin: 0 40px 0 0;
					color: #3F9388;
					border-bottom: 2px solid #3F9388;
				}

				.ivu-menu-item:hover {
					color:#3F9388;
					border-color:#3F9388;
				}
			}

			.BuyandSell_center {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.list_ {
					width: 1380px;
					margin: 20px 0;
					background: #fff;
					display: flex;
					flex-direction: column;
					padding: 24px 48px 18px 48px;

					div {
						width: 100%;
						padding: 10px 0;
						// height: 120px;
					}
				}

				.lend {
					padding: 20px 0;
					color: #3f9388;
					border-bottom: #3f9388;
				}

				.borrow {}
			}
		}
		.gray{
			background: #ededed;
		}
	}
</style>
