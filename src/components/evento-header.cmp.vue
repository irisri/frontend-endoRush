<template>
  <header class="main-header" :class="classObject" >
    <div class="screen" :class="classObject" @click.prevent="toggleMenu()"></div>

    <h1 class="logo" @click.prevent="$router.push(`/`).catch(()=>{});">
      Endorphin
      <span>rush</span>
    </h1>
    <h1 v-if="user">{{ msg.txt }}</h1>

    <!-- <div class="toggle-menu-screen" @click="closeMenu" :class="classObject"></div> -->

    <span class="btn-menu" @click.stop="toggleMenu">☰</span>
    <nav class="main-nav">
      <router-link to="/evento">Events</router-link>
      <span>|</span>
      <router-link to="/about">About</router-link>
      <span>|</span>
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
      required: false
    }
  },
  data() {
    return {
      msg: {},
      isOpenMenu: false
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    toggleMenu() {
      console.log("click btn");
      this.isOpenMenu = !this.isOpenMenu;
    },
    closeMenu() {
      this.isOpenMenu = false;
    }
  },
  async created() {
    SocketService.setup();
    SocketService.on("chat addMsg", _msg => {
      this.msg = _msg;
    });
    console.log(this.msg);
  },
  computed: {
    classObject() {
      return {
        "menu-open": this.isOpenMenu
      };
    }
  }
};
</script>

<style>
</style>