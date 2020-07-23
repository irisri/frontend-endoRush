<template>
  <div class="evento-filter">
    <div>
      <search-area @setFilter="setFilter" />
    </div>

    <div>
      <el-button
        id="btn"
        class="new-evento"
        title="Add New event"
        @click="$router.push('/evento/edit')"
      >create new event!</el-button>
    </div>
  </div>
</template>

<script>
import searchArea from "../components/search-area.cmp.vue";

export default {
  methods: {
    setFilter(filterBy) {
      this.$emit("setFilter", filterBy);
    },
  },
  components: {
    searchArea,
  },
};
</script>

<style>
</style>