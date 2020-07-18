<template>
  <div class="carousel-slide" @click.stop>
    <carousel
      :per-page="1"
      :navigate-to="evento.imgUrls"
      :mouse-drag="false"
      :navigationEnabled="true"
      :paginationEnabled="false"

    >
      <slide v-for="img in imgs" :key="img">
        <img :src="img" style="width:100%;height:150px;" />
      </slide>
      <!-- <slide>Slide 1 Content</slide>
      <slide>Slide 2 Content</slide>-->
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "carousel-slide",
  components: {
    Carousel,
    Slide
  },
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgs: this.evento.imgUrls
    };
  },

};
</script>


<style scoped>

data-v-438fd353

.VueCarousel-pagination{
  margin: 0;
  height: 0px;
}


</style>