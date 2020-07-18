<template>
  <div v-if="eventoToShow" class="evento-details">
    <div class="imgs-details" >
      <img v-for="img in eventoToShow.imgUrls" :key="img" style="width:200px;height:150px;" :src="img" />
    </div>
    <h3>{{ eventoToShow.title }}</h3>
    <div class="info">
      <p>location: {{ eventoToShow.location.name }}</p>
      <h4>at: {{timeToShow}}</h4>
      <h4>orgenised by {{ eventoToShow.owner }}</h4>
      <p>{{eventoToShow.title}}</p>
      <p>{{eventoToShow.members}}</p>
    </div>
    <div class="members">
    </div>
    <div class="join">
      <button @click="addMember()">Join</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventoToShow: null
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.eventoToShow.starttime).toLocaleString();
    }
  },
  async created() {
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.eventoToShow = this.$store.getters.evento;
    console.log("this.eventoToShow", this.eventoToShow);
  },
  methods: {
   addMember() {
     this.$store.dispatch({ type: "addMember", evento });
   }
  }
};
</script>

<style>
</style>
