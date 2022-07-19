<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
    <!-- 长沙学院：28.24532,113.02962 -->
  </div>
</template>

<script>
// 引入底部路由导航（非路由）
import { mapActions } from 'vuex';
import FooterGuide from './components/FooterGuide/FooterGuide.vue';

export default {
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  components: {
    FooterGuide
  },
  // created(){
  // //在页面刷新时将vuex里的信息保存到localStorage里
  //   window.addEventListener("beforeunload",()=>{
  //   localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
  //   })
  // //在页面加载时读取localStorage里的状态信息
  //   localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
  // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background #f5f5f5
  touch-action: none;
</style>
