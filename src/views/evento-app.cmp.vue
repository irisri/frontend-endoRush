<template class="main-layout">
  <div class="evento-app main-container">
    <filter-and-add @setFilter="setFilter"></filter-and-add>
    <evento-list :eventos="eventos" @removeEvento="removeEvento"></evento-list>
  </div>
</template>

<script>
import eventoList from "../components/evento-list.cmp.vue";
import filterAndAdd from "../components/filter-and-add.cmp.vue";

export default {
  computed: {
    eventos() {
      return this.$store.getters.eventos;
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