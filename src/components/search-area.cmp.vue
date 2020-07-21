<template>
  <section class="search-area">
      <el-input class="search-title"
        size="large"
        @input="setFilter"
        v-model="filterBy.title"
        placeholder="find your next event"
      ></el-input>

    <div class="search-select">
      <label>Search By tag:</label>
      <el-select v-model="filterBy.tags" multiple @change="setFilter" placeholder>
        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      
      <el-select v-model="filterBy.time" @change="setFilter">
        <el-option v-for="item in dates" :key="item" :label="item" :value="item"></el-option>
      </el-select>

    </div>
  </section>
</template>

<script>
export default {
  //   props: [tags],
  data() {
    return {
      name: "search-area",
      filterBy: {
        title: "",
        location: "",
        tags: [],
        timeAndDate: "Any day"
      },
      dates: ["Any day", "Today", "Tomorrow", "This week", "Next week"],
      tags: null
    };
  },
  created() {
    this.tags = this.$store.getters.tags;
  },
  methods: {
    setFilter() {
      console.log('search', this.filterBy);
      
      this.$emit("setFilter", this.filterBy);
    }
  }
};
</script>


