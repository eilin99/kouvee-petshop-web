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
                  Tentang kami
                </a>
                <a href="#review" class="navbar-item" v-smooth-scroll="smoothScroll">
                  Review
                </a>
                <a href="#offerings" class="navbar-item" v-smooth-scroll="smoothScroll">
                  Penawaran
                </a>
                <a href="#footer" class="navbar-item" v-smooth-scroll="smoothScroll">
                  Kontak
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
              Pilihan terbaik<br/>
              untuk hewan anda!
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
                Kami adalah<br>Kouvee Petshop
              </p>
              <p class="subtitle paragraph color-slate">
                Kouvee Petshop adalah petshop yang melayani berbagai keperluan hewan peliharaan.
                Mulai dari produk-produk berkualitas untuk hewan peliharaan sampai perawatan
                dan penitipan hewan. Kami memiliki standar dan bekerja dengan kasih sayang.
                Karena kami menyayangi hewan sperti klian mnyayangi hewan klian.                
              </p>
            </div>
          </div>
          <div class="column">
            <div class="about-us-gambar-hewan">
              <div class="img-with-text">
                <span>Niggly</span>
                <img src="../assets/animal-1.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Nigglet</span>
                <img src="../assets/animal-2.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Nuggly</span>
                <img src="../assets/animal-3.webp" alt="">
              </div>
              <div class="img-with-text">
                <span>Nuggle</span>
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
            <span>Bleki dan Siti</span>
            <img src="../assets/woman.webp" alt="">
          </div>
        </div>
        <div class="column beige">
          <div class="wrapper">
            <h5 class="title section-title color-slate">Melayani Dengan Sepenuh Hati</h5>
            <p class="subtitle paragraph color-slate">
              Kami sadar bahwa anda sangat menyayangi hewan peliharaan anda.
              Maka dari itu, Kouvee Petshop selalu melayani secara maksimal dan sepenuh hati.
              Karena kami mengerti bahwa kepercayaan yang anda berikan kepada kami sangat berarti.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="review" class="section is-medium">
      <div class="container">
        <p class="title section-title has-text-centered has-text-white">Kata Mereka</p>
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
          Pilihan tepat,<br/>
          Harga bersahabat
        </h2>

        <p class="subtitle paragraph has-text-centered color-slate" style="width: 60%; margin: 10px auto;">
          Untuk memenuhi kebutuhan peliharaan anda, kami menawarkan berbagai produk dan jasa layanan
          yang berkualitas dengan harga yang bersahabat
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
                  Selengkapnya
            </b-button>
          </div>
        </div>

      </div>
    </section>

    <footer id="footer" class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-4 section-title has-text-white">
              Kunjungi kami
            </h2>
            <a
              href="https://www.google.com/maps/place/Universitas+Atma+Jaya+Yogyakarta+-+Kampus+3+Gedung+Bonaventura+Babarsari/@-7.7804061,110.4120387,17z/data=!4m12!1m6!3m5!1s0x2e7a59efe143b3d9:0x48def21d296c3765!2sAtma+Jaya+University,+Yogyakarta!8m2!3d-7.7804061!4d110.4142274!3m4!1s0x2e7a59f1fb2f2b45:0x20986e2fe9c79cdd!8m2!3d-7.7794198!4d110.4161288"
              target="_blank"
              class="subtitle paragraph has-text-white"
            >
              <b-icon icon="store"></b-icon>
              Jl. Babarsari No.43, Janti, Sleman, DIY 
            </a>
            <p class="subtitle paragraph has-text-white" style="margin-top: 20px">
              <b-icon icon="clock"></b-icon>
              Senin-Minggu (09.00 - 20.00)
            </p>
          </div>
          <div class="column has-text-centered">
            <h2 class="title is-4 section-title has-text-white has-text-centered">
              Hubungi kami
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
          <div class="column has-text-right">
            <h2 class="title is-4 section-title has-text-white has-text-right">
              Follow kami
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
        Made with 💖 Kelompok 1 P3L Kelas C 2020
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
      updateHistory: false,
    }
    let Reviews = [
      { name: 'Albertus K.', msg: '“Produk-produknya sangat brkualitas tinggi! Saya mencoba makanan hewan disini, ternyata sngat enak. Akhirnya saya mkan siang dngan kucing saya”', image: 'lindsay' },
      { name: 'Miroku B.', msg: '“Pelayanannya sngat mmuaskan. Stiap saya ksini, saya mndapat kopi gratid dan kuaci hamtaro”', image: 'floof' },
      { name: 'Kevin H.', msg: '“Saya suka skali karna tempatnya ada AC. Jdi klo panas, saya mampir ksini untuk ngadem hehe”', image: 'ginger' },
      { name: 'Dennis F.', msg: '“Sejak saya mmbawa kucing saya ksini, dia jdi suka mandi. Skarang kucing mnjadi amfibi. Saya snang skaliii!”', image: 'ned' },
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