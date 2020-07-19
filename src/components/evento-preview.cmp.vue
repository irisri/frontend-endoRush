<template>
  <div class="evento-preview">
    <!-- <carousel-slide :evento="evento" /> -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="url in evento.imgUrls" :key="url">
        <img :src="url" />
      </el-carousel-item>
      <!-- <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>-->
    </el-carousel>

    <h3>{{ evento.title }}</h3>

    <p>location: {{ evento.location.name }}</p>
    <h4>at: {{timeToShow}}</h4>
    <h4>orgenised by {{ evento.owner.fullName }}</h4>

    <div class="rate-container" @click.stop v-if="rate">
      <span class="star">&#9733; <span class="rate">{{this.rate}}</span></span>
      <!-- <p ></p> -->
    </div>
  </div>
</template>



<script>
// import carouselSlide from "@/components/carousel-slide.cmp.vue";
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
    }
  },
  async created() {
    const userId = this.evento.owner.id;
    if (userId) {
      await this.$store.dispatch({ type: "getUserById", userId });
      this.ownerUsr = _.cloneDeep(this.$store.getters.user);
      this.rate = this.rateAvg;
      console.log("crate", this.rate);
      console.log("len:", this.ownerUsr.reviews.length);

      // return (this.ownerUsr = _.cloneDeep(this.$store.getters.user));
    } else {
      console.log("no id");
    }
  },
  components: {
    // carouselSlide,
    starRating
  }
};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.evento-preview {
  width: 230px;
  /* height: 260px; */

  cursor: pointer;
}
div,
h4,
p {
  background-color: #fff8f0;
  border-radius: 20px;
}
.star {
  color: #ff4000;
  font-size: 25px;
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