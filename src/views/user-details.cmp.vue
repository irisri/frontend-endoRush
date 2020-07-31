
<template>
  <section v-if="userPageToShow" class="user-details main-container flex">
    <div class="right">
      <h1>{{ userPageToShow.fullName }}</h1>
      <img :src="userPageToShow.imgUrl" />
      <h4>{{ userPageToShow.bio }}</h4>
    </div>
    <div class="left">
      <review-list v-if="userPageToShow.reviews" :reviews="userPageToShow.reviews" :isOwner="isOwner" @addReview="addReview"></review-list>
    </div>
  </section>
</template>

<script>
import reviewList from "../components/review-list.cmp.vue";
import SocketService from "@/services/SocketService";
import toastService from "@/services/toastService";

export default {
  name: "user-details",
  data() {
    return {
      userPageToShow: "",
    };
  },
  computed: {
    isOwner() {
      const loggedInUser = this.$store.getters.loggedInUser;
      if (!loggedInUser) return;
      return this.userPageToShow._id === loggedInUser._id;
    },
  },
  methods: {
    addReview(newReview) {
      const loggedInUser = this.$store.getters.loggedInUser;
      newReview.userId = loggedInUser._id;
      newReview.userName = loggedInUser.userName;
      newReview.imgUrl = loggedInUser.imgUrl;
      this.owner.reviews.push(newReview);
      this.$store.dispatch({ type: "addReview", user: this.owner });
    }
  },
  async created() {
    const userId = this.$route.params.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.userPageToShow = this.$store.getters.user;
      if (this.isOwner) {
        SocketService.setup();
  
        const payload = {ownerId: this.userPageToShow._id}
        SocketService.emit("notification to evento owner", payload);

        SocketService.on("notify owner", (msg) => {
          const payload = { msg, icon: "how_to_reg" };
          toastService.toastMsg(this, payload);
        });
      }
    }
  },
    destroyed() {
    SocketService.terminate();
  },
  components: {
    reviewList,
  },
};
</script>
