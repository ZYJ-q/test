export default {
    common: {
        area: '/uc/support/country'
    },
    uc: { //会员中心接口
        login: '/uc/login',
        register: '/uc/register',
        wallet: '/uc/asset/wallet/',
        captcha: '/uc/start/captcha',
        identification: '/uc/approve/certified/business/status', //商家认证
        apply: '/uc/approve/certified/business/apply', //商家认证申请
        announcement: '/uc/announcement/page', //公告列表
        // paydividends:"/uc/bonus/user/",//持币分红
        paydividends: "/uc/bonus/user/page", //持币分红
        mylist: '/uc/mine/list_es', //交易挖矿
        mylistrecord: "/uc/mine/detail/", //交易挖矿详情
    },
    market: { //币币交易行情接口
        ws: '/market/market-ws',
        thumb: '/market/symbol-thumb',
        thumbTrend: '/market/symbol-thumb-trend',
        plate: '/market/exchange-plate', //主动查询的盘口信息
        platemini: '/market/exchange-plate-mini', //获取10条数据
        platefull: '/market/exchange-plate-full', //获取所有数据
        trade: '/market/latest-trade', //主动查询的实时成交信息
        symbolInfo: '/market/symbol-info',
        indexData: "/market/index_info"
    },
    contract: { //合约交易行情接口
        ws: '/contract-market/contract-market-ws',
        thumb: '/contract-market/symbol-thumb',
        thumbTrend: '/contract-market/symbol-thumb-trend',
        plate: '/contract-market/contract-plate', //主动查询的盘口信息
        platemini: '/contract-market/contract-plate-mini', //获取10条数据
        platefull: '/contract-market/contract-plate-full', //获取所有数据
        trade: '/contract-market/latest-trade', //主动查询的实时成交信息
        symbolInfo: '/contract-market/symbol-info',
        indexData: "/contract-market/index_info",

        orderAdd: '/contract/order/add', //提交订单接口
        current: '/contract/order/current', //当前委托接口
        history: '/contract/order/history', //历史委托接口
        detail: '/contract/order/detail/', //详细订单接口
        favorFind: '/contract/favor/find', //查询自选
        favorAdd: '/contract/favor/add', //添加自选
        favorDelete: '/contract/favor/delete', //删除自选
        orderCancel: '/contract/order/cancel' //取消委托
    },
	contract_coin: { //币本位交易行情接口
	    ws: '/contract-coin-market/contract-coin-market-ws',
	    thumb: '/contract-coin-market/symbol-thumb',
	    thumbTrend: '/contract-coin-market/symbol-thumb-trend',
	    plate: '/contract-coin-market/contract-plate', //主动查询的盘口信息
	    platemini: '/contract-coin-market/contract-plate-mini', //获取10条数据
	    platefull: '/contract-coin-market/contract-plate-full', //获取所有数据
	    trade: '/contract-coin-market/latest-trade', //主动查询的实时成交信息
	    symbolInfo: '/contract-coin-market/symbol-info',
	    indexData: "/contract-coin-market/index_info",
	
	    orderAdd: '/contract-coin/order/add', //提交订单接口
	    current: '/contract-coin/order/current', //当前委托接口
	    history: '/contract-coin/order/history', //历史委托接口
	    detail: '/contract-coin/order/detail/', //详细订单接口
	    favorFind: '/contract-coin/favor/find', //查询自选
	    favorAdd: '/contract-coin/favor/add', //添加自选
	    favorDelete: '/contract-coin/favor/delete', //删除自选
	    orderCancel: '/contract-coin/order/cancel' //取消委托
	},
    exchange: { //币币交易委托提交与查询接口
        orderAdd: '/exchange/order/add', //提交订单接口
        current: '/exchange/order/current', //当前委托接口
        history: '/exchange/order/history', //历史委托接口
        detail: '/exchange/order/detail/', //详细订单接口
        favorFind: '/exchange/favor/find', //查询自选
        favorAdd: '/exchange/favor/add', //添加自选
        favorDelete: '/exchange/favor/delete', //删除自选
        orderCancel: '/exchange/order/cancel' //取消委托
    },
    otc: {
        coin: '/otc/coin/all', //查询支持的币种
        advertise: '/otc/advertise/page-by-unit', //获取广告
        createAd: '/uc/ad/create', //创建广告
        adDetail: '/otc/advertise/detail'
    }
}
