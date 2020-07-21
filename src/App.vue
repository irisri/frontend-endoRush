<template>
  <div id="app" class="main-layout">
    <evento-header :user="loggedInUser" @logout="logout"/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <evento-footer class="footer-container" />
  </div>
</template>

<script>
// @ is an alias to /src
import eventoHeader from "../src/components/evento-header.cmp.vue";
import eventoFooter from "../src/components/evento-footer.cmp.vue";

export default {
  name: "App",
  components: {
    eventoHeader,
    eventoFooter
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    }
  }
};
</script>

