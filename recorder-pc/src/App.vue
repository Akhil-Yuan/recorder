<template>
  <div class="con">
    <Tabbar v-if="!this.flag"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar'
export default {
  name: 'App',
  components: {
    Tabbar
  },
  data() {
    return {
      flag: ''
    }
  },
  watch: {
    $route(newValue) {
      this.flag = newValue.meta.islogin
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
