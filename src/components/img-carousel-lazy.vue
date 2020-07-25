<template> 
      <figure v-lazyload>
        <img :data-url="url" />
      </figure>  
</template>


<script>
import lazyLoadDirective from "../directives/lazyLoadDirective.js";

export default {
  name: "img-carousel-lazy",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  directives: {
    lazyload: lazyLoadDirective
  }
};
</script>