<template>
  <form @submit.prevent="saveEvento" class="form-container">
    <div class="title">
      <el-input placeholder="Event name" size="small" v-model="evento.title"></el-input>
    </div>

    <div class="descritprion">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="Event description"
        v-model="evento.description"
      ></el-input>
    </div>

    <div>
      <el-input placeholder="City" size="small" v-model="evento.location.name"></el-input>
    </div>

    <div class="tags">
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

    <el-select v-model="evento.category" placeholder="Category">
      <el-option v-for="category in categories" :key="category" :label="category" :value="category"></el-option>
    </el-select>

    <div class="time-date">
      <el-date-picker
        format="yyyy-MM-dd HH:mm"
        v-model="evento.startTime"
        type="datetime"
        placeholder="Select date and time"
        @change="setDate"
      ></el-date-picker>
    </div>

    <div class="capacity">
      <label for="cap">Number of participants:</label>
      <el-input-number
        size="small"
        v-model="evento.capacity"
        controls-position="right"
        @change="changeCapaity"
        id="cap"
        :min="1"
        :max="50"
      ></el-input-number>
    </div>
    <!-- Add location -->
    <div class="btns flex justify-center">
      <div class="img-upload">
        <label for="upload" class="custom-file-upload">Upload image</label>
        <input type="file" @change="onUploadImg" id="upload" />
      </div>
      <el-button @click="saveEvento">Save event</el-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "title-description",
  props: {
    evento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      categories: [
        "Weight training",
        "Cardio",
        "Running",
        "Bicycle",
        "Boxing",
        "Fitness",
      ],
    };
  },
  methods: {
    changeCapaity(value) {
      this.evento.capaity = value;
    },
    handleClose(tag) {
      this.evento.tags.splice(this.evento.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    onUploadImg(ev) {
      this.$emit("onUploadImg", ev);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.evento.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    setDate(value) {
      this.evento.startTime = Date.parse(value);
    },
    saveEvento() {
      this.$emit("saveEvento", this.evento);
    },
  },
};
</script>