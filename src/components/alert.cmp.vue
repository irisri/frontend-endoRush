<template>
  <section>
    <el-alert
      class="success"
      v-if="alertContent.success"
      :title="alertContent.title"
      type="success"
      :description="alertContent.txt"
      show-icon
    ></el-alert>
    <el-alert
      class="error"
      v-if="!alertContent.success"
      :title="alertContent.title"
      type="error"
      :description="alertContent.txt"
      show-icon
    ></el-alert>
  </section>
</template>

<script>
export default {
  props: {
    alertContent: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>