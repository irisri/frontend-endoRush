
<template>
  <div class="carousel-slide" @click.stop>
    <carousel
      :per-page="1"
      :navigate-to="evento.imgUrls"
      :mouse-drag="false"
      :navigationEnabled="true"
      :paginationEnabled="true"
      >

      <slide class = "slide" v-for="img in imgs" :key="img">
        <img :src="img" style="width:100%;height:150px;border-radius:10px" />
      </slide>

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
        //  data: ['<div class="example-slide">Slide 1</div>',
        //   '<div class="example-slide">Slide 2</div>',
        //   '<div class="example-slide">Slide 3</div>']
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
.slide{
  border-radius: 20px;
}


</style>

