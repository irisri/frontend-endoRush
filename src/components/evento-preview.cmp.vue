<template>
  <div class="evento-preview flex-row">
    <carousel-slide :evento="evento" />
    <h3>{{ evento.title }}</h3>
    <!-- <img style="width:200px;height:150px;" :src="img" /> -->

    <p>location: {{ evento.location.name }}</p>
    <h4>at: {{timeToShow}}</h4>
    <h4>orgenised by {{ evento.owner.fullName }}</h4>

    <star-rating v-if="rate" :rate="this.rate"/>

    <!-- <el-button size="small" @click="removeEvento()">Delete event</el-button> -->
  </div>
</template>



<script>
import carouselSlide from "@/components/carousel-slide.cmp.vue";
import starRating from "@/components/star-rating.cmp.vue";

export default {
  name: "evento-preview",
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      img: this.evento.imgUrls[0],
      ownerUsr: "",
      rate: this.rateAvg
      // rate: this.rateAvg
    };
  },
  computed: {
    timeToShow() {
      //   return new Date(this.evento.starttime.getTime());
      return new Date(this.evento.starttime).toLocaleString();
    },
    rateAvg() {
      return (
        this.ownerUsr.reviews.reduce((a, b) => a.rate + b.rate) /
        this.ownerUsr.reviews.length
      );
    }
  },
  methods: {
    updateRate() {
      console.log("rateunrate", this.rateAvg); //this.rateAvg);
    },
    removeEvento() {
      this.$emit("removeEvento", this.evento.id);
    }
  },
  async created() {
    const userId = this.evento.owner.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.ownerUsr = _.cloneDeep(this.$store.getters.user);
      this.rate= this.rateAvg
      console.log('crate',this.rate)
      // return (this.ownerUsr = _.cloneDeep(this.$store.getters.user));
    } else {
      console.log("no id");
    }
  },
  components: {
    carouselSlide,
    starRating
  }
};
///

// (async () => {
//   const client = new GitHubApiClient();
//   const user = await client.fetchUser("vyaron");
//   console.log(user.name);
//   console.log(user.location);
// })();

///
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.evento-preview {
  width: 230px;
  /* height: 260px; */
  border-radius: 15px;
   cursor: pointer;
}
div,
h4,
p {
  background-color: #fff8f0;
}
/* .rate {
  height: 46px;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
} */

</style>