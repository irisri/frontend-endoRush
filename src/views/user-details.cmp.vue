
<template>
<<<<<<< HEAD
  <section v-if="userToShow" class="user-details" >
    <online-msg/>
=======
  <section v-if="userToShow" class="user-details main-container">
>>>>>>> ba147ffe4acb96ac8e4590cd772e40b9e02eb323
    <h1>{{ userToShow.fullName }}</h1>
    <img :src="userToShow.imgUrl" />
    <h3>About...</h3>
    <h4>{{ userToShow.bio }}</h4>
    <review-list v-if="userToShow.reviews" :reviews="userToShow.reviews"></review-list>
    <!-- <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <h2>{{review.fullName}}</h2>
        <el-rate v-model="review.rate" disabled></el-rate>
        <h2>{{review.txt}}</h2>
      </li>
    </ul>-->
  </section>
</template>

<script>
<<<<<<< HEAD
import onlineMsg from "@/components/online-msg.cmp.vue"

=======
import reviewList from "../components/review-list.cmp.vue";
>>>>>>> ba147ffe4acb96ac8e4590cd772e40b9e02eb323
export default {
  name: "user-details",
  data() {
    return {
      userToShow: ""
      // reviews: []
    };
  },
  async created() {
    const userId = this.$route.params.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.userToShow = this.$store.getters.user;
      // this.reviews = this.userToShow.reviews;

      return this.userToShow;
    }
  },
<<<<<<< HEAD
    components: {

    onlineMsg
=======
  components: {
    reviewList
>>>>>>> ba147ffe4acb96ac8e4590cd772e40b9e02eb323
  }
};
</script>

<style></style>
