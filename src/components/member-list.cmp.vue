<template>
  <section>
    <h3>Members ({{countMembers}})</h3>
    <ul class="member-list flex">
      <li class="member-card" v-for="member in members" :key="member._id">
        <img :src="member.imgUrl" />
        <h5>{{member.fullName}}</h5>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      required: true
    }
  },
  computed: {
    countMembers() {
      return this.members.length;
    }
  }
};
</script>

<style>
</style>