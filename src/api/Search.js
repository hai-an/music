import request from '@/utils/request'

export const hotSearch = params => request( {
    url: '/search/hot',
    params
} )/* 热搜关键字 */
export const searchResult = params => request( {
    url: "/cloudsearch",
    params,

} )/* 搜索结果 */
