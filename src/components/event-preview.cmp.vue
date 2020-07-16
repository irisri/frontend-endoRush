<template>
  <div class="event-preview">
       <img :src="event.img">
      <h3> {{ event.title }} </h3>
      <p> {{ event.location.name }}
          {{ event.time }}
          {{ event.owner }}
      </p>
     
  </div>
</template>


<script>
export default {
  name: "event-preview",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
};
</script>