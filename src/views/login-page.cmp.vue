<template>
  <section class="login-page main-container">
    <div v-if="!signUp" class="login">
      <h2>Login</h2>
      <form class="form flex column align-center" @submit.prevent="doLogin">
        <el-input type="text" v-model="loginCred.userName" placeholder="Username" />
        <el-input type="text" v-model="loginCred.password" placeholder="Password" />
        <el-button @click.prevent="doLogin">Login</el-button>
      </form>
      <el-button @click="signUp=!signUp">Signup</el-button>
    </div>
    <div v-if="signUp" class="sign-up">
      <h2>Signup</h2>
      <form class="form flex column align-center" @submit.prevent="doSignup">
        <el-input type="text" v-model="signupCred.fullName" placeholder="Fullname" />
        <el-input type="text" v-model="signupCred.userName" placeholder="Username" />
        <el-input type="text" v-model="signupCred.password" placeholder="Password" />
        <el-input type="file" @change="onUploadImg" />
        <img :src="signupCred.src" />
        <el-button @click.prevent="doSignup">Signup</el-button>
        <span style="display:none;"></span>
        <el-button @click="signUp=!signUp" plain>Login</el-button>
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
    },
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.userName || !cred.password)
        return (this.msg = "Please enter username/password");
      await this.$store.dispatch({ type: "login", userCred: cred });
      console.log("cred-login-page", cred);
      this.loginCred = {};
      this.$router.back();
      // this.$router.push(`/`);
    },
    async doSignup() {
      const cred = this.signupCred;
      console.log("this.signupCred", this.signupCred);
      if (!cred.fullName || !cred.password || !cred.userName)
        return (this.msg = "Please enter username/password");
      console.log("this.signupCred", this.signupCred);
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.back();
    }
  }
};
</script>

<style>
</style>