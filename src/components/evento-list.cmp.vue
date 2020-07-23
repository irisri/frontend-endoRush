<template>
  <div class="evento-list">
<<<<<<< HEAD
=======
    <!-- <onlie-msg/> -->
>>>>>>> 3c0e2fc8e42d713d7e115e0596e29f1b882fe32b
      <section v-for="evento in eventos" :key="evento._id" @click.stop="$router.push(`/evento/details/${evento._id}`)">
        <evento-preview :evento="evento"/>
      </section>
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
    eventoPreview,
  
    
  }
};
</script>