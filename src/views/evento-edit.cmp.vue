<template>
  <div class="evento-edit main-container" v-if="evento">
    <div class="imgs-container">
      <div class="img-container" v-for="img in evento.imgUrls" :key="img">
        <img v-if="img" :src="img" />
        <el-button icon="el-icon-delete" @click="removeImg(img)"></el-button>
      </div>
    </div>
    <form-evento :evento="evento" @saveEvento="saveEvento" @onUploadImg="onUploadImg" />
  </div>
</template>

<script>
import eventoService from "../services/eventoService.js";
import { uploadImg } from "../services/img-upload.service.js";
import formEvento from "../components/form-evento.cmp.vue";
import imgService from "../services/img-upload.service.js";
const _ = require("lodash");

export default {
  name: "evento-edit",
  components: {
    formEvento
  },
  data() {
    return {
      evento: null
    };
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
      return (this.evento = _.cloneDeep(this.$store.getters.evento));
    } else {
      console.log("no id");
      return (this.evento = eventoService.getEmpty());
    }
  },
  methods: {
    async onUploadImg(ev) {
      console.log(ev);
      const res = await imgService.uploadImg(ev);
      this.evento.imgUrls.unshift(res.url);
    },
    saveEvento(evento) {
      console.log(evento);
      this.$store.dispatch({ type: "saveEvento", evento });
      this.$router.push("/");
    },
    removeImg(imgUrl) {
      console.log(imgUrl);
      const index = this.evento.imgUrls.findIndex(img => img === imgUrl);
      this.evento.imgUrls.splice(index, 1);
    }
  }
};
</script>
