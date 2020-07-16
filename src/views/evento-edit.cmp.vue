<template>
<div>
<p>rendering</p>
  <div class="evento-edit" v-if="evento">
    <div class="img" v-if="evento.img">
      <img width="500" :src="evento.img" />
    </div>
    <form @submit.prevent="saveEvento">
      <input type="text" v-model="evento.name" placeholder="Event name" />
      <input type="date" v-model="evento.date" value="evento.date" />
      <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" @change="setDate"></el-date-picker>
      <textarea v-model="evento.description"></textarea>
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
  data: {
    evento: null
  },
  created() {
    let eventoId = this.$route.params.id;
    if (eventoId) {
      this.evento = _.cloneDeep(eventoService.getById(eventoId));
    } else {
      this.evento = eventoService.getEmpty();
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
