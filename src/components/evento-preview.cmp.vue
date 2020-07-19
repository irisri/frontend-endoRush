<template>
  <div class="evento-preview flex-row">
    <carousel-slide :evento="evento" />
    <h3>{{ evento.title }}</h3>
    <!-- <img style="width:200px;height:150px;" :src="img" /> -->

    <p>location: {{ evento.location.name }}</p>
    <h4>at: {{timeToShow}}</h4>
    <h4>orgenised by {{ evento.owner.fullName }}</h4>

    <star-rating v-if="rate" :rate="this.rate"/>

    <el-button size="small" @click="removeEvento()">Delete event</el-button>
  </div>
</template>



<script>
import carouselSlide from "@/components/carousel-slide.cmp.vue";
import starRating from "@/components/star-rating.cmp.vue";

export default {
  name: "evento-preview",
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      img: this.evento.imgUrls[0],
      ownerUsr: "",
      rate: this.rateAvg
      // rate: this.rateAvg
    };
  },
  computed: {
    timeToShow() {
      //   return new Date(this.evento.starttime.getTime());
      return new Date(this.evento.starttime).toLocaleString();
    },
    rateAvg() {
      return (
        this.ownerUsr.reviews.reduce((a, b) => a.rate + b.rate) /
        this.ownerUsr.reviews.length
      );
    }
  },
  methods: {
    updateRate() {
      console.log("rateunrate", this.rateAvg); //this.rateAvg);
    },
    removeEvento() {
      this.$emit("removeEvento", this.evento.id);
    }
  },
  async created() {
    const userId = this.evento.owner.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.ownerUsr = _.cloneDeep(this.$store.getters.user);
      this.rate= this.rateAvg
      console.log('crate',this.rate)
      // return (this.ownerUsr = _.cloneDeep(this.$store.getters.user));
    } else {
      console.log("no id");
    }
  },
  components: {
    carouselSlide,
    starRating
  }
};

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.evento-preview {
  width: 230px;
  /* height: 260px; */
  border-radius: 15px;
}
div,
h4,
p {
  background-color: #fff8f0;
}

</style>