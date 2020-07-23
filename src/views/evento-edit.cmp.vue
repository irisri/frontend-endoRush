<template>
  <div class="evento-edit main-container" v-if="evento">
    <form-evento :evento="evento" @saveEvento="saveEvento" @onUploadImg="onUploadImg" />
    <div class="imgs-container" v-if="evento.imgUrls.length > 0">
      <div class="img-container" v-for="img in evento.imgUrls" :key="img">
        <img v-if="img" :src="img" />
        <el-button icon="el-icon-delete" @click="removeImg(img)"></el-button>
      </div>
    </div>
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
    if (eventoId) {
      await this.$store.dispatch({ type: "getById", eventoId });
      this.evento = _.cloneDeep(this.$store.getters.evento);
      return (this.evento = _.cloneDeep(this.$store.getters.evento));
    } else {
      return (this.evento = eventoService.getEmpty());
    }
  },
  methods: {
    async onUploadImg(ev) {
      const res = await imgService.uploadImg(ev);
      if (this.evento.imgUrls.length === 0)
        return this.evento.imgUrls.push(res.url);
      else this.evento.imgUrls.unshift(res.url);
    },
    saveEvento(evento) {
      const user = this.$store.getters.user;
      const ownerForEvento = {
        _id: user._id,
        userName: user.userName,
        imgUrl: user.imgUrl
      };
      this.evento.owner = ownerForEvento;
      this.evento.createdAt = Date.now();
      this.$store.dispatch({ type: "saveEvento", evento });
      this.$router.push("/");
    },
    removeImg(imgUrl) {
      // imgService.deleteImg(imgUrl)
      const index = this.evento.imgUrls.findIndex(img => img === imgUrl);
      this.evento.imgUrls.splice(index, 1);
    }
  }
};
</script>
