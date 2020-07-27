<template>
  <header class="main-header" :class="classObject">
    <div class="screen" :class="classObject" @click.prevent="toggleMenu()"></div>

    <router-link to="/">
      <h1 class="logo">
        Endorphin
        <span>rush</span>
      </h1>
    </router-link>
    <h1 v-if="user">{{ msg.txt }}</h1>

    <span class="btn-menu material-icons" @click.stop="toggleMenu">menu</span>
    <nav class="main-nav" @click.stop="isOpenMenu= false">
      <router-link v-if="user" class="new-event" to="/evento/edit">Create new event</router-link>
      <router-link to="/evento">Events</router-link>
      <span>|</span>
      <router-link to="/about">About</router-link>
      <span>|</span>
      <router-link v-if="user" @click.native="logout()" to="/login">Logout</router-link>
      <span v-if="user">|</span>
      <router-link v-if="user" :to="`/user/details/${user._id}`" class="profile">
        <img :src="user.imgUrl" alt="Profile" />
      </router-link>
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
    },
  },
  data() {
    return {
      msg: {},
      isOpenMenu: false,
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    closeMenu() {
      this.isOpenMenu = false;
    },
  },
  async created() {
    SocketService.setup();
    SocketService.on("chat addMsg", (_msg) => {
      this.msg = _msg;
    });
  },
  computed: {
    classObject() {
      return {
        "menu-open": this.isOpenMenu,
      };
    },
  },
};
</script>

