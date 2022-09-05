<template>
    <div>
        <p class="title">推荐歌单</p>
        <van-row gutter="8">
            <van-col span="8" v-for="obj in reList" :key="obj.id">
                <van-image
                    width="100%"
                    height="3rem"
                    fit="cover"
                    :src="obj.picUrl" />
                <p class="song_name">
                    {{ obj.name }}
                </p>
            </van-col>

        </van-row>
        <p class="title">最新歌单</p>
        <SongItem v-for="obj in reNewList" :key="obj.id" :name="obj.song.name"
            :author="obj.song.artists[0].name"
            :id="obj.id"></SongItem>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <!-- <van-cell v-for="obj in reNewList" :key="obj.id" :title="obj.song.name"
            :label="obj.song.artists[0].name + '-' + obj.song.name" center>
            <template #right-icon>
                <van-icon name="play-circle-o" size="0.7rem" />
            </template>
        </van-cell> -->
    </div>

</template>

<script>
import { recommendMusicAPI,recommendNewMusicAPI } from "@/api"
import SongItem from "@/components/SongItem.vue"
export default {
    components:{SongItem},
    data ()
    {
        return {
            reList: [],/* 推荐歌单数组 */
            reNewList: [],/* 推荐最新歌单数组 */
        }
    },
    async created ()
    {
        const res = await recommendMusicAPI( { limit: 6 } )
        this.reList = res.data.result  /* 把接收到的数据存到数组里 */
        const res2 = await recommendNewMusicAPI( { limit: 22 } )
        this.reNewList = res2.data.result  /* 把接收到的数据存到数组里 */
        console.log( res2 )
    },

}
</script>

<style scoped>
/* 标题 */
.title {
    padding: 0.266667rem 0.24rem;
    margin: 0 0 0.24rem 0;
    background-color: #eee;
    color: #333;
    font-size: 15px;
}

/* 推荐歌单 - 歌名 */
.song_name {
    font-size: 0.346667rem;
    padding: 0 0.08rem;
    margin-bottom: 0.266667rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2;
    /** 显示的行数 **/
    overflow: hidden;
    /** 隐藏超出的内容 **/
}

/* 最新歌单的下边框 */
.van-cell {
    border-bottom: 1px solid rgb(230, 230, 230);
}
</style>
