<template>
  <header class="main-header">
    <h1 class="logo" @click.prevent="$router.push(`/`).catch(()=>{});">
      <!-- <h1 class="logo"> -->
      <!-- <router-link to="/"> -->
      Endorphin
      <span>rush</span>
      <!-- </router-link> -->
    </h1>
    <h1 v-if="user">{{ msg.txt }}</h1>
    <nav>
      <!-- <router-link to="/">Home</router-link>| -->
      <router-link to="/evento">Events</router-link>|
      <router-link to="/about">About</router-link>|
<<<<<<< HEAD
      <!-- <online-msg v-if="user"/> -->
      <router-link v-if="user" v-bind:to="`/user/details/${user._id}`">Profile</router-link>
=======
      <router-link v-if="user" :to="`/user/details/${user._id}`">Profile</router-link>
      <span v-if="user">|</span>
      <router-link v-if="user" @click.native="logout()" to="/">Logout</router-link>
>>>>>>> ba147ffe4acb96ac8e4590cd772e40b9e02eb323
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
<<<<<<< HEAD
import onlineMsg from "@/components/online-msg.cmp.vue"
=======
import SocketService from "@/services/SocketService";
>>>>>>> 3c0e2fc8e42d713d7e115e0596e29f1b882fe32b
export default {
  props: {
    user: {
      type: Object,
      required: false
    }
  },
<<<<<<< HEAD
<<<<<<< HEAD
    components: {
    onlineMsg
=======
=======
  data() {
    return {
      msg: {}
    };
  },
>>>>>>> 3c0e2fc8e42d713d7e115e0596e29f1b882fe32b
  methods: {
    logout() {
      this.$emit("logout");
    }
<<<<<<< HEAD
>>>>>>> ba147ffe4acb96ac8e4590cd772e40b9e02eb323
=======
  },
  async created() {
    SocketService.setup();
    SocketService.on("chat addMsg", _msg => {
      this.msg = _msg;
    });
    console.log(this.msg);
>>>>>>> 3c0e2fc8e42d713d7e115e0596e29f1b882fe32b
  }
};
</script>

<style>
</style>