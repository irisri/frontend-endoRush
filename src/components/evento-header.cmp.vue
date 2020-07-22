<template>
  <header class="main-header">
    <h1 class="logo">
      Endorphin
      <span>rush</span>
    </h1>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/evento">Events</router-link>|
      <router-link to="/about">About</router-link>|
      <!-- <online-msg v-if="user"/> -->
      <router-link v-if="user" v-bind:to="`/user/details/${user._id}`">Profile</router-link>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
import onlineMsg from "@/components/online-msg.cmp.vue"
export default {
  props: {
    user: {
      type: Object,
      required: false
    }
  },
    components: {
    onlineMsg
  }
};
</script>

<style>
</style>