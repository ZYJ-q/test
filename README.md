
# bitrade

## 前端开发规范
1. 页面使用驼峰法命名，如Exchange.vue,WithdrawRecord.vue,名称为英文单词，并且要能正确描述该模块功能
2. 变量命名禁止使用拼音，特别是拼音缩写
3. 页面比较多时应该使用文件夹做分类,如路由以及国际化管理可以采用webpack提供的require来实现分包,方便维护;
4. 模块中data变量应该尽量少，比较多时应该使用子对象进行管理

> A Vue.js project
## 注意点
1. node版本必须大于8.0以上,需要使用对应的npm版本，如果安装依赖或者第三方包的过程中出现报错现象，可以使用npm代理，或者切换镜像
2. 因为这是基于一个完整版本的分离版，可能牵扯到杠杆交易，ieo管理的接口，由于页面之间的耦合度关系，需要跟踪错误，注掉报错的接口；
3. nginx 需要配置开启gzip压缩,可以极大提高首页的加载速度，防止出现白屏的现象;
4. compression-webpack-plugin 该插件版本需要关注，这个插件的作用是压缩js，css资源为.gz格式的，由于对应的webpack版本的关系，需要降低该compression-webpack-plugin插件版本，详情参阅 package.json文件



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
