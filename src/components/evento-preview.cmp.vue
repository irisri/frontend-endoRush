<template>
  <div class="evento-preview">
    <el-carousel indicator-position="outside" :autoplay="false">
      <el-carousel-item v-for="(url, index) in evento.imgUrls" :key="index">
        <img-carousel-lazy :url="url" />
      </el-carousel-item>
    </el-carousel>
    <div class="preview-content flex column justify-start">
      <div class="owner-rate flex space-between">
        <div class="owner flex">
          <img :src="ownerUsr.imgUrl" />
          <p>{{ ownerUsr.fullName }}</p>
        </div>
        <div class="rate flex align-center" v-if="ownerUsr.reviews">
          <p class="star">
            <i class="el-icon-star-on"></i>
          </p>
          <p class="avg" v-if="this.ownerUsr.reviews">{{rateAvg}}</p>
          <p class="count">&nbsp;({{ownerUsr.reviews.length}})</p>
        </div>
      </div>
      <div class="details">
        <h3>{{ evento.title }}</h3>
        <p>{{ evento.location.name }}</p>
        <div class="time-member flex space-between">
          <h4>{{timeToShow}}</h4>
          <div class="members flex align-center">
            <p class="member">
              <i class="el-icon-s-custom"></i>
            </p>&nbsp;
            <p>{{evento.members.length}}/{{evento.capacity}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import imgCarouselLazy from "./img-carousel-lazy";

const moment = require("moment");
export default {
  name: "evento-preview",
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      img: this.evento.imgUrls[0],
      ownerUsr: "",
    };
  },
  computed: {
    timeToShow() {
      return moment(this.evento.startTime).format("l");
    },
    rateAvg() {
      if (!this.ownerUsr.reviews) return 0;
      const avg =
        this.ownerUsr.reviews.reduce((a, b) => a + b.rate, 0) /
        this.ownerUsr.reviews.length;
      return avg.toFixed(0);
    },
    spotsLeft() {
      return this.evento.capacity - this.evento.members.length;
    },
  },
  async created() {
    const userId = this.evento.owner._id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.ownerUsr = _.cloneDeep(this.$store.getters.user);
      this.rate = this.rateAvg;
    }
  },
  components: {
    imgCarouselLazy,
  },
};
</script>
