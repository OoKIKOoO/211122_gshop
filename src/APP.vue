<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
    <!-- 长沙学院：28.24532,113.02962 -->
  </div>
</template>

<script>
// 引入底部路由导航（非路由）
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background #f5f5f5
</style>
