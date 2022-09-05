<template>
    <van-cell :title="name"
        :label="author + '-' + name" center>
        <template #right-icon>
            <van-icon name="play-circle-o" size="0.7rem" @click="Start" />
        </template>
    </van-cell>
</template>

<script>
// import { getSongByIdAPI } from '@/api/index'
export default {
    props: {
        name: String,/* 歌名 */
        author: String,/* 作者 */
        id: Number/* 序号 */
    },
    methods: {
        Start ()
        {
            this.$router.push( {
                path: '/play',
                query: {
                    id: this.id // 歌曲id, 通过路由跳转传递过去
                }
            } )
        }
    }

}
</script>

<style scoped>
/* 最新歌单的下边框 */
.van-cell {
    border-bottom: 1px solid rgb(230, 230, 230);
}
</style>
