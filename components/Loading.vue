<template lang="html">
  <div class="loading-page" v-if="loading">
    <i class="el-icon-loading"></i>
    <span class="title">&nbsp;загрузка...</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    value: 0
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    },
    increase (num) {
      this.value = num
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  font-size: 28px;
}
.title {
  font-family: 'Roboto', sans-serif;
}
</style>
