<template>
  <form @submit.prevent="saveEvento" class="form-container">
    <div class="title">
      <label for="title">Event title:</label>
      <el-input placeholder="Event name" id="title" size="small" v-model="evento.title"></el-input>
    </div>

    <div class="descritprion">
      <label for="description">Event description:</label>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="Event description"
        v-model="evento.description"
      ></el-input>
    </div>

    <div class="capaity">
      <label for="capaity">Number of maximum participants:</label>
      <!-- <input type="number" id="participants" v-model="evento.capaity" /> -->
      <el-input-number
        id="capaity"
        size="small"
        v-model="evento.capaity"
        controls-position="right"
        @change="changeCapaity"
        :min="1"
        :max="50"
      ></el-input-number>
    </div>

    <div class="tags">
      <label>Add tag:</label>

      <el-tag
        :key="tag"
        v-for="tag in evento.tags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <div class="time-date">
      <label for="startTime">Select time and date:</label>
      <el-date-picker
        v-model="evento.starttime"
        type="datetime"
        placeholder="Select date and time"
        id="startTime"
        @change="setDate"
      ></el-date-picker>
    </div>

    <div class="img-upload">
      <label for="upload" class="custom-file-upload">Upload image</label>
      <input type="file" @change="onUploadImg" id="upload" />
    </div>

    <el-button>Save event</el-button>
  </form>
</template>

<script>

export default {
  name: "title-description",
  props: ["evento"],
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    changeCapaity(value) {
      this.evento.capaity = value;
      console.log(this.evento);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async onUploadImg(ev) {
      this.$emit("onUploadImg", ev);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.evento.tags.push(inputValue);
        console.log(this.evento.tags);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    setDate(value) {
      this.evento.startTime = Date.parse(value);
    },
    saveEvento(evento) {
      this.$emit("saveEvento", evento);
    }
  }
};
</script>