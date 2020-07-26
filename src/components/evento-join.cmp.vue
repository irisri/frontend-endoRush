<template>
  <div>
    <!-- <p>
      <i class="el-icon-date"></i>
      &nbsp;&nbsp;{{ startTime | moment("dddd, MMMM Do YYYY") }}
    </p> -->
    <!-- <p>
      <i class="el-icon-time"></i>
      &nbsp;&nbsp;{{ startTime | moment("h:mm a") }}
    </p> -->
    <p>
      <i class="el-icon-map-location"></i>
      {{ location }}
    </p>
    <p v-if="reviews">
      <i class="el-icon-star-on"></i>
      {{rateAvg}} ({{reviews.length}})
    </p>
    <button @click="addMember()">I want to join</button>
  </div>
</template>

<script>
export default {
    props: [startTime, location, reviews],
  computed: {
    rateAvg() {
      if (!this.owner.reviews) return;
      const avg =
        this.owner.reviews.reduce((a, b) => a + b.rate, 0) /
        this.owner.reviews.length;
      return parseFloat(avg.toFixed(0));
    },
  },
  methods: {
      addMember() {
          this.$emit("logout");
      },
  },
  created() {
      console.log(this.startTime)
  }
};
</script>