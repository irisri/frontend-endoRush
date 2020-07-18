<template>
  <div class="evento-preview flex-row">
    <carousel-slide :evento="evento" />
    <h3>{{ evento.title }}</h3>
    <!-- <img style="width:200px;height:150px;" :src="img" /> -->

    <p>location: {{ evento.location.name }}</p>
    <h4>at: {{timeToShow}}</h4>
    <h4>orgenised by {{ evento.owner.fullName }}</h4>

    <div class="rate flex justify-center" @click.stop="updateRate">
      <input type="radio" id="star5" name="rate" value="5" />
      <label for="star5" title="text">5 stars</label>
      <input type="radio" id="star4" name="rate" value="4" />
      <label for="star4" title="text">4 stars</label>
      <input type="radio" id="star3" name="rate" value="3" />
      <label for="star3" title="text">3 stars</label>
      <input type="radio" id="star2" name="rate" value="2" />
      <label for="star2" title="text">2 stars</label>
      <input type="radio" id="star1" name="rate" value="1" />
      <label for="star1" title="text">1 star</label>
    </div>

    <el-button size="small" @click="removeEvento()">Delete event</el-button>
  </div>
</template>

<script>
import carouselSlide from "@/components/carousel-slide.cmp.vue";

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
      img: this.evento.imgUrls[0]
    };
  },
  computed: {
    timeToShow() {
      //   return new Date(this.evento.starttime.getTime());
      return new Date(this.evento.starttime).toLocaleString();
    }
  },
  methods: {
    updateRate() {
      console.log("rateunrate");
    },
    removeEvento() {
      this.$emit("removeEvento", this.evento.id);
    }
  },
  components: {
    carouselSlide
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
  border-radius: 15px;
}
div,
h4,
p {
  background-color: #fff8f0;
}
.rate {
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
}
</style>