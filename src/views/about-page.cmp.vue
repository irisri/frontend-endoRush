<template>
  <section class="about-us main-container">
    <div class="team-member flex justify-center">
      <div class="tm-img">
        <img src="~@/assets/team/Ofra.jpg" />
      </div>
      <div class="tm-dit">
        <h4>Ofra Bargad</h4>
        <p class="text-dark">Full stack developer</p>
        <span class="material-icons" @click="emailMe('ofra.bargad@gmail.com')">email</span>
      </div>
      <div class="tm-desc flex align-center">
        <p class="large text-dark about-description">
          Full-stack web developer and experienced coder. Live in Givat Shmuel.     
        </p>
      </div>
    </div>
    <hr />
    <div class="team-member flex justify-center">
      <div class="tm-img">
        <img src="~@/assets/team/Iris.jpg" />
      </div>
      <div class="tm-dit">
        <h4>Iris Rifold</h4>
        <p class="text-dark">Full stack developer</p>
        <span class="material-icons" @click="emailMe('irisrifold.gmail.com')">email</span>
      </div>
      <div class="tm-desc flex align-center">
        <p
          class="large text-dark about-description"
        >I currenty live in Tel-Aviv and I'm looking for a job as a junior full developer.</p>
      </div>
    </div>
    <hr />
    <div class="team-member flex justify-center">
      <div class="tm-img">
        <img src="~@/assets/team/Lee.jpg" />
      </div>
      <div class="tm-dit">
        <h4>Lee Dror</h4>
        <p class="text-dark">Full stack developer</p>
        <span class="material-icons" @click="emailMe('leedror33.gmail.com')">email</span>
      </div>
      <div class="tm-desc flex align-center">
        <div class="large text-dark about-description">
          <p>B.Sc. Industrial Engineering and Management, major in Information Systems.</p>
          <p>ERP Project manager.</p>
          <p>Looking for a full stack developer position.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "about-page",
  methods: {
    emailMe(email) {
      window.open(`mailto: ${email}`);
    },
  },
};
</script>


