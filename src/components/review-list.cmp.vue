<template>
  <section class="review">
    <h3>Reviews ({{countReviews}})</h3>
    <ul class="review-list flex column">
      <li class="review-card" v-for="(review, index) in reviews" :key="index">
        <img :src="review.imgUrl" />
        <div class="review-detail">
          <h2>{{review.fullName}}</h2>
          <h5>
            <el-rate v-model="review.rate" disabled></el-rate>
            {{review.txt}}
          </h5>
        </div>
      </li>
    </ul>
    <button
      v-if="!showAddReview"
      class="show-add-review-btn"
      @click="showAddReview=!showAddReview"
    >Add Review</button>
    <div v-else class="add-review">
      <el-rate
        v-model="newReview.rate"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text
      ></el-rate>
      <input v-model="newReview.txt" placeholder="Type here..." />
      <button class="add-review-btn" @click="addReview()">Add</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddReview: false,
      newReview: { txt: "", rate: 0 }
    };
  },
  computed: {
    countReviews() {
      return this.reviews.length;
    }
  },
  methods: {
    addReview() {
      this.showAddReview = false;
      this.$emit("addReview", this.newReview);
    }
  },
  created() {
    console.log(this.reviews);
  }
};
</script>

<style>
</style>