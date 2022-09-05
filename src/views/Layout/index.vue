<template>
    <div class="One">
        <!-- 二级标题 -->
        <van-nav-bar
            :title="activeTitle" />
        <div class="main">
            <!-- 二级路由页面-挂载点 -->
            <router-view></router-view>
        </div>

        <van-tabbar route>
            <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
        </van-tabbar>
    </div>

</template>

<script>
export default {
    data ()
    {
        return {
            // 默认获取当前路由对象里的meta中的title值
            // activeTitle: '首页'
            activeTitle: this.$route.meta.title
        }
    },
    watch:
    {
        $route ()
        {
            this.activeTitle = this.$route.meta.title
        }
    }
}
</script>

<style scoped>

/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
    padding-top: 46px;
    padding-bottom: 50px;
}

.One>.van-nav-bar {
    position: fixed;
    width: 100%;
    height: 46px;
    top: 0;
    left: 0;
}
</style>
