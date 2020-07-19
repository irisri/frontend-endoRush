<template>
  <section class="home-page">
    <div>
      <div class="parallax"></div>
      <h2>Take charge of your body and you're life!</h2>
    </div>
    <p>Looking to be active? serch no more!</p>
    <p>You can find and arrenge any fiteness activety that can cross you'r mind</p>
    <span>Popular tags:</span>
    <el-tag v-for="tag in tags" :key="tag" effect="plain" @click="filterByTag(tag)">{{ tag }}</el-tag>
    <h3>Chack out our top Three events!</h3>
    <evento-list v-if="topThree" :eventos="topThree"></evento-list>
  </section>
</template>


<script>
import eventoList from "../components/evento-list.cmp.vue";

export default {
  name: "evento-preview",
  data() {
    return {
      tags: ["Yoga", "Happy"],
      topThree: null
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadEventos" });
    this.topThree = this.$store.getters.topThree;
  },
  methods: {
    filterByTag(tag) {
      console.log(tag);
    }
  },
  components: {
    eventoList
  }
};
</script>