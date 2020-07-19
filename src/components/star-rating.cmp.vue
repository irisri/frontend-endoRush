<template>
  <div class="star-rating">
    <form class="rating" @click.stop>
      <label>
        <input type="radio" name="stars" value="5" />
        <span v-if="this.rate>0" class="icon">★</span>
        <span v-if="this.rate>1" class="icon">★</span>
        <span v-if="this.rate>2" class="icon">★</span>
        <span v-if="this.rate>3" class="icon">★</span>
        <span v-if="this.rate>4" class="icon">★</span>
      </label>
    </form>

    <!-- <div class="rate">
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
    </div> -->
  </div>
</template>





<script>
export default {
  name: "star-rating",
  props: {
    rate: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.rating {
  display: inline-block;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}

.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.rating label:last-child {
  position: static;
}

.rating label:nth-child(1) {
  z-index: 5;
}

.rating label:nth-child(2) {
  z-index: 4;
}

.rating label:nth-child(3) {
  z-index: 3;
}

.rating label:nth-child(4) {
  z-index: 2;
}

.rating label:nth-child(5) {
  z-index: 1;
}

.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.rating label .icon {
  float: left;
  color: transparent;
}

.rating label:last-child .icon {
  color: #deb217;
}

/* .rating:not(:hover) label input:checked ~ .icon,
.rating:hover label:hover input ~ .icon {
  color: #09f;
} */
/* 
.rating label input:focus:not(:checked) ~ .icon:last-child {
  color: #000;
  text-shadow: 0 0 5px #09f;
} */
</style>