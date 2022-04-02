<template>
  <div class="con">
    <Courseware />
    <Homework />
  </div>
</template>

<script>
import Courseware from './Pages/Courseware'
import Homework from './Pages/Homework'
export default {
  name: 'App',
  components: {
    Courseware,
    Homework
  }
}
</script>

<style>

</style>
