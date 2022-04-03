<template>
  <div class="con">
    <Tabbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar'
export default {
  name: 'App',
  components: {
    Tabbar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
