// 包含多个基于state的getter计算属性的对象
import state from './state'
export default {
  totalCount() {
    return state.cartFoods.reduce((preCount, food) => preCount + food.count, 0)
  },
  totalPrice() {
    return state.cartFoods.reduce((prePrice, food) => prePrice + food.count * food.price, 0)
  }
}