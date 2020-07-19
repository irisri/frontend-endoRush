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
        
        <el-button size="small" @click="$router.push(`/evento/edit/${eventoToShow.id}`)">Edit event</el-button>
        <el-button size="small" @click="removeEvento()">Delete event</el-button>

        <p>{{eventoToShow.title}}</p>
        <p>{{eventoToShow.description}}</p>
        <p>{{eventoToShow.description}}</p>
        <p>{{eventoToShow.description}}</p>
        <member-list :members="eventoToShow.members"></member-list>
        <!-- <review-list :reviews="reviews"></review-list> -->
        <review-list :reviews="[1,2,3]"></review-list>
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
    const eventoId = this.$route.params.id;
    await this.$store.dispatch({ type: "getById", eventoId });
    this.eventoToShow = this.$store.getters.evento;
    const ownerId = this.eventoToShow.owner.id;
    this.owner = ownerId;
    // await this.$store.dispatch({ type: "getReviewById", ownerId });
    this.reviews = this.$store.getters.reviews;
    // console.log('this.eventoToShow', this.eventoToShow);
  },
  methods: {
    addMember() {
      console.log("add member");
      // this.$store.dispatch({ type: "addMember", evento });
    },
    removeEvento(eventoId) {
      this.$store.dispatch({type: 'removeEvento', eventoId: this.eventoToShow.id});
      this.$router.push(`/`)
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
