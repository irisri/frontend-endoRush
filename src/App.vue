<template>
  <div id="app" class="main-layout">
    <evento-header />
    <router-view />
    <evento-footer class="footer-container"/>
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
  }
};
</script>

