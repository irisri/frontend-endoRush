<template>
  <div class="event-app">
    <evento-filter @setFilter="setFilter"></evento-filter>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
import eventList from "../components/event-list.cmp.vue";
import eventoFilter from "../components/evento-filter.cmp.vue";

export default {
  computed: {
    events() {
      return this.$store.getters.events;
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "updateFilterBy", filter: filterBy });
      this.$store.dispatch({ type: "loadEvents" });
    }
  },
  components: {
    eventList,
    eventoFilter
  },
  created() {
    this.$store.dispatch({ type: "loadEvents" });
  }
};
</script>

<style>
</style>