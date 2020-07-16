<template>
  <div class="evento-preview">
       <img :src="evento.img">
      <h3> {{ evento.title }} </h3>
      <p> {{ evento.location.name }}
          {{ evento.time }}
          {{ evento.owner }}
      </p>
     
  </div>
</template>


<script>
export default {
  name: "evento-preview",
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
};
</script>