<template>
  <div v-if="eventToShow" class="event-details">
    <h1>Toy Details:</h1>
  </div>
</template>

<script>
import { eventService } from "../services/eventService.js";

export default {
  data() {
    return {
      eventToShow: null
    };
  },
  methods: {
    loadEvent() {
      let { eventId } = this.$route.params;
      eventService.getById(eventId).then(event => (this.eventToShow = event));
    }
  },
  created() {
    this.loadEvent();
  }
};
</script>

<style>
</style>
