<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="cartFoodCount(false)"></div>      
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="cartFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    cartFoodCount(isAdd){
        this.$store.dispatch('getcartFoodCount', {food:this.food, isAdd})
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 20px
      font-size: 20px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 20px
      font-size 20px
      color $green
      &.move-enter-active,&.move-leave-active
        transition all .2s
      &.move-enter,&.move-leave-to
        opacity 0
        transform translateX(25px) 
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 20px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 20px
      font-size: 20px
      color $green
</style>