<template>
  <header class="main-header">
    <h1 class="logo">
      Endorphin
      <span>rush</span>
    </h1>
    <h1 v-if="user">{{ msg.txt }}</h1>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/evento">Events</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link v-if="user" :to="`/user/details/${user._id}`">Profile</router-link>
      <span v-if="user">|</span>
      <router-link v-if="user" @click.native="logout()" to="/">Logout</router-link>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
import SocketService from "@/services/SocketService";
export default {
  props: {
    user: {
      type: Object,
      required: false,
      msg: {},
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    }
  },
  async created(){

     SocketService.setup();
     
     SocketService.on('chat addMsg', _msg=>{this.msg=_msg})
     console.log(this.msg)

  }
};
</script>

<style>
</style>