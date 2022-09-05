// 文件名-尽量和模块页面文件名统一(方便查找)
import request from '@/utils/request'

// 首页-推荐歌单
export const recommendMusic = params => request( {
    url: '/personalized',
    params/* params:params es6规定key与value相同可以省略value */
    // 将来外面可能传入params的值{limit:20}
} )


// 首页-推荐最新歌单
export const recommendNewMusic = params => request( {
    url: '/personalized/newsong',
    params/* params:params es6规定key与value相同可以省略value */
    // 将来外面可能传入params的值{limit:20}
} )
