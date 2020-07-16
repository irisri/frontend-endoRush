<template>
  <section class="login-page">
    <div v-if="loggedInUser">
      <user-profile />
    </div>
    <div v-else>
      <h2>Login</h2>
      <form class="flex column" @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.userNmae" placeholder="Username" />
        <input type="text" v-model="loginCred.password" placeholder="Password" />
        <button>Login</button>
      </form>
      <h2>Signup</h2>
      <form class="flex column" @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.fullName" placeholder="Fullname" />
        <input type="text" v-model="signupCred.userNmae" placeholder="Username" />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <input type="file" @change="onUploadImg" />
        <img :src="signupCred.imgUrl" />
        <button>Signup</button>
      </form>
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
    }
  },
};
</script>

<style>
</style>