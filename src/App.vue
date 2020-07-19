<template>
  <div id="app">
    <header class="main-header">
      <h1 class="logo">
        Endorphin <span>rush</span>
      </h1>
      <!-- <h3>Take charge of your body and you're life!</h3> -->
      <nav>
        <router-link to="/">Home</router-link>|
        <router-link to="/evento">Events</router-link>|
        <router-link to="/login">Login</router-link>|
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

</script>




<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
