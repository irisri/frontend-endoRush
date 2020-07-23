
<template>
  <section v-if="userToShow" class="user-details main-container">
     <h1>{{ msg.txt }}</h1>
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
import reviewList from "../components/review-list.cmp.vue";
import SocketService from "@/services/SocketService";
export default {
  name: "user-details",
  data() {
    return {
      userToShow: "",
      msg: {},
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

      SocketService.emit("to user", this.evento.owner._id);
      SocketService.on("chat addMsg2", (_msg) => {
        console.log(_msg)
      this.msg = _msg;
    });
    console.log(this.msg);


    }
  },
  components: {
    reviewList
  }
};
</script>

<style></style>
