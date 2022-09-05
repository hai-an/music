// api文件夹下,各个请求模块js,都统一来到index.js再向外导出

import { recommendMusic,recommendNewMusic } from './Home'
import { hotSearch,searchResult } from './Search'
import { getSongById,getLyricById } from './Play'

export const recommendMusicAPI = recommendMusic/* 请求推荐歌单的方法 */

export const recommendNewMusicAPI = recommendNewMusic/* 请求推荐最新音乐的方法 */

export const hotSearchAPI = hotSearch
// 请求热搜关键字

export const searchResultAPI = searchResult/* 搜索结果 */

// 获取歌曲详情
export const getSongByIdAPI = getSongById
// 获取歌词
export const getLyricByIdAPI = getLyricById
