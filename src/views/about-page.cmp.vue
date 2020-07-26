<template>
  <section class="about-us main-container">
    <div class="team-member flex justify-center">
      <div class="tm-img">
        <img src="~@/assets/team/Ofra.jpg" />
      </div>
      <div class="tm-dit">
        <h4>Ofra Bargad</h4>
        <p class="text-dark">Web developer</p>
      </div>
      <div class="tm-desc flex align-center">
        <p class="large text-dark about-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
          eaque, laboriosam veritatis, quos non quis ad perspiciatis.
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
        <p class="text-dark">Web developer</p>
      </div>
      <div class="tm-desc flex align-center">
        <p
          class="large text-dark about-description"
        >I currenty live in Tel-Aviv and I'm looking for a job as a junior web developer.</p>
      </div>
      <div class="email">
        <span class="material-icons" @click="emailMe('irisrifold.gmail.com')">email</span>
      </div>
    </div>
    <hr />
    <div class="team-member flex justify-center">
      <div class="tm-img">
        <img src="~@/assets/team/Lee.jpg" />
      </div>
      <div class="tm-dit">
        <h4>Lee Dror</h4>
        <p class="text-dark">Web developer</p>
      </div>
      <div class="tm-desc flex align-center">
        <p class="large text-dark about-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
          eaque, laboriosam veritatis, quos non quis ad perspiciatis.
        </p>
      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: "about-page",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    emailMe(email) {
      window.open(`mailto: ${email}`);
    },
  },
  
};
</script>


