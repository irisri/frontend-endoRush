<template>
  <div v-if="evento" class="evento-details main-container">
    <!-- <online-msg/> -->
    <h1>{{ msg.txt }}</h1>
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
      </div>

      <div class="join">
        <i class="el-icon-time">{{timeToShow}}</i>
        <i class="el-icon-map-location">{{ evento.location.name }}</i>
        <i class="el-icon-star-on" v-if="owner.reviews">{{rateAvg}} ({{owner.reviews.length}})</i>
        <button @click="addMember()">Join</button>
      </div>
      <!-- <alert v-if="alert" :alertContent="alert"></alert> -->
    </div>
  </div>
</template>

<script>
import memberList from "../components/member-list.cmp.vue";
import reviewList from "../components/review-list.cmp.vue";
import alert from "../components/alert.cmp.vue";
import SocketService from "@/services/SocketService";

export default {
  data() {
    return {
      evento: null,
      owner: "",
      title:"",
      _userName:"",
       msg: {},
    };
  },
  computed: {
    timeToShow() {
      return new Date(this.evento.startTime).toLocaleString();
    },
    rateAvg() {
      const avg =
        this.owner.reviews.reduce((a, b) => a + b.rate, 0) /
        this.owner.reviews.length;
      return avg.toFixed(0);
    }
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
    this.title = this.evento.title
    // socket
     SocketService.setup();
     SocketService.emit('of evento', this.evento._id)
     SocketService.on('chat addMsg', _msg=>{this.msg=_msg})
     console.log(this.msg)
    //  SocketService.emit('to user', this.evento.owner.userName)
    
  },
  methods: {
    addMember() {
      const user = this.$store.getters.loggedInUser;
      if (this.evento.members.find(member => member._id === user._id))
        this.alert = {
          success: false,
          title: "Error",
          txt: "You are already registered for the event"
        };
      return console.log("You are already registered for the event");
      this.evento.members.push(user);
      this.$store.dispatch({ type: "addMember", evento: this.evento });   

      this.alert = {
        success: false,
        title: "Success",
        txt: "You have successfully registered for the event! "
      };

      this._userName = user.userName
      console.log('usename',this._userName)
      //socket msg
      var sentMsg = {from: 'Me', txt: `${this._userName} just joined: ${this.title} `}
      this.sendMsg(sentMsg) 

    },
    removeEvento(eventoId) {
      this.$store.dispatch({
        type: "removeEvento",
        eventoId: this.evento._id
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

    spotsLeft() {
      return this.evento.capacity - this.evento.members.length;
    },
    sendMsg() {
      console.log("Sending", this.msg);
      SocketService.emit("chat newMsg", this.msg);
      this.msg = { from: "Me", txt: "" };
    }
  },
  destroyed() {
    SocketService.off("chat addMsg", this.addMsg);
    SocketService.terminate();
  },
  components: {
    memberList,
    reviewList,
    alert
  }
};
</script>

<style>
</style>
