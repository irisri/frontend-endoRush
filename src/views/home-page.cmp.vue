<template>
  <section class="home-page main-container">
    <div class="home-img-container full">
      <div class="parallax"></div>
      <h2>Take charge of your body and you're life!</h2>
    </div>
    <p>Looking to be active? serch no more!</p>
    <p>You can find and arrenge any fiteness activety that can cross you'r mind</p>
    <span>Trending</span>
    <el-tag v-for="tag in tags" :key="tag" effect="plain" @click="setFilterByTag(tag)">{{ tag }}</el-tag>
    <h3>Chack out our top trending events</h3>
    <evento-list v-if="topThree" :eventos="topThree"></evento-list>
  </section>
</template>


<script>
import eventoList from "../components/evento-list.cmp.vue";

export default {
  name: "evento-preview",
  data() {
    return {
      tags: null,
      topThree: null
    };
  },
  async created() {
    const cleanFilter = {
      title: "",
      location: "",
      tag: "",
      timeAndDate: ""
    };
    this.$store.commit({ type: "updateFilterBy", filter: cleanFilter });
    await this.$store.dispatch({ type: "loadEventos" });
    this.tags = this.$store.getters.trendingTags;
    this.topThree = this.$store.getters.topThree;
  },
  methods: {
    setFilterByTag(tag) {
      this.$store.commit({ type: "updateFilterByTag", tag });
      this.$router.push(`/evento`);
    }
  },
  components: {
    eventoList
  }
};
</script>