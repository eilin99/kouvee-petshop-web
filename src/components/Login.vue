<template>
  <section id="login" class="hero is-fullheight has-background-white-ter">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">Masuk Akun</h1>

        <div class="columns is-centered">
          <div class="column is-4">
            <div class="box">
              
              <b-field 
                  label="Username"
                  :type="loginForm.username.type"
                  :message="loginForm.username.message">
                    <b-input 
                        v-model="loginForm.username.value" 
                        @input="netralize(loginForm.username)">
                    </b-input>
              </b-field>

              <b-field 
                  label="Kata sandi"
                  :type="loginForm.password.type"
                  :message="loginForm.password.message">
                    <b-input 
                        type="password" 
                        v-model="loginForm.password.value" 
                        @input="netralize(loginForm.password)" 
                        password-reveal>
                    </b-input>
              </b-field>

              <b-button type="is-info" expanded @click="login()">Masuk</b-button>

            </div>
          </div>
        </div>

        <footer class="footer has-background-white-ter">
          <div class="content has-text-centered">
            <p class="has-text-grey-light">Made with ❤️ Kelompok 1 P3L C</p>
          </div>
        </footer>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      userLogin: new FormData(),
      loginForm : 
      {
        username: { value: '', type: '', message: '' },
        password: { value: '', type: '', message: '' },
      }
    }
  },
  methods: {
    login: function() {
      var self = this // Biar bisa nge-cache yang didapet dari http request

      this.userLogin.append("username", this.loginForm.username.value)
      this.userLogin.append("password", this.loginForm.password.value)

      var uri = this.$api_baseUrl + "login";

      this.$http.post(uri, this.userLogin).then(response => {
        if (response.status === 200) {
          self.$session.start()
          self.$session.set('pegawai', response.data.value)
          this.$router.push({ name: "Dashboard" })
        }
      })
      .catch(error => {
        this.errors = error;
        this.loginForm.username.type = 'is-danger'
        this.loginForm.password.type = 'is-danger'
        this.loginForm.password.message = 'Username dan password tidak sesuai'
      })
    },
    netralize(loginForm) { // biar warning ilang waktu isi formnya diubah
      loginForm.type = ''
      loginForm.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
