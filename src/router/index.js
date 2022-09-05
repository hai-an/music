import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级组件
import Layout from '@/views/Layout'
import Play from '@/views/Play'
// 二级组件
import Home from '@/views/Home'
import Search from '@/views/Search'

Vue.use( VueRouter )
const router = new VueRouter( {
    routes: [
        {
            path: '/',
            redirect: '/layout',/* 默认首次打开跳转到一级页面 */
        },{
            path: '/layout',
            component: Layout,
            redirect: '/layout/home',  // 重定向:重新指向其它path,会改变网址
            children: [ {
                path: 'home',
                component: Home,
                meta: { /* meta 保存路由对象额外信息的 */title: '首页' }
            },{
                path: 'search',
                component: Search,
                meta: { title: '搜索' }
            }
            ]
        },{
            path: '/play',
            component: Play
        }


    ]
} )
export default router
