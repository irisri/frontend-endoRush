<template>
  <div v-if="evento" class="evento-details main-container">
    <evento-details-header :evento="evento" v-if="owner.reviews" :reviews="owner.reviews" />

    <div class="details-content flex">
      <div class="info">
        <evento-details-info
          :evento="evento"
          v-if="owner"
          :owner="owner"
          @removeEvento="removeEvento()"
        />
        <member-list :members="evento.members" :capacity="evento.capacity"></member-list>
        <review-list v-if="owner.reviews" :reviews="owner.reviews" @addReview="addReview"></review-list>
        <p v-else>Be the first to comment..</p>
      </div>

      <div class="join">
        <evento-join
          :evento="evento"
          v-if="owner"
          :owner="owner"
          :loggedInUser="loggedInUser"
          @addMember="addMember()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import memberList from "../components/member-list.cmp.vue";
import reviewList from "../components/review-list.cmp.vue";
import eventoDetailsHeader from "../components/evento-details-header.cmp.vue";
import eventoDetailsInfo from "../components/evento-details-info.cmp.vue";
import eventoJoin from "../components/evento-join.cmp.vue";
import SocketService from "@/services/SocketService";
import toastService from "@/services/toastService";

export default {
  data() {
    return {
      evento: null,
      owner: "",
      payload: {},
      loggedInUser: "",
      msg: "",
      isJoined: false,
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.evento.startTime).toLocaleString();
    },
    spotsLeft() {
      const spots = this.evento.capacity - this.evento.members.length;
      if (!spots) return "No";
      return spots;
    },
  },
  async created() {
    // evento
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.evento = _.cloneDeep(this.$store.getters.evento);
    // loggedInUser
    this.loggedInUser = this.$store.getters.loggedInUser;
    // reviews by owner
    const userId = this.evento.owner._id;
    await this.$store.dispatch({ type: "getUserById", userId });
    this.owner = _.cloneDeep(this.$store.getters.user);
    this.title = this.evento.title;
    // socket
    SocketService.setup();
    SocketService.emit("of evento", this.evento._id);
    SocketService.emit("to user", this.evento.owner._id);
    SocketService.on("chat addMsg", (_msg) => {
      if (!this.isJoined) {
        toastService.resetToast(this);
        this.payload = { msg: _msg + "xx", icon: "how_to_reg" };
        toastService.toastMsg(this, this.payload);
        this.isJoined = false;
      }
    });
  },
  methods: {
    addMember() {
      const user = this.loggedInUser;
      if (!user) {
        this.payload.msg = "Please log in";
        this.payload.icon = "block";
        toastService.toastMsg(this, this.payload);
        return setTimeout(() => this.$router.push(`/login`), 1000);
      }
      if (this.evento.members.find((member) => member._id === user._id)) {
        this.payload.msg = "You are already registered for the event";
        this.payload.icon = "how_to_reg";
        console.log("already");
        return toastService.toastMsg(this, this.payload);
      }
      if (!this.evento.members.find((member) => member._id === user._id)) {
        if (this.spotsLeft === "No") {
          this.payload.msg = "No spots left";
          this.payload.icon = "block";
          toastService.toastMsg(this, this.payload);
        } else {
          this.isJoined = true;
          this.evento.members.push(user);
          this.$store.dispatch({ type: "addMember", evento: this.evento });
          this.payload.msg = "You have successfully registered for this event";
          this.payload.icon = "how_to_reg";
          toastService.toastMsg(this, this.payload);

          var sentMsg = `${user.userName} just joined: ${this.evento.title} `;
          this.sendMsg(sentMsg);
        }

        return;
      }
    },
    removeEvento(eventoId) {
      this.$store.dispatch({
        type: "removeEvento",
        eventoId: this.evento._id,
      });
      this.$router.push(`/`);
    },
    addReview(newReview) {
      const user = this.loggedInUser;
      newReview.userId = user._id;
      newReview.userName = user.userName;
      newReview.imgUrl = user.imgUrl;
      this.owner.reviews.push(newReview);
      this.$store.dispatch({ type: "addReview", user: this.owner });
    },
    sendMsg(sentMsg) {
      setTimeout(function () {
        SocketService.emit("chat newMsg", sentMsg);
        this.payload = {};
      }, 500);
    },
  },
  destroyed() {
    SocketService.off("chat addMsg", this.addMsg);
    SocketService.terminate();
  },
  components: {
    memberList,
    reviewList,
    eventoJoin,
    eventoDetailsInfo,
    eventoDetailsHeader,
  },
};
</script>

<style>
</style>
