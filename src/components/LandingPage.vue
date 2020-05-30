<template>
  <div id="landing-page">

    <section id="header" class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <!-- <b-icon class="brand" icon="paw" size="is-medium"></b-icon> -->
                <h5 class="title brand is-3 has-text-white">Kouvee Petshop</h5>
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a href="#about-us" class="navbar-item" v-smooth-scroll="smoothScroll">
                  About us
                </a>
                <a href="#review" class="navbar-item" v-smooth-scroll="smoothScroll">
                  Review
                </a>
                <a href="#offerings" class="navbar-item" v-smooth-scroll="smoothScroll">
                  Offerings
                </a>
                <a href="#footer" class="navbar-item" v-smooth-scroll="smoothScroll">
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
            <p class="title main-title has-text-white">
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
            <div class="about-us-text-container">
              <p class="title section-title color-slate">
                Expert care for your furry, feathery, or scaley friend
              </p>
              <p class="subtitle paragraph color-slate">
                We know how stressful it is to leave your pets at home alone. We’re a team of experienced animal caregivers, well connected to local veterinarians. Trust to us to love them like our own, and to keep them safe and happy till you’re home.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="about-us-gambar-hewan">
              <div class="img-with-text">
                <span>Muffin</span>
                <img src="../assets/animal-1.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Nigglet</span>
                <img src="../assets/animal-2.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Natasha</span>
                <img src="../assets/animal-3.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Marion</span>
                <img src="../assets/animal-4.webp" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="woman" class="">
      <div class="columns is-gapless">
        <div class="column woman">
          <div class="img-with-text">
            <span>Ollie and Maggie</span>
            <img src="../assets/woman.webp" alt="">
          </div>
        </div>
        <div class="column beige">
          <div class="wrapper">
            <h5 class="title section-title color-slate">Services tailored to your needs</h5>
            <p class="subtitle paragraph color-slate">
              Schedule one-off or recurring home visits. An experienced member of our team will spend time with your pet, feed them, change cat litter trays, take the dog for a walk, and anything else you need.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="review" class="section is-medium">
      <div class="container">
        <p class="title section-title has-text-centered has-text-white">Pets (and their slaves) love us</p>
        <div class="review-wrapper">
          <Review
            v-for="review in Reviews"
            :key="review.name"
            :review="review"
          />
        </div>
      </div>
    </section>

    <section id="offerings" class="section is-medium">
      <div class="container">
        <h2 class="title section-title has-text-centered color-slate">
          Affordable options,<br/>
          tailored to your needs
        </h2>

        <p class="subtitle paragraph has-text-centered color-slate" style="width: 60%; margin: 10px auto;">
          All services include live updates including photos and chat,  
as well as notifications of sitter arrival and departure times.
        </p>

        <div class="jualan-wrapper" style="margin-top: 50px">
          <div class="produk-wrapper">
            <CardProduk
                v-for="produk in listProduk"
                :key="produk.id_produk"
                :data="produk"
            />
          </div>
        </div>

        <div class="jualan-wrapper">
          <div class="produk-wrapper">
            <CardLayanan
                v-for="layanan in listLayanan"
                :key="layanan.id_layanan"
                :data="layanan"
            />
          </div>
        </div>

        <div class="level" style="margin-top: 50px">
          <div class="level-item">
            <b-button
                class="btn-landing-slate"
                tag="router-link" 
                to="/ketersediaan-produk-layanan" 
                rounded>
                  See more
            </b-button>
          </div>
        </div>

      </div>
    </section>

    <footer id="footer" class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 section-title has-text-white">
              Further Info
            </h2>
            <div>
              <p class="subtitle paragraph has-text-white">
                <b-icon icon="phone"></b-icon>
                0274-123456
              </p>
              <p class="subtitle paragraph has-text-white">
                <b-icon icon="phone"></b-icon>
                089123456789
              </p>
            </div>
          </div>
          <div class="column">
            <h2 class="title is-3 section-title has-text-white">
              Follow us
            </h2>
            <div class="socmed-wrapper">
              <a>
                <b-icon class="socmed has-text-white" icon="instagram" size="is-medium"></b-icon>
              </a>
              <a>
                <b-icon class="socmed has-text-white" icon="facebook" size="is-medium"></b-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="made-with-love">
      <p class="subtitle is-6 paragraph has-text-centered has-text-grey-lighter">
        Made with 💖 Kelompok 1 P3L Kelas C
        <!-- <b>Made with 💖 Kelompok 1 P3L Kelas C</b> -->
      </p>
    </div>

  </div>
</template>

<style scoped>
@import '../style.css';
</style>

<script>
import Review from './komponen-landing-page/CardReview.vue'
import CardProduk from './komponen-landing-page/CardProduk.vue'
import CardLayanan from './komponen-landing-page/CardLayanan.vue'

export default {
  name: 'LoginForm',
  components: {
    Review,
    CardProduk,
    CardLayanan,
  },
  data() {
    let smoothScroll = {
      duration: 1500,
      // offset: -50,
    }
    let Reviews = [
      { name: 'Lindsay M.', msg: '“Pawtastic is awesome! They are passionate about pets and employ trustworthy, dependable staff. We love them!”', image: 'lindsay' },
      { name: 'Andrew C.', msg: '“I’m a repeat customer because of their amazing care for our two cats when we travel. I can relax because I know they’re there!”', image: 'floof' },
      { name: 'Meg F.', msg: '“I use them for mid day walks and our babies are so happy with the exercise and love during the day. We see the difference!”', image: 'ginger' },
      { name: 'Jackie B.', msg: '“I just returned from two weeks away to a sociable, calm cat and no drama. Thanks for a great job, Pawtastic!”', image: 'ned' },
    ]

    return {
      smoothScroll,
      Reviews,

      // data
      cariProduk: '',
      cariLayanan: '',
      listProduk: [],
      listLayanan: [],
    }
  },
  methods: {
    // ====================================================================
    // GET
    // ====================================================================
    async getProduk() {
      var uri = this.$api_baseUrl + "produk"

      await this.$http.get(uri).then(response => {
        this.listProduk = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
    async getLayanan() {
      var uri = this.$api_baseUrl + "layanan"

      await this.$http.get(uri).then(response => {
        this.listLayanan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
  },
  async mounted() {
    await this.getProduk()
    await this.getLayanan()

    this.listProduk = this.listProduk.slice(0, 4)
    this.listLayanan = this.listLayanan.slice(0, 4)
  }
}
</script>