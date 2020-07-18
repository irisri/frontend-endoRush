<template>
  <section class>
    <h3>Reviews ({{countReviews}})</h3>
    <ul class="review-list flex">
      <li class="review-card" v-for="(review, index) in reviews" :key="index">
        <h5>{{review.txt}}</h5>
        <h5>{{review.rate}}</h5>
      </li>
    </ul>
    <button v-if="!showAddReview" class="show-add-review-btn" @click="showAddReview=!showAddReview">Add Review</button>
    <div v-else class="add-review">
      <input placeholder="Type here..." />
      <button class="add-review-btn"></button>
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
      showAddReview: false
    };
  },
  computed: {
    countReviews() {
      return this.reviews.length;
    }
  }
};
</script>

<style>
</style>