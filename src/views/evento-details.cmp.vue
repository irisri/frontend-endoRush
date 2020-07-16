<template>
  <div v-if="eventoToShow" class="evento-details">
    <h1>Toy Details:</h1>
    <h1>Toy Details:</h1>
    <h1>Toy Details:</h1>
  </div>
</template>

<script>
import { eventoService } from "../services/eventoService.js";

export default {
  data() {
    return {
      eventoToShow: null
    };
  },
  methods: {
    loadEvento() {
      let { eventoId } = this.$route.params;
      eventoService.getById(eventoId).then(evento => (this.eventoToShow = evento));
    }
  },
  created() {
    this.loadEvento();
  }
};
</script>

<style>
</style>
