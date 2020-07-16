<template>
  <div class="evento-filter">
    <el-input @input="setFilter" v-model="filterBy.title" placeholder="find your next event"></el-input>
    <el-select v-model="filterBy.time" @change="setFilter">
      <el-option v-for="item in dates" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-select v-model="filterBy.tags" multiple @change="setFilter">
      <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
    </el-select>
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
        time: "Any day"
      },
      dates: ["Any day", "Today", "Tomorrow", "This week", "Next week"],
      tags: ["Yoga", ""]
    };
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    }
  }
};
</script>

<style>
</style>