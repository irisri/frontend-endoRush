<template>
  <div class="evento-app">
    <evento-filter @setFilter="setFilter"></evento-filter>
    <evento-list :eventos="eventos"></evento-list>
  </div>
</template>

<script>
import eventoList from "../components/evento-list.cmp.vue";
import eventoFilter from "../components/evento-filter.cmp.vue";

export default {
  computed: {
    eventos() {
      return this.$store.getters.eventos;
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "updateFilterBy", filter: filterBy });
      this.$store.dispatch({ type: "loadEventos" });
    }
  },
  components: {
    eventoList,
    eventoFilter
  },
  created() {
    this.$store.dispatch({ type: "loadEventos" });
  }
};
</script>

<style>
</style>