<template>
  <div>
    <p>
      <i class="el-icon-date"></i>
      &nbsp;&nbsp;{{ evento.startTime | moment("dddd, MMMM Do YYYY") }}
    </p>
    <p>
      <i class="el-icon-time"></i>
      &nbsp;&nbsp;{{ evento.startTime | moment("h:mm a") }}
    </p>
    <p>
      <i class="el-icon-map-location"></i>
      {{ evento.location.name }}
    </p>
    <p v-if="owner.reviews">
      <i class="el-icon-star-on"></i>
      {{rateAvg}} ({{owner.reviews.length}})
    </p>
    <button @click="addMember">I want to join</button>
  </div>
</template>

<script>
import toastService from "@/services/toastService";

export default {
  name: "evento-join",
  props: {
    evento: {
      type: Object,
      required: true,
    },
    owner: {
      type: Object,
      required: true,
    },
    loggedInUser: {
      type: Object,
      required: false,
    },
  },
  computed: {
    rateAvg() {
      if (!this.owner.reviews) return;
      const avg =
        this.owner.reviews.reduce((a, b) => a + b.rate, 0) /
        this.owner.reviews.length;
      return parseFloat(avg.toFixed(0));
    },
  },
  methods: {
    addMember() {
      const payload = {};
      if (!this.loggedInUser) {
        payload.msg = "Please log in";
        payload.icon = "block";
        toastService.toastMsg(this, payload);
        return setTimeout(() => this.$router.push(`/login`), 1000);
      } else {
        if (
          this.evento.members.find(
            (member) => member._id === this.loggedInUser._id
          )
        ) {
          payload.msg = "You are already registered for the event";
          payload.icon = "how_to_reg";
        } else if (this.loggedInUser._id === this.owner._id) {
          payload.msg = "This is you're event!";
          payload.icon = "block";
        } else if (this.evento.capacity - this.evento.members.length === 0) {
          payload.msg = "No spots left";
          payload.icon = "block";
        } else {
          this.$emit("addMember");
        }
        if (payload.msg) toastService.toastMsg(this, payload);
        // return setTimeout(() => this.$router.push(`/evento`), 1000);
      }
    },
  },
  async created() {
    console.log(this.loggedInUser);
  },
};
</script>