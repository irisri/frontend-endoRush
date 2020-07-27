<template>
  <section class="home-page main-container">
    <div class="home-img-container full">
      <div class="parallax flex align-center justify-center">
        <div class="on-picture">
          <h2>Join your next workout</h2>
          <div class="search flex align-center justify-center">
            <el-input
              placeholder="Try 'Triathlon'"
              size="small"
              v-model="filterBy.title"
            />
            <el-button icon="el-icon-search" @click="setFilter"></el-button>
          </div>
          <el-tag
            v-for="category in categories"
            :key="category"
            effect="plain"
            @click="setFilterByCategory(category)"
          >{{ category }}</el-tag>
        </div>
      </div>
    </div>

    <h2>Chack out our top trending events</h2>
    <evento-list v-if="topThree" :eventos="topThree"></evento-list>
  </section>
</template>


<script>
import eventoList from "../components/evento-list.cmp.vue";

export default {
  name: "home-page",
  data() {
    return {
      categories: [
        "Weight training",
        "Cardio",
        "Running",
        "Bicycle",
        "Boxing",
        "Fitness",
      ],
      filterBy: {
        title: "",
        location: "",
        tags: [],
        timeAndDate: "Any day",
        category: null,
      },
      topThree: null,
    };
  },
  async created() {
    const cleanFilter = {
      title: "",
      location: "",
      tags: "",
      timeAndDate: "",
      category: "",
    };
    this.$store.commit({ type: "updateFilterBy", filter: cleanFilter });
    await this.$store.dispatch({ type: "loadEventos" });
    this.topThree = this.$store.getters.topThree;
  },
  methods: {
    setFilter() {
      this.$store.commit({
        type: "updateFilterBy",
        filter: _.cloneDeep(this.filterBy),
      });
      this.$router.push(`/evento`);
    },
    setFilterByCategory(category) {
      this.$store.commit({ type: "setFilterByCategory", category });
      this.$router.push(`/evento`);
    },
  },
  components: {
    eventoList,
  },
};
</script>