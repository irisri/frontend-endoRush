<template class="main-layout">
  <div class="evento-app main-container">
    <evento-filter @setFilter="setFilter"></evento-filter>
    <evento-list :eventos="eventos" @removeEvento="removeEvento"></evento-list>
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
      this.$store.dispatch({ type: "removeEvent" });
    },
    removeEvento(eventoId) {
      console.log({type: 'removeEvento', eventoId});
      // this.$store.dispatch({type: 'removeEvento', eventoId});
    },
  },
  components: {
    eventoList,
    eventoFilter
  },
  created() {
    this.$store.dispatch({ type: "loadEventos" });
    console.log('app')

  }
};
</script>

<style>
</style>