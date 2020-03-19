<template>
  <div id="landing-page">

    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
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
                  Beranda
                </a>
                <a class="navbar-item">
                  Tentang kami
                </a>
                <a class="navbar-item">
                  Produk
                </a>
                <a class="navbar-item">
                  Layanan
                </a>
                <a class="navbar-item">
                  Hubungi kami
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Title
          </p>
          <p class="subtitle">
            Subtitle
          </p>
        </div>
      </div>
      
    </section>

    <section id="deskripsi" class="section is-small">
      <div class="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta doloribus molestiae quasi nisi sint, excepturi vel iusto dolorem dolor aut, error maxime beatae doloremque natus possimus recusandae vero, eum esse?
        </p>
      </div>
    </section>

    <section id="jualan" class="section is-small">
      <div class="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maiores voluptatum velit doloremque animi odit quos. Voluptatibus culpa soluta maiores, eum quae blanditiis praesentium, ullam sequi minus deleniti quaerat iste.
        </p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>>
