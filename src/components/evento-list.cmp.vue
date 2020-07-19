<template>
  <div class="evento-list">

    <div class="flex space-around">
      <section v-for="evento in eventos" :key="evento.id" @click.stop="$router.push(`/evento/details/${evento.id}`)">
        <evento-preview :evento="evento"/>
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
  },
  components: {
    eventoPreview
  }
};
</script>