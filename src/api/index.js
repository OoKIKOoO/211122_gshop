// 包含n个接口请求函数的模块
// 接口请求函数的返回值依然是promise对象
import ajax from './ajax'
const BASE_URL = '/api'
// GeoHash是一种地址编码方法。他能够把二维的空间经纬度数据编码成一个字符串
// 通过比较geohash值得相似程度来查找附近目标要素。
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})


// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})


// // [5、获取一次性验证码](#5获取一次性验证码)<br/>
// 直接发送请求不用ajax
// export const reqAddress2 = () => ajax()


// // [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd',{name, pwd, captcha},'POST')
// // [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode',{phone})
// // [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// // [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// // [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => ajax(BASE_URL+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
  * 获取商家评价数组
  */
export const reqShopRatings = () => ajax('/ratings')

/**
  * 获取商家商品数组
  */
export const reqShopGoods = () => ajax('/goods')
