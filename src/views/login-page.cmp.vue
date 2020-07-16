<template>
  <section class="login-page">
    <div v-if="loggedInUser">
      <user-profile />
    </div>
    <div v-else>
      <div v-if="!signUp">
        <h2>Login</h2>
        <form class="flex column align-center" @submit.prevent="doLogin">
          <input type="text" v-model="loginCred.userNmae" placeholder="Username" />
          <input type="text" v-model="loginCred.password" placeholder="Password" />
          <button>Login</button>
        </form>
        <button @click="signUp=!signUp">Signup</button>
      </div>
      <div v-if="signUp">
        <h2>Signup</h2>
        <form class="flex column align-center" @submit.prevent="doSignup">
          <input type="text" v-model="signupCred.fullName" placeholder="Fullname" />
          <input type="text" v-model="signupCred.userNmae" placeholder="Username" />
          <input type="text" v-model="signupCred.password" placeholder="Password" />
          <input type="file" @change="onUploadImg" />
          <img :src="signupCred.imgUrl" />
          <button>Signup</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      loginCred: {},
      signupCred: {},
      signUp: false
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    onUploadImg(ev) {
      uploadImg(ev).then(res => (this.signupCred.src = res.url));
    }
  }
};
</script>

<style>
</style>