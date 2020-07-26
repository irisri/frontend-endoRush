<template class="main-layout">
  <div class="evento-app main-container">
    <filter-and-add @setFilter="setFilter"></filter-and-add>
    <evento-list v-if="!isLoading" :eventos="eventos" @removeEvento="removeEvento"></evento-list>
     <img v-else src="https://1.bp.blogspot.com/-yIhXlQfYN1E/WMksG192LLI/AAAAAAAAA9w/txsqdQfykVksDEFshayeN54c0Gu6C3AAwCLcB/s1600/glow.gif" alt="Loading...">
  </div>
</template>

<script>
import eventoList from "../components/evento-list.cmp.vue";
import filterAndAdd from "../components/filter-and-add.cmp.vue";

export default {
  computed: {
    eventos() {
      return this.$store.getters.eventos;
    },
        isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "updateFilterBy", filter: _.cloneDeep(filterBy) });
      this.$store.dispatch({ type: "loadEventos" });
    },
    removeEvento(eventoId) {
      console.log({ type: "removeEvento", eventoId });
      this.$store.dispatch({type: 'removeEvento', eventoId});
    }
  },
  components: {
    eventoList,
    filterAndAdd
  },
  created() {
    this.$store.dispatch({ type: "loadEventos" });
    this.setFilter = _.debounce(this.setFilter, 500);
  }
};
</script>

<style>
</style>