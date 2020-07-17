<template>
  <div v-if="eventoToShow" class="evento-details">
    <!-- <img v-if="eventoToShow.imgUrls[0]" :src="eventoToShow.imgUrls[0]"/> -->
    <!-- <img :src="http//res.cloudinary.com/do8gnvlal/image/upload/v1594639483/samples/landscapes/beach-boat.jpg"/> -->
    <h1>Toy Details:</h1>
    <p>{{eventoToShow.imgUrls}}</p>
    <p>{{eventoToShow.title}}</p>
    <p>{{eventoToShow.members}}</p>
    <p>{{eventoToShow.location}}</p>
    <!-- <p>{{eventoToShow.location.name}}</p> -->
    <p>{{eventoToShow.starttime}}</p>
    <!-- <div v-for="member in members" :key="evento.member.id">
      <span>{{evento.member.id}}</span>
      </div>  -->
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
      eventoService
        .getById(eventoId)
        .then(evento => (this.eventoToShow = evento));
    }
  },
  async created() {
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.eventoToShow = this.$store.getters.evento;
    console.log('this.eventoToShow', this.eventoToShow);
  }
};
</script>

<style>
</style>
