// 直接更行state的多个方法的对象
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD,
  DECREMENT_FOOD,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

// [RECEIVE_ADDRESS](){}使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
export default {
  [RECEIVE_ADDRESS] (state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state){
    state.userInfo = {}
  },
  
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD](state,{food}) {
    if(!food.count){
      // 新增属性必须Vue.set(对象，属性名，属性值)
      // 不能直接food.count = 1会没有数据绑定
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },

  [DECREMENT_FOOD](state,{food}) {
    if(food.count){
      food.count--
      if(!food.count){
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
    
  },

  [CLEAR_CART](state){
    // 清除food.count
    state.cartFoods.forEach(food => {
      food.count = 0
    });
    // 移除购物车中所有购物项
    state.cartFoods = []
  }, 

  [RECEIVE_SEARCH_SHOPS](state,{searchShops}) {
    state.searchShops = searchShops
  }
}