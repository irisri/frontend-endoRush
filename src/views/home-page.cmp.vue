<template>
  <section class="home-page main-container">
    <div class="home-img-container full">
      <div class="parallax">
        <div class="on-picture">
          <el-input
            placeholder="Event name"
            size="small"
            v-model="filterBy.title"
            @input="setFilter"
          />
          <el-tag
            v-for="category in categories"
            :key="category"
            effect="plain"
            @click="setFilterByCategory(category)"
          >{{ category }}</el-tag>
        </div>
      </div>
    </div>

    <h3>Chack out our top trending events</h3>
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
        "Fitness"
      ],
      filterBy: {
        title: "",
        location: "",
        tags: [],
        timeAndDate: "Any day",
        category: null
      },
      topThree: null
    };
  },
  async created() {
    const cleanFilter = {
      title: "",
      location: "",
      tags: "",
      timeAndDate: "",
      category: ""
    };
    this.$store.commit({ type: "updateFilterBy", filter: cleanFilter });
    await this.$store.dispatch({ type: "loadEventos" });
    this.topThree = this.$store.getters.topThree;
    this.setFilter = _.debounce(this.setFilter, 500);
  },
  methods: {
    setFilter() {
      this.$store.commit({type: "updateFilterBy",filter: _.cloneDeep(this.filterBy)});
      this.$router.push(`/evento`);
    },
    setFilterByCategory(category) {
      this.$store.commit({ type: "setFilterByCategory", category });
      this.$router.push(`/evento`);
    }
  },
  components: {
    eventoList
  }
};
</script>