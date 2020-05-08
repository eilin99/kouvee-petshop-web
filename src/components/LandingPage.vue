<template>
  <div id="landing-page">

    <section id="header" class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container slogan-wrapper">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">
                  About us
                </a>
                <a class="navbar-item">
                  Review
                </a>
                <a class="navbar-item">
                  Services
                </a>
                <a class="navbar-item">
                  Products
                </a>
                <a class="navbar-item">
                  Find Us
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="slogan">
            <p class="title">
              We care for<br/>
              your furry little pets!
            </p>
          </div>
        </div>
      </div>
      
    </section>

    <section id="about-us" class="section is-medium">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p class="title">
              Expert care for your furry, feathery, or scaley friend
            </p>
            <p class="subtitle">
              We know how stressful it is to leave your pets at home alone. We’re a team of experienced animal caregivers, well connected to local veterinarians. Trust to us to love them like our own, and to keep them safe and happy till you’re home.
            </p>
          </div>
          <div class="column">
            <div class="level">
              <img src="../assets/animal-1.webp" alt="">
              <img src="../assets/animal-2.webp" alt="">
            </div>
            <div class="level">
              <img src="../assets/animal-3.webp" alt="">
              <img src="../assets/animal-4.webp" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="jualan" class="">
      <div class="columns is-gapless">
        <div class="column woman">
          <img src="../assets/woman.webp" alt="">
        </div>
        <div class="column beige">
          <div class="wrapper">
            <h5 class="title is-4">Services tailored to your needs</h5>
            <p class="subtitle is-6">
              Schedule one-off or recurring home visits. An experienced member of our team will spend time with your pet, feed them, change cat litter trays, take the dog for a walk, and anything else you need.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="review" class="section is-large">
      <div class="container">
        <p class="title has-text-centered">Pets (and their slaves) love us</p>
      </div>
    </section>

    <footer class="footer is-dark">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p>ahaha</p>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* HEADER */
#header {
  background-image: url(../assets/bg.webp);
  background-position: center;
  background-size: cover;
  object-fit: contain;
  opacity: 0.95;
}
.slogan-wrapper {
  position: relative;
}
.slogan {
  position: absolute;
  width: 500px;
  height: 500px;
  top: 0;
  right: 0;
}

.woman {
  line-height: 0;
}
.beige {
  background-color: #f7eceb;
}
.wrapper {
  width: 415px;
  height: auto;
  margin: auto;
  vertical-align: middle;
}
</style>

<script>
export default {
  name: 'LoginForm',
  props: {
    msg: String
  },
  data() {
    return {

    }
  },
  methods: {
    login() {
      this.$router.push({
        name: "Dashboard"
      })
    }
  }
}
</script>