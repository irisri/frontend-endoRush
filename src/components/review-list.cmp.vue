<template>
  <section class="reviews">
    <div class="review-header flex space-between align-center rush">
      <h3>Reviews ({{countReviews}})</h3>
      <el-button
        v-if="!showAddReview & !isOwner"
        class="show-add-review-btn"
        @click="showAddReview=!showAddReview"
      >Add Review</el-button>
    </div>

    <ul class="review-list flex column clean-list">
      <li v-if="showAddReview" class="add-review">
        <el-rate
          v-model="newReview.rate"
          :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
          show-text
        ></el-rate>
        <el-input
          type="textarea"
          v-model="newReview.txt"
          placeholder="Type here..."
          :autosize="{ minRows: 2, maxRows: 6}"
        ></el-input>
        <el-button class="add-review-btn" @click="addReview()">Add</el-button>
      </li>
      <li class="review-card" v-for="(review, index) in reviews" :key="index">
        <img :src="review.imgUrl" />
        <div class="review-detail">
          <h2>{{review.userName}}</h2>
          <el-rate v-model="review.rate" disabled></el-rate>
          <p>{{review.txt}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      showAddReview: false,
      newReview: { txt: "", rate: 0 },
    };
  },
  computed: {
    countReviews() {
      return this.reviews.length;
    },
  },
  methods: {
    addReview() {
      this.showAddReview = false;
      this.$emit("addReview", this.newReview);
    },
  }
};
</script>

<style>
</style>