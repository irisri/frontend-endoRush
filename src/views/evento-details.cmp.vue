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
        <review-list :reviews="owner.reviews" @addReview="addReview"></review-list>
        <p v-if="!owner.reviews">Be the first to comment..</p>
      </div>

      <evento-join
        :evento="evento"
        v-if="owner"
        :owner="owner"
        :loggedInUser="loggedInUser"
        @addMember="addMember()"
      />
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
import eventoChat from "@/components/evento-chat.cmp.vue";

export default {
  data() {
    return {
      evento: null,
      owner: "",
      loggedInUser: "",
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
    SocketService.on("notify new register", (msg) => {
      const toastPayload = {msg, icon: "how_to_reg"}
      toastService.toastMsg(this, toastPayload);
    });
  },
  methods: {
    addMember() {
      console.log('hihi');
      const loggedInUser = this.loggedInUser;
      this.evento.members.push(loggedInUser);
      this.$store.dispatch({ type: "addMember", evento: this.evento });

      //socket to evento page
      const miniEvento = {_id: this.evento._id, title: this.evento.title}
      const payload = {user: loggedInUser, evento: miniEvento};
      SocketService.emit("user register to evento", payload);

      //socket to owner page
      payload.ownerId = this.owner._id;
      payload.registerTime = Date.now();
      SocketService.emit("notification to evento owner", payload);
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
  },
  destroyed() {
    SocketService.terminate();
  },
  components: {
    memberList,
    reviewList,
    eventoJoin,
    eventoDetailsInfo,
    eventoDetailsHeader,
    eventoChat,
  },
};
</script>
