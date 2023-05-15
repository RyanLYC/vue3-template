<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="aside"></div>
    <div class="content">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <div class="font">Vite + Vue</div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100%;

  .aside {
    width: 240px;
    height: 100%;
    background-color: pink;
  }
}

.logo {
  position: relative;
  width: 100px;
  height: 100px;
  padding: 10px;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.font {
  font-size: 14px;
}
</style>
