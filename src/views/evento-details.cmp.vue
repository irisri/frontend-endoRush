<template>
  <div v-if="eventoToShow" class="evento-details">
    <!-- <img v-if="eventoToShow.imgUrls[0]" :src="eventoToShow.imgUrls[0]"/> -->
    <!-- <img :src="http//res.cloudinary.com/do8gnvlal/image/upload/v1594639483/samples/landscapes/beach-boat.jpg"/> -->
    <h1>Toy Details:</h1>
    <div v-for="img in eventoToShow.imgUrls" :key="img">
      <img :src="img" />
    </div>
    <p>{{eventoToShow.imgUrls[0]}}</p>
    <p>{{eventoToShow.title}}</p>
    <p>{{eventoToShow.members}}</p>
    <p>{{eventoToShow.location}}</p>
    <p>{{eventoToShow.location.name}}</p>
    <p>{{eventoToShow.starttime}}</p>
    <!-- <div v-for="member in eventoToShow.members" :key="member">
      <span>{{evento.member.id}}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventoToShow: null
    };
  },
  async created() {
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.eventoToShow = this.$store.getters.evento;
    console.log("this.eventoToShow", this.eventoToShow);
  }
};
</script>

<style>
</style>
