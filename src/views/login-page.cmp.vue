<template>
  <section class="login-page main-container">
    <div v-if="!signUp" class="login">
      <h2>Login</h2>
      <form class="form flex column align-center">
        <el-input type="text" v-model="loginCred.userName" placeholder="Username" />
        <el-input type="password" v-model="loginCred.password" placeholder="Password" />
        <el-button @click.prevent="doLogin">Login</el-button>
      </form>
      <el-button @click="signUp=!signUp">Signup</el-button>
    </div>
    <div v-if="signUp" class="sign-up">
      <h2>Signup</h2>
      <form class="form flex column align-center">
        <el-input type="text" v-model="signupCred.fullName" placeholder="Fullname" />
        <el-input type="text" v-model="signupCred.userName" placeholder="Username" />
        <el-input type="password" v-model="signupCred.password" placeholder="Password" />
        <div class="img-upload">
          <label for="upload" class="custom-file-upload">Upload image</label>
          <input type="file" @change="onUploadImg" id="upload" />
        </div>
        <img :src="signupCred.imgUrl" />

        <el-button @click.prevent="doSignup">Signup</el-button>
        <span style="display:none;"></span>
        <el-button @click="signUp=!signUp">Login</el-button>
      </form>
    </div>
  </section>
</template>

<script>
import imgService from "@/services/img-upload.service.js";

export default {
  data() {
    return {
      loginCred: {},
      signupCred: {},
      signUp: false,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    async onUploadImg(ev) {
      const res = await imgService.uploadImg(ev);
      this.signupCred.imgUrl = res.url;
    },
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.userName || !cred.password)
        return (this.msg = "Please enter username/password");
      await this.$store.dispatch({ type: "login", userCred: cred });
      this.loginCred = {};
      this.$router.back();
    },
    async doSignup() {
      const cred = this.signupCred;
      if (!cred.fullName || !cred.password || !cred.userName)
        return (this.msg = "Please enter username & password");
      await this.$store.dispatch({ type: "signup", userCred: cred });
      this.$router.back();
    },
  },
};
</script>
