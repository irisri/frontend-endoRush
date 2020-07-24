<template>
  <div v-if="evento" class="evento-details main-container">
    <div class="title">
      <h3>{{ evento.title }}</h3>
      <el-rate v-if="owner.reviews" v-model="rateAvg" disabled>></el-rate>
    </div>
    <div class="img-wrapper">
      <div class="imgs-details">
        <img
          v-for="(img, index) in evento.imgUrls"
          :key="img"
          :src="img"
          :class="`image-${index+1}`"
        />
      </div>
    </div>

    <div class="details-content flex">
      <div class="info">
        <p class="capacity">{{spotsLeft}} spots left</p>
        <div class="owner flex space-between">
          <div class="flex space-between column">
            <h3>Orgenised by {{ evento.owner.userName }}</h3>
            <p class="bio">{{ owner.bio }}</p>
          </div>
          <img :src="evento.owner.imgUrl" />
        </div>
        <div v-if="isOwner">
          <el-button
            size="small"
            @click="$router.push(`/evento/edit/${evento._id}`)"
          >Edit event</el-button>
          <el-button size="small" @click="removeEvento()">Delete event</el-button>
        </div>
        <p class="desc">{{evento.description}}</p>
        <div class="category">
          <p>Category: {{evento.category}}</p>
          <ul class="tags-list flex clean-list" v-if="evento.tags">
            <li v-for="(tag,index) in evento.tags" :key="index">{{tag}}</li>
          </ul>
        </div>

        <member-list :members="evento.members" :capacity="evento.capacity"></member-list>
        <review-list v-if="owner.reviews" :reviews="owner.reviews" @addReview="addReview"></review-list>
        <p v-else>Be the first to comment..</p>
      </div>

      <div class="join">
        <p>
          <i class="el-icon-date"></i>
          &nbsp;&nbsp;{{ evento.startTime | moment("dddd, MMMM Do YYYY") }}
        </p>
        <p>
          <i class="el-icon-time"></i>
          &nbsp;&nbsp;{{ evento.startTime | moment("h:mm a") }}
        </p>
        <p>
          <i class="el-icon-map-location"></i>
          {{ evento.location.name }}
        </p>
        <p v-if="owner.reviews">
          <i class="el-icon-star-on"></i>
          {{rateAvg}} ({{owner.reviews.length}})
        </p>
        <button @click="addMember()">I want to join</button>
      </div>
    </div>
    <h1>{{ msg.txt }}</h1>
  </div>
</template>

<script>
import memberList from "../components/member-list.cmp.vue";
import reviewList from "../components/review-list.cmp.vue";
import SocketService from "@/services/SocketService";
import toastService from "@/services/toastService";

export default {
  data() {
    return {
      evento: null,
      owner: "",
      title: "",
      _userName: "",
      msg: {},
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.evento.startTime).toLocaleString();
    },
    rateAvg() {
      if (!this.owner.reviews) return;
      const avg =
        this.owner.reviews.reduce((a, b) => a + b.rate, 0) /
        this.owner.reviews.length;
      return parseFloat(avg.toFixed(0));
    },
    spotsLeft() {
      return this.evento.capacity - this.evento.members.length;
    },
    isOwner() {
      const user = this.$store.getters.loggedInUser;
      if (!user) return;
      return this.evento.owner._id === user._id;
    },
  },
  async created() {
    // evento
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.evento = _.cloneDeep(this.$store.getters.evento);
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
      this.msg = _msg;
      const payload = {msg: _msg, icon: "how_to_reg"};
      toastService.toastMsg(this, payload);

      // setTimeout(function () {
      //   this.msg = "";
      // }, 3000);
    });
    console.log(this.msg);
  },
  methods: {
    addMember() {
      const user = this.$store.getters.loggedInUser;
      const payload = {};
      if (!user) {
        (payload.msg = "Please log in"), (payload.icon = "block");
        toastService.toastMsg(this, payload);
        return setTimeout(() => this.$router.push(`/login`), 1000);
        // return console.log('nope')
      }
      if (this.evento.members.find((member) => member._id === user._id)) {
        payload.msg = "You are already registered for the event";
        payload.icon = "how_to_reg";
        return toastService.toastMsg(this, payload);
      }
      if (!this.evento.members.find((member) => member._id === user._id)) {
        const payload = {};
        if (this.spotsLeft === 0) {
          (payload.msg = "No spots left"), (payload.icon = "block");
        } else {
          this.evento.members.push(user);
          this.$store.dispatch({ type: "addMember", evento: this.evento });
          this._userName = user.userName;
          var sentMsg = {
            from: "Me",
            txt: `${user.userName} just joined: ${this.title} `,
          };
          this.sendMsg(sentMsg);
          payload.msg = "You have successfully registered for this event";
          payload.icon = "how_to_reg";
        }
        return toastService.toastMsg(this, payload);
      }

      //socket msg
      // var sentMsg = {
      //   from: "Me",
      //   txt: `${this._userName} just joined: ${this.title} `,
      // };
      // this.sendMsg(sentMsg);
    },
    removeEvento(eventoId) {
      this.$store.dispatch({
        type: "removeEvento",
        eventoId: this.evento._id,
      });
      this.$router.push(`/`);
    },
    addReview(newReview) {
      const user = this.$store.getters.loggedInUser;
      newReview.userId = user._id;
      newReview.userName = user.userName;
      newReview.imgUrl = user.imgUrl;
      this.owner.reviews.push(newReview);
      this.$store.dispatch({ type: "addReview", user: this.owner });
    },
    sendMsg(sentMsg) {
      console.log("Sending", sentMsg);
      SocketService.emit("chat newMsg", sentMsg);
      // SocketService.emit("userNewMsg", sentMsg);
      this.msg = { from: "Me", txt: "" };
    },
  },
  destroyed() {
    SocketService.off("chat addMsg", this.addMsg);
    SocketService.terminate();
  },
  components: {
    memberList,
    reviewList,
  },
};
</script>

<style>
</style>
