<template>
  <div class="toy-filter flex column"></div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        title: "",
        location: "",
        tag: "",
        time: ""
      }
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