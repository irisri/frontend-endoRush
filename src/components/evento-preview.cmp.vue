<template>
  <div class="evento-preview">
    <el-carousel indicator-position="outside" :autoplay="false">
      <el-carousel-item v-for="url in evento.imgUrls" :key="url">
        <img :src="url" />
      </el-carousel-item>
    </el-carousel>

    <h3>{{ evento.title }}</h3>

    <p>location: {{ evento.location.name }}</p>
    <h4>at: {{timeToShow}}</h4>
    <h4 class="owner" @click.stop="$router.push(`/user/details/${evento.owner._id}`)">orgenised by {{ evento.owner.userName }}</h4>

    <div class="rate-container" @click.stop v-if="rate">
      <span class="star">&#9733; <span class="rate">{{this.rate}}</span></span>
    </div>
  </div>
</template>



<script>
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
      return new Date(this.evento.startTime).toLocaleString();
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
    }
  },
  async created() {
    const userId = this.evento.owner._id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.ownerUsr = _.cloneDeep(this.$store.getters.user);
      this.rate = this.rateAvg;
      // console.log("crate", this.rate);
      // console.log("len:", this.ownerUsr.reviews.length);

      // return (this.ownerUsr = _.cloneDeep(this.$store.getters.user));
    } else {
      console.log("no id");
    }
  },
  components: {
    starRating
  }
};

</script>
