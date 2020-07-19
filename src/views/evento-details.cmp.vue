<template>
  <div v-if="eventoToShow" class="evento-details">
    <div class="imgs-details">
      <img
        v-for="(img, index) in eventoToShow.imgUrls"
        :key="img"
        style="width:200px;height:150px;"
        :src="img"
        :class="`image-${index+1}`"
      />
    </div>
    <div class="details-content flex">
      <div class="info">
        <h3>{{ eventoToShow.title }}</h3>
        <h4>orgenised by {{ eventoToShow.owner.fullName }}</h4>
        <p>{{eventoToShow.title}}</p>
        <p>{{eventoToShow.description}}</p>
        <member-list :members="eventoToShow.members"></member-list>
        <review-list :reviews="reviews"></review-list>
        <!-- <review-list :reviews="[1,2,3]"></review-list> -->
      </div>
      <div class="join">
        <i class="el-icon-time">{{timeToShow}}</i>
        <i class="el-icon-map-location">{{ eventoToShow.location.name }}</i>
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
      eventoToShow: null,
      owner: null,
      reviews: []
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.eventoToShow.starttime).toLocaleString();
    }
  },
  async created() {
    // evento
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.eventoToShow = this.$store.getters.evento;
    // reviews by owner
    const userId = this.eventoToShow.owner.id;
    this.owner = userId;
    await this.$store.dispatch({ type: "getUserById", userId });
    this.reviews = this.$store.getters.user.reviews;
  },
  methods: {
    addMember() {
      console.log("add member");
      // this.$store.dispatch({ type: "addMember", evento });
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
