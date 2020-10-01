<template>
  <div id="app">
    <div class="w">
      <router-view/>
    </div>
  </div>
</template>

<style>
*{
  padding:0px;
  margin:0px;
}
html,body{
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.w{
  width: 80%;
  margin: 80px auto;
}
</style>
