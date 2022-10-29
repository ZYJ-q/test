<template>
  <div class="container contract" :class="skin">
    <div class="symbol">
      <div class="item" @click="currentCoinFavorChange">
        <Icon
          v-if="currentCoinIsFavor"
          type="ios-star"
          color="#1ebb88"
          size="24"
        />
        <Icon v-else type="ios-star-outline" color="#1ebb88" size="24" />
      </div>
      <div class="item">
        <!-- 下拉合约列表 -->
        <Dropdown @on-click="changeContract">
          <div style="display: flex">
            <a href="javascript:void(0)" style="color: #1ebb88">
              <span class="coin">
                {{ contractText }}
                <small>/USDT</small>
              </span>
              <Icon type="ios-arrow-down" style="color: #1ebb88"></Icon>
            </a>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem
              :name="coin.contractCoin.coinSymbol"
              :symbol="coin.contractCoin.coinSymbol"
              v-for="(coin, index) in contractList"
              :key="index"
              >{{ coin.contractCoin.coinSymbol }}</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="item">
        <span class="text">{{ $t("coin.last") }}</span>
        <span
          class="num"
          :class="{ buy: currentCoin.change > 0, sell: currentCoin.change < 0 }"
          >{{ currentCoin.close | toFixed(baseCoinScale) }}</span
        >
        <span class="price-cny"
          >￥{{ (currentCoin.usdRate * CNYRate) | toFixed(2) }}</span
        >
      </div>
      <div class="item">
        <span class="text">{{ $t("coin.up") }}</span>
        <span
          class="num"
          :class="{ buy: currentCoin.change > 0, sell: currentCoin.change < 0 }"
          >{{ currentCoin.rose }}</span
        >
      </div>
      <div class="item" style="width: 120px">
        <span class="text tCenter">{{ $t("other.ot8") }}</span>
        <span class="num tCenter" style="display: block">{{
          topPrice.indexPrice
        }}</span>
      </div>
      <!--      <div class="item" style="width:120px;">-->
      <!--        <span class="text tCenter">{{$t('other.ot9')}}</span>-->
      <!--        <span class="num tCenter" style="display: block;">{{topPrice.markPrice}}</span>-->
      <!--      </div>-->
      <div class="item">
        <span class="text">{{ $t("coin.celling") }}</span>
        <span class="num">{{ currentCoin.high | toFixed(baseCoinScale) }}</span>
      </div>
      <div class="item">
        <span class="text">{{ $t("coin.floor") }}</span>
        <span class="num">{{ currentCoin.low | toFixed(baseCoinScale) }}</span>
      </div>
      <div class="item">
        <span class="text">{{ $t("coin.turnover") }}</span>
        <span class="num"
          >{{ currentCoin.volume }} {{ $t("contract.contractPic") }}</span
        >
      </div>
      <div class="item" @click="changeSkin">
        <img :src="skin == 'night' ? night : day" alt />
      </div>
    </div>
    <div class="main">
      <!-- K线图 -->
      <div class="right">
        <div class="imgtable" :loading="loadingButton7">
          <div
            id="kline_container1"
            :class="{ hidden: currentImgTable === 's' }"
          ></div>
        </div>
      </div>
      <!-- 委托列表和最近成交 -->
      <div class="left">
        <div class="plate-wrap">
          <div>
            <Table
              height="220"
              v-show="selectedPlate != 'buy'"
              @on-current-change="buyPlate"
              highlight-row
              ref="currentRowTable"
              class="sell_table"
              :no-data-text="$t('common.nodata')"
              :columns="plate.columns"
              :data="plate.askRows"
            ></Table>
          </div>
          <div class="plate-nowprice">
            <span
              class="price"
              :class="{
                buy: currentCoin.change > 0,
                sell: currentCoin.change < 0,
              }"
            >
              <!--              baseCoinScale-->
              {{ currentCoin.price | toFixed(4) }}</span
            >
            <span v-if="currentCoin.change > 0" class="buy">↑</span>
            <span v-else class="sell">↓</span>
            <span class="price-cny"
              >≈ {{ (currentCoin.usdRate * CNYRate) | toFixed(2) }} CNY</span
            >
          </div>
          <div>
            <Table
              height="180"
              v-show="selectedPlate != 'sell'"
              @on-current-change="sellPlate"
              highlight-row
              class="buy_table"
              :no-data-text="$t('common.nodata')"
              :class="{ hidden: selectedPlate === 'all' }"
              :columns="plate.columns"
              :data="plate.bidRows"
            ></Table>
          </div>
        </div>
        <!-- 最近成交 -->
        <div class="trade-wrap" style="margin-top: 14px">
          <Table
            height="224"
            :columns="trade.columns"
            :no-data-text="$t('common.nodata')"
            :data="trade.rows"
          ></Table>
        </div>
      </div>
      <!-- 交易面板和资产概要 -->
      <div class="center">
        <div class="contarct-trade_wrap">
          <div
            style="height: 442px"
            class="contarct-trade_panel trade_panel_logout"
          >
            <div class="mask" v-show="!isLogin">
              <span>
                {{ $t("contract.qx") }}
                <router-link to="/login">
                  <span style="color: #1ebb88">{{
                    $t("common.login")
                  }}</span> </router-link
                >/
                <router-link to="/register">
                  <span style="color: #f67951">{{
                    $t("common.register")
                  }}</span>
                </router-link>
              </span>
            </div>
            <div class="mask" v-show="isLogin && !member.realName">
              <span>
                {{ $t("contract.qx") }}
                <router-link to="/uc/safe">
                  <span style="color: #1ebb88">{{ $t("contract.hy7") }}</span>
                </router-link>
              </span>
            </div>
            <div class="trade_menu">
              <ul>
                <template v-for="(item, index) in btnList">
                  <li @click="tab(index)" :class="{ active: item.check }">
                    {{ item.text }}
                  </li>
                </template>
              </ul>
            </div>
            <div class="mg-warp">
              <div class="get-methods">
                <ul>
                  <template v-for="(item, index) in methodsList">
                    <!--                    btnList[1].check==true&&-->
                    <li
                      @click="tabMN(index)"
                      :class="{ active: item.check, hide2: index == 2 }"
                    >
                      {{ item.text }}
                    </li>
                    <!--                                        <li @click="tabMN(index)" :class="{active:item.check}">{{item.text}}</li>-->
                  </template>
                </ul>
              </div>
              <div class="ganggan" v-show="btnList[0].check == true">
                <ul>
                  <span style="min-width: 30px; line-height: 24px">{{
                    $t("contract.ganggan")
                  }}</span>
                  <template v-for="(item, index) in gangganList">
                    <li @click="tabGG(index)" :class="{ active: item.check }">
                      {{ item.multiple }}X
                    </li>
                  </template>
                </ul>
              </div>
            </div>

            <div class="contract-trade_bd">
              <div class="contract-panel panel_buy">
                <!-- 开仓 -->
                <div class="bd bd_limitedaa" v-show="btnList[0].check == true">
                  <Form ref="formBuy" :rules="form.buyRule" :model="form.buy">
                    <FormItem v-show="methodsList[1].check == true">
                      <Input
                        class="dis-enter"
                        disabled
                        :placeholder="$t('contract.contractExchange')"
                      ></Input>
                      <label>{{ currentCoin.base }}</label>
                    </FormItem>
                    <FormItem v-show="methodsList[2].check == true">
                      <Input
                        @on-keyup="keyEvent"
                        v-model="form.buy.triggerPrice"
                        :placeholder="$t('other.ot11')"
                      ></Input>
                      <label>{{ currentCoin.base }}</label>
                    </FormItem>
                    <FormItem
                      v-show="
                        methodsList[0].check == true ||
                        methodsList[2].check == true
                      "
                    >
                      <Input
                        @on-keyup="keyEvent"
                        @input="watchPrice"
                        v-model="form.buy.limitPrice"
                        :placeholder="
                          methodsList[2].check == true
                            ? $t('other.ot16')
                            : $t('contract.buyprice')
                        "
                      ></Input>
                      <label>{{ currentCoin.base }}</label>
                      <!--                      <label>{{methodsList[2].check==true?currentCoin.base:$t('other.ot12')}}</label>-->
                    </FormItem>

                    <!-- 数量-->
                    <FormItem>
                      <Input
                        @on-keyup="keyEvent"
                        @input="watchAmount"
                        v-model="form.buy.limitAmount"
                        :placeholder="$t('contract.buyNums')"
                      ></Input>
                      <label> {{ $t("contract.contractPic") }}</label>
                    </FormItem>
                    <div
                      class="slider-wrap"
                      v-show="methodsList[2].check != true"
                    >
                      <Slider
                        class="silder-buy"
                        v-model="sliderBuyLimitPercent"
                        show-tip="always"
                        :tip-format="tipFormat"
                      ></Slider>
                      <div
                        class="slider-stop"
                        v-for="item in sliderStep"
                        :style="'left: ' + item + '%;'"
                        @click="silderGo('sliderBuyLimitPercent', item)"
                      >
                        <div class="slider-block"></div>
                      </div>
                    </div>
                    <div class="total buy_total gray-font">
                      <p>{{ $t("contract.contractValue") }}</p>
                      <div>
                        <span>{{
                          form.buy.limitTurnover | toFloor(baseCoinScale)
                        }}</span>
                        {{ currentCoin.base }}
                      </div>
                    </div>
                    <div
                      v-if="isLogin && methodsList[2].check != true"
                      class="hd hd_login gray-font"
                    >
                      <p>
                        <span>{{ $t("other.ot10") }}</span>
                      </p>
                      <div>
                        <span>{{ wallet.hand | toFloor(baseCoinScale) }}</span>
                        <span>{{ $t("contract.contractPic") }}</span>
                      </div>
                    </div>
                    <div class="hd" v-else></div>
                    <div class="contract-btns">
                      <Button
                        class="bg-green"
                        @click="buyWithLimitPrice(0, 0)"
                        :loading="loadingButton1"
                      >
                        <span>{{ $t("contract.buyMore") }}</span>
                      </Button>
                      <Button
                        class="bg-red"
                        @click="buyWithLimitPrice(1, 0)"
                        :loading="loadingButton5"
                      >
                        <span>{{ $t("contract.sellOut") }}</span>
                      </Button>
                    </div>
                  </Form>
                </div>
                <!--                 平仓-->
                <div
                  style="display: none"
                  class="bd bd_marketaa"
                  v-show="btnList[1].check == true"
                >
                  <Form ref="formSell">
                    <FormItem v-show="methodsList[1].check == true">
                      <Input
                        class="dis-enter"
                        disabled
                        :placeholder="$t('contract.contractExchange')"
                      ></Input>
                      <label>{{ currentCoin.base }}</label>
                    </FormItem>
                    <FormItem v-show="methodsList[0].check == true">
                      <Input
                        @on-keyup="keyEvent"
                        v-model="form.buy.limitPrice"
                        :placeholder="$t('contract.buyprice')"
                      ></Input>
                      <label>{{ currentCoin.base }}</label>
                    </FormItem>
                    <FormItem>
                      <Input
                        @on-keyup="keyEvent"
                        v-model="form.buy.limitAmount"
                        :placeholder="$t('contract.buyNums')"
                      ></Input>
                      <label>{{ $t("contract.contractPic") }}</label>
                    </FormItem>
                    <!--                    <div class="slider-wrap">-->
                    <!--                      <Slider-->
                    <!--                              class="silder-buy"-->
                    <!--                              v-model="sliderBuyLimitPercent"-->
                    <!--                              show-tip="always"-->
                    <!--                              :tip-format="tipFormat"-->
                    <!--                      ></Slider>-->
                    <!--                      <div-->
                    <!--                              class="slider-stop"-->
                    <!--                              v-for="item in sliderStep"-->
                    <!--                              :style="'left: '+item+'%;'"-->
                    <!--                              @click="silderGo('sliderBuyLimitPercent',item)"-->
                    <!--                      >-->
                    <!--                        <div class="slider-block"></div>-->
                    <!--                      </div>-->
                    <!--                    </div>-->

                    <div v-if="isLogin" class="hd hd_login gray-font">
                      <p>
                        <span>{{ $t("other.ot33") }}</span>
                      </p>
                      <div>
                        <span
                          >{{ $t("contract.cw.cw15") }}{{ wallet.pEmpty
                          }}{{ $t("contract.contractPic") }}/{{
                            $t("contract.cw.cw16")
                          }}{{ wallet.pMore
                          }}{{ $t("contract.contractPic") }}</span
                        >
                        <!--                        <span></span>-->
                      </div>
                    </div>
                    <div class="contract-btns">
                      <Button
                        class="bg-green"
                        @click="buyWithLimitPrice(0, 1)"
                        :loading="loadingButton1"
                      >
                        {{ $t("other.ot14") }}
                      </Button>
                      <Button
                        class="bg-red"
                        @click="buyWithLimitPrice(1, 1)"
                        :loading="loadingButton5"
                      >
                        {{ $t("other.ot15") }}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 资产概要 -->
        <div class="asset-warp">
          <div class="title flex flex-pack-between flex-align-center">
            <span>{{ $t("zcgy.z1") }}</span>
            <router-link v-show="isLogin" class="linkmore" to="/uc/money">{{
              $t("contract.zjhz")
            }}</router-link>
          </div>
          <ul>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z2") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z2") }}</p>
                </div>
              </Tooltip>
              <p>{{ accountQu ? accountQu : "--" }}</p>
            </li>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z3") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z3") }}</p>
                </div>
              </Tooltip>
              <p>
                {{ assetsDetail.useableBond ? assetsDetail.useableBond : "--" }}
              </p>
            </li>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z4") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z4") }}</p>
                </div>
              </Tooltip>
              <p>
                {{ assetsDetail.dealProfit ? assetsDetail.dealProfit : "--" }}
              </p>
            </li>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z5") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z5") }}</p>
                </div>
              </Tooltip>
              <p>{{ ykTotal ? ykTotal : "--" }}</p>
            </li>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z6") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z6") }}</p>
                </div>
              </Tooltip>
              <p>
                {{
                  assetsDetail.positionBond ? assetsDetail.positionBond : "--"
                }}
              </p>
            </li>
            <li>
              <Tooltip placement="left">
                <p class="dash-line">{{ $t("zcgy.z7") }}</p>
                <div slot="content">
                  <p>{{ $t("zcgy.z7") }}</p>
                </div>
              </Tooltip>
              <p>
                {{ assetsDetail.orderBond ? assetsDetail.orderBond : "--" }}
              </p>
            </li>
            <!--            <li>-->
            <!--              <Tooltip placement="left">-->
            <!--                <p class="dash-line">{{$t('zcgy.z8')}}</p>-->
            <!--                <div slot="content">-->
            <!--                  <p>{{$t('zcgy.z8')}}</p>-->
            <!--                  &lt;!&ndash; <i><i>Can customize the style</i></p> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </Tooltip>-->
            <!--              <p>{{assetsDetail.currentMultiple?assetsDetail.currentMultiple:'&#45;&#45;'}}</p>-->
            <!--            </li>-->
          </ul>
        </div>
      </div>
    </div>

    <div class="order">
      <div class="order-handler">
        <span
          @click="changeOrder('cangw', 0)"
          :class="{ active: selectedOrder === 'cangw' }"
          >{{ $t("contract.cangw") }}</span
        >
        <span
          @click="changeOrder('nowWT', 1)"
          :class="{ active: selectedOrder === 'nowWT' }"
          >{{ $t("contract.nowWT") }}({{ currentNum }})</span
        >
        <!--        <span-->
        <!--                @click="changeOrder('jhWT',2)"-->
        <!--                :class="{active:selectedOrder==='jhWT'}"-->
        <!--        >{{$t('contract.jhwt')}}({{planNum}})</span>-->
        <span
          @click="changeOrder('pastWT', 3)"
          :class="{ active: selectedOrder === 'pastWT' }"
          >{{ $t("contract.pastWT") }}</span
        >
        <span
          @click="changeOrder('CXlogs', 4)"
          :class="{ active: selectedOrder === 'CXlogs' }"
          >{{ $t("contract.CXlogs") }}</span
        >
        <!--        <span-->
        <!--                @click="changeOrder('ZYZS',5)"-->
        <!--                :class="{active:selectedOrder==='ZYZS'}"-->
        <!--        >{{$t('contract.ZYZS')}}({{zyzsNum}})</span>-->
        <router-link
          v-show="selectedOrder === 'pastWT' && isLogin"
          class="linkmore"
          to="/uc/jyls"
          >{{ $t("contract.jyls") }}</router-link
        >
        <router-link
          v-show="selectedOrder === 'CXlogs' && isLogin"
          class="linkmore"
          to="/uc/wtls"
          >{{ $t("contract.jyls") }}</router-link
        >
      </div>
      <div class="table contractT">
        <div class="mask" v-show="!isLogin">
          <span>
            {{ $t("contract.qx") }}
            <router-link to="/login">
              <span style="color: #1ebb88">{{ $t("common.login") }}</span>
            </router-link>
            {{ $t("contract.hc") }}
          </span>
        </div>
        <!--        仓位-->
        <Table
          height="200"
          :no-data-text="$t('common.nodata')"
          v-if="selectedOrder === 'cangw'"
          :columns="cwOrder.columns"
          :data="cwOrder.rows"
          :loading="cwOrderLoading"
        ></Table>
        <!--        当前委托-->
        <Table
          height="200"
          :no-data-text="$t('common.nodata')"
          v-if="selectedOrder === 'nowWT'"
          :columns="currentOrder.columns"
          :data="currentOrder.rows"
          :loading="currentLoading"
        ></Table>
        <!--        计划委托-->
        <Table
          height="200"
          v-if="selectedOrder === 'jhWT'"
          :no-data-text="$t('common.nodata')"
          :columns="planOrder.columns"
          :data="planOrder.rows"
          :loading="planLoading"
        ></Table>
        <!--        已成交-->
        <Table
          height="200"
          :no-data-text="$t('common.nodata')"
          v-if="selectedOrder === 'pastWT'"
          :columns="historyOrder.columns"
          :data="historyOrder.rows"
          :loading="historyLoading"
        ></Table>
        <!--        撤销记录-->
        <Table
          height="200"
          v-if="selectedOrder === 'CXlogs'"
          :no-data-text="$t('common.nodata')"
          :columns="revokeOrder.columns"
          :data="revokeOrder.rows"
          :loading="revokeLoading"
        ></Table>
        <!--        止盈止损-->
        <Table
          height="200"
          v-if="selectedOrder === 'ZYZS'"
          :no-data-text="$t('common.nodata')"
          :columns="zyzsOrder.columns"
          :data="zyzsOrder.rows"
          :loading="zyzsLoading"
        ></Table>
      </div>
    </div>

    <!--  //计划委托止盈止损弹框-->
    <Modal
      class="modelSty"
      :title="modelMask.title"
      v-model="modal10"
      :footer-hide="true"
      :mask-closable="false"
      @on-cancel="closeEve()"
      class-name="vertical-center-modal"
    >
      <Form class="contarct-trade_wrap" v-show="showMIndex == 1">
        <div class="get-methods">
          <ul class="flex">
            <template v-for="(item, index) in methodsList">
              <li
                @click="tabMN(index)"
                :class="{ active: item.check, hide2: index == 2 }"
              >
                {{ item.text }}
              </li>
            </template>
          </ul>
        </div>
        <FormItem v-show="methodsList[0].check == true">
          <Input
            @on-keyup="keyEvent"
            v-model="form.buy.limitPrice"
            :placeholder="$t('contract.buyprice')"
          ></Input>
          <label>{{ currentCoin.base }}</label>
        </FormItem>
        <FormItem v-show="methodsList[1].check == true">
          <Input
            class="dis-enter"
            disabled
            :placeholder="$t('contract.contractExchange')"
          ></Input>
          <label>{{ currentCoin.base }}</label>
        </FormItem>
        <FormItem>
          <Input
            class="dis-enter"
            :placeholder="$t('contract.buyNums')"
            v-model="form.buy.limitAmount"
          ></Input>
          <label>{{ $t("contract.contractPic") }}</label>
        </FormItem>
        <Button class="btnSub" @click="buyWithLimitPrice(directionP, 1)">{{
          $t("otc.publishad.submit")
        }}</Button>
      </Form>
      <Form
        class="contarct-trade_wrap"
        v-show="showMIndex == 2 || showMIndex == 3"
      >
        <FormItem>
          <Input
            @on-keyup="keyEvent"
            :placeholder="$t('other.ot11')"
            v-model="form.buy.triggerPrice"
          ></Input>
          <label>{{ currentCoin.base }}</label>
        </FormItem>
        <FormItem>
          <Input
            class="dis-enter"
            :placeholder="$t('contract.zyzst.wt5')"
            v-model="form.buy.limitPrice"
          ></Input>
          <!--          <label>{{$t('contract.jh.wt15')}}</label>-->
        </FormItem>
        <FormItem>
          <Input
            class="dis-enter"
            :placeholder="$t('contract.buyNums')"
            v-model="form.buy.limitAmount"
          ></Input>
          <label>{{ $t("contract.contractPic") }}</label>
        </FormItem>
        <Button
          class="btnSub"
          @click="buyWithLimitPrice(directionP, 1, 1)"
          v-show="showMIndex == 2"
          >{{ $t("otc.publishad.submit") }}</Button
        >
        <Button
          class="btnSub"
          @click="buyWithLimitPrice(directionP, 1, 2)"
          v-show="showMIndex == 3"
          >{{ $t("otc.publishad.submit") }}</Button
        >
      </Form>
    </Modal>
    <!--    撤销-->
    <Modal
      class="modelRevoke"
      :title="$t('other.ot25')"
      v-model="modal5"
      :footer-hide="true"
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <Form class="contarct-trade_wrap">
        <div style="font-size: 16px">{{ $t("other.ot26") }}？</div>
        <!--        <FormItem>-->
        <!--          <Input class="dis-enter" v-model="revokeInfo.chNum" disabled :placeholder="'请输入撤回数量'"></Input>-->
        <!--        </FormItem>-->
        <div class="flex flex-pack-end flex-align-center">
          <Button class="btnSub" @click="closeRevoke">{{
            $t("other.ot27")
          }}</Button>
          <Button class="btnSub" @click="sureRevoke(revokeInfo.id)">{{
            $t("other.ot28")
          }}</Button>
        </div>
      </Form>
    </Modal>
    <Spin size="large" fix v-show="showLoad"></Spin>
  </div>
