<template>
  <section class="evento-list">
    <evento-preview
      v-for="evento in eventos"
      :evento="evento"
      :key="evento.id"
      @click.stop="$router.push(`/evento/details/${evento.id}`)"
    />
  </section>
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
  methods: {},
  components: {
    eventoPreview
  }
};
</script>