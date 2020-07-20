<template>
  <div v-if="evento" class="evento-details main-container">
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
        <h3 class="title">{{ evento.title }}</h3>
        <p class="capacity">{{spotsLeft()}} spots left</p>
        <div class="owner flex">
          <img :src="evento.owner.imgUrl" />
          <div>
            <p>Orgenised by</p>
            <h3>{{ evento.owner.userName }}</h3>
          </div>
        </div>
        <el-button size="small" @click="$router.push(`/evento/edit/${evento._id}`)">Edit event</el-button>
        <el-button size="small" @click="removeEvento()">Delete event</el-button>

        <p>{{evento.title}}</p>
        <p class="desc">{{evento.description}}</p>
        <member-list :members="evento.members"></member-list>
        <review-list v-if="owner.reviews" :reviews="owner.reviews" @addReview="addReview"></review-list>
        <p v-else>Be the first to comment..</p>
        <!-- <review-list :reviews="[1,2,3]"></review-list> -->
      </div>

      <div class="join">
        <i class="el-icon-time">  {{timeToShow}}</i>
        <i class="el-icon-map-location">  {{ evento.location.name }}</i>
        <i class="el-icon-star-on" v-if="owner.reviews">  {{rateAvg()}}   ({{owner.reviews.length}})</i>
        <button @click="addMember()">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
import memberList from "../components/member-list.cmp.vue";
import reviewList from "../components/review-list.cmp.vue";
export default {
  data() {
    return {
      evento: null,
      owner: ""
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.evento.startTime).toLocaleString();
    }
  },
  async created() {
    // evento
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.evento = this.$store.getters.evento;
    // reviews by owner
    console.log("this.evento", this.evento);
    const userId = this.evento.owner._id;
    // const userId = this.evento.owner.id;
    console.log("userId - cmpdetails", userId);
    await this.$store.dispatch({ type: "getUserById", userId });
    this.owner = this.$store.getters.user;
  },
  methods: {
    addMember() {
      console.log("add member");
      const user = this.$store.getters.currUser;
      this.evento.member.push(user);
      this.$store.dispatch({ type: "addMember", evento: this.evento });
    },
    removeEvento(eventoId) {
      this.$store.dispatch({
        type: "removeEvento",
        eventoId: this.evento._id
      });
      this.$router.push(`/`);
    },
    addReview(newReview) {
      this.owner.review.push(newReview);
      this.$store.commit({ type: "addReview", user: this.owner });
    },
    rateAvg() {
      if (!this.owner) return;
      return (
        this.owner.reviews.reduce((a, b) => a.rate + b.rate) /
        this.owner.reviews.length
      );
    },
    spotsLeft() {
      console.log("members", this.evento.members.length);
      console.log("capacity", this.evento.capacity);
      return this.evento.capacity - this.evento.members.length;
    }
  },
  components: {
    memberList,
    reviewList
  }
};
</script>

<style>
</style>
