<template>
  <div class="event-app">
    <h1>Event App</h1>
    <event-filter @setFilter="setFilter"></event-filter>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
import eventList from "../components/event-list.cmp.vue";
import eventFilter from "../components/event-filter.cmp.vue";

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
    eventFilter
  },
  created() {
    this.$store.dispatch({ type: "loadEvents" });
  }
};
</script>

<style>
</style>