</template>
<style scoped lang="scss">
@import url(../../assets/css/contract.css);
$night-bg: #0b1520;
$night-headerbg: #27313e;
$night-contentbg: #15251f;
$night-color: #fff;
.hide2 {
  display: none;
}
/deep/ .slider-stop {
  z-index: 100;
}
/deep/ .slider-block {
  margin-top: 2px !important;
  margin-left: 2px !important;
  width: 12px !important;
  height: 12px !important;
  /*background-color: #ccc;*/
  background: #fff !important;
  border: 2px solid #f0a70a;
  border-radius: 6px;
}
.modelSty {
  background: #003f3c;
  .get-methods {
    ul {
      margin-bottom: 20px;
      li {
        font-size: 12px;
        padding: 0 16px;
        margin-right: 10px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.3);
        &.active {
          border: 1px solid #f0a70a;
          border-radius: 4px;
          // color: #1ebb88;
        }
      }
    }
  }
  .btnSub {
    width: 100%;
    background: #00b275;
    color: #fff;
    height: 40px;
    /*line-height: 40px;*/
    cursor: pointer;
    padding: 0;
    border: 0;
    font-size: 16px;
    letter-spacing: 2px;
    &:focus {
      outline: none;
      border: none;
    }
  }
}

.contract {
  color: #fff;
  background-color: #f8f8f8;
  .contractT {
    position: relative;
    background: #15251f;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      span {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .main {
    display: flex;
    .left {
      flex: 0 0 20%;
      margin-right: 1%;
      // background-color: #15251f;
      border-radius: 6px;
      // margin-right: 1%;
      .handlers {
        font-size: 0;
        padding: 10px 20px;
        background-color: #003f3c;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        .handler {
          display: inline-block;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          cursor: pointer;
          &.handler-all {
            background-image: url("../../assets/images/exchange/plate_all.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_all_active.png");
            }
          }
          &.handler-green {
            background-image: url("../../assets/images/exchange/plate_green.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_green_active.png");
            }
          }
          &.handler-red {
            background-image: url("../../assets/images/exchange/plate_red.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_red_active.png");
            }
          }
        }
      }
      .plate-nowprice {
        text-align: center;
        background-color: #003f3c;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 42px;
        justify-content: center;
        font-size: 18px;
        font-weight: 500;
        .price {
          font-size: 22px;
          margin-right: 10px;
        }
        .price-cny {
          font-size: 14px;
          margin-left: 10px;
          font-weight: 400;
        }
      }
    }
    .right {
      flex: 0 0 56%;
      margin-right: 1%;
      .imgtable {
        height: 680px;
        position: relative;
        overflow: hidden;
        // margin-bottom: 20px;
        .handler {
          position: absolute;
          top: 10px;
          right: 40px;
          z-index: 1000;
          > span {
            background-color: #fff;
            color: #333;
            padding: 2px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 2px;
            opacity: 0.5;
            &.active {
              opacity: 1;
            }
          }
        }
      }
    }
    .center {
      flex: 0 0 22%;
      .contarct-trade_wrap {
        .trade_menu {
          position: relative;
          background-color: #003f3c;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          font-size: 0;
          height: 40px;
          line-height: 40px;
          > ul {
            display: flex;
            li {
              font-size: 16px;
              padding: 0 20px;
              cursor: pointer;
              &.active {
                background-color: #15251f;
                color: #1ebb88;
              }
              &:first-child {
                border-top-left-radius: 6px;
              }
            }
          }
          .fee-wrap {
            position: absolute;
            top: 0;
            right: 20px;
            font-size: 12px;
            > span {
              margin-right: 10px;
            }
            > a {
              vertical-align: middle;
            }
          }
        }
        .contarct-trade_panel {
          position: relative;
          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: rgba(40, 49, 62, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 100;
            font-size: 24px;
            border-radius: 6px;
            color: #bcd7e6;
          }
        }
        .contarct-trade_panel .contract-panel .hd {
          border-bottom: none;
          b {
            color: #fff;
          }
          a {
            color: #1ebb88;
          }
        }
        .mg-warp {
          // display: flex;
          // justify-content: space-between;
        }
        .get-methods {
          /*background-color: #15251f;*/
          padding: 10px 10px;
          font-size: 0;
          height: 38px;
          line-height: 28px;
          > ul {
            display: flex;
            li {
              font-size: 12px;
              padding: 0 12px;
              margin-right: 10px;
              cursor: pointer;
              border: 1px solid #15251f;
              &.active {
                border: 1px solid #1ebb88;
                border-radius: 4px;
                color: #1ebb88;
              }
            }
          }
        }
        .ganggan {
          line-height: 22px;
          margin-top: 14px;
          margin-left: 10px;
          span {
            display: block;
            margin-right: 6px;
            font-size: 12px;
          }
          > ul {
            display: flex;
            flex-wrap: wrap;
            li {
              font-size: 12px;
              text-align: center;
              margin-right: 4px;
              cursor: pointer;
              border: 1px solid #15251f;
              padding: 0 1px;
              margin-bottom: 3px;
              border-radius: 3px;
              &.active {
                border: 1px solid #1ebb88;
                border-radius: 4px;
                color: #1ebb88;
              }
            }
          }
        }
      }
    }
  }
  .symbol {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-bottom: 20px;
    margin-top: 20px;
    align-items: center;
    background-color: #15251f;
    line-height: 1;
    border-radius: 6px;
    .item {
      .price-cny {
        font-size: 12px;
        color: #999;
      }
      .coin {
        font-size: 20px;
      }
      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }
      .num {
        font-size: 14px;
        color: #fff;
      }
      > img {
        display: block;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }
  .order {
    min-height: 227px;
    margin-top: 14px;
    .order-handler {
      background-color: #15251f;
      font-size: 0;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      .linkmore {
        line-height: 40px !important;
        padding-right: 10px;
      }
      // line-height: 38px;
      > span {
        padding: 0 20px;
        font-size: 12px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        background-color: #15251f;
        &.active {
          color: #f0a70a;
          background-color: #003f3c;
        }
        &:first-child {
          border-top-left-radius: 6px;
        }
        &:last-child {
          border-top-right-radius: 6px;
        }
      }
    }
  }
}
.contract.day {
  color: #333;
  background-color: #fff;
  .main {
    .left {
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;
      .handlers {
        background-color: #fff;
      }
      .plate-nowprice {
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      }
    }
    .imgtable {
      border-radius: 6px;
      box-shadow: 0 0 2px #ccc;
      .handler {
        > span {
          border: 1px solid #333;
        }
      }
    }
    .contarct-trade_wrap {
      box-shadow: 0 0 2px #ccc;
      .trade_menu {
        background-color: #fafafa;
        > ul {
          display: flex;
          li {
            font-size: 16px;
            padding: 0 20px;
            cursor: pointer;
            &.active {
              background-color: #f0f0f0;
              color: #1ebb88;
            }
            &:first-child {
              border-top-left-radius: 6px;
            }
          }
        }
      }
    }
    // > span {
    //     background-color: #fafafa;
    //     border-right: 1px solid #f0f0f0;
    //     &.active {
    //         background-color: #fff;
    //         color: #1ebb88;
    //     }
    //     &:last-child {
    //         border-top-right-radius: 6px;
    //     }
    // }
    .ivu-icon {
      color: #333 !important;
    }
  }
  .contarct-trade_panel {
    box-shadow: 0 0 2px #ccc;
    .mask {
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
  }
  .contarct-trade_panel .contract-panel .hd {
    border-bottom: none;
    b {
      color: #333;
    }
    .right {
      .coin-menu {
        background-color: #fff;
        box-shadow: 0 2px 2px #ccc;
      }
      .trade-wrap {
        box-shadow: 0 0 2px #ccc;
        border-radius: 6px;
      }
      // .ivu-table-wrapper{
      //         box-shadow:0 0 2px #ccc;
      //       }
    }
  }
  .symbol {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    .item {
      .text {
        color: #999;
      }
      .num {
        color: #333;
      }
    }
  }
  .order {
    box-shadow: 0 2px 2px #ccc;
    min-height: 227px;
    .order-handler {
      margin-right: -2px;
      background-color: #fff;
      > span {
        color: #333;
        background-color: #fafafa;
        box-shadow: 0 0 2px #ccc;
        &.active {
          color: #f0a70a;
          background-color: #fff;
        }
      }
    }
  }
}
.sc_filter span {
  width: 100%;
}
.menu-item {
  height: 76px;
  padding: 8px 20px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #27313e;
  .menu-t {
    color: #ffffff;
    font-size: 16px;
  }
  .menu-pic {
    width: 100%;
    display: flex;
    -web-kit-box-orient: horizontal;
    -ms-box-orient: horizontal;
    flex-direction: row;
    -ms-box-pack: start;
    justify-content: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: space-between;
    color: #0ab480;
    font-size: 14px;
  }
  .pic-desc {
    width: 100%;
    display: flex;
    -web-kit-box-orient: horizontal;
    -ms-box-orient: horizontal;
    flex-direction: row;
    -ms-box-pack: start;
    justify-content: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: space-between;
    p {
      color: #7085ad;
      line-height: 12px;
      font-size: 12px;
    }
  }
}
</style>
<script>
import expandRow from "@components/exchange/contractpand.vue"
import Datafeeds from "@js/charting_library/datafeed/contract.js"
let Stomp = require("stompjs")
let SockJS = require("sockjs-client")
let moment = require("moment")
const map = new Map([
  ["LIMIT_PRICE", "限价"],
  ["MARKET_PRICE", "市价"]
])

import DepthGraph from "@components/exchange/DepthGraph.vue"
export default {
  components: { expandRow, DepthGraph },
  data () {
    let self = this
    return {
      modal10: false,
      cwOrderLoading: false,
      showMIndex: 1,
      currentLoading: false,
      ykTotal: 0,
      modal5: false,
      directionP: '',
      showLoad: false,
      assetsDetail: {},
      accountQu: 0,
      currentNum: 0,
      planNum: 0,
      zyzsNum: 0,
      revokeInfo: {
        num: '',
        id: '',
        chNum: ''
      },
      topPrice: {
        indexPrice: 0,
        markPrice: 0
      },
      bigGG: '',
      day: require("../../assets/images/exchange/night.png"), // 黑色版本
      night: require("../../assets/images/exchange/day.png"), // 白色版本
      loadingButton1: false, // 接口请求loading
      loadingButton2: false, // 接口请求loading
      loadingButton3: false, // 接口请求loading
      loadingButton4: false, // 接口请求loading
      loadingButton5: false, // 接口请求loading
      loadingButton6: false, // 接口请求loading
      loadingButton7: false, // 接口请求loading
      modal: false,
      btnList: [
        {
          text: self.$t("contract.opening"),
          check: true
        },
        {
          text: self.$t("contract.close_out"),
          check: false
        }
      ],
      modelMask: {
        title: '',
      },
      methodsList: [
        {
          text: self.$t("contract.lp"),
          check: true,
          // val:'LIMIT_PRICE'
          val: 1
        },
        {
          text: self.$t("contract.sP"),
          check: false,
          // val:'MARKET_PRICE'
          val: 0
        },
        {
          text: self.$t("contract.jhwt"),
          check: false,
          // val:'CHECK_FULL_STOP'
          val: 3
        }
      ],
      gangganList: [],
      contractList: [],
      contractText: "BTC",
      sliderStep: [25, 50, 75, 100],
      sliderBuyLimitPercent: 0,
      sliderSellLimitPercent: 0,
      sliderBuyMarketPercent: 0,
      sliderSellMarketPercent: 0,
      sliderBuyStopPercent: 0,
      sliderSellStopPercent: 0,
      memberRate: 0, //用户身份，用于是否允许开启BHB抵扣手续费
      collecRequesting: false,
      currentCoinIsFavor: false,
      isUseBHB: false, //是否试用BHB抵扣手续费
      skin: "night", //皮肤样式day&night
      currentImgTable: "k",
      stopLoss: false,
      selectedOrder: "cangw", //当前显示的委托记录
      selectedPlate: "all", //当前显示的买卖盘
      CNYRate: null,
      datafeed: null,
      defaultPath: "btc_usdt",
      basecion: "usdt",
      coinScale: 4,
      baseCoinScale: 2,
      symbolFee: 0.001,
      currentCoin: {
        base: "",
        coin: "",
        symbol: "",
        coinSymbol2: ""
      },
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        columns: [
          {
            title: this.$t("exchange.coin"),
            key: "coin",
            sortable: false,
            className: "coin-menu-symbol",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    // color:"red",
                    type: params.row.isFavor
                      ? "android-star"
                      : "android-star-outline"
                  },
                  nativeOn: {
                    click: () => {
                      event.stopPropagation() //阻止事件冒泡
                      if (this.isLogin) {
                        if (
                          event.currentTarget.className ==
                          "ivu-icon ivu-icon-android-star"
                        ) {
                          this.cancelCollect(params.index, params.row)
                          event.currentTarget.className ==
                            "ivu-icon ivu-icon-android-star-outline"
                        } else {
                          this.collect(params.index, params.row)
                          event.currentTarget.className =
                            "ivu-icon ivu-icon-android-star"
                        }
                      } else {
                        this.$Message.warning(this.$t('common.logintip'))
                      }
                    }
                  }
                }),
                h("span", params.row.coin)
              ])
            }
          },
          {
            title: this.$t("exchange.lastprice"),
            key: "close",
            sortable: true,
            sortMethod: function (a, b, type) {
              let a1 = parseFloat(a)
              let b1 = parseFloat(b)
              if (type == "asc") {
                return a1 - b1
              } else {
                return b1 - a1
              }
            }
          },
          {
            title: this.$t("exchange.daychange"),
            key: "rose",
            sortable: true,
            sortMethod: function (a, b, type) {
              let a1 = a.replace(/[^\d|.|-]/g, "") - 0
              let b1 = b.replace(/[^\d|.|-]/g, "") - 0
              if (type == "asc") {
                return a1 - b1
              } else {
                return b1 - a1
              }
            }
          }
        ]
      },
      wallet: {
        base: 0.0,
        coin: 0.0,
        hand: 0,
        forzen: 0,
        pEmpty: 0,
        pMore: 0
      },
      showMarket: false,
      fixHistoryHeight: 295,
      form: {
        buy: {
          openType: 0,
          minVolume: "",
          limitPrice: "",
          limitAmount: "",
          buyType: 1,
          triggerPrice: "",
          multiple: "",
          maintain: "",
          start: "",
          feeRate: '',
          initialMargin: '',
          limitTurnover: 0
        },
        sell: {
          limitPrice: "",
          limitAmount: "",
          buyType: "LIMIT_PRICE",
          triggerPrice: "",
          multiple: "",
          maintain: "",
          start: "",
          nowp: "",
          locationValue: ""
        }
      },
      trade: {
        rows: [],
        columns: [
          {
            title: self.$t("exchange.price"),
            key: "price",
            render: (h, params) => {
              const row = params.row
              const className = row.direction == "BUY" ? "buy" : "sell"
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                params.row.price.toFixed(4)
              )
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.coin + ")"
              return h("span", {}, title)
            }
          },
          {
            title: self.$t("exchange.num"),
            key: "nowp",
            render: (h, params) => {
              return h("span", {}, params.row.nowp.toFixed(this.coinScale))
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.num") + "(" + self.$t('contract.contractPic') + ")"
              return h("span", {}, title)
            }
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              return h("span", {}, this.timeFormat(params.row.time))
            }
          }
        ]
      },
      //   最新价的 table 数据;
      plate: {
        maxPostion: 6,
        columns: [
          {
            //   价格;
            title: self.$t("exchange.price"),
            key: "price",
            render: (h, params) => {
              let str = ""
              let price = ""
              const className = params.row.direction.toLowerCase()
              params.row.price == 0 && (str = h("span", {}, "--"))
              params.row.price != 0 &&
                (price = params.row.price.toFixed(this.baseCoinScale)) &&
                (str = h(
                  "span",
                  {
                    attrs: {
                      class: className
                    }
                  },
                  this.toFloor(price, 4)
                ))
              return str
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.coin + ")"
              return h("span", {}, title)
            }
          },
          {
            title: self.$t("exchange.num"),
            key: "nowp",
            render: (h, params) => {
              let str = ""
              params.row.nowp == 0 && (str = h("span", {}, "--"))
              params.row.nowp != 0 &&
                (str = h(
                  "span",
                  {},
                  params.row.nowp
                ))
              return str
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.num") + "(" + self.$t('contract.contractPic') + ")"
              return h("span", {}, title)
            }
          },
          {
            //   价格;
            title: self.$t("other.ot7"),
            key: "amount",
            render: (h, params) => {
              return h('span', {}, params.row.amount ? params.row.amount.toFixed(4) : '--')
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("other.ot7") + "(" + self.currentCoin.coin + ")"
              return h("span", {}, title)
            }
          },
          {
            className: "percenttd",
            width: 1,
            render: (h, params) => {
              let width = "0",
                backgroundColor =
                  params.row.direction === "BUY" ? "#00b275" : "#f15057",
                totle =
                  params.row.direction === "BUY"
                    ? this.plate.bidTotle
                    : this.plate.askTotle
              if (params.row.nowp) {
                width = (params.row.nowp / totle).toFixed(4) * 100 + "%"
              }
              return h(
                "div",
                {
                  style: {
                    width,
                    backgroundColor
                  },
                  attrs: {
                    class: "percentdiv"
                  }
                },
                " "
              )
            }
          }
        ],
        askRows: [],
        bidRows: []
      },
      cwOrder: {
        columns: [
          {
            title: self.$t('contract.cw.cw1'),
            key: "positionType",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.cw.cw15') : self.$t('contract.cw.cw16')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.baseCoin}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.cw.cw2'),
            key: "contractTotalNum",
            render: (h, pramas) => {
              return h('span', {}, pramas.row.contractTotalNum ? pramas.row.contractTotalNum : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw3'),
            key: "contractOccupyNum",
            render: (h, pramas) => {
              return h('span', {}, pramas.row.contractOccupyNum ? pramas.row.contractOccupyNum : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw4'),
            key: "positionAvgPrice",
            render: (h, params) => {
              return h('span', {
              }, self.toFixed4(params.row.positionAvgPrice))
            }
          },
          {
            title: self.$t('contract.cw.cw5'),
            key: "holdingBond",
            render: (h, params) => {
              return h('span', {
              }, self.toFixed4(params.row.holdingBond))
            }
          },
          {
            title: self.$t('contract.cw.cw6'),
            key: "blurGainLloss",
            render (h, params) {
              const color = params.row.blurGainLloss < 0 ? '#f14b4f' : '#0ab480'
              return h('span', {
                style: {
                  'color': color
                }
              }, params.row.blurGainLloss ? params.row.blurGainLloss : '--')
            }
          },
          // {
          //   title: self.$t('contract.cw.cw7'),
          //   key: "currentMultiple",
          //   render:(h,params)=>{
          //     return h('span',{},params.row.currentMultiple?params.row.currentMultiple:'--')
          //   }
          // },
          {
            title: self.$t('contract.cw.cw8'),
            key: "gainLossRate",
            render (h, params) {
              const color = params.row.gainLossRate < 0 ? '#f14b4f' : '#0ab480'
              return h('span', {
                style: {
                  'color': color
                }
              }, params.row.holdingBond ? params.row.gainLossRate + '%' : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw9'),
            key: "predictForcePrice",
            render: (h, params) => {
              return h('span', {
              }, self.toFixed4(params.row.predictForcePrice))
            }
          },
          // {
          //   title: self.$t('contract.cw.cw19'),
          //   key: "predictForcePriceGain",
          //   render:(h,params)=>{
          //     return h('span',{
          //     },self.toFixed4(params.row.predictForcePriceGain))
          //   }
          // },
          {
            title: self.$t('contract.cw.cw10'),
            key: "maintain",
            width: 110,
            render: (h, params) => {
              return h('span', {
              }, self.toFixed4(params.row.maintain))
            }
          },
          {
            title: self.$t('contract.cw.cw11'),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h('div', [h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  background: 'none',
                  color: '#39f !important',
                  border: 0,
                  padding: 0,
                },
                on: {
                  click: () => {
                    self.showOpt(1, params.row)
                  }
                }
              },
                self.$t('contract.cw.cw12')
              )
                //   ,h('Button',{
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style:{
                //     background:'none',
                //     color:'#39f !important',
                //     border:0,
                //     padding:"0 5px"
                //   },
                //   on:{
                //     click:()=> {
                //       self.showOpt(2,params.row)
                //     }
                //   }
                // },self.$t('contract.cw.cw13')),
                //   h('Button',{
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style:{
                //     background:'none',
                //     border:0,
                //     color:'#39f !important',
                //     padding:0
                //   },
                //   on:{
                //     click:()=> {
                //       self.showOpt(3,params.row)
                //     }
                //   }
                // },self.$t('contract.cw.cw14'))
              ])
            }
          }
        ],
        rows: []
      },
      currentOrder: {
        pageSize: 30,
        total: 3,
        page: 1,
        columns: [
          {
            type: "expand",
            width: 40,
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
            title: self.$t('contract.dqwt.wt1'),
            key: "coinSymbol",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.dqwt.wt11') : self.$t('contract.dqwt.wt12')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.coinSymbol}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.dqwt.wt2'),
            key: "positionFlag",
            render: (h, params) => {

              let font = params.row.positionFlag == 'designate' ? this.$t('contract.dqwt.wt14') : this.$t('contract.dqwt.wt15')
              return h('div', { domProps: { innerHTML: `<span >${font}</span>` } })
            }
          },
          {
            title: self.$t('contract.dqwt.wt3'),
            key: "price",
            render: (h, params) => {
              return h('span', {}, self.toFloor(params.row.price))
            }
          },
          {
            title: self.$t('contract.dqwt.wt4'),
            key: "nowp"
          },
          {
            title: self.$t('contract.dqwt.wt5'),
            key: "subNowp"
          },
          {
            title: self.$t('contract.dqwt.wt6'),
            key: "tradeNowp"
          },
          // {
          //   title: self.$t('contract.dqwt.wt7'),
          //   key: "triggerPrice",
          //   render:(h,params)=>{
          //     return h('span',{},params.row.triggerPrice?params.row.triggerPrice.toFixed(4):'0.0000')
          //   }
          // },
          // {
          //   title: self.$t('contract.dqwt.wt8'),
          //   key: "executePrice",
          //   render(h, params) {
          //     return h('span',{},params.row.executePrice?params.row.executePrice.toFixed(4):'0.0000')
          //   }
          // },
          {
            title: self.$t('contract.zyzst.wt9'),
            key: "listTime",
            width: '160px',
            render: (h, params) => {
              return h('span', {}, params.row.listTime ? self.dateFormat(params.row.listTime) : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw11'),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  background: 'none',
                  color: '#39f !important',
                  border: 0,
                  padding: 0,
                },
                on: {
                  click: () => {
                    self.revoke(params.row)
                  }
                }
              }, self.$t("other.ot17"))
            }
          }
        ],
        rows: []
      },
      planOrder: {
        columns: [
          {
            title: self.$t('contract.dqwt.wt1'),
            key: "coinSymbol",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.dqwt.wt11') : self.$t('contract.dqwt.wt12')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.coinSymbol}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.jh.wt2'),
            key: "price",
            render: (h, params) => {
              return h('span', {}, params.row.price ? self.toFixed4(params.row.price) : '--')
            }
          },
          {
            title: self.$t('contract.jh.wt3'),
            key: "triggerPrice",
            render: (h, params) => {
              return h('span', {}, params.row.triggerPrice ? self.toFixed4(params.row.triggerPrice) : '--')
            }
          },
          {
            title: self.$t('contract.ycj.wt2'),
            key: "type",
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
            title: self.$t('contract.jh.wt5'),
            key: "nowp"
          },
          {
            title: self.$t('contract.cw.cw7'),
            key: "multiple"
          },
          {
            title: self.$t('contract.jh.wt7'),
            width: "160px",
            key: "setTime",
            render: (h, params) => {
              return h('span', {}, params.row.settime ? this.dateFormat(params.row.setTime) : '--')
            }
          },
          {
            title: self.$t('contract.jh.wt8'),
            key: "status",
            render: (h, params) => {
              var font
              if (params.row.status == 'NODEAL') {
                font = this.$t('zcgy.st1')
              } else if (params.row.status == 'TRADING') {
                font = this.$t('zcgy.st2')
              } else if (params.row.status == 'COMPLETED') {
                font = this.$t('zcgy.st3')
              } else if (params.row.status == 'CANCELED') {
                font = this.$t('zcgy.st4')
              } else if (params.row.status == 'OVERTIMED') {
                font = this.$t('zcgy.st5')
              } else if (params.row.status == 'WAITING_TRIGGER') {
                font = this.$t('zcgy.st6')
              }
              return h('div', { domProps: { innerHTML: `<span>${font}</span>` } })
            }
          },
          {
            title: self.$t('contract.jh.wt9'),
            width: "160px",
            key: "listTime",
            render: (h, params) => {
              return h('span', {}, params.row.listTime ? this.dateFormat(params.row.listTime) : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw11'),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  background: 'none',
                  color: '#39f !important',
                  border: 0,
                  padding: 0,
                },
                on: {
                  click: () => {
                    self.revoke(params.row)
                  }
                }
              }, self.$t("other.ot17"))
            }
          }
        ],
        rows: []
      },
      historyOrder: {
        pageSize: 4,
        total: 3,
        page: 1,
        columns: [
          {
            type: "expand",
            width: 40,
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
            title: self.$t('contract.dqwt.wt1'),
            key: "coinSymbol",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.dqwt.wt11') : self.$t('contract.dqwt.wt12')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.coinSymbol}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.ycj.wt2'),
            key: "type",
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
            title: self.$t('contract.dqwt.wt2'),
            key: "positionFlag",
            render: (h, params) => {

              let font = params.row.positionFlag == 'designate' ? this.$t('contract.dqwt.wt14') : this.$t('contract.dqwt.wt15')
              return h('div', { domProps: { innerHTML: `<span >${font}</span>` } })
            }
          },
          {
            title: self.$t('contract.ycj.wt4'),
            key: "price",
            render: (h, pramas) => {
              return h('span', {}, self.toFixed4(pramas.row.price))
            }
          },
          {
            title: self.$t('contract.ycj.wt5'),
            key: "tradeNowp"
          },
          {
            title: self.$t('contract.cw.cw7'),
            key: "multiple"
          },
          {
            title: self.$t('contract.ycj.wt7'),
            key: "yingKui",
            render: (h, params) => {
              const color = params.row.yingKui < 0 ? '#f14b4f' : params.row.yingKui > 0 ? '#0ab480' : '#FFF'
              const inner = params.row.yingKui < 0 ? params.row.yingKui : params.row.yingKui > 0 ? '+' + params.row.yingKui : '--'
              return h('span', {
                style: {
                  color: color
                }
              }, inner)
            }
          },
          {
            title: self.$t('contract.ycj.wt8'),
            key: "fee",
            render: (h, pramas) => {
              return h('span', {}, pramas.row.fee ? pramas.row.fee : '--')
            }
          },
          {
            title: self.$t('contract.ycj.wt9'),
            key: "completedTime",
            render: (h, params) => {
              return h('span', {}, this.timeFormat(params.row.completedTime))
            }
          }

        ],
        rows: []
      },
      revokeOrder: {
        pageSize: 3,
        total: 3,
        page: 1,
        columns: [
          {
            title: self.$t('contract.dqwt.wt1'),
            key: "coinSymbol",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.dqwt.wt11') : self.$t('contract.dqwt.wt12')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.coinSymbol}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.ycj.wt2'),
            key: "type",
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
            title: self.$t('contract.dqwt.wt2'),
            key: "positionFlag",
            render: (h, params) => {

              let font = params.row.positionFlag == 'designate' ? this.$t('contract.dqwt.wt14') : this.$t('contract.dqwt.wt15')
              return h('div', { domProps: { innerHTML: `<span >${font}</span>` } })
            }
          },
          {
            title: self.$t('contract.ycj.wt4'),
            key: "price",
            render: (h, pramas) => {
              return h('span', {}, self.toFixed4(pramas.row.price))
            }
          },
          {
            title: self.$t('contract.cx.wt5'),
            key: "nowp"
          },
          {
            title: self.$t('contract.cx.wt6'),
            key: "subNowp"

          },
          {
            title: self.$t('contract.cx.wt8'),
            key: "fee",
            render: (h, params) => {
              return h('span', {}, params.row.fee ? self.toFixed4(params.row.fee) : '--')
            }

          }

        ],
        rows: []
      },
      zyzsOrder: {
        pageSize: 3,
        total: 3,
        page: 1,
        columns: [
          {
            title: self.$t('contract.dqwt.wt1'),
            key: "coinSymbol",
            width: "180px",
            render: (h, params) => {
              let color = params.row.positionType == 'FALL' ? '#f14b4f' : '#0ab480'
              let font = params.row.positionType == 'FALL' ? self.$t('contract.dqwt.wt11') : self.$t('contract.dqwt.wt12')
              return h('div', { domProps: { innerHTML: `<span style="color:${color}">${font}</span><span style="padding:0 5px">${params.row.coinSymbol}/USDT</span>` } })
            }
          },
          {
            title: self.$t('contract.zyzst.wt2'),
            key: "type",
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
            title: self.$t('contract.jh.wt3'),
            key: "triggerPrice",
            render: (h, params) => {
              return h('span', {}, params.row.triggerPrice ? self.toFixed4(params.row.triggerPrice) : '--')
            }
          },
          {
            title: self.$t('contract.zyzst.wt4'),
            key: "stopType",
            render: (h, params) => {
              var font = params.row.stopType == 1 ? this.$t('contract.cw.cw13') : this.$t('contract.cw.cw14')
              return h('div', { domProps: { innerHTML: `<span>${font}</span>` } })
            }
          },
          {
            title: self.$t('contract.zyzst.wt5'),
            key: "price",
            render: (h, params) => {
              return h('span', {}, params.row.price ? self.toFixed4(params.row.price) : '--')
            }
          },
          {
            title: self.$t('contract.zyzst.wt6'),
            key: "nowp"
          },
          {
            title: self.$t('contract.zyzst.wt7'),
            key: "status",
            render: (h, params) => {
              var font
              if (params.row.status == 'NODEAL') {
                font = this.$t('zcgy.st1')
              } else if (params.row.status == 'TRADING') {
                font = this.$t('zcgy.st2')
              } else if (params.row.status == 'COMPLETED') {
                font = this.$t('zcgy.st3')
              } else if (params.row.status == 'CANCELED') {
                font = this.$t('zcgy.st4')
              } else if (params.row.status == 'OVERTIMED') {
                font = this.$t('zcgy.st5')
              } else if (params.row.status == 'WAITING_TRIGGER') {
                font = this.$t('zcgy.st6')
              }
              return h('div', { domProps: { innerHTML: `<span>${font}</span>` } })
            }
          },
          // {
          //   title: self.$t('contract.zyzst.wt8'),
          //   key: "setTime",
          //   width:"160px",
          //   render:(h,params)=>{
          //     return h('span',{},params.row.setTime?self.dateFormat(params.row.setTime):'--')
          //   }
          //
          // },
          {
            title: self.$t('contract.zyzst.wt9'),
            key: "listTime",
            width: '160px',
            render: (h, params) => {
              return h('span', {}, params.row.listTime ? self.dateFormat(params.row.listTime) : '--')
            }
          },
          {
            title: self.$t('contract.cw.cw11'),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  background: 'none',
                  color: '#39f !important',
                  border: 0,
                  padding: 0,
                },
                on: {
                  click: () => {
                    self.revoke(params.row)
                  }
                }
              }, self.$t("other.ot17"))
            }
          }

        ],
        rows: []
      },
      fullTrade: {},
      buyPriceNew: 0,
      sellPriceNew: 0
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.getters.isLogin
    },
    member: function () {
      return this.$store.getters.member
    },
    lang: function () {
      return this.$store.state.lang
    },
    sliderBuyDisabled () {
      let account = this.wallet.base,
        min = this.toFloor(1 / Math.pow(10, this.baseCoinScale))
      return account < min
    },
    sliderSellDisabled () {
      let account = this.wallet.coin,
        min = this.toFloor(1 / Math.pow(10, this.coinScale))
      return account < min
    }
  },
  watch: {
    lang: function () {
      this.updateLangData()
    },
    contractText: function () {
      this.init()
    },
    // $route(to, from) {
    //  this.init();
    // },
    sliderBuyLimitPercent () {

      let price = this.form.buy.limitPrice,
        account = this.wallet.base,
        amount = 0
      if (price > 0) {
        let hand = parseInt(account.div(price.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin) + (price.mul(this.form.buy.minVolume).mul(this.form.buy.feeRate))))

        amount = this.toFloor(hand.mul(this.sliderBuyLimitPercent).mul(0.01), 0)


      }
      this.form.buy.limitAmount = amount
      this.form.buy.limitTurnover = this.form.buy.limitAmount > 0 && price > 0 ? this.toFloor(
        price.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin).mul(this.form.buy.limitAmount),
        6
      ) : 0
    },

  },
  filters: {
    toFixed6: function (val) {
      return val.toFixed(6)
    }
  },
  created: function () {
    this.getdefaultSymbol().then(res => {
      this.init()
    })

  },

  mounted: function () {
  },
  methods: {
    //获取杠杆
    getGG: function (symbol) {
      this.$http
        .post(this.host + "/contract-api/contract-bond/getlistlocation", { symbol: symbol })
        .then(response => {
          let resp = response.body
          let LggArr = resp.data
          let lg = LggArr.length
          if (resp.code == 0) {
            for (var i = 0; i < LggArr.length; i++) {
              if (LggArr[i].multiple == 30) {
                LggArr[i].check = true
                this.form.buy.multiple = LggArr[i].multiple
                this.form.buy.initialMargin = LggArr[i].initialMargin
              } else {
                LggArr[i].check = false
              }

            }
          }
          this.gangganList = LggArr
        })
    },
    // 根据价格改变委托价值和可开手数
    watchPrice: function (val) {
      let price = this.form.buy.limitPrice,
        account = this.wallet.base,
        amount = 0
      this.wallet.hand = val > 0 ? parseInt(account.div(price.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin) + (val.mul(this.form.buy.minVolume).mul(this.form.buy.feeRate)))) : 0

      // this.wallet.hand=val>0?parseInt(account.div(price.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin).mul(1+this.form.buy.feeRate))):0;

      if (val > 0) {
        amount = this.toFloor(this.wallet.hand.mul(this.sliderBuyLimitPercent).mul(0.01), 0)
      }
      this.form.buy.limitAmount = amount
      this.form.buy.limitTurnover = this.form.buy.limitAmount > 0 ? this.toFloor(
        val.mul(amount).mul(this.form.buy.minVolume),
        6
      ) : 0
    },
    // 根据数量计算委托价值
    watchAmount: function (val) {
      let price = this.form.buy.limitPrice
      this.form.buy.limitTurnover = val > 0 ? this.toFloor(
        price.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin).mul(val),
        6
      ) : 0
    },

    // 根据数量查询杠杆
    // searchGG:function(){
    //   this.$http
    //           .post(this.host + "/contract-api/location_value/calculation",{symbol:this.contractText+'USDT',nowp:this.form.buy.limitAmount})
    //           .then(res => {
    //             var that = this;
    //             let data = res.body;
    //             if(data.code==0){
    //               let resp = res.body;
    //               let LggArr=resp.data;
    //               if(resp.code==0){
    //                 for(var i=0;i<LggArr.length;i++){
    //                   if(i==LggArr.length-1){
    //                     LggArr[i].check=true;
    //                     this.form.buy.multiple=LggArr[i].multiple;
    //                   }else{
    //                     LggArr[i].check=false;
    //                   }
    //                 }
    //               }
    //               this.gangganList=LggArr;
    //             }else{
    //               this.$Message.error(res.message)
    //             }
    //           });
    // },
    //
    // 默认交易对
    getdefaultSymbol () {
      return this.$http.get(this.host + "/contract-market/default/symbol").then(res => {
        const data = res.body
        if (data.code == 0) {
          return new Promise((resolve, reject) => {
            resolve(data.data.web)
          }).catch(reject => reject("BTC_USDT"))
        }
      })
    },
    //获取合约资产
    getMoney () {
      this.$http.post(this.host + "/contract-api/contract-wallet/get").then(response => {
        var resp = response.body
        let that = this
        if (resp.code == 0) {
          that.wallet.base = resp.data[0].balance

          this.wallet.hand = parseInt(that.wallet.base.div((this.form.buy.limitPrice).mul(this.form.buy.minVolume).mul(that.form.buy.initialMargin) + (this.form.buy.limitPrice.mul(this.form.buy.minVolume).mul(this.form.buy.feeRate))))

          this.wallet.forzen = resp.data[0].frozenBalance
          // this.accountQu=Number(this.wallet.forzen)+Number(that.wallet.base)+Number(this.ykTotal);
        } else {
          that.wallet.base = '0.0'
        }
      })
    },
    closeEve: function () {
      this.methodsList.map((ele, i) => {
        if (i == 0) {
          this.methodsList[i].check = true
          this.form.buy.buyType = this.methodsList[i].val
        } else {
          this.methodsList[i].check = false
        }
      })
      this.form.buy.limitAmount = ""
      this.form.buy.triggerPrice = ""
    },
    // 买入提交
    buyWithLimitPrice (name, kpc, stopType) {
      let that = this
      let flag = new RegExp("^[1-9]([0-9])*$").test(that.form.buy.limitAmount)
      // this.$Message.info(that.$t('other.ot1'))
      if (!that.form.buy.limitPrice && that.form.buy.buyType != 4) {
        this.$Message.error(that.$t('other.ot18'))
      } else if (!that.form.buy.limitAmount) {
        this.$Message.error(that.$t('other.ot19'))
      } else if (!flag) {
        this.$Message.error(that.$t('other.ot20'))
      } else if (that.form.buy.buyType == 3 && that.form.buy.triggerPrice == '') {
        this.$Message.error(that.$t('other.ot21'))
      } else if (that.form.buy.buyType == 2 && that.form.buy.triggerPrice == '') {
        this.$Message.error(that.$t('other.ot21'))
      } else if (this.form.buy.openType == 0 && that.form.buy.multiple == "") {
        this.$Message.error(that.$t('other.ot22'))
      } else {
        var price
        if (that.form.buy.buyType == 3 || that.form.buy.buyType == 2) {
          price = that.form.buy.limitPrice ? that.form.buy.limitPrice : that.currentCoin.price
        } else {
          price = that.form.buy.limitPrice
        }
        // direction 0- 买 1-卖
        // type 0-市价 1-限价 2-止盈止损 3-计划委托
        // stopType 1 : 止盈  2: 止损
        this.$http
          .post(this.host + "/contract-api/contract-order/add",
            {
              direction: name,//0-买 1-卖
              symbol: that.contractText + 'USDT',
              price: price,//价格
              nowp: that.form.buy.limitAmount,
              type: that.form.buy.buyType,//0-市价，1-限价，2-计划委托，3-止盈止损
              triggerPrice: that.form.buy.buyType == 3 || that.form.buy.buyType == 2 ? that.form.buy.triggerPrice : "",
              multiple: that.form.buy.multiple,
              stopType: stopType ? stopType : '',
              positionFlag: kpc,//开平仓标志 0-开仓，1-平仓
              positionOprationType: 0//可不传默认传0
            }
          ).then(res => {
            var that = this
            let data = res.body
            if (data.code == 0) {
              this.$Message.success(data.message)
              this.form.buy.limitAmount = ""
              this.form.buy.limitTurnover = 0
              this.refreshAccount()
              if (this.modal10 == true) {
                this.modal10 = false
                this.methodsList.map((ele, i) => {
                  if (i == 0) {
                    this.methodsList[i].check = true
                    this.form.buy.buyType = this.methodsList[i].val
                  } else {
                    this.methodsList[i].check = false
                  }
                })

              }

              if (that.form.buyType == 2) {
                this.methodsList[0].check = true
                this.form.buy.buyType = this.methodsList[0].val
              }
            } else {
              this.$Message.error(data.message)
            }

          })
      }
    },
    //显示操作框
    showOpt: function (i, params) {
      this.modal10 = true
      this.showMIndex = i
      this.directionP = params.positionType == 'FALL' ? 0 : 1
      if (i == 1) {
        this.modelMask.title = params.symbol + ' ' + this.$t('contract.cw.cw12')
        this.form.buy.openType = 1
        this.methodsList.map((ele, j) => {

          if (j == 0) {
            this.methodsList[j].check = true
            this.form.buy.buyType = this.methodsList[j].val
          } else {
            this.methodsList[j].check = false
          }
        })

      } else if (i == 2) {
        this.modelMask.title = params.symbol + ' ' + this.$t('contract.cw.cw13')
        this.form.buy.buyType = 2

      } else if (i == 3) {
        this.modelMask.title = params.symbol + ' ' + this.$t('contract.cw.cw14')
        this.form.buy.buyType = 2

      }
    },
    // 改变合约
    changeContract (name) {
      this.contractText = name
      const path = "/contract/" + name + "_USDT"
      this.$router.push({ path })
    },
    //金额只能为正整数
    checkNum (element) {
      let val = element.value
      //匹配非数字
      let reg = new RegExp("([^0-9]*)", "g")
      let ma = val.match(reg)
      //如果有非数字，替换成""
      if (ma.length > 0) {
        for (let k in ma) {
          if (ma[k] != "") {
            val = val.replace(ma[k], "")
          }
        }
      }
      //可以为0，但不能以0开头
      if (val.startsWith("0") && val.length > 1) {
        val = val.substring(1, val.length)
      }
      //赋值，这样实现的效果就是用户按下非数字不会有任何反应
      element.value = val
    },
    //开平仓切换
    tab (index) {

      if (this.form.buy.openType == index) {
        return false
      }
      this.form.buy.openType = index
      this.form.buy.buyType = 1
      this.btnList.map((ele, i) => {
        if (i == index) {
          this.btnList[i].check = true
        } else {
          this.btnList[i].check = false
        }
      })
      this.methodsList.map((ele, i) => {
        if (i == 0) {
          this.methodsList[0].check = true
        } else {
          this.methodsList[i].check = false
        }
      })
      this.form.buy.limitAmount = ''
      this.form.buy.limitTurnover = 0
    },
    //限价市价止损盈亏切换
    tabMN (index) {
      this.methodsList.map((ele, i) => {
        this.form.buy.limitAmount = ''
        if (i == index) {
          this.methodsList[i].check = true
          this.form.buy.buyType = this.methodsList[i].val
        } else {
          this.methodsList[i].check = false
        }
      })
    },
    //杠杆选择
    tabGG (index) {
      var that = this
      this.gangganList.map((ele, i) => {
        if (i == index) {
          this.gangganList[i].check = true
          this.form.buy.multiple = ele.multiple
          this.form.buy.initialMargin = ele.initialMargin
          this.wallet.hand = parseInt(that.wallet.base.div((this.form.buy.limitPrice).mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin) + (this.form.buy.limitPrice.mul(this.form.buy.minVolume).mul(this.form.buy.feeRate))))
          // this.form.buy.limitTurnover=this.form.buy.limitAmount>0
          this.form.buy.limitTurnover = this.form.buy.limitAmount > 0 && this.form.buy.limitPrice > 0 ? this.toFloor(
            this.form.buy.limitPrice.mul(this.form.buy.minVolume).mul(this.form.buy.initialMargin).mul(this.form.buy.limitAmount),
            6
          ) : 0
        } else {
          this.gangganList[i].check = false
        }
      })
    },
    silderGo (silder, val) {
      this[silder] = val
    },
    init () {
      var params = this.$route.params[0]
      if (params == undefined) {
        this.$router.push("/contract/" + this.defaultPath)
        params = this.defaultPath
      }
      const basecion = params.split("_")[1]
      if (basecion) {
        this.basecion = basecion.toLowerCase()
      }
      let coin = params.toUpperCase().split("_")[0]
      let base = params.toUpperCase().split("_")[1]
      this.contractText = coin
      this.currentCoin.coin = coin
      this.currentCoin.base = base
      this.currentCoin.symbol = coin + base
      this.currentCoin.coinSymbol2 = coin + base
      this.$store.commit("navigate", "nav-exchange")
      this.$store.commit("setSkin", this.skin)
      this.getGG(this.currentCoin.coinSymbol2)
      this.getCNYRate()
      this.getSymbolScale()
      this.getSymbol() //包含 K线图、getFavor、startWebsock等
      this.getPlate() //买卖盘
      if (this.isLogin) {
        this.initWebSocket()
        this.refreshAccount()
      }

      this.getTrade()
      if (this.isLogin && this.member.realName) {
      }
      this.sliderBuyLimitPercent = 0
      this.sliderSellLimitPercent = 0
      this.sliderBuyMarketPercent = 0
      this.sliderSellMarketPercent = 0
      this.sliderBuyStopPercent = 0
      this.sliderSellStopPercent = 0
    },
    tipFormat (val) {
      return val + "%"
    },
    changeBaseCion (str) {
      this.basecion = str
    },
    changeSkin () {
      const currentSkin = this.skin
      if (currentSkin === "day") {
        this.skin = "night"
      } else {
        this.skin = "day"
      }
      this.$store.commit("setSkin", this.skin)
      this.getKline()
    },
    changeOrder (str, type) {
      if (this.isLogin) {
        this.selectedOrder = str
        if (type) {
          this.getCurrentOrder(type)
        } else {
          this.getCWOrder()
        }
      } else {
        this.$router.push({ path: "/login" })
      }
    },
    //语言切换时更换表格title
    updateLangData () {
      //切换按钮
      this.btnList[0].text = this.$t("contract.opening")
      this.btnList[1].text = this.$t("contract.close_out")
      //市价切换,限价，止盈止损
      this.methodsList[0].text = this.$t("contract.lp")
      this.methodsList[1].text = this.$t("contract.sP")
      this.methodsList[2].text = this.$t("contract.jhwt")
      this.coins.columns[0].title = this.$t("exchange.coin")
      this.coins.columns[1].title = this.$t("exchange.lastprice")
      this.coins.columns[2].title = this.$t("exchange.daychange")
      // this.coins.columns[3].title = this.$t("exchange.favorite");
      this.trade.columns[0].title = this.$t("exchange.num")
      this.trade.columns[1].title = this.$t("exchange.price")
      this.trade.columns[2].title = this.$t("exchange.direction")
      // this.trade.columns[3].title = this.$t("exchange.time");
      this.plate.columns[0].title = this.$t("exchange.stall")
      this.plate.columns[1].title = this.$t("exchange.price")
      this.plate.columns[2].title = this.$t("exchange.num")
      this.plate.columns[3].title = this.$t("exchange.total")
      // 仓位
      this.cwOrder.columns[0].title = this.$t("contract.cw.cw1")
      this.cwOrder.columns[1].title = this.$t("contract.cw.cw2")
      this.cwOrder.columns[2].title = this.$t("contract.cw.cw3")
      this.cwOrder.columns[3].title = this.$t("contract.cw.cw4")
      this.cwOrder.columns[4].title = this.$t("contract.cw.cw5")
      this.cwOrder.columns[5].title = this.$t("contract.cw.cw6")
      this.cwOrder.columns[6].title = this.$t("contract.cw.cw8")
      // this.cwOrder.columns[7].title=this.$t("contract.cw.cw8");
      // this.cwOrder.columns[7].title=this.$t("contract.cw.cw8");
      // this.cwOrder.columns[8].title=this.$t("contract.cw.cw9");
      // this.cwOrder.columns[9].title=this.$t("contract.cw.cw10");
      // this.cwOrder.columns[10].title=this.$t("contract.cw.cw11");
      this.cwOrder.columns[7].title = this.$t("contract.cw.cw9")
      // this.cwOrder.columns[8].title=this.$t("contract.cw.cw19");
      this.cwOrder.columns[8].title = this.$t("contract.cw.cw10")
      this.cwOrder.columns[9].title = this.$t("contract.cw.cw11")
      // this.cwOrder.columns[10].title=this.$t("contract.cw.cw11");
      // 当前委托表格title
      this.currentOrder.columns[1].title = this.$t("contract.dqwt.wt1")
      this.currentOrder.columns[2].title = this.$t("contract.dqwt.wt2")
      this.currentOrder.columns[3].title = this.$t("contract.dqwt.wt3")
      this.currentOrder.columns[4].title = this.$t("contract.dqwt.wt4")
      this.currentOrder.columns[5].title = this.$t("contract.dqwt.wt5")
      this.currentOrder.columns[6].title = this.$t("contract.dqwt.wt6")
      this.currentOrder.columns[7].title = this.$t("contract.zyzst.wt9")
      this.currentOrder.columns[8].title = this.$t("contract.dqwt.wt10")
      // this.currentOrder.columns[9].title = this.$t("contract.dqwt.wt10");
      // this.currentOrder.columns[9].title = this.$t("contract.dqwt.wt10");
      //计划委托title
      this.planOrder.columns[0].title = this.$t("contract.jh.wt1")
      this.planOrder.columns[1].title = this.$t("contract.jh.wt2")
      this.planOrder.columns[2].title = this.$t("contract.jh.wt3")
      this.planOrder.columns[3].title = this.$t("contract.jh.wt4")
      this.planOrder.columns[4].title = this.$t("contract.jh.wt5")
      this.planOrder.columns[5].title = this.$t("contract.jh.wt6")
      this.planOrder.columns[6].title = this.$t("contract.jh.wt7")
      this.planOrder.columns[7].title = this.$t("contract.jh.wt8")
      this.planOrder.columns[8].title = this.$t("contract.jh.wt9")
      this.planOrder.columns[9].title = this.$t("contract.jh.wt10")
      //已成交title
      this.historyOrder.columns[1].title = this.$t("contract.ycj.wt1")
      this.historyOrder.columns[2].title = this.$t("contract.ycj.wt2")
      this.historyOrder.columns[3].title = this.$t("contract.ycj.wt3")
      this.historyOrder.columns[4].title = this.$t("contract.ycj.wt4")
      this.historyOrder.columns[5].title = this.$t("contract.ycj.wt5")
      this.historyOrder.columns[6].title = this.$t("contract.ycj.wt6")
      this.historyOrder.columns[7].title = this.$t("contract.ycj.wt7")
      this.historyOrder.columns[8].title = this.$t("contract.ycj.wt8")
      this.historyOrder.columns[9].title = this.$t("contract.ycj.wt9")
      //撤销title
      this.revokeOrder.columns[0].title = this.$t("contract.cx.wt1")
      this.revokeOrder.columns[1].title = this.$t("contract.cx.wt2")
      this.revokeOrder.columns[2].title = this.$t("contract.cx.wt3")
      this.revokeOrder.columns[3].title = this.$t("contract.cx.wt4")
      this.revokeOrder.columns[4].title = this.$t("contract.cx.wt5")
      this.revokeOrder.columns[5].title = this.$t("contract.cx.wt6")
      this.revokeOrder.columns[6].title = this.$t("contract.cx.wt7")
      // this.revokeOrder.columns[7].title = this.$t("contract.cx.wt8");
      //止盈止损title
      this.zyzsOrder.columns[0].title = this.$t("contract.zyzst.wt1")
      this.zyzsOrder.columns[1].title = this.$t("contract.zyzst.wt2")
      this.zyzsOrder.columns[2].title = this.$t("contract.zyzst.wt3")
      this.zyzsOrder.columns[3].title = this.$t("contract.zyzst.wt4")
      this.zyzsOrder.columns[4].title = this.$t("contract.zyzst.wt5")
      this.zyzsOrder.columns[5].title = this.$t("contract.zyzst.wt6")
      this.zyzsOrder.columns[6].title = this.$t("contract.zyzst.wt7")
      this.zyzsOrder.columns[7].title = this.$t("contract.zyzst.wt9")
      // this.zyzsOrder.columns[8].title = this.$t("contract.zyzst.wt9");
      this.zyzsOrder.columns[8].title = this.$t("contract.zyzst.wt10")

    },
    //获取人民币兑换率
    getCNYRate () {
      this.$http
        .post(this.host + "/market/exchange-rate/usd-cny")
        .then(response => {
          let resp = response.body
          this.CNYRate = resp.data
        })
    },
    getCoin (symbol) {
      return this.coins._map[symbol]
    },
    // k线配置
    getKline () {
      let that = this
      let config = {
        autosize: true,
        fullscreen: true,
        symbol: that.symbol,
        interval: "5", // K线默认时间传值
        timezone: "Asia/Shanghai",
        toolbar_bg: "#003f3c",
        container_id: "kline_container1",
        datafeed: that.datafeed,
        library_path:
          process.env.NODE_ENV === "production"
            ? "/assets/charting_library/"
            : "src/assets/js/charting_library/",
        locale: "zh",
        debug: false,
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }]
        },
        disabled_features: [
          "header_resolutions",
          "timeframes_toolbar",
          "header_symbol_search",
          "header_chart_type",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_saveload",
          "use_localstorage_for_settings",
          "volume_force_overlay"
        ],
        enabled_features: [
          "hide_last_na_study_output",
          "move_logo_to_main_pane"
        ],
        custom_css_url: "bundles/common.css",
        supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        overrides: {
          // 背景色网格颜色
          "paneProperties.background": "#15251f",
          "paneProperties.vertGridProperties.style": 0,
          "paneProperties.vertGridProperties.color": "rgba(255,255,255,.04)",
          "paneProperties.horzGridProperties.color": "rgba(255,255,255,.04)",
          // "scalesProperties.textColor" : "#AAA",
          "scalesProperties.textColor": "#61688A",
          "mainSeriesProperties.candleStyle.upColor": "#00b275",
          "mainSeriesProperties.candleStyle.downColor": "#f15057",
          "mainSeriesProperties.candleStyle.drawBorder": false,
          "mainSeriesProperties.candleStyle.wickUpColor": "#00b275",
          "mainSeriesProperties.candleStyle.wickDownColor": "#f15057",
          "paneProperties.legendProperties.showLegend": false,
          "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.linecolor": "#9194a4",
          // "scalesProperties.lineColor": "#000", // xy刻度线色值
          // "paneProperties.crossHairProperties.color": "#00b275", // 十字光标颜色
          "mainSeriesProperties.candleStyle.borderUpColor": "#00b275", // 开高低收买入标线
          "mainSeriesProperties.candleStyle.borderDownColor": "#f15057" // 开高低收卖出标线
        },
        // 柱状图样式
        studies_overrides: {
          "volume.volume.color.0": "rgba(241, 80, 87, .3)", //第一根的颜色
          "volume.volume.color.1": "rgba(0, 178, 117, .3)" //第二根的颜色
        },
        time_frames: [
          {
            text: "1min",
            resolution: "1",
            description: "realtime",
            title: that.$t("exchange.realtime")
          },
          { text: "1min", resolution: "1", description: "1min" },
          { text: "5min", resolution: "5", description: "5min" },
          { text: "15min", resolution: "15", description: "15min" },
          { text: "30min", resolution: "30", description: "30min" },
          {
            text: "1hour",
            resolution: "60",
            description: "1hour",
            title: "1hour"
          },
          /*{ text: "4hour", resolution: "240", description: "4hour",title: "4hour" },*/
          {
            text: "1day",
            resolution: "1D",
            description: "1day",
            title: "1day"
          },
          {
            text: "1week",
            resolution: "1W",
            description: "1week",
            title: "1week"
          },
          { text: "1mon", resolution: "1M", description: "1mon" }
        ]
      }
      if (that.skin === "day") {
        config.toolbar_bg = "#fff"
        config.custom_css_url = "bundles/common_day.css"
        config.overrides["paneProperties.background"] = "#fff"
        config.overrides["mainSeriesProperties.candleStyle.upColor"] =
          "#a6d3a5"
        config.overrides["mainSeriesProperties.candleStyle.downColor"] =
          "#ffa5a6"
        config.overrides["scalesProperties.lineColor"] = "#aaa" // xy刻度线色值
        config.overrides["mainSeriesProperties.candleStyle.upColor"] =
          "#39c595" // 第一根的颜色
        config.overrides["mainSeriesProperties.candleStyle.downColor"] =
          "#f96969" // 第二根的颜色
      }
      require(["@js/charting_library/charting_library.min.js"], function (tv) {
        let widget = (window.tvWidget = new TradingView.widget(config))
        widget.onChartReady(function () {
          widget.chart().executeActionById("drawingToolbarAction")
          widget
            .chart()
            .createStudy("Moving Average", false, false, [5], null, {
              "plot.color": "#965FC4"
            })
          widget
            .chart()
            .createStudy("Moving Average", false, false, [10], null, {
              "plot.color": "#84AAD5"
            })

          widget
            .createButton()
            .attr("title", "realtime")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(3)
              widget.setSymbol("", "1")
            })
            .append("<span>分时</span>")

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "1")
            })
            .append("<span>M1</span>")

          widget
            .createButton()
            .attr("title", "M5")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "5")
            })
            .append("<span>M5</span>")
            .addClass("selected") // 静态默认分时

          widget
            .createButton()
            .attr("title", "M15")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "15")
            })
            .append("<span>M15</span>")

          widget
            .createButton()
            .attr("title", "M30")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "30")
            })
            .append("<span>M30</span>")

          widget
            .createButton()
            .attr("title", "H1")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "60")
            })
            .append("<span>H1</span>")

          widget
            .createButton()
            .attr("title", "D1")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "1D")
            })
            .append("<span>D1</span>")

          widget
            .createButton()
            .attr("title", "W1")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "1W")
            })
            .append("<span>W1</span>")

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function () {
              if ($(this).hasClass("selected")) return
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected")
              widget.chart().setChartType(1)
              widget.setSymbol("", "1M")
            })
            .append("<span>M1</span>")
        })
      })
    },
    // 收藏
    getFavor () {
      //查询自选(收藏)
      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
        .then(response => {
          this.coins.favor = []
          this.currentCoinIsFavor = false
          let resp = response.body
          for (let i = 0; i < resp.length; i++) {
            let coin = this.getCoin(resp[i].symbol)
            if (coin != null) {
              coin.isFavor = true
              this.coins.favor.push(coin)
            }
            if (this.currentCoin.symbol == resp[i].symbol) {
              this.currentCoinIsFavor = true
            }
          }
        })
    },
    // 格式化时间
    timeFormat: function (tick) {
      return moment(tick).format("HH:mm:ss")
    },
    dateFormat: function (tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss")
    },
    toFixed6: function (val) {
      return val ? val.toFixed(6) : '0.000000'
    },
    toFixed4: function (val) {
      return val ? val.toFixed(4) : '0.0000'
    },
    calRate: function () {
      var that = this
      let v = 0
      if (that.cwOrder.rows.length > 0) {

        this.sellPriceNew = this.plate.askRows[this.plate.askRows.length - 1].price
        this.buyPriceNew = this.plate.bidRows[0].price
        that.cwOrder.rows.forEach((row, index) => {
          if (row.positionType == 'RISE') {
            row.blurGainLloss = ((that.buyPriceNew - row.positionAvgPrice).mul(row.contractTotalNum).mul(that.form.buy.minVolume)).toFixed(4)
            row.gainLossRate = row.blurGainLloss ? ((row.blurGainLloss.div(row.holdingBond)) * 100).toFixed(4) : ''
          } else {
            row.blurGainLloss = ((row.positionAvgPrice - that.sellPriceNew).mul(row.contractTotalNum).mul(that.form.buy.minVolume)).toFixed(4)
            row.gainLossRate = row.blurGainLloss ? ((row.blurGainLloss.div(row.holdingBond)) * 100).toFixed(4) : ''
          }
          v += Number(row.blurGainLloss)
        })
        that.ykTotal = Number(v.toFixed(8))
        this.accountQu = (Number(this.assetsDetail.assets) + Number(this.ykTotal)).toFixed(8)
      }

    },
    //买卖盘
    getPlate () {
      let params = {}
      params["symbol"] = this.currentCoin.symbol
      this.$http
        .post(this.host + '/contract/monitor/plate-mini', params)
        .then(response => {
          this.plate.askRows = []
          this.plate.bidRows = []
          let resp = response.body
          if (resp.ask && resp.ask.items.length > 0) {
            // for (let i = 0; i < resp.ask.items.length; i++) {
            //   if (i == 0) {
            //     resp.ask.items[i].totalAmount = resp.ask.items[i].nowp || 0;
            //   } else {
            //     resp.ask.items[i].totalAmount =
            //             (resp.ask.items[i - 1].totalAmount || 0) + (resp.ask.items[i].nowp || 0);
            //   }
            // }
            if (resp.ask.items.length >= this.plate.maxPostion) {
              for (let i = this.plate.maxPostion; i > 0; i--) {
                let ask = resp.ask.items[i - 1]
                ask.direction = "SELL"
                ask.position = i
                this.plate.askRows.push(ask)
              }
              const rows = this.plate.askRows,
                len = rows.length,
                totle = rows[0].totalAmount || 0
              this.plate.askTotle = totle
            } else {
              for (let i = 6; i > 0; i--) {
                let ask = { price: 0, nowp: 0 }
                ask.direction = "SELL"
                ask.position = i
                ask.totalAmount = ask.nowp || 0
                this.plate.askRows.push(ask)
              }
              for (let i = resp.ask.items.length; i > 0; i--) {
                let ask = resp.ask.items[i - 1]
                ask.direction = "SELL"
                ask.position = i
                this.plate.askRows.push(ask)
              }
              // this.plate.askRows.reverse()
              const rows = this.plate.askRows,
                len = rows.length,
                totle = (rows[this.plate.maxPostion - resp.ask.items.length].totalAmount || 0)
              this.plate.askTotle = totle
            }

          }
          if (resp.bid && resp.bid.items.length > 0) {
            // for (let i = 0; i < resp.bid.items.length; i++) {
            //   if (i == 0)
            //     resp.bid.items[i].totalAmount = resp.bid.items[i].nowp;
            //   else
            //     resp.bid.items[i].totalAmount =
            //             resp.bid.items[i - 1].totalAmount + resp.bid.items[i].nowp;
            // }
            for (let i = 0; i < resp.bid.items.length; i++) {
              let bid = resp.bid.items[i]
              bid.direction = "BUY"
              bid.position = i + 1
              this.plate.bidRows.push(bid)
              if (i == this.plate.maxPostion - 1) break
            }
            if (resp.bid.items.length < this.plate.maxPostion) {
              for (
                let i = resp.bid.items.length;
                i < this.plate.maxPostion;
                i++
              ) {
                let bid = { price: 0, nowp: 0 }
                bid.direction = "BUY"
                bid.position = i + 1
                bid.totalAmount = 0
                this.plate.bidRows.push(bid)
              }
              const rows = this.plate.bidRows,
                len = rows.length,
                totle = rows[resp.bid.items.length - 1].totalAmount
              this.plate.bidTotle = totle
            } else {
              const rows = this.plate.bidRows,
                len = rows.length,
                totle = rows[len - 1].totalAmount
              this.plate.bidTotle = totle
            }
          }
        })
    },
    // 币种列表
    getSymbol () {
      this.$http.post(this.host + this.api.contract.thumb, {}).then(response => {
        let resp = response.body
        this.contractList = resp
        //先清空已有数据
        for (let i = 0; i < resp.length; i++) {
          let coin = resp[i]
          coin.base = resp[i].symbol.split("/")[1]
          this.coins[coin.base] = []
          this.coins._map = []
          this.coins.favor = []
        }
        for (let i = 0; i < resp.length; i++) {
          let coin = resp[i]
          coin.price = resp[i].close = resp[i].close.toFixed(
            this.baseCoinScale
          )
          coin.rose =
            resp[i].chg > 0
              ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
              : (resp[i].chg * 100).toFixed(2) + "%"
          coin.coin = resp[i].symbol.split("/")[0]
          coin.base = resp[i].symbol.split("/")[1]
          coin.href = (coin.coin + "_" + coin.base).toLowerCase()
          coin.isFavor = false
          this.coins._map[coin.symbol] = coin
          this.coins[coin.base].push(coin)
          if (coin.symbol == this.currentCoin.coinSymbol2) {
            this.currentCoin = coin
            this.currentCoin.coin = coin.contractCoin.coinSymbol
            this.currentCoin.base = coin.contractCoin.baseSymbol
            this.form.buy.minVolume = coin.contractCoin.minVolume
            this.form.buy.feeRate = coin.contractCoin.feeRate
            this.form.buy.limitPrice = coin.price
            this.form.sell.limitPrice = coin.price
          }
        }
        if (this.isLogin) {
          this.getFavor()
          this.getCWOrder()
        }
        require(["../../assets/js/exchange.js"], function (e) {
          e.clickScTab()
        })
        this.startWebsock()
      })
    },
    // 小数精度
    getSymbolScale () {
      //获取精度
      this.$http
        .post(this.host + this.api.contract.symbolInfo, {
          symbol: this.currentCoin.symbol
        })
        .then(response => {
          let resp = response.body
          if (resp != null) {
            this.currentCoin.coinScale = resp.coinScale
            this.currentCoin.baseCoinScale = resp.baseCoinScale
            this.baseCoinScale = resp.baseCoinScale
            this.coinScale = resp.coinScale
            this.symbolFee = resp.fee
          }
        })
    },
    //资产概要
    getAssets: function () {
      //查询当前委托
      let params = {}
      params["symbol"] = this.currentCoin.symbol
      this.$http
        .post(this.host + '/contract-api/contract-order/gaiYao', params)
        .then(response => {
          let resp = response.body

          resp.assets = resp.assets ? Number(resp.assets).toFixed(6) : ''
          resp.dealProfit = resp.dealProfit ? Number(resp.dealProfit).toFixed(6) : ''
          resp.orderBond = resp.orderBond ? Number(resp.orderBond).toFixed(6) : ''
          resp.positionBond = resp.positionBond ? Number(resp.positionBond).toFixed(6) : ''
          resp.useableBond = resp.useableBond ? Number(resp.useableBond).toFixed(6) : ''
          this.assetsDetail = resp
          this.accountQu = (Number(this.ykTotal) + Number(resp.assets)).toFixed(8)
        })
    },
    // 持仓
    getCWOrder: function () {
      //查询当前委托
      let params = {}
      params["memberId"] = this.member.id
      params["symbol"] = this.currentCoin.symbol
      this.cwOrder.rows = []
      let that = this
      this.currentLoading = true
      this.ykTotal = ''
      this.$http
        .post(this.host + '/contract-api/contract-position/findPositions', params)
        .then(response => {
          let resp = response.body
          var v = 0
          if (resp.code == 0 && resp.data.length > 0) {
            this.cwOrder.rows = resp.data
            this.sellPriceNew = this.plate.askRows[this.plate.askRows.length - 1].price
            this.buyPriceNew = this.plate.bidRows[0].price
            this.cwOrder.rows.forEach((row, index) => {
              if (row.positionType == 'RISE') {
                row.blurGainLloss = ((that.buyPriceNew - row.positionAvgPrice).mul(row.contractTotalNum).mul(that.form.buy.minVolume)).toFixed(4)
                row.gainLossRate = row.blurGainLloss ? ((row.blurGainLloss.div(row.holdingBond)) * 100).toFixed(4) : ''
                this.wallet.pMore = row.contractOccupyNum
              } else {
                row.blurGainLloss = ((row.positionAvgPrice - that.sellPriceNew).mul(row.contractTotalNum).mul(that.form.buy.minVolume)).toFixed(4)
                row.gainLossRate = row.blurGainLloss ? ((row.blurGainLloss.div(row.holdingBond)) * 100).toFixed(4) : ''
                this.wallet.pEmpty = row.contractOccupyNum
              }
              v += Number(row.blurGainLloss)
            })
            that.ykTotal = v.toFixed(8)
          }
          this.currentLoading = false
        })
    },
    // 获取委托单
    getCurrentOrder: function (type) {
      //查询当前委托
      let route = this.$route.params[0]
      let params = {}
      params["memberId"] = this.member.id
      params["symbol"] = route.split('_')[0] + route.split('_')[1]
      params["pageNo"] = 1
      params["type"] = type ? type : 1
      params["pageSize"] = type == 3 ? this.historyOrder.pageSize : this.currentOrder.pageSize
      this.currentOrder.rows = []
      var that = this
      this.currentLoading = true
      this.$http
        .post(this.host + '/contract-api/contract-order/current', params)
        .then(response => {
          let resp = response.body
          let rows = []
          if (resp.content != undefined) {
            if (resp.content.length > 0) {
              rows = resp.content
              if (type == 2) {
                this.planOrder.rows = rows
                this.planNum = rows.length
              } else if (type == 3) {
                this.historyOrder.rows = rows
              } else if (type == 4) {
                this.revokeOrder.rows = rows
              } else if (type == 5) {
                this.zyzsOrder.rows = rows
                this.zyzsNum = rows.length
              } else {
                this.currentOrder.rows = rows
                this.currentNum = rows.length

              }
            } else {
              if (type == 2) {
                this.planOrder.rows = []
                this.planNum = 0
              } else if (type == 3) {
                this.historyOrder.rows = []
              } else if (type == 4) {
                this.revokeOrder.rows = []
              } else if (type == 5) {
                this.zyzsOrder.rows = []
                this.zyzsNum = 0
              } else {
                this.currentOrder.rows = []
                this.currentNum = 0
              }
            }
          }
          this.currentLoading = false
        })
    },
    // 获取历史记录
    getTrade () {
      let params = {}
      params["symbol"] = this.currentCoin.symbol
      params["size"] = 20
      this.$http
        .post(this.host + this.api.contract.trade, params)
        .then(response => {
          this.trade.rows = []
          let resp = response.body
          for (let i = 0; i < resp.length; i++) {
            this.trade.rows.push(resp[i])
          }
        })
    },
    // 推送时刷新订单
    refreshAccount: function () {
      this.getMoney()
      this.getAssets()
      this.getCWOrder()
      this.getCurrentOrder()
      this.getCurrentOrder(2)
      this.getCurrentOrder(3)
      this.getCurrentOrder(4)
      this.getCurrentOrder(5)
    },
    // 撤回操作
    revoke: function (params) {
      var that = this
      that.modal5 = true
      that.revokeInfo.num = params.subNowp
      that.revokeInfo.id = params.orderId
      that.revokeInfo.chNum = params.subNowp
    },
    //关闭撤回模态框
    closeRevoke: function () {
      let that = this
      this.modal5 = false
      that.revokeInfo.num = ''
      that.revokeInfo.id = ''
      that.revokeInfo.chNum = ''
    },
    //确认撤回
    sureRevoke: function (id) {
      this.showLoad = true
      var that = this
      this.$http
        .get(this.host + '/contract-api/contract-order/cancel/' + id)
        .then(response => {
          let resp = response.body
          if (resp.code == '0') {
            this.$Message.success(that.$t('other.ot23'))
            // this.getCurrentOrder(1);
            // this.getMoney();
            this.refreshAccount()
            this.showLoad = false
            this.revokeInfo.num = ''
            this.revokeInfo.id = ''
            this.modal5 = false
          } else {
            this.$Message.error(that.$t('other.ot24'))
            this.showLoad = false
          }
        })
    },
    //调用k线
    successCallBack (that) {
      that = this
      that.datafeed = new Datafeeds.WebsockFeed(
        that.host + "/contract-market",
        that.currentCoin,
        that.stompClient,
        that.baseCoinScale
      )
      that.getKline()

      // setInterval(function () {
      //   that.stompClient.send("/app/message/hoding", {}, JSON.stringify({msg: 'holding'}));
      // }, 60000);
      //订阅价格变化消息
      that.stompClient.subscribe("/topic/contract-market/thumb", function (msg) {
        let resp = JSON.parse(msg.body)
        let coin = that.getCoin(resp.symbol)
        if (coin != null) {
          coin.price = resp.close
          coin.rose =
            resp.chg > 0
              ? "+" + (resp.chg * 100).toFixed(2) + "%"
              : (resp.chg * 100).toFixed(2) + "%"
          coin.close = resp.close
          coin.high = resp.high
          coin.low = resp.low
          coin.turnover = parseInt(resp.volume)
          coin.volume = resp.volume
          coin.usdRate = resp.usdRate


        }

      })
      //订阅指标价格和标记价格
      that.stompClient.subscribe("/topic/contract-market/indexPrice/" + that.currentCoin.symbol, function (msg) {
        let resp = JSON.parse(msg.body)
        that.topPrice.indexPrice = resp.indexPrice.toFixed(4)
        that.topPrice.markPrice = resp.marketPrice.toFixed(4)
      })
      //订阅实时成交信息
      that.stompClient.subscribe(
        "/topic/contract-market/trade/" + that.currentCoin.symbol,
        function (msg) {
          let resp = JSON.parse(msg.body)
          if (resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              that.trade.rows.unshift(resp[i])
            }
          }
          if (that.trade.rows.length > 30) {
            that.trade.rows = that.trade.rows.slice(0, 30)
          }
        }
      )
      if (that.isLogin) {
        //订阅委托取消信息
        that.stompClient.subscribe(
          "/topic/contract-market/order-canceled/" +
          that.currentCoin.symbol +
          "/" +
          that.member.id,
          function (msg) {
            let resp = JSON.parse(msg.body)
            that.refreshAccount()
          }
        )
        //订阅委托交易完成
        that.stompClient.subscribe(
          "/topic/contract-market/order-completed/" +
          that.currentCoin.symbol +
          "/" +
          that.member.id,
          function (msg) {
            let resp = JSON.parse(msg.body)
            that.refreshAccount()
          }
        )
        //订阅委托部分交易
        that.stompClient.subscribe(
          "/topic/contract-market/order-trade/" +
          that.currentCoin.symbol +
          "/" +
          that.member.id,
          function (msg) {
            let resp = JSON.parse(msg.body)
            that.refreshAccount()
          }
        )
      }
      //订阅盘口消息
      let asksLet, bidsLet
      that.stompClient.subscribe(
        "/topic/contract-market/trade-plate/" + that.currentCoin.symbol,
        function (msg) {
          let resp = JSON.parse(msg.body)
          if (resp.direction == "SELL") {
            let asks = resp.items
            asksLet = asks
            if (bidsLet == null || asksLet[0].price < bidsLet[0].price) {
              return
            }
            that.plate.askRows = []
            let totle = 0
            for (let i = that.plate.maxPostion - 1; i >= 0; i--) {
              let ask = {}
              if (i < asks.length) {
                ask = asks[i]
              } else {
                ask["price"] = 0
                ask["nowp"] = 0
              }
              ask.direction = "SELL"
              ask.position = i + 1
              that.plate.askRows.push(ask)
            }
            // this.plate.askRows.reverse()
            for (let i = that.plate.askRows.length - 1; i >= 0; i--) {
              if (
                i == that.plate.askRows.length - 1 ||
                that.plate.askRows[i].price == 0
              ) {
                that.plate.askRows[i].totalAmount =
                  that.plate.askRows[i].nowp
              } else {
                that.plate.askRows[i].totalAmount =
                  that.plate.askRows[i + 1].totalAmount +
                  that.plate.askRows[i].nowp
              }
              totle += that.plate.askRows[i].nowp
            }
            that.plate.askTotle = totle

          } else {
            let bids = resp.items
            bidsLet = bids
            if (asksLet == null || bidsLet[0].price > asksLet[0].price) {
              return
            }
            that.plate.bidRows = []
            let totle = 0
            for (let i = 0; i < that.plate.maxPostion; i++) {
              let bid = {}
              if (i < bids.length) {
                bid = bids[i]
              } else {
                bid["price"] = 0
                bid["nowp"] = 0
              }
              bid.direction = "BUY"
              bid.position = i + 1
              that.plate.bidRows.push(bid)
            }
            for (let i = 0; i < that.plate.bidRows.length; i++) {
              if (i == 0 || that.plate.bidRows[i].nowp == 0) {
                that.plate.bidRows[i].totalAmount =
                  that.plate.bidRows[i].nowp
              } else {
                that.plate.bidRows[i].totalAmount =
                  that.plate.bidRows[i - 1].totalAmount +
                  that.plate.bidRows[i].nowp
              }
              totle += that.plate.bidRows[i].nowp
            }
            that.plate.bidTotle = totle

          }

          that.calRate()
          that.getAssets()
        }
      )
    },
    startWebsock () {
      if (this.stompClient) {

        this.stompClient.ws.close()
        this.isSelfClose = true
      }
      let stompClient = null
      let that = this

      let socket = new SockJS(that.host + that.api.contract.ws)
      stompClient = Stomp.over(socket)
      stompClient.heartbeat.outgoing = 20000
      stompClient.heartbeat.incoming = 20000
      this.stompClient = stompClient
      stompClient.debug = false
      stompClient.connect({}, (frame) => {
        this.successCallBack(that)
      }, () => {
        this.reconnect(that.host + that.api.contract.ws, this.successCallBack, that, this.isSelfClose)
      })
    },
    reconnect (socketUrl, successCallBack, that, isClose) {
      that = this
      if (isClose) {
        that.isSelfClose = false
        return
      }
      that.isSelfClose = false
      // console.info('in reconnect function')
      // isClose = false
      const reconInv = setInterval(() => {
        // console.info('in interval' + Math.random())
        this.socket = new SockJS(socketUrl)
        this.stompClient = Stomp.over(this.socket)
        this.stompClient.connect({}, (frame) => {
          // console.info('reconnected success')
          // 连接成功，清除定时器
          clearInterval(reconInv)
          // connected = true
          that.successCallBack()
        }, () => {
          // console.info('reconnect failed')
          // console.info('connected:' + connected)
          // if (connected) {
          //   console.info('connect .... what?')
          // }
        })
      }, 2000)
    },
    successCallBackContract (that) {
      that = this
      if (that.isLogin) {
        //订阅委托取消信息
        that.stompT.subscribe(
          "/topic/contract/position-force/" +
          that.currentCoin.symbol +
          "/" +
          that.member.id,
          function (msg) {
            that.getCWOrder()
          }
        )
      }
    },
    initWebSocket: function () {
      if (this.stompT) {
        this.stompT.ws.close()
        this.contractIsSelfClose = true
      }
      let stompT = null
      let that = this
      let socket = new SockJS(that.host + '/contract/contract-ws')
      stompT = Stomp.over(socket)
      stompT.heartbeat.outgoing = 20000
      stompT.heartbeat.incoming = 20000
      this.stompT = stompT
      stompT.debug = false

      stompT.connect({}, (frame) => {
        this.successCallBackContract(that)
      }, () => {
        this.reconnectContract(that.host + '/contract/contract-ws', this.successCallBackContract, that, this.contractIsSelfClose)
      })
    },
    reconnectContract (socketUrl, successCallBackContract, that, isClose) {
      that = this
      if (isClose) {
        that.contractIsSelfClose = false
        return
      }
      that.contractIsSelfClose = false
      // console.info('in reconnect function')
      // isClose = false
      const reconInv = setInterval(() => {
        // console.info('in interval' + Math.random())
        this.socket = new SockJS(socketUrl)
        this.stompT = Stomp.over(this.socket)
        this.stompT.connect({}, (frame) => {
          // console.info('reconnected success')
          // 连接成功，清除定时器
          clearInterval(reconInv)
          // connected = true
          that.successCallBackContract(that)
        }, () => {
          // console.info('reconnect failed')
          // console.info('connected:' + connected)
          // if (connected) {
          //   console.info('connect .... what?')
          // }
        })
      }, 2000)
    },

    currentCoinFavorChange () {
      if (!this.isLogin) {
        this.$Message.warning(this.$t("common.logintip"))
        return
      }
      if (this.collecRequesting) {
        return
      }
      const symbol = this.currentCoin.symbol
      this.collecRequesting = true
      if (this.currentCoinIsFavor) {
        //已收藏,去取消收藏
        this.$http
          .post(this.host + this.api.exchange.favorDelete, {
            symbol
          })
          .then(response => {
            let resp = response.body
            if (resp.code == 0) {
              this.$Message.info(this.$t("exchange.cancel_favorite"))
              this.getSymbol() //刷新状态
              this.currentCoinIsFavor = false
            }
            this.collecRequesting = false
          })
      } else {
        //去添加收藏
        this.$http
          .post(this.host + this.api.exchange.favorAdd, { symbol })
          .then(response => {
            let resp = response.body
            if (resp.code == 0) {
              this.$Message.info(this.$t("exchange.do_favorite"))
              this.getSymbol() //刷新状态
              this.currentCoinIsFavor = true
            }
            this.collecRequesting = false
          })
      }
    },
    gohref (currentRow, oldCurrentRow) {
      const path = "/contract/" + currentRow.href
      this.$router.push({
        path
      })
    },
    buyPlate (currentRow) {
      this.form.buy.limitPrice = currentRow.price
      // this.form.buy.triggerPrice=currentRow.price;
      this.form.sell.limitPrice = currentRow.price
    },
    sellPlate (currentRow) {
      this.form.buy.limitPrice = currentRow.price
      // this.form.buy.triggerPrice = currentRow.price;
      this.form.sell.limitPrice = currentRow.price
    },
    sellMarketPrice () {
      this.$Message.error("暂未开放")
    },
  }
};
</script>
