import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
//  引入flex.js
import '@/mobile/flexible.js'
// 引入初始化css文件
import '@/styles/reset.css'
// 按需 -- 引入vant组件库
import { Tabbar,TabbarItem,NavBar,Col,Row,Image as VanImage,Cell,Icon,Search,List } from 'vant';
Vue.use( List );
Vue.use( Search );
Vue.use( Icon );
Vue.use( Cell );
Vue.use( VanImage );
Vue.use( Col );
Vue.use( Row );
Vue.use( Tabbar );
Vue.use( TabbarItem );
Vue.use( NavBar );

// 目标:封装网络请求
// 1.src/utils/request.js - 设置基地址,导出axios函数
// 2.src/api/Home.js - 设置方法axios({url:'具体'})
// 3.src/api/index.js - 把Home.js 里的函数引入过来统一导出
// 4.具体逻辑页面,引入api/index.js 请求方法,async+await等待axios结果回来了

//测试封装的api方法
// import { recommendMusicAPI } from '@/api/index'
// async function myFn ()
// {
//     const res = await recommendMusicAPI( { limit: 20 } );
//     // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
//     console.log( res );
// }
// myFn();

Vue.config.productionTip = false

new Vue( {
    router,
    render: h => h( App ),
} ).$mount( '#app' )
