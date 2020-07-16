<template>
<div>
<p>rendering</p>
  <div class="evento-edit" v-if="eventoToEdit">
    <div class="img" v-if="eventoToEdit.img">
      <img width="500" :src="eventoToEdit.img" />
    </div>
    <form @submit.prevent="saveEvento">
      <input type="text" v-model="eventoToEdit.name" placeholder="Event name" />
      <input type="number" v-model="eventoToEdit.capaity">
      <input type="date" v-model="eventoToEdit.date" value="evento.date" />
      <el-date-picker v-model="eventoToEdit.startTime" type="datetime" placeholder="Select date and time" @change="setDate"></el-date-picker>
      <textarea v-model="eventoToEdit.description"></textarea>
      <input type="file" @change="onUploadImg" />
      <button>Save</button>
    </form>
  </div>
</div>
</template>

<script>
import { eventoService } from "../services/eventoService.js";
const _ = require("lodash");

export default {
  name: "evento-edit",
  computed: {
    eventoToEdit() {
      var evento = _.cloneDeep(this.$store.getters.evento);
      if (evento) return evento;
      // return eventoService.getEmptyToy()
    }
  },
  data() {
    return {
      evento: null
    }
  },
  created() {
    const eventoId = this.$route.params.id;
    // if (eventoId) {
    //   this.evento = _.cloneDeep(eventoService.getById(eventoId));
    // } else {
    //   this.evento = eventoService.getEmpty();
    // }
    if (eventoId) {
      console.log('crea', eventoId);
      return this.$store.dispatch({ type: "getById", eventoId });
    } 
  },
  methods: {
    async onUploadImg(ev) {
      //   const res = await uploadImg(ev);
      //   this.evento.img = res.url;
      console.log(ev);
    },
    setDate(ev) {
        console.log('date event',ev);
    },
    saveEvent() {
      this.$store.dispatch({ type: "saveEvento", evento: { ...this.evento } });
    //   this.$router.push("/event");
    }
  }
};
</script>
