<template>
  <div class="evento-filter">
    <el-input
      class="search-title"
      size="large"
      @input="setFilter"
      v-model="filterBy.title"
      placeholder="Find your next event"
    ></el-input>

    <div class="cat-tags flex justify-center">
      <el-select
        v-model="filterBy.category"
        @change="setFilter"
        placeholder="Category"
        :selected="filterBy.category"
      >
        <el-option v-for="item in categories" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <!-- <el-select
        v-model="filterBy.tags"
        multiple
        @change="setFilter"
        placeholder="Tags"
        :selected="filterBy.tags"
      >
        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
      </el-select>-->
      <el-select v-model="filterBy.time" @change="setFilter" placeholder="Day">
        <el-option v-for="item in dates" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        title: "",
        location: "",
        tags: [],
        timeAndDate: "Any day",
        category: null,
      },
      categories: [
        "All",
        "Weight training",
        "Cardio",
        "Running",
        "Bicycle",
        "Boxing",
        "Fitness",
      ],
      dates: ["Any day", "Today", "Tomorrow", "This week", "Next week"],
      tags: null,
    };
  },
  created() {
    this.tags = this.$store.getters.tags;
    this.filterBy = _.cloneDeep(this.$store.getters.getFilterBy);
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
  },
};
</script>

<style>
</style>