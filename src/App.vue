<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FCF3E3;
}

.container {
  flex-grow: 1;
  background-color: #FCF3E3;
}
</style>
