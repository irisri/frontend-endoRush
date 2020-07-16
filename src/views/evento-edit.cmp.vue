<template>
  <div class="event-edit" v-if="event">
    <div class="img" v-if="event.img">
      <img width="500" :src="event.img" />
    </div>
    <form @submit.prevent="saveEvent">
      <input type="text" v-model="event.name" placeholder="Event name" />
      <input type="date" v-model="event.date" value="event.date" />
      <el-date-picker v-model="event.date" type="date" placeholder="Pick a date" @change="setDate"></el-date-picker>
      <el-time-picker v-model="event.time" placeholder="Date.now()" format="HH:mm" @change="setTime"></el-time-picker>
      <textarea v-model="event.description"></textarea>
      <input type="file" @change="onUploadImg" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { eventService } from "../services/eventService.js";
const _ = require("lodash");

export default {
  name: "event-edit",
  data: {
    event: null
  },
  created() {
    let eventId = this.$route.params.id;
    if (eventId) {
      this.event = _.cloneDeep(eventService.getById(eventId));
    } else {
      this.event = eventService.getEmpty();
    }
  },
  methods: {
    async onUploadImg(ev) {
      //   const res = await uploadImg(ev);
      //   this.toyToEdit.img = res.url;
      console.log(this.event);
    },
    setDate(ev) {
        console.log('date event',ev);
    },
    setTime(ev) {
        console.log('time event',ev);
    },
    saveEvent() {
      this.$store.dispatch({ type: "saveEvent", event: { ...this.event } });
    //   this.$router.push("/event");
    }
  }
};
</script>
