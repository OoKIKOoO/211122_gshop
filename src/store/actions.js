// 通过mutations间接更新state的多个方法的对象
// 要有三个能跟后台进行交互的异步action
import {
  CLEAR_CART,
  DECREMENT_FOOD,
  INCREMENT_FOOD,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SEARCH_SHOPS,
} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqLogout, reqSearchShop, reqShopGoods, reqShopInfo, reqShopRatings, reqShops, reqUserInfo} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longtitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步记录用户信息
  recordUser({commit}, userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
    console.log(userInfo);
  },
  // 异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  // 异步退出登录
  async logout({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },

   // 异步获取评论信息
  async getShopRatings({commit}, fn){
    const result = await reqShopRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      fn && fn()
    }
  },

   // 异步获取商品信息
  async getShopGoods({commit}, fn){
    const result = await reqShopGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      fn && fn()
    }
  },

  // 购物车商品数量
  getcartFoodCount({commit},{food, isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD,{food})
    }else{
      commit(DECREMENT_FOOD,{food})
    }
  },

  // 清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

  // 搜索商家
  async search_shops({commit, state}, keyword){
    const geohash = state.latitude + ',' + state.longtitude
    const result = await reqSearchShop(geohash,keyword)
    if(result.code === 0){
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS,{searchShops})
    }
  }

}