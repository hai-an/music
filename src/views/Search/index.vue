<template>
    <div>
        <van-search @input="inputFn(value)" shape="round" v-model.trim="value"
            placeholder="请输入搜索关键词" />

        <div class="search_wrap" v-if="searchReArr.length === 0">
            <!-- 搜索下容器 -->
            <p class="hot_title ">热门搜索</p>
            <!-- 关键字的容器 -->
            <div class="hot_name_wrap">
                <!-- 关键字的样式 -->
                <span class="hot_item" v-for="(obj, index) in hotArr"
                    :key="index" @click="setFn(obj.first)">{{ obj.first }}</span>
            </div>
        </div>

        <!-- 搜索结果 -->
        <div class="search_wrap" v-else>
            <!-- 标题 -->
            <p class="hot_title">最佳匹配</p>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <!-- <van-cell
                    center v-for="obj in searchReArr" :key="obj.id"
                    :title='obj.name' :label="obj.ar[0].name + '-' + obj.name">
                    <template #right-icon>
                        <van-icon name="play-circle-o" size="0.6rem" />
                    </template>
                </van-cell> -->
                <SongItem v-for="obj in searchReArr" :key="obj.id"
                    :name="obj.name"
                    :author="obj.ar[0].name"
                    :id="obj.id"></SongItem>
            </van-list>
        </div>
    </div>
</template>

<script>
// 目标: 获取关键字
// 1.使用vant 的标签结构搭建好页面
// 2.在新建一个src/api/Search.js 设置axios请求的数据的接口
// 3.在src/api/index.js在引入并统一导出
// 4.在本页面按需导入 import { hotSearchAPI } from '@/api'
// 5.在 钩子函数 created 使用async和await等待 API接口函数 获取数据完成后,将结果赋予 hotArr
// 6.v-for 渲染页面结构
// 7.设置点击事件获取标签的内容实参 给input 输入框 的v-model的value值,实现数据的双向绑定


// 目标二: 获取搜索结果
// 1.定义获取搜索结果的接口在Search.js
// 2.把结果的接口在api/index.js下导出
// 3.在本页面设置好标签样式,定义一个变量接收搜索结果的空数组
//4.通过 调用 async和await修饰的函数可以原地返回Promise对象,
// 5.通过在另外一个函数内调用 4. 把5的的input的输入框的val传给4,获取搜索结果,返回给5
// 6.v-for渲染, v-fi互斥出现
import { hotSearchAPI,searchResultAPI } from '@/api'
import SongItem from "@/components/SongItem.vue"
export default {
    components: { SongItem },
    data ()
    {
        return {
            value: '',
            hotArr: [],/* 热搜关键字 */
            searchReArr: [],/* 搜索结果 */
            page: 1,
            loading: false,/* 控制加载的状态 */
            finished: false,/* 控制完成的状态 */
            timer: null,/* 定时器默认为null */
        };
    },
    async created ()
    {
        const res = await hotSearchAPI()
        // console.log( res.data.result.hots );
        this.hotArr = res.data.result.hots

    },
    methods: {
        async getResultArr ()
        {
            return await searchResultAPI( {
                keywords: this.value,
                limit: 20,
                offset: ( this.page - 1 ) * 120,
            } )
        },
        async setFn ( val )/* 点击搜索热词获取搜索结果 */
        {
            this.page = 1// 点击重新获取第一页数据
            this.finished = false// 把finished改回false

            this.value = val/* 把点击的搜索关键字覆盖给输入框的value值 */
            const res = await this.getResultArr()
            if ( res.data.result.songs === undefined )
            {
                this.searchReArr = []
                return
            }
            
            this.searchReArr = res.data.result.songs

            this.loading = false /* 把加载状态改为false 保证下次下拉可以触发刷新 */
        },
        async inputFn ( val )
        {
            // 目标: 输入框改变-逻辑代码-慢点执行
            // 解决: 防抖
            // 概念: 计时n秒, 最后执行一次, 如果再次触发, 重新计时
            // 效果: 用户在n秒内不触发这个事件了, 才会开始执行逻辑代码
            // 如果上一次有定时器就清空它
            if ( this.timer ) clearTimeout( this.timer )
            this.timer = setTimeout( async () =>
            {
                this.page = 1
                this.finished = false// 把finished改回false

                // 输入框值改变
                if ( this.value.length === 0 )/* 如果输入框的val值的长度为0,结束函数,并且清空搜索结果 */
                {
                    this.searchReArr = []
                    return
                }
                const res = await this.getResultArr()
                // 如果后台没有这条歌曲的搜索结果,就会报错res.data.result.songs为undefined
                // 解决方法:则把 搜索结果的数组清空,标签并且return
                if ( res.data.result.songs === undefined )
                {
                    this.searchReArr = []
                    return
                }
                console.log( res.data.result )
                this.searchReArr = res.data.result.songs
                this.loading = false /* 把加载状态改为false 保证下次下拉可以触发刷新 */
            },900 );

        },
        async onLoad ()
        {
            this.finished = false

            this.page++
            const res = await this.getResultArr()
            if ( res.data.result.songs === undefined )
            {

                this.finished = true/* 没有更多数据 */
                this.loading = false /* 把加载状态改为false 保证下次下拉可以触发刷新 */

                return
            }

            console.log( res.data.result );/* 拿到的最新搜索结果 */
            // 通过扩展运算符拼接新数组
            this.searchReArr = [ ... this.searchReArr,...res.data.result.songs ]
            // console.log( ' this.searchReArr:',this.searchReArr );
            this.loading = false /* 把加载状态改为false 保证下次下拉可以触发刷新 */
        }
    }

}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
    padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
    font-size: 0.32rem;
    color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
    margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
    display: inline-block;
    height: 0.853333rem;
    margin-right: 0.213333rem;
    margin-bottom: 0.213333rem;
    padding: 0 0.373333rem;
    font-size: 0.373333rem;
    line-height: 0.853333rem;
    color: #333;
    border-color: #d3d4da;
    border-radius: 0.853333rem;
    border: 1px solid #d3d4da;
}
</style>
