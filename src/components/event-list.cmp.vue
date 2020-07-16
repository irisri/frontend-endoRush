<template>
  <div class="event-list">
      <div title="Add New event" @click="$router.push('/event/add')">create new event!</div>
      <section v-for="event in events" :key="event._id" @click.stop="$router.push('/event/details/' + event._id)">
          <toy-preview :event="event" />
      </section>
  </div>
</template>


<script>

import eventPreview from '@/components/event-preview.cmp.vue';

export default {
  name: 'event-list',
  props: {
      events: {
          type: Array,
          required: true
      }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    isOwner() {
      return (this.loggedInUser && this.loggedInUser.isOwner)
    }
  },
  components: {
    eventPreview
  }
}

</script>