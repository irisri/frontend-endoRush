<template>
  <div class="evento-list">
    <onlie-messages/>
      <section v-for="evento in eventos" :key="evento._id" @click.stop="$router.push(`/evento/details/${evento._id}`)">
        <evento-preview :evento="evento"/>
      </section>
  </div>
</template>


<script>
import eventoPreview from "@/components/evento-preview.cmp.vue";
import onlieMessages from "@/components/online-messages.cmp.vue"

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
    eventoPreview,
    onlieMessages
    
  }
};
</script>