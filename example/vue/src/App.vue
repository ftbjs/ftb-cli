<template>
  <div class="ftb-vue-container">
    <ftb-vue>My name is Ftb CLI.</ftb-vue>
  </div>
</template>

<script>
import FtbVue from './components/FtbVue'
export default {
  name: 'app',
  components: {
    FtbVue
  }
}
</script>

<style lang="scss" scoped>
.ftb-vue-container {
  text-align: center;
  font-size: 30px;
  color: #3eaf7c;
}
</style>
