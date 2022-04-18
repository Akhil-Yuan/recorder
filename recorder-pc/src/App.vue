<template>
  <div class="con">
    <Tabbar v-if="!this.flag" />
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
export default {
  name: "App",
  components: {
    Tabbar,
  },
  computed: {
    flag() {
      return this.$route.meta.isLogin;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
</style>
