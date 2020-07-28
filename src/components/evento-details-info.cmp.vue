<template>
  <div class="info">
    <p class="capacity">{{spotsLeft}} spots left</p>
    <div class="owner flex space-between" @click.stop="$router.push(`/user/details/${owner._id}`)">
      <div class="flex space-between column">
        <h3>Orgenised by {{ evento.owner.userName }}</h3>
        <p class="bio">{{ owner.bio }}</p>
      </div>
      <img :src="evento.owner.imgUrl" />
    </div>
    <div v-if="isOwner">
      <el-button size="small" @click="$router.push(`/evento/edit/${evento._id}`)">Edit event</el-button>
      <el-button size="small" @click="removeEvento()">Delete event</el-button>
    </div>
    <p class="desc">{{evento.description}}</p>
    <div class="category">
      <p>Category: {{evento.category}}</p>
      <div>
        Tags:
        <el-tag class="tags-list" v-for="(tag,index) in evento.tags" :key="index">{{tag}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evento-details-info",
  props: {
    evento: {
      type: Object,
      required: true,
    },
    owner: {
      type: Object,
      required: true,
    },
  },
  computed: {
    spotsLeft() {
      const spots = this.evento.capacity - this.evento.members.length;
      if (!spots) return "No";
      return spots;
    },
    isOwner() {
      const user = this.$store.getters.loggedInUser;
      console.log(user);
      if (!user) return;
      return this.evento.owner._id === user._id;
    },
  },
  methods: {
    removeEvento() {
      this.$emit("removeEvento");
    },
  },
};
</script>