<template>
  <section id="login" class="hero is-fullheight has-background-white-ter">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">Masuk Akun</h1>

        <div class="columns is-centered">
          <div class="column is-4">
            <div class="box">
              
              <b-field label="Email"
                  type="is-danger"
                  message="invalid">
                  <b-input type="email"
                      v-model="email"
                      >
                  </b-input>
              </b-field>

              <b-field label="Kata sandi"
                  type="is-danger"
                  message="invalid password">
                <b-input type="password"
                    value="iwantmytreasure"
                    password-reveal>
                </b-input>
              </b-field>

              <b-button type="is-info" expanded @click="login()">Masuk</b-button>

            </div>
          </div>
        </div>

        <p class="has-text-centered has-text-grey-light">Made with ❤️ Kelompok 1 P3L C</p>
      </div>
    </div>
  </section>
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

</style>
