<template>
  <div class="evento-list">
    <el-button title="Add New event" @click="$router.push('/evento/edit')">create new event!</el-button>
    <div class="flex space-around">
      <section v-for="evento in eventos" :key="evento.id" @click.stop="$router.push(`/evento/details/${evento.id}`)">
        <evento-preview :evento="evento" @removeEvento="removeEvento" />
      </section>
    </div>
  </div>
</template>


<script>
import eventoPreview from "@/components/evento-preview.cmp.vue";

export default {
  name: "evento-list",
  props: {
    eventos: {
      type: Array,
      required: true
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isOwner() {
      return this.loggedInUser && this.loggedInUser.isOwner;
    }
  },
  methods: {
    removeEvento(eventoId) {
      this.$emit("removeEvento", eventoId);
    }
  },
  components: {
    eventoPreview
  }
};
</script>