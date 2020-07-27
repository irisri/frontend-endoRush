
<template>
  <section v-if="userToShow" class="user-details main-container flex">
    <div class="right">
      <h1>{{ userToShow.fullName }}</h1>
      <img :src="userToShow.imgUrl" />
      <h4>{{ userToShow.bio }}</h4>
    </div>
    <div class="left">
      <review-list v-if="userToShow.reviews" :reviews="userToShow.reviews" :isOwner="isOwner" @addReview="addReview"></review-list>
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
      userToShow: "",
    };
  },
  computed: {
    isOwner() {
      const user = this.$store.getters.loggedInUser;
      if (!user) return;
      return this.userToShow._id === user._id;
    },
  },
  methods: {
    addReview(newReview) {
      const user = this.$store.getters.loggedInUser;
      newReview.userId = user._id;
      newReview.userName = user.userName;
      newReview.imgUrl = user.imgUrl;
      this.owner.reviews.push(newReview);
      this.$store.dispatch({ type: "addReview", user: this.owner });
    }
  },
  async created() {
    const userId = this.$route.params.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.userToShow = this.$store.getters.user;
      SocketService.setup();
      SocketService.emit("to user", this.userToShow._id);
      SocketService.on("sentMsg", (_msg) => {
        const payload = { msg: _msg, icon: "how_to_reg" };
        toastService.toastMsg(this, payload);
        return this.userToShow;
      });
    }
  },
    destroyed() {
    SocketService.off("sentMsg", this.addMsg);
    SocketService.terminate();
  },
  components: {
    reviewList,
  },
};
</script>

<style></style>
