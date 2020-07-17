<template>
  <div class="evento-edit" v-if="evento">
    <div class="img" v-if="evento.imgUrls">
      <img width="500" :src="evento.imgUrls[0]" />
    </div>
    <form-evento :evento="evento" @saveEvento="saveEvento" @updatedImg="onUploadImg" />
  </div>
</template>

<script>
import eventoService from "../services/eventoService.js";
import { uploadImg } from "../services/img-upload.service.js";
import formEvento from "../components/form-evento.cmp.vue";
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
      const res = await uploadImg(ev);
      this.evento.imgUrls.splice(0, 1, res.url);
    },
    saveEvento(evento) {
      console.log(evento);
      this.$store.dispatch({ type: "saveEvento", evento });
      this.$router.push("/event");
    }
  }
};
</script>
