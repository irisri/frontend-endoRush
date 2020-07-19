
<template>
  <div class="carousel-slide" @click.stop>
    <carousel
      :per-page="1"
      :navigate-to="evento.imgUrls"
      :mouse-drag="false"
      :navigationEnabled="true"
      :paginationEnabled="true"
    
      paginationActiveColor="#42b983" paginationColor="#b2ebd1"
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
    };
  },

};
</script>


<style scoped>

data-v-438fd353

.slide{
  border-radius: 20px;
}


</style>