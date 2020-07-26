<template>
  <div>
    <div class="title">
      <h3>{{ evento.title }}</h3>
      <el-rate v-if="reviews" v-model="rateAvg" disabled>></el-rate>
    </div>
    <div class="img-wrapper">
      <div class="imgs-details">
        <img
          v-for="(img, index) in evento.imgUrls"
          :key="img"
          :src="img"
          :class="`image-${index+1}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evento-details-header",
  props: {
    evento: {
      type: Object,
      required: true,
    },
    reviews: {
        type: Array,
        required: true,
    }
  },
  computed: {
    rateAvg() {
      if (!this.reviews) return;
      const avg =
        this.reviews.reduce((a, b) => a + b.rate, 0) /
        this.reviews.length;
      return parseFloat(avg.toFixed(0));
    },
  }
};
</script>