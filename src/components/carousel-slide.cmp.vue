<template>
  <div class="carousel-slide" @click.stop>
    <carousel
      :per-page="1"
      :navigate-to="evento.imgUrls"
      :mouse-drag="false"

    >
      <slide v-for="img in imgs" :key="img">
        <img :src="img" style="width:200px;height:150px;" />
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