<template>
  <div class="evento-edit" v-if="evento">
    <div class="img" v-if="evento.img">
      <img width="500" :src="evento.img" />
    </div>
    <form @submit.prevent="saveEvento">
      <input type="text" v-model="evento.title" placeholder="Event name" />
      <input type="number" v-model="evento.capaity" />
      <div class="block">
        <el-date-picker
          v-model="evento.startTime"
          type="datetime"
          placeholder="Select date and time" @change="setDate"
        ></el-date-picker>
      </div>

      <textarea v-model="evento.description"></textarea>
      <input type="file" @change="onUploadImg" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { eventoService } from "../services/eventoService.js";
const _ = require("lodash");

export default {
  name: "evento-edit",
  data() {
    return {
      evento: null     
      // picker.$emit('pick', new Date());
    }
  },
  async created() {
    const eventoId = this.$route.params.id;
    // if (eventoId) {
    //   this.evento = _.cloneDeep(eventoService.getById(eventoId));
    // } else {
    //   this.evento = eventoService.getEmpty();
    // }
    if (eventoId) {
      await this.$store.dispatch({ type: "getById", eventoId });
      if (eventoId) return this.evento = _.cloneDeep(this.$store.getters.evento);
      return eventoService.getEmptyToy()
    }
  },
  methods: {
    async onUploadImg(ev) {
      //   const res = await uploadImg(ev);
      //   this.evento.img = res.url;
      console.log(ev);
    },
    setDate(startTime) {
      console.log("date event", startTime);
      const updatedTime = new Date(startTime)
      console.log(updatedTime)
    },
    saveEvento() {
      console.log(this.eventoToEdit);
      // this.$store.dispatch({ type: "saveEvento", evento: { ...this.evento } });
      //   this.$router.push("/event");
    }
  },
  // watched()
};
</script>
