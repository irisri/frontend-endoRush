<template>
  <div id="app">
    <header class="main-header">
      <h1 class="logo">
        Endorophin <span>r</span>ush
      </h1>
      <nav>
        <router-link to="/">Home</router-link>|
        <router-link to="/event">Event</router-link>|
        <router-link to="/login">Login</router-link>|
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import eventFilter from "@/components/event-filter.cmp.vue";

export default {
  name: "App",
  components: {
    eventFilter
  }
};
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
